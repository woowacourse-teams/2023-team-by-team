import Text from '~/components/common/Text/Text';
import * as S from './StartPage.styled';
import Button from '~/components/common/Button/Button';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_NAME } from '~/constants/routes';

type StartType = 'create' | 'join';

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
        clickedButton === 'create'
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
            onClick={() => handleButtonClick('create')}
            aria-label="팀 생성하기 버튼"
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
            onClick={() => handleButtonClick('join')}
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
