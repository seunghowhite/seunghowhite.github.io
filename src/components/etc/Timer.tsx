import { useState } from "react";

import useInterval from "@/hooks/useInterval";

interface timerProps {
  onExpire: () => void; // 타이머 만료 시 호출할 함수
  second: number; // 초기 타이머 시간 (초 단위)
}

export default function Timer({ onExpire, second }: timerProps) {
  const [time, setTime] = useState(second); // 타이머 시간
  const [expired, setExpired] = useState(false); // 타이머 만료 여부

  useInterval(() => {
    if (time > 0) {
      setTime((prevTime) => prevTime - 1);
    } else if (!expired) {
      setExpired(true); // 만료 상태를 true로 설정
      onExpire(); // 만료 함수 호출
    }
  }, 1000); // 1초마다 실행

  // 시간 형식 변환 (MM:SS)
  const timeFormat = (time: number) => {
    const m = Math.floor(time / 60).toString();
    let s = (time % 60).toString();
    if (s.length === 1) s = `0${s}`;
    return `${m}:${s}`;
  };

  return <p className="absolute right-5 mt-2 text-right text-[tomato]">{timeFormat(time)}</p>;
}
