import { createContext, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';

interface TokenContextProps {
  accessToken: string;
  refreshToken: string;
  updateToken: (accessToken: string, refreshToken: string) => void;
  resetToken: () => void;
}

export const TokenContext = createContext<TokenContextProps>(
  {} as TokenContextProps,
);

export const TokenProvider = ({ children }: PropsWithChildren) => {
  const [accessToken, setAccessToken] = useState(
    () => localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN) ?? '',
  );
  const [refreshToken, setRefreshToken] = useState(
    () => localStorage.getItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN) ?? '',
  );

  const updateToken = (accessToken: string, refreshToken: string) => {
    setAccessToken(() => accessToken ?? '');
    setRefreshToken(() => refreshToken ?? '');
    localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken);
    localStorage.setItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN, refreshToken);
  };

  const resetToken = () => {
    setAccessToken(() => '');
    setRefreshToken(() => '');
    localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
  };

  const value = { accessToken, refreshToken, updateToken, resetToken } as const;

  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
};
