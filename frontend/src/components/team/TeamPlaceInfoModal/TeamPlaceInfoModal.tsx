import { Fragment } from 'react';
import Modal from '~/components/common/Modal/Modal';
import Text from '~/components/common/Text/Text';
import TeamExitModal from '~/components/team/TeamExitModal/TeamExitModal';
import Button from '~/components/common/Button/Button';
import TeamBadge from '~/components/team/TeamBadge/TeamBadge';
import Input from '~/components/common/Input/Input';
import { ModalProvider } from '~/components/common/Modal/ModalContext';
import { useModal } from '~/hooks/useModal';
import { MAX_USER_NAME_LENGTH } from '~/constants/user';
import { CheckBlackIcon, ClipboardIcon, EditIcon } from '~/assets/svg';

import * as S from './TeamPlaceInfoModal.styled';
import { useTeamPlaceInfoModal } from '~/hooks/team/useTeamPlaceInfoModal';

const TeamPlaceInfoModal = () => {
  const { closeModal } = useModal();
  const {
    teamPlaceColor,
    displayName,
    members,
    inviteCode,
    isEditing,
    myUserName,
    myUserInfoRef,

    handlers: {
      handleCopyButtonClick,
      handleMyUserInfoSubmit,
      handleMyUserNameChange,
      handleUserInfoEditButtonClick,
    },
  } = useTeamPlaceInfoModal();

  return (
    <>
      <Modal>
        <S.Backdrop onClick={closeModal} />
        <S.Container>
          <S.TeamPlaceName>
            <TeamBadge teamPlaceColor={teamPlaceColor} size="md" />
            <Text as="span" size="lg" weight="semiBold" css={S.teamName}>
              {displayName}
            </Text>
          </S.TeamPlaceName>

          <S.Divider />

          <S.MemberDescription>
            <Text as="span" weight="semiBold">
              팀원 목록
            </Text>
            <Text as="span">총 {members.length}명</Text>
          </S.MemberDescription>
          <S.MemberList>
            {members.map((member) => {
              const { id, name, profileImageUrl, isMe } = member;

              return isMe ? (
                <Fragment key={id}>
                  <S.MemberListItem>
                    <S.ProfileImage src={profileImageUrl} alt={name} />
                    {isEditing ? (
                      <S.MyUserInfoForm onSubmit={handleMyUserInfoSubmit}>
                        <S.MyUserInfo ref={myUserInfoRef}>
                          <S.UserNameInputContainer>
                            <Input
                              width="120px"
                              height="100%"
                              placeholder={name}
                              value={myUserName}
                              onChange={handleMyUserNameChange}
                              minLength={1}
                              maxLength={MAX_USER_NAME_LENGTH}
                              css={S.userNameInput}
                              autoFocus
                            />
                            <Text
                              as="span"
                              css={S.userNameLength}
                            >{`${myUserName.length}/${MAX_USER_NAME_LENGTH}`}</Text>
                          </S.UserNameInputContainer>
                          <Button variant="plain" css={S.userInfoSubmitButton}>
                            <CheckBlackIcon />
                          </Button>
                        </S.MyUserInfo>
                      </S.MyUserInfoForm>
                    ) : (
                      <S.MyUserInfo>
                        <Text as="span" css={S.userName}>
                          {name}
                        </Text>
                        <S.Badge>
                          <Text weight="semiBold" as="span" size="xs">
                            나
                          </Text>
                        </S.Badge>
                        <Button
                          type="button"
                          variant="plain"
                          aria-label="닉네임 수정하기"
                          css={S.userInfoEditButton}
                          onClick={handleUserInfoEditButtonClick}
                        >
                          <EditIcon />
                        </Button>
                      </S.MyUserInfo>
                    )}
                  </S.MemberListItem>
                </Fragment>
              ) : (
                <Fragment key={id}>
                  <S.MemberListItem>
                    <S.ProfileImage src={profileImageUrl} alt={name} />
                    <Text as="span">{name}</Text>
                  </S.MemberListItem>
                </Fragment>
              );
            })}
          </S.MemberList>

          <S.Divider />

          <Text as="span" weight="semiBold">
            초대 코드
          </Text>
          <S.InviteCodeContainer>
            <S.InviteCodeWrapper>
              <Text as="span" size="lg">
                {inviteCode}
              </Text>
            </S.InviteCodeWrapper>
            <Button
              type="button"
              variant="plain"
              css={S.copyButton}
              onClick={handleCopyButtonClick}
            >
              <ClipboardIcon />
            </Button>
          </S.InviteCodeContainer>

          <S.Divider />

          <ModalProvider>
            <TeamExitModal onClose={closeModal} />
          </ModalProvider>
        </S.Container>
      </Modal>
    </>
  );
};

export default TeamPlaceInfoModal;
