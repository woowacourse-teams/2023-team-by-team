import type { CSSProperties, PropsWithChildren } from 'react';
import { AccordionProvider } from '~/components/common/Accordion/AccordionContext';
import AccordionHeader from '~/components/common/Accordion/AccordionHeader/AccordionHeader';
import AccordionItem from '~/components/common/Accordion/AccordionItem/AccordionItem';
import * as S from './Accordion.styled';
import AccordionBody from '~/components/common/Accordion/AccordionBody/AccordionBody';

interface AccordionProps {
  width?: CSSProperties['width'];
}

const Accordion = (props: PropsWithChildren<AccordionProps>) => {
  const { width, children } = props;

  return (
    <AccordionProvider>
      <S.Container $width={width}>{children}</S.Container>
    </AccordionProvider>
  );
};

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Body = AccordionBody;

export default Accordion;
