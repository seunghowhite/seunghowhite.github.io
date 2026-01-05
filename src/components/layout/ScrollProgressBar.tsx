"use client";

import { useCallback, useEffect, useState } from "react";

const ScrollProgressBar = () => {
  const [scrolled, setScrolled] = useState<number>(0);

  const onScroll = useCallback(() => {
    const viewportHeight = document.documentElement.scrollHeight - window.innerHeight;

    setScrolled((document.documentElement.scrollTop / viewportHeight) * 100);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);
  return (
    <div
      title="스크롤 진행률 바"
      className="fixed top-0 z-30 h-1 w-full bg-blue-600"
      style={{ transform: `translateX(${scrolled - 100}%)` }}
    />
  );
};

export default ScrollProgressBar;
