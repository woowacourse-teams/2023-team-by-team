import { createContext, useState } from 'react';
import type { PropsWithChildren } from 'react';

interface AccordionContextProps {
  openedAccordion: number | undefined;
  handleOpenAccordionChange: (id: number) => void;
}

export const AccordionContext = createContext<AccordionContextProps>(
  {} as AccordionContextProps,
);

export const AccordionProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [openedAccordion, setOpenAccordion] = useState<number>();

  const handleOpenAccordionChange = (id: number) => {
    if (openedAccordion === id) setOpenAccordion(() => undefined);
    else setOpenAccordion(() => id);
  };

  const value = {
    openedAccordion,
    handleOpenAccordionChange,
  };

  return (
    <AccordionContext.Provider value={value}>
      {children}
    </AccordionContext.Provider>
  );
};
