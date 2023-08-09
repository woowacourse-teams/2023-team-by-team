import Text from '~/components/common/Text/Text';
import * as S from './StartPage.styled';
import Button from '~/components/common/Button/Button';

const StartPage = () => {
  return (
    <S.Container>
      <S.InnerContainer>
        <S.ButtonContainer>
          <Text weight="semiBold" css={S.explainText}>
            우리 팀만의 공간이 필요하신가요?
          </Text>
          <Button
            variant="primary"
            css={S.startTeamButton()}
            aria-label="팀 개설하기 버튼"
          >
            팀 개설하기
          </Button>
        </S.ButtonContainer>
        <S.ButtonContainer>
          <Text weight="semiBold" css={S.explainText}>
            초대코드가 있으신가요?
          </Text>
          <Button
            variant="normal"
            css={S.startTeamButton('normal')}
            aria-label="팀 개설하기 버튼"
          >
            팀 참가하기
          </Button>
        </S.ButtonContainer>
      </S.InnerContainer>
    </S.Container>
  );
};

export default StartPage;
