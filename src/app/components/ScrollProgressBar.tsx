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
      className="w-full h-2 bg-slate-600 fixed"
      style={{ transform: `translateX(${scrolled - 100}%)` }}
    />
  );
};

export default ScrollProgressBar;
