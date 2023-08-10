import Text from '~/components/common/Text/Text';
import * as S from './JoinPage.styled';
import Input from '~/components/common/Input/Input';
import Button from '~/components/common/Button/Button';
import {
  type ChangeEventHandler,
  type FormEventHandler,
  type MouseEventHandler,
  useRef,
  useState,
  useEffect,
} from 'react';
import { PATH_NAME } from '~/constants/routes';
import { useNavigate } from 'react-router-dom';
import { useSendTeamPlace } from '~/hooks/queries/useSendTeamPlace';
import { INVITE_CODE_LENGTH } from '~/constants/team';

const JoinPage = () => {
  const [inviteCode, setInviteCode] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [isRequired, setIsRequired] = useState(true);
  const [warningText, setWarningText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const { mutateSendTeamPlace } = useSendTeamPlace();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isClicked || ref.current === null) {
      return;
    }

    ref.current.getAnimations().forEach((animation) => {
      animation.onfinish = () => navigate(PATH_NAME.CREATE);
    });
  }, [isClicked]);

  const handleInviteCodeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    const code = value.replace(/[^A-Za-z0-9]/g, '');

    if (value.length !== code.length)
      setWarningText('영어 대,소문자와 숫자만 입력 가능합니다.');
    if (value.length === code.length) setWarningText(() => '');

    if (code.length > INVITE_CODE_LENGTH)
      setWarningText(() => '참여코드는 8자리입니다.');

    setInviteCode(() => code.slice(0, INVITE_CODE_LENGTH));
  };

  const handleTeamNameSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (inviteCode.length !== INVITE_CODE_LENGTH) {
      alert('8자리 초대코드를 입력해주세요.');
      inputRef.current?.focus();
      return;
    }

    mutateSendTeamPlace(inviteCode, {
      onSuccess: (data) => {
        localStorage.setItem('teamPlaceId', String(data.teamPlaceId));
        navigate(PATH_NAME.TEAM_SELECT);
      },
      onError: (error) => {
        const response = error as Response;
        if (response.status === 404) {
          alert('잘못된 초대코드입니다.');
          setInviteCode(() => '');
          inputRef.current?.focus();
        }
      },
    });
  };

  const handleCreatePageClicked: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    setIsRequired(() => false);
    setIsClicked(() => true);
  };

  return (
    <S.Container>
      <S.InnerContainer ref={ref} isLinkClicked={isClicked}>
        <Text weight="semiBold" css={S.titleText}>
          팀 참가하기
        </Text>
        <S.InviteCodeForm onSubmit={handleTeamNameSubmit}>
          <S.BodyContainer>
            <S.InputContainer>
              <S.InputWrapper>
                <Input
                  width="100%"
                  height="100%"
                  placeholder="참여코드 입력"
                  ref={inputRef}
                  value={inviteCode}
                  onChange={handleInviteCodeChange}
                  css={S.inputTitle}
                  required={isRequired}
                />
              </S.InputWrapper>
              <Text size="sm" weight="semiBold" css={S.warningText}>
                {warningText}
              </Text>
            </S.InputContainer>
            <div>
              <Text as="span" weight="semiBold" css={S.explainText}>
                참여코드가 없으신가요?
              </Text>
              <Button
                variant="plain"
                css={S.createPageButton}
                aria-label="팀 생성하기 페이지 이동"
                onClick={handleCreatePageClicked}
              >
                직접 팀을 만들어보세요!
              </Button>
            </div>
          </S.BodyContainer>
          <Button css={S.submitButton} aria-label="팀 참가">
            팀 참가
          </Button>
        </S.InviteCodeForm>
      </S.InnerContainer>
    </S.Container>
  );
};

export default JoinPage;
