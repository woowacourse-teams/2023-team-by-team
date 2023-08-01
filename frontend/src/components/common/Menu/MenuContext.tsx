import { createContext, useState } from 'react';
import type { PropsWithChildren } from 'react';

interface MenuContextProps {
  isMenuOpen: boolean;
  selectedValue: string;
  handleMenuOpen: () => void;
  handleSelectedValueChange: (value: string) => void;
}

export const MenuContext = createContext<MenuContextProps>(
  {} as MenuContextProps,
);

export const MenuProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleMenuOpen = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleSelectedValueChange = (value: string) => {
    setSelectedValue(() => value);
  };

  const value = {
    isMenuOpen,
    selectedValue,
    handleMenuOpen,
    handleSelectedValueChange,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
