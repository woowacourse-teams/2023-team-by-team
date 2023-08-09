import Text from '~/components/common/Text/Text';
import * as S from './CreatePage.styled';
import Input from '~/components/common/Input/Input';
import {
  type ChangeEventHandler,
  type FormEventHandler,
  useState,
  useRef,
} from 'react';
import Button from '~/components/common/Button/Button';

const CreatePage = () => {
  const [teamName, setTeamName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTeamNameBlur: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTeamName(() => e.target.value);
  };

  const handleTeamNameSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const isRightName = confirm(`"${teamName}"으로 팀을 생성하시겠 습니까?`);

    if (!isRightName) {
      inputRef.current?.focus();
      return;
    }
    alert(teamName);
  };

  return (
    <S.Container>
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
                css={S.inputTitle}
                ref={inputRef}
                onBlur={handleTeamNameBlur}
                required
              />
            </S.InputWrapper>
            <Text weight="semiBold" css={S.explainText}>
              간단한 입력으로 쉽게 공간을 만들어 보세요!
            </Text>
          </S.BodyContainer>
          <Button css={S.submitButton} aria-label="팀 생성버튼">
            팀 생성
          </Button>
        </S.TeamNameForm>
      </S.InnerContainer>
    </S.Container>
  );
};

export default CreatePage;
