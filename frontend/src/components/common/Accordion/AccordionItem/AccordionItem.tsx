import type { PropsWithChildren } from 'react';
import * as S from './AccordionItem.styled';

const AccordionItem = (props: PropsWithChildren) => {
  const { children } = props;
  return <S.Container>{children}</S.Container>;
};

export default AccordionItem;
