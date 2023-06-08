/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';

/**
 * Performs like a useEffect hook but doesnot run on the first render
 * @param cb Imperative function that can return a cleanup function
 * @param dependencies If present, effect will only activate if the values in the list
 */
function useEffectAfterMount(cb: () => void, dependencies: any[]) {
  const justMounted = useRef(true);

  useEffect(() => {
    if (!justMounted.current) {
      cb();
    }
    justMounted.current = false;
  }, dependencies);
}

export default useEffectAfterMount;
