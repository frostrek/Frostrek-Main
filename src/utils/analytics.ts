declare global {
    interface Window {
        dataLayer: any[];
    }
}

/**
 * Pushes an event to the Google Tag Manager dataLayer.
 * This is much more reliable than Auto-Event tracking (DOM scraping).
 * 
 * @param eventName The exact name of the event to trigger in GTM (e.g. 'generate_lead')
 * @param payload Additional context data to send to GA4
 */
export const trackEvent = (eventName: string, payload?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: eventName,
            ...payload
        });
    }
};
