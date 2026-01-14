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
    // 초기 계산 (비동기로 실행하여 경고 방지)
    setTimeout(() => {
      onScroll();
    }, 0);

    // ResizeObserver로 DOM 크기 변경 감지 (Toggle 열림/닫힘 등)
    const resizeObserver = new ResizeObserver(() => {
      // 약간의 지연을 두어 DOM 업데이트 완료 대기
      setTimeout(() => {
        onScroll();
      }, 10);
    });

    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
    };
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
