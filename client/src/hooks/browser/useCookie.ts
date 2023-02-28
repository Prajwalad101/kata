import { useEffect, useState } from 'react';
/**
 * Custom hook to retrieve and store cookies for our application.
 * @param {String} key The key to store our data to
 * @param {String} defaultValue The default value to return in case the cookie doesn't exist
 */
const useCookie = (key: string, defaultValue: string | null) => {
  const [cookie, setCookie] = useState<string | null>(defaultValue); // TODO: Add custom functions for cookie management.

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

  function removeCookie() {
    const path = '/';
    const domain = process.env.NEXT_PUBLIC_HOSTNAME;

    const cookie = `${key}=; path=${path}; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    console.log(cookie);

    document.cookie = cookie;
    setCookie(null);
    /* name +
      '=' +
      ';path=' +
      '/' +
      ';domain=' +
      domain +
      ';expires=Thu, 01 Jan 1970 00:00:01 GMT'; */
  }

  return [cookie, removeCookie] as const;
};
export default useCookie;
