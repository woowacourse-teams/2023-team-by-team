import * as S from './ExpandButton.styled';
import Button from '~/components/common/Button/Button';
import Text from '~/components/common/Text/Text';
import { ArrowExpandMoreIcon, ArrowExpandLessIcon } from '~/assets/svg';

interface ExpandButtonProps {
  isExpanded: boolean;
  theme: 'white' | 'blurple';
  onClick?: () => void;
}

const ExpandButton = (props: ExpandButtonProps) => {
  const { isExpanded, theme, onClick } = props;

  return (
    <Button
      type="button"
      variant="plain"
      css={S.expandButton(theme)}
      onClick={onClick}
    >
      <S.Container>
        {isExpanded ? (
          <>
            <Text weight="bold" size="lg">
              접기
            </Text>
            <ArrowExpandLessIcon />
          </>
        ) : (
          <>
            <Text weight="bold" size="lg">
              전체보기
            </Text>
            <ArrowExpandMoreIcon />
          </>
        )}
      </S.Container>
    </Button>
  );
};

export default ExpandButton;
