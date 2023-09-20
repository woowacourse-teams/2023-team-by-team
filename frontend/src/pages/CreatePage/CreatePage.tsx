import Text from '~/components/common/Text/Text';
import * as S from './CreatePage.styled';
import Input from '~/components/common/Input/Input';
import { useRef } from 'react';
import Button from '~/components/common/Button/Button';
import { useTeamCreate } from '~/hooks/team/useTeamCreate';
import IntroCardPile from '~/components/landing/IntroCardPile/IntroCardPile';
import LandingHeader from '~/components/common/LandingHeader/LandingHeader';
import BackButton from '~/components/common/BackButton/BackButton';
import { PATH_NAME } from '~/constants/routes';

const CreatePage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    teamName,

    handlers: { handleTeamNameChange, handleTeamNameSubmit },
  } = useTeamCreate(inputRef);

  return (
    <S.Container>
      <LandingHeader
        href={PATH_NAME.TEAM_SELECT}
        ariaLabel="팀 선택 페이지로 이동하기"
      />
      <S.MainContainer>
        <S.InnerContainer>
          <Text weight="semiBold" css={S.titleText}>
            팀 개설하기
          </Text>
          <S.TeamNameForm onSubmit={handleTeamNameSubmit}>
            <S.BodyContainer>
              <S.InputWrapper>
                <Input
                  width="100%"
                  height="100%"
                  placeholder="팀 이름 입력"
                  ref={inputRef}
                  value={teamName}
                  onChange={handleTeamNameChange}
                  css={S.inputTitle}
                  required
                />
              </S.InputWrapper>
              <Text weight="semiBold" css={S.explainText}>
                간단한 입력으로 쉽게 팀을 만들어 보세요!
              </Text>
            </S.BodyContainer>
            <S.ConfirmButtonsContainer>
              <BackButton label="이전 단계로" />
              <Button css={S.submitButton} aria-label="팀 개설">
                팀 개설
              </Button>
            </S.ConfirmButtonsContainer>
          </S.TeamNameForm>
        </S.InnerContainer>
        <IntroCardPile animation={false} />
      </S.MainContainer>
    </S.Container>
  );
};

export default CreatePage;
