import { RefObject, useEffect, useState } from 'react';

export interface ScrollPosition {
  top: number | undefined;
  left: number | undefined;
}
/**
 *
 * @param containerRef div element whose scroll position is required
 * @returns and object containing the current scroll position{top, left}
 */
export default function useScrollPosition(
  containerRef: RefObject<HTMLDivElement> | undefined
) {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    top: undefined,
    left: undefined,
  });

  const element = containerRef?.current;

  useEffect(() => {
    if (!element) return; // if no element reference, return immediately

    function handleScroll() {
      if (!element) return;

      setScrollPosition({
        top: element.scrollTop,
        left: element.scrollLeft,
      });
    }

    // Add event listener
    element.addEventListener('scroll', handleScroll);

    // Call handler right away so state gets updated with initial scroll value
    handleScroll();

    // Remove listener on cleanup
    return () => element.removeEventListener('scroll', handleScroll);
  }, [element]);

  return scrollPosition;
}
