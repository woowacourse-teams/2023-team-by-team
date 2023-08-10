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

const JoinPage = () => {
  const [inviteCode, setInviteCode] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [isRequired, setIsRequired] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLDivElement>(null);
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
    setInviteCode(() => e.target.value);
  };

  const handleTeamNameSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    alert(inviteCode);
    inputRef.current?.focus();

    return;
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
            <S.InputWrapper>
              <Input
                width="100%"
                height="100%"
                placeholder="팀 이름 입력"
                css={S.inputTitle}
                ref={inputRef}
                onChange={handleInviteCodeChange}
                required={isRequired}
              />
            </S.InputWrapper>
            <div>
              <Text as="span" weight="semiBold" css={S.explainText}>
                참여코드가 없으신가요?
              </Text>
              <Button
                variant="plain"
                css={S.createPageButton}
                aria-label="팀 생성하기 페이지 이동 버튼"
                onClick={handleCreatePageClicked}
              >
                직접 팀을 만들어보세요!
              </Button>
            </div>
          </S.BodyContainer>
          <Button css={S.submitButton} aria-label="팀 생성버튼">
            팀 참가
          </Button>
        </S.InviteCodeForm>
      </S.InnerContainer>
    </S.Container>
  );
};

export default JoinPage;
