import { useEffect, useState } from 'react';

export function useDelayedLoading(isLoading: boolean, delay: number = 1000): boolean {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isLoading) {
      timeout = setTimeout(() => setShow(true), delay);
    } else {
      setShow(false);
    }

    return () => clearTimeout(timeout);
  }, [isLoading, delay]);

  return show;
}
