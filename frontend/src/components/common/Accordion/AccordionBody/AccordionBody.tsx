import { useState, type PropsWithChildren, useRef, useEffect } from 'react';
import * as S from './AccordionBody.styled';
import { useAccordion } from '~/hooks/useAccordion';

interface AccordionBodyProps {
  id: number;
}

const AccordionBody = (props: PropsWithChildren<AccordionBodyProps>) => {
  const { id, children } = props;
  const { openedAccordion } = useAccordion();
  const [bodyHeight, setBodyHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      setBodyHeight(() => {
        return ref.current ? ref.current.clientHeight : 0;
      });
    });

    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  });

  const getResultHeight = () => {
    if (id === openedAccordion) {
      return bodyHeight;
    }

    return 0;
  };

  return (
    <S.Container isOpen={id === openedAccordion} height={getResultHeight()}>
      <div ref={ref}>{children}</div>
    </S.Container>
  );
};

export default AccordionBody;
