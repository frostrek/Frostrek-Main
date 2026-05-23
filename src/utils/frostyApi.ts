/** Frosty bot API — shared config and helpers for chat, voice, and TTS. */

export const FROSTY_API_BASE = 'https://bot.frostrek.com/bot-api';
export const FROSTY_API_KEY = import.meta.env.VITE_FROSTREK_BOT_API_KEY || '';

let cachedTenantId: string | null = null;

export async function getTenantId(): Promise<string> {
    if (cachedTenantId) return cachedTenantId;
    if (!FROSTY_API_KEY) return 'default';

    try {
        const res = await fetch(`${FROSTY_API_BASE}/tenant/bot-config`, {
            headers: { 'x-api-key': FROSTY_API_KEY },
        });
        if (!res.ok) return 'default';
        const data = await res.json();
        const id = String(data?.tenant_id || '').trim();
        if (id) cachedTenantId = id;
        return id || 'default';
    } catch {
        return 'default';
    }
}

export function getWebsiteSessionId(tenantId: string, sessionId: string): string {
    return `${tenantId}--website--${sessionId}`;
}

export function getVoiceCallWsUrl(bridgedSessionId: string): string {
    return `wss://bot.frostrek.com/bot-api/ws/voice-call/${encodeURIComponent(bridgedSessionId)}`;
}

export type ChatStreamCallbacks = {
    onToken?: (token: string) => void;
    onFinal?: (reply: string) => void;
};

/** Parse SSE stream from POST /chat/stream (JSON or multipart). */
export async function consumeChatStream(
    response: Response,
    callbacks: ChatStreamCallbacks
): Promise<string> {
    if (!response.ok) {
        const err = await response.text();
        throw new Error(err || `Chat request failed (${response.status})`);
    }

    const reader = response.body!.getReader();
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
            if (!part.startsWith('data: ')) continue;
            const jsonStr = part.replace('data: ', '').trim();
            if (!jsonStr) continue;

            try {
                const data = JSON.parse(jsonStr);
                if (data.token) callbacks.onToken?.(data.token);
                if (data.final?.reply) {
                    finalReply = data.final.reply;
                    callbacks.onFinal?.(finalReply);
                }
            } catch {
                // ignore malformed chunks
            }
        }
    }

    return finalReply;
}

export async function postChatStream(
    payload: Record<string, string> | FormData,
    callbacks: ChatStreamCallbacks
): Promise<string> {
    const isFormData = payload instanceof FormData;
    const headers: Record<string, string> = { 'x-api-key': FROSTY_API_KEY };
    if (!isFormData) headers['Content-Type'] = 'application/json';

    const res = await fetch(`${FROSTY_API_BASE}/chat/stream`, {
        method: 'POST',
        headers,
        body: isFormData ? payload : JSON.stringify(payload),
    });

    return consumeChatStream(res, callbacks);
}

/** Stream TTS audio (audio/mpeg) and play it in the browser. */
export async function playTtsStream(text: string): Promise<void> {
    const trimmed = text.trim();
    if (!trimmed || !FROSTY_API_KEY) return;

    const res = await fetch(`${FROSTY_API_BASE}/tts/stream`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': FROSTY_API_KEY,
        },
        body: JSON.stringify({ text: trimmed }),
    });

    if (!res.ok) return;

    const chunks: Uint8Array[] = [];
    const reader = res.body!.getReader();
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value?.byteLength) chunks.push(value);
    }

    const total = chunks.reduce((s, c) => s + c.byteLength, 0);
    const merged = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) {
        merged.set(chunk, offset);
        offset += chunk.byteLength;
    }

    const url = URL.createObjectURL(new Blob([merged], { type: 'audio/mpeg' }));
    const audio = new Audio(url);
    audio.onended = () => URL.revokeObjectURL(url);
    await audio.play().catch(() => undefined);
}

export function buildVoiceFormData(audioBlob: Blob, bridgedSessionId: string): FormData {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'voice-message.webm');
    formData.append('message', '[Voice message]');
    formData.append('session_id', bridgedSessionId);
    formData.append('channel', 'website');
    return formData;
}
