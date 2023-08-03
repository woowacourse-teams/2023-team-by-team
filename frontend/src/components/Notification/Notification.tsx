import Text from '~/components/common/Text/Text';
import * as S from './Notification.styled';
import type { NotificationSize, TextSize } from '~/types/size';

export interface NotificationProps {
  color?: string;
  size?: NotificationSize;
  content: string;
}

const Notification = (props: NotificationProps) => {
  const { color = '#516FFF', content, size = 'md' } = props;
  const textSize: Extract<TextSize, 'md' | 'xl'> = size === 'md' ? 'xl' : 'md';

  return (
    <S.Wrapper color={color} size={size}>
      <Text size={textSize} css={S.notification}>
        {content}
      </Text>
    </S.Wrapper>
  );
};

export default Notification;
