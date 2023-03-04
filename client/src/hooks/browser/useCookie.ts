import { useCallback, useEffect, useMemo, useState } from 'react';
/**
 * Custom hook to retrieve and store cookies for our application.
 * @param {String} key The key to store our data to
 * @param {String} defaultValue The default value to return in case the cookie doesn't exist
 */

interface CookieAttributes {
  'max-age': number;
}
const useCookie = (
  key: string,
  defaultValue: string | null,
  attributes?: CookieAttributes
) => {
  const [cookie, setCookie] = useState<string | null>(defaultValue); // TODO: Add custom functions for cookie management.

  const updateCookie = useCallback(
    (value: string) => {
      let cookieStr = '';
      if (attributes) {
        cookieStr = createCookieStr(attributes);
      }
      // add cookie to browser
      document.cookie = `${key}=${value}; ${cookieStr}`;
      setCookie(value);
    },
    [attributes, key]
  );

  const removeCookie = useCallback(() => {
    const path = '/';
    const domain = process.env.NEXT_PUBLIC_HOSTNAME;

    const cookie = `${key}=; path=${path}; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:01 GMT`;

    document.cookie = cookie;
    setCookie(null);
  }, [key]);

  // on initial render
  useEffect(() => {
    const cookieArray = document.cookie.split('; ');

    // find the cookie from its key
    const cookie = cookieArray.find((currentCookie) => {
      const currentKey = currentCookie.split('=')[0];
      return currentKey === key;
    });

    // if it exists in browser, store the value in state
    if (cookie) {
      const cookieValue = cookie.split('=')[1];
      setCookie(cookieValue);
    } else if (defaultValue) {
      updateCookie(defaultValue);
    }
  }, [key, attributes, defaultValue, updateCookie]);

  const value = useMemo(
    () => [cookie, updateCookie, removeCookie] as const,
    [cookie, updateCookie, removeCookie]
  );

  return value;
};

function createCookieStr(attributes: object) {
  const keys = Object.keys(attributes);
  let str = '';

  keys.forEach((key) => {
    str += `${key}=${attributes[key as keyof typeof attributes]}; `;
  });

  return str;
}

export default useCookie;
