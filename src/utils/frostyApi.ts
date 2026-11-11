/** Frosty bot API — shared config and helpers strictly for the Frosty-Agent production platform. */

export const FROSTY_API_BASE = (() => {
    if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FROSTY_API_BASE) {
        return import.meta.env.VITE_FROSTY_API_BASE;
    }
    // In local development, route through Vite proxy to avoid localhost CORS restrictions
    if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
        return '/api/frosty';
    }
    // In production (https://www.frostrek.ai), call the live Frosty Agent API directly
    return 'https://api.frostyagent.com';
})();

export const FROSTY_API_KEY =
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FROSTREK_BOT_API_KEY) ||
    'frosty_live_jY1-9PcjSR-fqSkzYMInXFVM32oNJ0Cd';

export const FROSTY_AGENT_ID =
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FROSTREK_AGENT_ID) ||
    '9111615e-c831-4c53-bff4-32bf508918ad';

export const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const SESSION_STORAGE_KEY = 'frosty_experience_session_v2';
const LEGACY_CONV_STORAGE_KEY = 'frosty_experience_conversation_id';
const GREETING_STORAGE_KEY = 'frosty_bot_greeting';
const TITLE_STORAGE_KEY = 'frosty_bot_title';
const AGENT_STORAGE_KEY = 'frosty_bot_agent_id';

export interface FrostySessionData {
    conversationId: string;
    webSession: string;
    sessionToken: string;
    apiKey: string;
    agentId: string;
    liveVoiceEnabled: boolean;
    s2sEnabled: boolean;
}

export function isValidUuid(id?: string | null): boolean {
    return Boolean(id && UUID_REGEX.test(id.trim()));
}

function generateUuid(): string {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    }
    return `exp_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 10)}`;
}

export function resolveFrostyWsBase(): string {
    if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FROSTY_API_BASE) {
        const custom = String(import.meta.env.VITE_FROSTY_API_BASE).trim().replace(/\/+$/, '');
        if (/^https?:\/\//i.test(custom)) {
            return custom.replace(/^http/i, 'ws');
        }
    }
    return 'wss://api.frostyagent.com';
}

export async function getTenantId(): Promise<string> {
    return FROSTY_AGENT_ID;
}

export function getWebsiteSessionId(_tenantId: string, sessionId: string): string {
    return sessionId;
}

function readCachedSession(): FrostySessionData | null {
    if (typeof sessionStorage === 'undefined') return null;
    try {
        const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as Partial<FrostySessionData>;
        if (
            !parsed ||
            !isValidUuid(parsed.conversationId) ||
            !parsed.sessionToken ||
            parsed.apiKey !== FROSTY_API_KEY ||
            parsed.agentId !== FROSTY_AGENT_ID
        ) {
            sessionStorage.removeItem(SESSION_STORAGE_KEY);
            sessionStorage.removeItem(LEGACY_CONV_STORAGE_KEY);
            return null;
        }
        return {
            conversationId: String(parsed.conversationId),
            webSession: parsed.webSession || generateUuid(),
            sessionToken: parsed.sessionToken,
            apiKey: FROSTY_API_KEY,
            agentId: FROSTY_AGENT_ID,
            liveVoiceEnabled: Boolean(parsed.liveVoiceEnabled),
            s2sEnabled: Boolean(parsed.s2sEnabled),
        };
    } catch {
        return null;
    }
}

function writeCachedSession(data: FrostySessionData): void {
    if (typeof sessionStorage === 'undefined') return;
    try {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(data));
        sessionStorage.setItem(LEGACY_CONV_STORAGE_KEY, data.conversationId);
    } catch {
        // Ignore storage quota errors in private browsing modes.
    }
}

export function clearCachedSession(): void {
    if (typeof sessionStorage === 'undefined') return;
    try {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
        sessionStorage.removeItem(LEGACY_CONV_STORAGE_KEY);
        sessionStorage.removeItem('voiceCallSessionId');
    } catch {
        // Ignore storage errors.
    }
}

/** Fetch bot appearance and greeting configured in Frosty Agent dashboard. */
export async function getBotAppearance(): Promise<{
    title: string;
    greeting: string;
    liveVoiceEnabled: boolean;
    s2sEnabled: boolean;
}> {
    if (typeof sessionStorage !== 'undefined') {
        const cachedAgent = sessionStorage.getItem(AGENT_STORAGE_KEY);
        if (cachedAgent === FROSTY_AGENT_ID) {
            const cachedGreeting = sessionStorage.getItem(GREETING_STORAGE_KEY);
            const cachedTitle = sessionStorage.getItem(TITLE_STORAGE_KEY);
            if (cachedGreeting) {
                return {
                    title: cachedTitle || 'Frosty Agent',
                    greeting: cachedGreeting,
                    liveVoiceEnabled: true,
                    s2sEnabled: false,
                };
            }
        } else {
            sessionStorage.removeItem(GREETING_STORAGE_KEY);
            sessionStorage.removeItem(TITLE_STORAGE_KEY);
            sessionStorage.removeItem(AGENT_STORAGE_KEY);
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
            const json = await res.json();
            const d = json?.data;
            const appearance = d?.appearance;
            const greeting = appearance?.greeting || d?.greeting || 'Hi! How can we help?';
            const title = appearance?.title || d?.title || 'Frosty Agent';
            if (typeof sessionStorage !== 'undefined') {
                sessionStorage.setItem(GREETING_STORAGE_KEY, greeting);
                sessionStorage.setItem(TITLE_STORAGE_KEY, title);
                sessionStorage.setItem(AGENT_STORAGE_KEY, FROSTY_AGENT_ID);
            }
            return {
                title,
                greeting,
                liveVoiceEnabled: Boolean(d?.live_voice_enabled),
                s2sEnabled: Boolean(d?.s2s_enabled),
            };
        }
    } catch (err) {
        console.warn('[Frosty] Bootstrap greeting error:', err);
    }

    return { title: 'Frosty Agent', greeting: 'Hi! How can we help?', liveVoiceEnabled: true, s2sEnabled: false };
}

/** Get or create conversation session strictly on the Frosty-Agent API, preserving X-Frosty-Session token. */
export async function getOrCreateSession(webSessionId?: string, forceRefresh = false): Promise<FrostySessionData> {
    if (!forceRefresh) {
        const cached = readCachedSession();
        if (cached) return cached;
    }

    const cachedWebSession = forceRefresh ? null : readCachedSession()?.webSession;
    const webSession = forceRefresh
        ? generateUuid()
        : isValidUuid(webSessionId)
            ? webSessionId!
            : cachedWebSession || generateUuid();

    const res = await fetch(`${FROSTY_API_BASE}/v1/public/widget/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
            api_key: FROSTY_API_KEY,
            agent_id: FROSTY_AGENT_ID,
            web_session: webSession,
            embed_origin: typeof window !== 'undefined' ? window.location.origin : 'https://www.frostrek.ai',
        }),
    });

    if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Failed to create conversation session (${res.status}): ${errText}`);
    }

    const json = await res.json();
    const d = json?.data;
    const convId = d?.conversation_id || d?.session_id;
    const sessionToken = d?.session_token;

    if (!convId || !isValidUuid(convId) || typeof sessionToken !== 'string' || !sessionToken) {
        throw new Error('Frosty Agent API returned an invalid or missing session token');
    }

    const sessionData: FrostySessionData = {
        conversationId: convId,
        webSession: d?.web_session || webSession,
        sessionToken,
        apiKey: FROSTY_API_KEY,
        agentId: FROSTY_AGENT_ID,
        liveVoiceEnabled: Boolean(d?.live_voice_enabled),
        s2sEnabled: Boolean(d?.s2s_enabled),
    };

    const greeting = d?.appearance?.greeting || d?.greeting;
    if (greeting && typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(GREETING_STORAGE_KEY, greeting);
        sessionStorage.setItem(AGENT_STORAGE_KEY, FROSTY_AGENT_ID);
    }
    writeCachedSession(sessionData);
    return sessionData;
}

/** Legacy helper kept for compatibility: returns conversation UUID and ensures session token is stored. */
export async function getOrCreateConversation(webSessionId?: string): Promise<string> {
    const session = await getOrCreateSession(webSessionId);
    return session.conversationId;
}

class RecoverableSessionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'RecoverableSessionError';
    }
}

async function withSessionRetry<T>(
    operation: (session: FrostySessionData) => Promise<T>,
    webSessionId?: string
): Promise<T> {
    const session = await getOrCreateSession(webSessionId);
    try {
        return await operation(session);
    } catch (err) {
        if (err instanceof RecoverableSessionError) {
            clearCachedSession();
            const freshSession = await getOrCreateSession(webSessionId, true);
            return await operation(freshSession);
        }
        throw err;
    }
}

export type ChatStreamCallbacks = {
    onToken?: (token: string) => void;
    onFinal?: (reply: string) => void;
};

export type VoiceTurnCallbacks = ChatStreamCallbacks & {
    onTranscribing?: () => void;
    onTranscribed?: (text: string) => void;
    onAudioUrl?: (url: string) => void;
    onAudioChunk?: (base64Chunk: string, mime: string) => void;
};

type SseParseResult = {
    finalReply: string;
    fileObjectId?: string;
    fileMime?: string;
};

async function consumeFrostySseStream(
    res: Response,
    callbacks: VoiceTurnCallbacks
): Promise<SseParseResult> {
    if (!res.body) {
        throw new Error('Empty response stream from Frosty API');
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';
    let streamedTokens = '';
    let finalReply = '';
    let denialFallback = '';
    let fileObjectId: string | undefined;
    let fileMime: string | undefined;

    const processEventBlock = (block: string) => {
        if (!block.trim()) return;
        let currentEvent = 'message';
        const dataLines: string[] = [];

        for (const rawLine of block.split('\n')) {
            const line = rawLine.trimEnd();
            if (line.startsWith('event:')) {
                currentEvent = line.slice(6).trim();
            } else if (line.startsWith('data:')) {
                dataLines.push(line.slice(5).trimStart());
            }
        }

        if (!dataLines.length) return;
        const rawData = dataLines.join('\n').trim();
        if (!rawData) return;

        let data: any;
        try {
            data = JSON.parse(rawData);
        } catch {
            return;
        }

        switch (currentEvent) {
            case 'voice.transcribing':
                callbacks.onTranscribing?.();
                break;
            case 'voice.transcribed':
                if (data?.text) {
                    callbacks.onTranscribed?.(String(data.text));
                }
                break;
            case 'token':
                if (data?.text) {
                    const chunk = String(data.text);
                    streamedTokens += chunk;
                    callbacks.onToken?.(chunk);
                }
                break;
            case 'message.completed':
                if (data?.text) {
                    finalReply = String(data.text);
                }
                break;
            case 'voice.reply':
                if (data?.file_object_id) {
                    fileObjectId = String(data.file_object_id);
                    fileMime = data?.mime ? String(data.mime) : 'audio/mpeg';
                }
                break;
            case 'voice.chunk':
                if (data?.chunk) {
                    callbacks.onAudioChunk?.(String(data.chunk), String(data.mime || 'audio/mpeg'));
                }
                break;
            case 'paced':
            case 'capacity':
                if (data?.message) {
                    denialFallback = String(data.message);
                }
                break;
            case 'conversation_closed':
                if (!streamedTokens && !finalReply) {
                    throw new RecoverableSessionError('conversation_closed');
                }
                break;
            case 'error': {
                const code = data?.code || '';
                const msg = data?.message || code || 'Chat error occurred';
                if (!streamedTokens && !finalReply && (code === 'not_found' || code === 'conversation_closed' || code === 'unauthorized')) {
                    throw new RecoverableSessionError(String(code));
                }
                throw new Error(String(msg));
            }
        }
    };

    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            buffer += decoder.decode();
            break;
        }

        buffer += decoder.decode(value, { stream: true });
        buffer = buffer.replace(/\r\n/g, '\n');
        const parts = buffer.split('\n\n');
        buffer = parts.pop() || '';

        for (const part of parts) {
            processEventBlock(part);
        }
    }

    if (buffer.trim()) {
        processEventBlock(buffer.replace(/\r\n/g, '\n'));
    }

    const result = finalReply || streamedTokens || denialFallback;
    return { finalReply: result, fileObjectId, fileMime };
}

/** Send message and consume SSE stream from POST /v1/public/widget/sessions/{conversation_id}/messages */
export async function postChatStream(
    payload: Record<string, string> | FormData,
    callbacks: ChatStreamCallbacks
): Promise<string> {
    let text = '';
    let webSession = '';

    if (payload instanceof FormData) {
        text = String(payload.get('message') || payload.get('text') || '');
        webSession = String(payload.get('session_id') || '');
    } else {
        text = payload.message || payload.text || '';
        webSession = payload.session_id || '';
    }

    return withSessionRetry(async (session) => {
        const res = await fetch(
            `${FROSTY_API_BASE}/v1/public/widget/sessions/${encodeURIComponent(session.conversationId)}/messages`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'text/event-stream',
                    'X-Frosty-Session': session.sessionToken,
                },
                body: JSON.stringify({
                    text,
                    idempotency_key: generateUuid(),
                }),
            }
        );

        if (res.status === 401 || res.status === 404) {
            throw new RecoverableSessionError(`http_${res.status}`);
        }
        if (!res.ok) {
            const err = await res.text();
            throw new Error(err || `Chat request failed (${res.status})`);
        }

        const parsed = await consumeFrostySseStream(res, callbacks);
        callbacks.onFinal?.(parsed.finalReply);
        return parsed.finalReply;
    }, webSession);
}

/** Fetch playable audio URL for a generated voice reply file object. */
export async function fetchAudioUrl(session: FrostySessionData, fileObjectId: string): Promise<string | null> {
    try {
        const res = await fetch(
            `${FROSTY_API_BASE}/v1/public/widget/sessions/${encodeURIComponent(session.conversationId)}/audio/${encodeURIComponent(fileObjectId)}`,
            {
                headers: {
                    Accept: 'application/json',
                    'X-Frosty-Session': session.sessionToken,
                },
            }
        );
        if (!res.ok) return null;
        const json = await res.json();
        return json?.url || json?.data?.url || null;
    } catch {
        return null;
    }
}

/** Upload recorded voice turn audio and stream transcription + AI reply from POST /v1/public/widget/sessions/{id}/voice */
export async function postVoiceTurnStream(
    audioBlob: Blob,
    mimeType: string,
    callbacks: VoiceTurnCallbacks,
    webSessionId?: string
): Promise<{ reply: string; audioUrl: string | null }> {
    const ext = mimeType.includes('ogg')
        ? 'ogg'
        : mimeType.includes('mp4') || mimeType.includes('m4a')
            ? 'mp4'
            : mimeType.includes('wav')
                ? 'wav'
                : 'webm';

    return withSessionRetry(async (session) => {
        const idempotencyKey = generateUuid();
        const formData = new FormData();
        formData.append('file', audioBlob, `voice-note.${ext}`);
        formData.append('idempotency_key', idempotencyKey);

        const res = await fetch(
            `${FROSTY_API_BASE}/v1/public/widget/sessions/${encodeURIComponent(session.conversationId)}/voice`,
            {
                method: 'POST',
                headers: {
                    Accept: 'text/event-stream',
                    'X-Frosty-Session': session.sessionToken,
                    'X-Idempotency-Key': idempotencyKey,
                    'X-Audio-Mime': mimeType || 'audio/webm',
                },
                body: formData,
            }
        );

        if (res.status === 401 || res.status === 404) {
            throw new RecoverableSessionError(`http_${res.status}`);
        }
        if (!res.ok) {
            const errText = await res.text();
            throw new Error(errText || `Voice request failed (${res.status})`);
        }

        const parsed = await consumeFrostySseStream(res, callbacks);
        let audioUrl: string | null = null;
        if (parsed.fileObjectId) {
            audioUrl = await fetchAudioUrl(session, parsed.fileObjectId);
            if (audioUrl) {
                callbacks.onAudioUrl?.(audioUrl);
            }
        }
        callbacks.onFinal?.(parsed.finalReply);
        return { reply: parsed.finalReply, audioUrl };
    }, webSessionId);
}

export type VoiceTicketResult = {
    ticket: string | null;
    error?: string;
    errorCode?: string;
    conversationId?: string;
};

/** Mint S2S ticket for voice WebSocket on the Frosty-Agent platform using X-Frosty-Session auth. */
export async function fetchVoiceTicket(conversationId?: string): Promise<VoiceTicketResult> {
    try {
        return await withSessionRetry(async (session) => {
            const targetConvId = isValidUuid(conversationId) && session.conversationId === conversationId
                ? conversationId!
                : session.conversationId;

            const res = await fetch(
                `${FROSTY_API_BASE}/v1/public/widget/sessions/${encodeURIComponent(targetConvId)}/live-s2s/ticket`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'X-Frosty-Session': session.sessionToken,
                    },
                }
            );

            if (res.status === 401 || res.status === 404) {
                throw new RecoverableSessionError(`http_${res.status}`);
            }

            if (!res.ok) {
                let errMsg = 'Failed to obtain live voice ticket';
                let errorCode: string | undefined;
                try {
                    const errJson = await res.json();
                    errorCode = errJson?.error?.message || errJson?.error?.code || `http_${res.status}`;
                    if (errJson?.error?.message === 'feature_not_entitled') {
                        errorCode = 'feature_not_entitled';
                        errMsg = 'Real-time S2S WebSocket calling is not enabled on this agent; using conversational voice mode.';
                    } else if (errJson?.detail) {
                        errMsg = String(errJson.detail);
                    } else if (errJson?.error?.message) {
                        errMsg = String(errJson.error.message);
                    }
                } catch { /* ignore */ }
                return { ticket: null, error: errMsg, errorCode, conversationId: targetConvId };
            }

            const data = await res.json();
            return { ticket: data?.ticket || null, conversationId: targetConvId };
        });
    } catch (err: any) {
        return { ticket: null, error: err?.message || 'Network error' };
    }
}
