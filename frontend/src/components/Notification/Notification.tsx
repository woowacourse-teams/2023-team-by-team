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
    <S.Container color={color} size={size}>
      <Text size={textSize} weight="bold">
        {content}
      </Text>
    </S.Container>
  );
};

export default Notification;
