import * as S from './ExpandButton.styled';
import Button from '~/components/common/Button/Button';
import Text from '~/components/common/Text/Text';
import { ArrowExpandMoreIcon, ArrowExpandLessIcon } from '~/assets/svg';

interface ExpandButtonProps {
  isExpanded: boolean;
  theme: 'white' | 'blurple';
  size?: 'sm' | 'md';
  onClick?: () => void;
}

const ExpandButton = (props: ExpandButtonProps) => {
  const { isExpanded, theme, size = 'md', onClick } = props;

  return (
    <Button
      type="button"
      variant="plain"
      css={S.expandButton(theme, size)}
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

export default ExpandButton;
