import { useEffect } from "react";
import { useLocation } from "react-router";

/* Scrolls to top on route change, or to the matching #hash element
   when navigating with a hash (e.g. "/#contact" from another page). */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
