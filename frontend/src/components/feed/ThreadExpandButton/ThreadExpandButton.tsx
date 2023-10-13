import * as S from './ThreadExpandButton.styled';
import Button from '~/components/common/Button/Button';
import Text from '~/components/common/Text/Text';
import { ArrowExpandMoreIcon, ArrowExpandLessIcon } from '~/assets/svg';

interface ThreadExpandButtonProps {
  isExpanded: boolean;
  isMe?: boolean;
  size?: 'sm' | 'md';
  onClick?: () => void;
}

const ThreadExpandButton = (props: ThreadExpandButtonProps) => {
  const { isExpanded, isMe = false, size = 'md', onClick } = props;

  return (
    <Button
      type="button"
      variant="plain"
      css={S.expandButton(isMe, size)}
      onClick={onClick}
    >
      <S.Container>
        {isExpanded ? (
          <>
            <Text weight="semiBold" size={size === 'md' ? 'lg' : 'md'}>
              접기
            </Text>
            <ArrowExpandLessIcon />
          </>
        ) : (
          <>
            <Text weight="semiBold" size={size === 'md' ? 'lg' : 'md'}>
              더 보기
            </Text>
            <ArrowExpandMoreIcon />
          </>
        )}
      </S.Container>
    </Button>
  );
};

export default ThreadExpandButton;
