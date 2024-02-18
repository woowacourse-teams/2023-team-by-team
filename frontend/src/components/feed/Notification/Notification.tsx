import Text from '~/components/common/Text/Text';
import * as S from './Notification.styled';
import type { ReactElement } from 'react';
import type { ThreadSize } from '~/types/size';

interface NotificationProps {
  content: string;
  icon?: ReactElement;
  time?: string;
  size?: ThreadSize;
}

const Notification = (props: NotificationProps) => {
  const { content, icon, time, size = 'md' } = props;

  return (
    <S.Container>
      <S.Line />
      <S.Inner>
        {icon && <S.IconWrapper $size={size}>{icon}</S.IconWrapper>}
        <Text size={size === 'md' ? 'md' : 'sm'} css={S.content}>
          {content}
        </Text>
        {time && (
          <Text size={size === 'md' ? 'xs' : 'xxs'} css={S.time}>
            {time}
          </Text>
        )}
      </S.Inner>
      <S.Line />
    </S.Container>
  );
};

export default Notification;
