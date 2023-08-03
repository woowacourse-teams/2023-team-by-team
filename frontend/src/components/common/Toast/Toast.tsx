import { useEffect, useRef } from 'react';
import Text from '~/components/common/Text/Text';
import { useToast } from '~/hooks/useToast';
import * as S from './Toast.styled';

export interface ToastProps {
  id: string;
  status?: 'success' | 'error';
  message: string;
  isActive: boolean;
}

const Toast = (props: ToastProps) => {
  const { closeToast } = useToast();
  const { id, status = 'success', message, isActive } = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive || ref.current === null) {
      return;
    }

    ref.current.getAnimations().forEach((animation) => {
      animation.onfinish = () => closeToast(id);
    });
  }, [isActive, closeToast, id]);

  return (
    <S.Wrapper id={id} ref={ref} status={status} isActive={isActive}>
      <Text as="span">{message}</Text>
      <p className="hidden" aria-live="assertive">
        {message}
      </p>
    </S.Wrapper>
  );
};

export default Toast;
