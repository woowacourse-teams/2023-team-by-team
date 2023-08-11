import Text from '~/components/common/Text/Text';
import * as S from './JoinPage.styled';
import Input from '~/components/common/Input/Input';
import Button from '~/components/common/Button/Button';
import { useRef, useEffect } from 'react';
import { PATH_NAME } from '~/constants/routes';
import { useNavigate } from 'react-router-dom';
import { useTeamJoin } from '~/hooks/team/useTeamJoin';

const JoinPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const {
    inviteCode,
    isClicked,
    isRequired,
    warningText,

    handlers: {
      handleInviteCodeChange,
      handleTeamNameSubmit,
      handleCreatePageClicked,
    },
  } = useTeamJoin(inputRef);

  useEffect(() => {
    if (!isClicked || ref.current === null) {
      return;
    }

    ref.current.getAnimations().forEach((animation) => {
      animation.onfinish = () => navigate(PATH_NAME.CREATE);
    });
  }, [isClicked]);

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
                  placeholder="8자리 초대코드 입력"
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
                초대코드가 없으신가요?
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
          <Button
            css={S.submitButton}
            disabled={inviteCode.length < 8}
            aria-label="팀 참가"
          >
            팀 참가
          </Button>
        </S.InviteCodeForm>
      </S.InnerContainer>
    </S.Container>
  );
};

export default JoinPage;
