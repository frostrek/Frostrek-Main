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

export const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isValidUuid(id?: string | null): boolean {
    return Boolean(id && UUID_REGEX.test(id.trim()));
}

export async function getTenantId(): Promise<string> {
    return FROSTY_AGENT_ID;
}

export function getWebsiteSessionId(_tenantId: string, sessionId: string): string {
    return sessionId;
}

/** Fetch bot appearance and greeting configured in Frosty Agent dashboard. */
export async function getBotAppearance(): Promise<{ title: string; greeting: string }> {
    const greetingKey = 'frosty_bot_greeting';
    const titleKey = 'frosty_bot_title';
    if (typeof sessionStorage !== 'undefined') {
        const cachedGreeting = sessionStorage.getItem(greetingKey);
        const cachedTitle = sessionStorage.getItem(titleKey);
        if (cachedGreeting) {
            return { title: cachedTitle || 'Frosty Agent', greeting: cachedGreeting };
        }
    }

    try {
        const res = await fetch(`${FROSTY_API_BASE}/v1/public/widget/bootstrap`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
                api_key: FROSTY_API_KEY,
                agent_id: FROSTY_AGENT_ID,
                host: typeof window !== 'undefined' ? window.location.hostname : 'www.frostrek.ai',
            }),
        });

        if (res.ok) {
            const data = await res.json();
            const appearance = data?.data?.appearance;
            const greeting = appearance?.greeting || data?.data?.greeting || 'Hi! How can we help?';
            const title = appearance?.title || data?.data?.title || 'Frosty Agent';
            if (typeof sessionStorage !== 'undefined') {
                sessionStorage.setItem(greetingKey, greeting);
                sessionStorage.setItem(titleKey, title);
            }
            return { title, greeting };
        }
    } catch (err) {
        console.warn('[Frosty] Bootstrap greeting error:', err);
    }

    return { title: 'Frosty Agent', greeting: 'Hi! How can we help?' };
}

/** Get or create conversation session strictly on the new Frosty-Agent API. */
export async function getOrCreateConversation(webSessionId?: string): Promise<string> {
    const sessionKey = 'frosty_experience_conversation_id';
    if (typeof sessionStorage !== 'undefined') {
        const stored = sessionStorage.getItem(sessionKey);
        if (isValidUuid(stored)) {
            return stored!;
        } else if (stored) {
            sessionStorage.removeItem(sessionKey);
        }
    }

    const webSession = isValidUuid(webSessionId)
        ? webSessionId!
        : (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `exp_${Math.random().toString(36).substring(2, 10)}`);

    const res = await fetch(`${FROSTY_API_BASE}/v1/public/widget/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
            api_key: FROSTY_API_KEY,
            agent_id: FROSTY_AGENT_ID,
            web_session: webSession,
        }),
    });

    if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Failed to create conversation session (${res.status}): ${errText}`);
    }

    const data = await res.json();
    const convId = data?.data?.conversation_id || data?.data?.session_id;
    if (!convId || !isValidUuid(convId)) {
        throw new Error('Frosty Agent API returned an invalid or missing conversation UUID');
    }

    const greeting = data?.data?.appearance?.greeting;
    if (greeting && typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('frosty_bot_greeting', greeting);
    }
    if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(sessionKey, convId);
    }
    return convId;
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
    let streamedTokens = '';
    let finalReply = '';

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split('\n\n');
        buffer = parts.pop() || '';

        for (const part of parts) {
            let currentEvent = 'message';
            const lines = part.split('\n');
            for (const line of lines) {
                const trimmed = line.trim();
                if (trimmed.startsWith('event:')) {
                    currentEvent = trimmed.replace('event:', '').trim();
                } else if (trimmed.startsWith('data:')) {
                    const rawData = trimmed.replace('data:', '').trim();
                    if (!rawData) continue;

                    try {
                        const data = JSON.parse(rawData);
                        if (currentEvent === 'token') {
                            if (data.text) {
                                streamedTokens += data.text;
                                callbacks.onToken?.(data.text);
                            }
                        } else if (currentEvent === 'message.completed') {
                            finalReply = data.text || streamedTokens;
                        } else if (currentEvent === 'error') {
                            throw new Error(data?.code || data?.message || 'Chat error occurred');
                        }
                    } catch (err: any) {
                        if (currentEvent === 'error' && err?.message) {
                            throw err;
                        }
                        // ignore malformed non-error json
                    }
                }
            }
        }
    }

    const result = finalReply || streamedTokens;
    callbacks.onFinal?.(result);
    return result;
}

export type VoiceTicketResult = {
    ticket: string | null;
    error?: string;
};

/** Mint S2S ticket for voice WebSocket strictly on the new Frosty-Agent platform */
export async function fetchVoiceTicket(conversationId: string): Promise<VoiceTicketResult> {
    if (!isValidUuid(conversationId)) {
        if (typeof sessionStorage !== 'undefined') {
            sessionStorage.removeItem('frosty_experience_conversation_id');
            sessionStorage.removeItem('voiceCallSessionId');
        }
        return { ticket: null, error: `Invalid session ID format (${conversationId}). Please try again.` };
    }

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
