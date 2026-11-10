import { useEffect } from "react";

/**
 * FrostyWidget - Embed loader for the new Frosty-Agent website chat widget.
 * Injects the lightweight loader script which mounts the launcher button
 * and isolated chat panel iframe pointing to the new Frosty-Agent platform.
 * Deferred to load on first interaction or after 3.5 seconds to optimize CWV.
 */
export function FrostyWidget() {
  useEffect(() => {
    // 1. Skip completely during Puppeteer prerendering / headless build
    if (
      typeof navigator !== "undefined" &&
      (navigator.webdriver || /HeadlessChrome|puppeteer/i.test(navigator.userAgent))
    ) {
      return;
    }

    let loaded = false;
    let timerId: any = null;

    const loadWidget = () => {
      if (loaded) return;
      loaded = true;

      // Clean up interaction triggers
      ['scroll', 'mousemove', 'touchstart', 'click'].forEach((event) => {
        window.removeEventListener(event, loadWidget);
      });
      if (timerId) {
        clearTimeout(timerId);
      }

      // 2. Clean up any empty/inert prerendered widget root shell if present
      const existingRoot = document.getElementById("frosty-widget-root");
      if (existingRoot && !existingRoot.shadowRoot && existingRoot.children.length === 0) {
        existingRoot.remove();
      }

      // 3. Check if active widget or script is already present
      const activeRoot = document.getElementById("frosty-widget-root");
      const existingScript = document.querySelector(
        'script[data-frosty-key="frosty_live_jY1-9PcjSR-fqSkzYMInXFVM32oNJ0Cd"]',
      );

      if (existingScript && activeRoot) {
        return;
      }

      // If script tag was present from static HTML but widget aborted, remove dead tag to re-execute cleanly
      if (existingScript && !activeRoot) {
        existingScript.remove();
      }

      // 4. Inject widget loader script
      const script = document.createElement("script");
      script.src = "https://widget.frostyagent.com/frosty-widget.js";
      script.async = true;
      script.dataset.frostyKey = "frosty_live_jY1-9PcjSR-fqSkzYMInXFVM32oNJ0Cd";
      script.dataset.frostyPosition = "bottom-right";
      script.dataset.frostyAgent = "ed19460c-c416-40cc-803a-4241ae7eb9c5";
      document.body.appendChild(script);
    };

    // Load widget on first user interaction or after 3.5 seconds idle timeout
    ['scroll', 'mousemove', 'touchstart', 'click'].forEach((event) => {
      window.addEventListener(event, loadWidget, { once: true, passive: true });
    });
    timerId = setTimeout(loadWidget, 3500);

    return () => {
      ['scroll', 'mousemove', 'touchstart', 'click'].forEach((event) => {
        window.removeEventListener(event, loadWidget);
      });
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, []);

  return null;
}

export default FrostyWidget;
