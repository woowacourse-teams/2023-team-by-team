import * as S from './ExpandButton.styled';
import Button from '~/components/common/Button/Button';
import Text from '~/components/common/Text/Text';
import { ArrowExpandMoreIcon, ArrowExpandLessIcon } from '~/assets/svg';

interface ExpandButtonProps {
  isExpanded: boolean;
  onClick?: () => void;
}

const ExpandButton = (props: ExpandButtonProps) => {
  const { isExpanded, onClick } = props;

  return (
    <Button
      type="button"
      variant="plain"
      css={S.expandButton}
      onClick={onClick}
    >
      {isExpanded ? (
        <S.Container>
          <Text weight="bold" size="lg">
            접기
          </Text>
          <ArrowExpandLessIcon />
        </S.Container>
      ) : (
        <S.Container>
          <Text weight="bold" size="lg">
            펼치기
          </Text>
          <ArrowExpandMoreIcon />
        </S.Container>
      )}
    </Button>
  );
};

export default ExpandButton;
