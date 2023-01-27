import { useCallback } from 'react';

function debounce<T extends unknown[]>(
  cb: (..._args: T) => void,
  delay: number
) {
  let timeoutId: number | undefined;

  const debounced = (...args: T) => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => cb(...args), delay);
  };

  return debounced;
}

export default function useDebounce<T extends unknown[]>(
  cb: (..._args: T) => void,
  delay: number
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(debounce(cb, delay), []);
}
