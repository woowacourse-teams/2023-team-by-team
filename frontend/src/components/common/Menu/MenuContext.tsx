import { createContext, useState } from 'react';
import type { PropsWithChildren } from 'react';

interface MenuContextProps {
  isMenuOpen: boolean;
  handleMenuOpen: () => void;
}

export const MenuContext = createContext<MenuContextProps>(
  {} as MenuContextProps,
);

export const MenuProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const value = { isMenuOpen, handleMenuOpen };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
