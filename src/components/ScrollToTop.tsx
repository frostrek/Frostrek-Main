import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent } from "../utils/analytics";

export default function ScrollToTop (){
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Push virtual pageview for GA4/GTM to track SPA route changes
    trackEvent('page_view', { page_path: pathname });
  }, [pathname]);

  return null;
};
