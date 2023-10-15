import Text from '~/components/common/Text/Text';
import * as S from './StartPage.styled';
import Button from '~/components/common/Button/Button';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATH_NAME } from '~/constants/routes';
import { START_TYPE } from '~/constants/team';
import IntroCardPile from '~/components/landing/IntroCardPile/IntroCardPile';
import LandingHeader from '~/components/common/LandingHeader/LandingHeader';
import BackButton from '~/components/common/BackButton/BackButton';

type StartType = (typeof START_TYPE)[keyof typeof START_TYPE];

const StartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const previousPath = location.state?.from?.pathname;
  const isShowBackButton = previousPath?.includes(PATH_NAME.TEAM_SELECT);

  const ref = useRef<HTMLDivElement>(null);
  const [clickedButton, setClickedButton] = useState<StartType>();

  const handleButtonClick = (value: StartType) => {
    setClickedButton(() => value);
  };

  useEffect(() => {
    if (!clickedButton || ref.current === null) {
      return;
    }

    ref.current.getAnimations().forEach((animation) => {
      animation.onfinish = () =>
        clickedButton === START_TYPE.CREATE
          ? navigate(PATH_NAME.CREATE)
          : navigate(PATH_NAME.JOIN);
    });
  }, [clickedButton, navigate]);

  return (
    <S.Container>
      <LandingHeader href={PATH_NAME.TEAM_SELECT} />
      <S.MainContainer>
        <S.InnerContainer ref={ref} $clickedButton={clickedButton}>
          <S.ButtonContainer>
            <Text weight="semiBold" css={S.explainText}>
              우리 팀만의 공간이 필요하신가요?
            </Text>
            <Button
              variant="primary"
              css={S.startTeamButton()}
              onClick={() => handleButtonClick(START_TYPE.CREATE)}
              aria-label="팀 개설하기"
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
              onClick={() => handleButtonClick(START_TYPE.JOIN)}
              aria-label="팀 참가하기"
            >
              팀 참가하기
            </Button>
          </S.ButtonContainer>
          {isShowBackButton && <BackButton label="이전 페이지로 이동" />}
        </S.InnerContainer>
      </S.MainContainer>
      <IntroCardPile animation={false} />
    </S.Container>
  );
};

export default StartPage;
