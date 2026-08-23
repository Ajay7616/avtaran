import { useEffect, useState } from "react";

/* Tracks whether the page has been scrolled past the nav's
   collapse threshold, used to toggle the sticky nav's compact style. */
export default function useNavScroll() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrolled;
}
