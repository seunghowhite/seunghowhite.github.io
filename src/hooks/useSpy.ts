import { useCallback, useEffect, useRef, useState } from "react";

export const useSpyElem = (elemHeight: number) => {
  // spy를 부착할 요소 ref
  const ref = useRef<HTMLDivElement>(null);
  // 맨 위에서 헤더를 보여줄 임계값
  const topThreshold = 10;

  // elem의 marginTop. 서버와 클라이언트에서 동일한 초기값 사용
  const [marginTop, setMarginTop] = useState(0);
  // 클라이언트 마운트 여부 추적
  const [isMounted, setIsMounted] = useState(false);

  // 스크롤이 일어나기 직전의 scroll top
  const prevScrollTop = useRef(0);

  const onScroll = useCallback(() => {
    const currScrollTop = document?.documentElement?.scrollTop || document?.body?.scrollTop || 0;
    const nextDirection = prevScrollTop.current > currScrollTop ? "UP" : "DOWN";

    // 맨 위에 있을 때는 항상 헤더 표시
    if (currScrollTop <= topThreshold) {
      setMarginTop(0);
    } else {
      // 스크롤 방향에 따라 즉시 반응
      if (nextDirection === "DOWN") {
        setMarginTop(-elemHeight); // 아래로 스크롤 → 숨김
      } else {
        setMarginTop(0); // 위로 스크롤 → 표시
      }
    }

    prevScrollTop.current = currScrollTop;
  }, [elemHeight, topThreshold]);

  // 클라이언트 마운트 후 초기 스크롤 위치 설정
  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 0);
    const scrollTop = document.documentElement?.scrollTop || document.body.scrollTop || 0;
    prevScrollTop.current = scrollTop;

    // 초기 스크롤 위치에 따라 marginTop 설정
    if (scrollTop > topThreshold) {
      setTimeout(() => {
        setMarginTop(-elemHeight);
      }, 0);
    }
  }, [elemHeight, topThreshold]);

  // window document에 scroll 이벤트 부착, 해제
  useEffect(() => {
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return { ref, marginTop, isMounted };
};
