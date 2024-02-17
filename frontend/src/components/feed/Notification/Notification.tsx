import Text from '~/components/common/Text/Text';
import * as S from './Notification.styled';
import type { ReactElement } from 'react';

interface NotificationProps {
  content: string;
  icon?: ReactElement;
  time?: string;
}

const Notification = (props: NotificationProps) => {
  const { content, icon, time } = props;

  return (
    <S.Container>
      <S.Line />
      <S.Inner>
        {icon && <S.IconWrapper>{icon}</S.IconWrapper>}
        <Text css={S.content}>{content}</Text>
        {time && (
          <Text size="xs" css={S.time}>
            {time}
          </Text>
        )}
      </S.Inner>
      <S.Line />
    </S.Container>
  );
};

export default Notification;
