import Text from '~/components/common/Text/Text';
import * as S from './StartPage.styled';
import Button from '~/components/common/Button/Button';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_NAME } from '~/constants/routes';
import { START_TYPE } from '~/constants/team';

type StartType = (typeof START_TYPE)[keyof typeof START_TYPE];

const StartPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [clickedButton, setClickedButton] = useState<StartType>();
  const navigate = useNavigate();

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
  }, [clickedButton]);

  const handleButtonClick = (value: StartType) => {
    setClickedButton(() => value);
  };

  return (
    <S.Container>
      <S.InnerContainer ref={ref} clickedButton={clickedButton}>
        <S.ButtonContainer>
          <Text weight="semiBold" css={S.explainText}>
            우리 팀만의 공간이 필요하신가요?
          </Text>
          <Button
            variant="primary"
            css={S.startTeamButton()}
            onClick={() => handleButtonClick(START_TYPE.CREATE)}
            aria-label="팀 생성하기"
          >
            팀 생성하기
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
      </S.InnerContainer>
    </S.Container>
  );
};

export default StartPage;
