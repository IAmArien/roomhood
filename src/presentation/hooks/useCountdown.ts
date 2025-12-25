/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { useEffect, useRef, useState } from 'react';

export interface IUseCountdown {
  seconds: number;
  reset: () => void;
  isFinished: boolean;
}

export const useCountdown = (initialSeconds: number): IUseCountdown => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    setSeconds(initialSeconds);

    intervalRef.current = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const reset = () => start();

  useEffect(() => {
    start();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { seconds, reset, isFinished: seconds === 0 };
};
