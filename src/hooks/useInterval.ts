import { useEffect, useRef } from "react";

/**
 * useInterval - 주어진 콜백 함수를 지정된 간격(delay)마다 실행하는 React 커스텀 훅
 *
 * @param {() => void} callback - 호출할 함수입. 특정 반복 작업을 실행할 함수.
 * @param {number} delay - 콜백이 실행될 간격을 밀리초(ms) 단위로 지정. ex) 1000 =  1초마다 실행.
 *
 * @returns {void} 반환값 x
 *
 * @description
 * `useInterval` 훅은 `setInterval`의 기능을 React 컴포넌트에 안전하게 적용.
 * 일반적으로 `setInterval`을 사용할 때 발생할 수 있는 의존성 문제를 해결하기 위해 `useRef`와 `useEffect`를 조합하여
 * 안정적인 콜백 함수 참조를 유지하며, `delay` 값에 따라 주기적으로 `callback`을 실행.
 *
 * @example
 * ```javascript
 * useInterval(() => {
 *   console.log("1초마다 실행됩니다!");
 * }, 1000);
 * ```
 * 위 예제는 매초 콘솔에 메시지를 출력. `delay`를 `null`로 설정하면 `setInterval`이 일시 중단된다.
 *
 */

export default function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };
    const interval = setInterval(tick, delay);
    return () => clearInterval(interval);
  }, [delay]);
}
