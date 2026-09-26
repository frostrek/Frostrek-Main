import { useEffect } from "react";

/**
 * FrostyWidget - Embed loader for the new Frosty-Agent website chat widget.
 * Injects the lightweight loader script which mounts the launcher button
 * and isolated chat panel iframe pointing to the new Frosty-Agent platform.
 */
export function FrostyWidget() {
  useEffect(() => {
    const existing = document.querySelector(
      'script[data-frosty-key="frosty_live_PkK4APzJZKZg_QxtA-QoreMMY5Zmki4g"]',
    );
    if (existing) return;

    const script = document.createElement("script");
    script.src = "https://widget.testing.frostyagent.com/frosty-widget.js";
    script.async = true;
    script.dataset.frostyKey = "frosty_live_PkK4APzJZKZg_QxtA-QoreMMY5Zmki4g";
    script.dataset.frostyPosition = "bottom-right";
    script.dataset.frostyAgent = "44dff393-10df-4665-8cb9-6cba4afac695";
    document.body.appendChild(script);
    // Do not remove the tag on unmount. The IIFE has already painted the launcher;
    // removing it does not tear that down, and React Strict Mode would inject a second copy.
  }, []);

  return null;
}

export default FrostyWidget;
