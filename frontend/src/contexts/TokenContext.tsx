import { createContext, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';

interface TokenContextProps {
  token: string;
  updateToken: (token: string) => void;
  resetToken: () => void;
}

export const TokenContext = createContext<TokenContextProps>(
  {} as TokenContextProps,
);

export const TokenProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState(
    () => localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN) ?? '',
  );

  const updateToken = (token: string) => {
    setToken(() => token ?? '');
  };

  const resetToken = () => {
    setToken(() => '');
    localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
  };

  const value = { token, updateToken, resetToken } as const;

  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
};
