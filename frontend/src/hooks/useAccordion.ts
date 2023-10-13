import { useContext } from 'react';
import { AccordionContext } from '~/components/common/Accordion/AccordionContext';

export const useAccordion = () => {
  const context = useContext(AccordionContext);

  if (context === undefined) {
    throw new Error('useAccordion must be used within a AccordionProvider');
  }

  return context;
};
