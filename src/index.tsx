import { useEffect, useRef } from 'react';

export function useThrottleCallback<T extends () => void>(
  /**
   * Callback function
   */
  callback: T,
  /**
   * Timeout in ms
   * @default 500
   */
  timeout = 500,
): T {
  const timeoutRef = useRef(0);
  const resultRef = useRef<any>(null);

  const fn = (...args: any) => {
    if (timeoutRef.current === 0) {
      resultRef.current = (callback as any)(...args);

      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = 0;
      }, timeout);
    }

    return resultRef.current;
  };

  useEffect(() => {
    return () => {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = 0;
    };
  }, []);

  return fn as T;
}
