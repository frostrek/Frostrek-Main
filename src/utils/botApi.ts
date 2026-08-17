/** Bot API config — REST + WebSocket helpers for the site-wide Chatbot widget. */

import { FROSTY_API_BASE, FROSTY_API_KEY } from './frostyApi';

export const DEFAULT_BOT_CHANNEL = 'website';

export const FROSTY_BOT_API_KEY = FROSTY_API_KEY;

export function resolveBotApiBase(): string {
    const envBot = import.meta.env?.VITE_BOT_URL || '';
    if (envBot.trim()) {
        return envBot.trim().replace(/\/$/, '');
    }

    const envApi = import.meta.env?.VITE_API_URL || '';
    if (envApi.trim()) {
        return envApi.trim().replace(/\/$/, '');
    }

    return FROSTY_API_BASE.replace(/\/$/, '');
}

export function apiBaseToWsBase(apiBase: string): string {
    return apiBase.replace(/^http/i, 'ws');
}

export function resolveBotWsBases(apiBase?: string): string[] {
    const base = (apiBase ?? resolveBotApiBase()).replace(/\/$/, '');
    const envWs = import.meta.env?.VITE_WS_URL || '';
    const out: string[] = [];

    if (envWs.trim()) {
        out.push(envWs.trim().replace(/\/$/, ''));
    }

    if (typeof window !== 'undefined') {
        const host = window.location.hostname;
        if (host === 'localhost' || host === '127.0.0.1') {
            out.push('wss://frostyagent.com/bot-api');
        }
    }

    if (/^https?:\/\//i.test(base)) {
        try {
            const parsed = new URL(base);
            const wsProto = parsed.protocol === 'https:' ? 'wss:' : 'ws:';
            out.push(`${wsProto}//${parsed.host}${parsed.pathname.replace(/\/$/, '')}`);
        } catch {
            // Ignore malformed URLs and keep fallback candidates.
        }
    }

    out.push('wss://frostyagent.com/bot-api');

    return Array.from(new Set(out));
}
