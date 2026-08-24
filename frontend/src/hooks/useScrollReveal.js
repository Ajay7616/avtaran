import { useEffect } from "react";

/* Applies the site-wide .reveal fade/slide-in animation to all
   matching descendants of the given ref once they scroll into view. */
export default function useScrollReveal(rootRef) {
  useEffect(() => {
    const els = rootRef.current.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    els.forEach((el, i) => {
      el.style.transitionDelay = (i % 5) * 70 + "ms";
      io.observe(el);
    });
    return () => io.disconnect();
  }, [rootRef]);
}
