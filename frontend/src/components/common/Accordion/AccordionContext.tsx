import { createContext, useState } from 'react';
import type { PropsWithChildren } from 'react';

interface AccordionContextProps {
  openedAccordion: number | undefined;
  handleOpenedAccordionChange: (id: number) => void;
}

export const AccordionContext = createContext<AccordionContextProps>(
  {} as AccordionContextProps,
);

export const AccordionProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [openedAccordion, setOpenedAccordion] = useState<number>();

  const handleOpenedAccordionChange = (id: number) => {
    if (openedAccordion === id) setOpenedAccordion(() => undefined);
    else setOpenedAccordion(() => id);
  };

  const value = {
    openedAccordion,
    handleOpenedAccordionChange,
  };

  return (
    <AccordionContext.Provider value={value}>
      {children}
    </AccordionContext.Provider>
  );
};
