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
import { useSendNewTeamPlace } from '~/hooks/queries/useSendNewTeamPlace';
import { useNavigate } from 'react-router-dom';
import { PATH_NAME } from '~/constants/routes';
import { KEY } from '~/constants/localStorage';

const CreatePage = () => {
  const [teamName, setTeamName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { mutateSendNewTeamPlace } = useSendNewTeamPlace();

  const handleTeamNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTeamName(() => e.target.value);
  };

  const handleTeamNameSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const isRightName = confirm(`"${teamName}"으로 팀을 생성하시겠습니까?`);

    if (!isRightName) {
      inputRef.current?.focus();
      return;
    }
    mutateSendNewTeamPlace(
      { name: teamName },
      {
        onSuccess: (data) => {
          localStorage.setItem(KEY.TEAM_PLACE_ID, String(data.teamPlaceId));
          navigate(PATH_NAME.TEAM_SELECT);
        },
      },
    );
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
          <Button css={S.submitButton} aria-label="팀 생성">
            팀 생성
          </Button>
        </S.TeamNameForm>
      </S.InnerContainer>
    </S.Container>
  );
};

export default CreatePage;
