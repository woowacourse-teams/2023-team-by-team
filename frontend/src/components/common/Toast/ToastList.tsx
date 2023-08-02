import Toast from '~/components/common/Toast/Toast';
import { useToast } from '~/hooks/useToast';
import * as S from './ToastList.styled';

const ToastList = () => {
  const { toastList } = useToast();

  return (
    <S.Container>
      {toastList.map((toast) => {
        const { id, status, message, isActive } = toast;

        return (
          <Toast
            key={id}
            id={id}
            status={status}
            message={message}
            isActive={isActive}
          />
        );
      })}
    </S.Container>
  );
};

export default ToastList;
