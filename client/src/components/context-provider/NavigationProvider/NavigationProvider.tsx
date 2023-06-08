import { createContext, useContext, useState } from 'react';

interface IContext {
  open: boolean;
  setOpen: (_value: boolean) => void;
}

const NavigationContext = createContext<IContext | undefined>(undefined);

interface NavigationProviderProps {
  children: React.ReactNode;
}

function NavigationProvider({ children }: NavigationProviderProps) {
  // sidebar toggle state
  const [open, setOpen] = useState(false);
  const value = { open, setOpen };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

function useSidebar() {
  const navState = useContext(NavigationContext);

  if (navState === undefined) {
    throw new Error('useNav must be within the NavigationProvider');
  }

  return navState;
}

export { NavigationProvider, useSidebar };
