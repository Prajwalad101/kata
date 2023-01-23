import { useEffect, useState } from 'react';
/**
 * Custom hook to retrieve and store cookies for our application.
 * @param {String} key The key to store our data to
 * @param {String} defaultValue The default value to return in case the cookie doesn't exist
 */
const useCookie = (key: string, defaultValue: string) => {
  const [cookie, setCookie] = useState<string>(defaultValue); // TODO: Add custom functions for cookie management.

  useEffect(() => {
    const cookieArray = document.cookie.split('; ');
    const cookie = cookieArray.find((currentCookie) => {
      const currentKey = currentCookie.split('=')[0];
      return currentKey === key;
    });

    if (cookie) {
      const cookieValue = cookie.split('=')[1];
      setCookie(cookieValue);
    }
  }, [key]);

  return cookie;
};
export default useCookie;
