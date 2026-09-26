/** Frosty bot API — shared config and helpers strictly for the new Frosty-Agent platform. */

export const FROSTY_API_BASE = (() => {
    if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FROSTY_API_BASE) {
        return import.meta.env.VITE_FROSTY_API_BASE;
    }
    // In local development, route through Vite proxy to avoid localhost CORS restrictions
    if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
        return '/api/frosty';
    }
    // In production (https://www.frostrek.ai), call the live Frosty Agent API directly
    return 'https://api.testing.frostyagent.com';
})();
export const FROSTY_API_KEY = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FROSTREK_BOT_API_KEY) || 'frosty_live_PkK4APzJZKZg_QxtA-QoreMMY5Zmki4g';
export const FROSTY_AGENT_ID = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FROSTREK_AGENT_ID) || '44dff393-10df-4665-8cb9-6cba4afac695';

export async function getTenantId(): Promise<string> {
    return FROSTY_AGENT_ID;
}

export function getWebsiteSessionId(_tenantId: string, sessionId: string): string {
    return sessionId;
}

/** Get or create conversation session strictly on the new Frosty-Agent API. */
export async function getOrCreateConversation(webSessionId?: string): Promise<string> {
    const sessionKey = 'frosty_experience_conversation_id';
    const stored = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(sessionKey) : null;
    if (stored) return stored;

    try {
        const res = await fetch(`${FROSTY_API_BASE}/v1/public/widget/sessions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
                api_key: FROSTY_API_KEY,
                agent_id: FROSTY_AGENT_ID,
                web_session: webSessionId || `exp_${Math.random().toString(36).substring(2, 10)}`,
            }),
        });

        if (res.ok) {
            const data = await res.json();
            const convId = data?.data?.conversation_id || data?.data?.session_id;
            if (convId) {
                if (typeof sessionStorage !== 'undefined') {
                    sessionStorage.setItem(sessionKey, convId);
                }
                return convId;
            }
        }
    } catch (err) {
        console.warn('[Frosty] Session creation error:', err);
    }
    return webSessionId || 'default_session';
}

export type ChatStreamCallbacks = {
    onToken?: (token: string) => void;
    onFinal?: (reply: string) => void;
};

/** Send message and consume SSE stream strictly from POST /v1/public/widget/sessions/{conversation_id}/messages */
export async function postChatStream(
    payload: Record<string, string> | FormData,
    callbacks: ChatStreamCallbacks
): Promise<string> {
    let text = '';
    let webSession = '';

    if (payload instanceof FormData) {
        text = String(payload.get('message') || '');
        webSession = String(payload.get('session_id') || '');
    } else {
        text = payload.message || payload.text || '';
        webSession = payload.session_id || '';
    }

    const conversationId = await getOrCreateConversation(webSession);

    const res = await fetch(
        `${FROSTY_API_BASE}/v1/public/widget/sessions/${encodeURIComponent(conversationId)}/messages`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'text/event-stream',
            },
            body: JSON.stringify({ text }),
        }
    );

    if (!res.ok) {
        const err = await res.text();
        throw new Error(err || `Chat request failed (${res.status})`);
    }

    const reader = res.body!.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';
    let finalReply = '';

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split('\n\n');
        buffer = parts.pop() || '';

        for (const part of parts) {
            const lines = part.split('\n');
            for (const line of lines) {
                if (!line.startsWith('data: ')) continue;
                const jsonStr = line.replace('data: ', '').trim();
                if (!jsonStr) continue;

                try {
                    const data = JSON.parse(jsonStr);
                    const tokenText = data.text || data.token;
                    if (tokenText) {
                        finalReply += tokenText;
                        callbacks.onToken?.(tokenText);
                    }
                } catch {
                    // ignore malformed chunks
                }
            }
        }
    }

    callbacks.onFinal?.(finalReply);
    return finalReply;
}

export type VoiceTicketResult = {
    ticket: string | null;
    error?: string;
};

/** Mint S2S ticket for voice WebSocket strictly on the new Frosty-Agent platform */
export async function fetchVoiceTicket(conversationId: string): Promise<VoiceTicketResult> {
    try {
        const res = await fetch(
            `${FROSTY_API_BASE}/v1/public/widget/sessions/${encodeURIComponent(conversationId)}/live-s2s/ticket`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            }
        );
        if (!res.ok) {
            let errMsg = 'Failed to obtain live voice ticket';
            try {
                const errJson = await res.json();
                if (errJson?.error?.message === 'feature_not_entitled') {
                    errMsg = 'Live voice calling requires the "live_voice" entitlement to be enabled for this agent in your Frosty Agent dashboard.';
                } else if (errJson?.error?.message) {
                    errMsg = errJson.error.message;
                }
            } catch { /* ignore */ }
            return { ticket: null, error: errMsg };
        }
        const data = await res.json();
        return { ticket: data?.ticket || null };
    } catch (err: any) {
        return { ticket: null, error: err?.message || 'Network error' };
    }
}
