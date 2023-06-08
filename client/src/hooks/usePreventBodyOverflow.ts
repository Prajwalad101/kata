import { useEffect } from 'react';

/**
 * hides the body overflow when sidebar is opened
 * @param open state of the sidebar
 */
// hides the vertical body overflow when sidebar is opened
function usePreventBodyOverflow(open: boolean) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);
}

export default usePreventBodyOverflow;
