import Text from '~/components/common/Text/Text';
import * as S from './Notification.styled';
import { EnterIcon, ExitIcon, CalendarIcon } from '~/assets/svg';
import type { ThreadSize } from '~/types/size';
import type { NotificationType } from '~/types/feed';

interface NotificationProps {
  content: string;
  type: NotificationType;
  time?: string;
  size?: ThreadSize;
}

const Notification = (props: NotificationProps) => {
  const { content, type, time, size = 'md' } = props;

  return (
    <S.Container>
      <S.Line />
      <S.Inner>
        {type !== 'normal' && (
          <S.IconWrapper $size={size}>
            {type === 'join' ? (
              <EnterIcon />
            ) : type === 'leave' ? (
              <ExitIcon />
            ) : (
              <CalendarIcon />
            )}
          </S.IconWrapper>
        )}
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
