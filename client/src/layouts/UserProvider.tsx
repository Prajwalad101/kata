import { IUser } from '@destiny/common/types';
import { createContext, ReactNode, useContext } from 'react';
import useCookie from 'src/hooks/browser/useCookie';
import parseJwt from 'src/utils/text/parseJwt';

type UserSession = Omit<IUser, 'trustPoints' | 'reviews'>;

const UserContext = createContext<Partial<IUser> | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const accessToken = useCookie('access-token', null);

  const user = accessToken ? parseJwt(accessToken) : undefined;
  console.log(user);
  const value = user as UserSession | undefined;

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUser() {
  const context = useContext(UserContext);
  return context;
}

export { UserProvider, useUser };
