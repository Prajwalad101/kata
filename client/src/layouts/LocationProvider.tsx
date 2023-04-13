import { getUserCoordinates } from '@features/register-business/utils/api';
import { createContext, ReactNode, useContext, useEffect } from 'react';
import useCookie from 'src/hooks/browser/useCookie';

const LocationContext = createContext<[number, number] | null>(null);

interface LocationProviderProps {
  children: ReactNode;
}

export default function LocationProvider({ children }: LocationProviderProps) {
  // const [userCoordinates, setUserCoordinates] = useState<[number, number]>();
  const [coordinates, updateCoordinates] = useCookie('coordinates', null, {
    'max-age': 60 * 60 * 3, // 3 hours,
    path: '/',
  });

  useEffect(() => {
    // coordinates is always initially null
    const id = setTimeout(() => {
      console.log('COORDINATES', coordinates);
      if (!coordinates) {
        getUserCoordinates().then((value) =>
          updateCoordinates(JSON.stringify(value))
        );
      }
    }, 1000);

    return () => clearTimeout(id);
  }, [coordinates, updateCoordinates]);

  const value = (coordinates ? JSON.parse(coordinates) : null) as
    | [number, number]
    | null;

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

function useLocation() {
  const context = useContext(LocationContext);
  return context;
}

export { LocationProvider, useLocation };
