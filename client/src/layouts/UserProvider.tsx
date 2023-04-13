import { IUser } from '@destiny/common/types';
import { createContext, ReactNode, useContext } from 'react';
import useCookie from 'src/hooks/browser/useCookie';
import parseJwt from 'src/utils/text/parseJwt';

type UserSession = Partial<IUser> | undefined;
interface UserContext {
  user: UserSession;
  accessToken: string | null;
  logout: () => void;
}

const UserContext = createContext<UserContext | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const [accessToken, _, removeToken] = useCookie('access-token', null);

  const logout = removeToken;

  const user = accessToken
    ? (parseJwt(accessToken) as Partial<IUser>)
    : undefined;

  const value = { user, accessToken, logout };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useAuth() {
  const context = useContext(UserContext);
  return context;
}

export { UserProvider, useAuth };
