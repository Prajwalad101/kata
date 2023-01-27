import { useMemo } from 'react';

function debounce<T extends unknown[]>(
  fn: (..._args: T) => void,
  delay: number
) {
  let timeoutId: number | undefined;

  const debounced = (...args: T) => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => fn(...args), delay);
  };

  return debounced;
}

export default function useDebounce<T extends unknown[]>(
  cb: (..._args: T) => void,
  delay: number
) {
  return useMemo(() => debounce(cb, delay), [cb, delay]);
}
