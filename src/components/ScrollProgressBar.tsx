"use client";

import { useEffect, useState } from "react";

const ScrollProgressBar = () => {
  const [scrolled, setScrolled] = useState<number>(0);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onScroll = () => {
    const viewportHeight = document.documentElement.scrollHeight - window.innerHeight;

    setScrolled((document.documentElement.scrollTop / viewportHeight) * 100);
  };
  return (
    <div
      className="h-2 w-full bg-blue-600"
      style={{ transform: `translateX(${scrolled - 100}%)` }}
    />
  );
};

export default ScrollProgressBar;
