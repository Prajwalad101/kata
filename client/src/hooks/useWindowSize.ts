import { useEffect, useState } from 'react';

// Define general type for useWindowSize hook, which includes width and height
export interface Dimensions {
  width: number | undefined;
  height: number | undefined;
}

/**
 * @returns an object containing the current window dimensions{width, height}
 *
 * The dimensions are updated on each window resize
 */
function useWindowSize(): Dimensions {
  // Initialize state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useState<Dimensions>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

export default useWindowSize;
