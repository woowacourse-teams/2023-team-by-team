import Text from '~/components/common/Text/Text';
import * as S from './Notification.styled';
import type { NotificationSize } from '~/types/size';
import type { TeamPlaceColor } from '~/types/team';

export interface NotificationProps {
  teamPlaceColor: TeamPlaceColor;
  threadSize?: NotificationSize;
  content: string;
}

const Notification = (props: NotificationProps) => {
  const { teamPlaceColor, content, threadSize = 'md' } = props;
  const isCanHover = /[\r\n]/.test(content) || content.length > 80;

  return (
    <S.Wrapper
      teamPlaceColor={teamPlaceColor}
      className={isCanHover ? 'can-hover' : ''}
      threadSize={threadSize}
    >
      <S.Inner>
        <Text weight="semiBold" css={S.notification(threadSize)}>
          {content}
        </Text>
      </S.Inner>
    </S.Wrapper>
  );
};

export default Notification;
