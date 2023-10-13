import type { CSSProperties, PropsWithChildren } from 'react';
import * as S from './AccordionHeader.styled';
import Button from '~/components/common/Button/Button';
import { useAccordion } from '~/hooks/useAccordion';
import { ArrowExpandMoreIcon } from '~/assets/svg';

interface AccordionHeaderProps {
  id: number;
  padding?: CSSProperties['padding'];
}

const AccordionHeader = (props: PropsWithChildren<AccordionHeaderProps>) => {
  const { id, padding = '16px 18px 12px', children } = props;
  const { openedAccordion, handleOpenAccordionChange } = useAccordion();

  return (
    <S.Container isOpen={id === openedAccordion}>
      <Button
        type="button"
        variant="plain"
        aria-expanded={id === openedAccordion}
        css={S.accordionButton(padding)}
        onClick={() => handleOpenAccordionChange(id)}
      >
        {children}
        <ArrowExpandMoreIcon />
      </Button>
    </S.Container>
  );
};

export default AccordionHeader;
