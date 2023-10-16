import type { CSSProperties, PropsWithChildren } from 'react';
import * as S from './AccordionHeader.styled';
import Button from '~/components/common/Button/Button';
import { useAccordion } from '~/hooks/useAccordion';
import { ArrowExpandMoreIcon } from '~/assets/svg';

interface AccordionHeaderProps {
  id: number;
  padding?: CSSProperties['padding'];
  disabled?: boolean;
}

const AccordionHeader = (props: PropsWithChildren<AccordionHeaderProps>) => {
  const { id, padding = '16px 18px 12px', disabled = false, children } = props;
  const { openedAccordion, handleOpenedAccordionChange } = useAccordion();

  return (
    <S.Container isOpen={id === openedAccordion}>
      {disabled ? (
        <S.DisabledWrapper padding={padding}>{children}</S.DisabledWrapper>
      ) : (
        <Button
          type="button"
          variant="plain"
          aria-expanded={id === openedAccordion}
          css={S.accordionButton(padding)}
          onClick={() => handleOpenedAccordionChange(id)}
        >
          {children} <ArrowExpandMoreIcon />
        </Button>
      )}
    </S.Container>
  );
};

export default AccordionHeader;
