import { createContext, useState } from 'react';
import type { PropsWithChildren } from 'react';

interface ModalContextProps {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextProps>(
  {} as ModalContextProps,
);

export const ModalProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const value = { isModalOpen, openModal, closeModal } as const;

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
