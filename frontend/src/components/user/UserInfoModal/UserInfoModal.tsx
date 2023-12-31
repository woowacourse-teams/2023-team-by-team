import Modal from '~/components/common/Modal/Modal';
import Button from '~/components/common/Button/Button';
import Text from '~/components/common/Text/Text';
import Input from '~/components/common/Input/Input';
import { useUserInfoModal } from '~/hooks/user/useUserInfoModal';
import { MAX_USER_NAME_LENGTH } from '~/constants/user';
import { CheckBlackIcon, EditIcon, LogoutIcon } from '~/assets/svg';
import * as S from './UserInfoModal.styled';

interface UserInfoModalProps {
  onServiceCenterButtonClick: () => void;
}

const UserInfoModal = (props: UserInfoModalProps) => {
  const {
    userInfo,
    userName,
    userNameRef,
    isUserInfoEditing,

    handlers: {
      handleClose,
      handleLogoutClick,
      handleUserNameChange,
      handleUserInfoEditButtonClick,
      handleUserInfoSubmit,
    },
  } = useUserInfoModal();
  const { onServiceCenterButtonClick } = props;
  if (!userInfo) {
    return <></>;
  }

  const { name, profileImageUrl, email } = userInfo;

  return (
    <Modal>
      <S.Backdrop onClick={handleClose} />
      <S.Container>
        <Text as="span" size="lg" weight="semiBold">
          프로필
        </Text>
        <S.ProfileImage src={profileImageUrl} alt="프로필 이미지" />
        <S.UserNameContainer ref={userNameRef}>
          {isUserInfoEditing ? (
            <S.UserInfoForm onSubmit={handleUserInfoSubmit}>
              <S.UserNameInputContainer>
                <Input
                  width="160px"
                  height="32px"
                  placeholder={name}
                  value={userName}
                  onChange={handleUserNameChange}
                  minLength={1}
                  maxLength={MAX_USER_NAME_LENGTH}
                  css={S.userNameInput}
                  autoFocus
                />
                <Text
                  as="span"
                  css={S.userNameLength}
                >{`${userName.length}/${MAX_USER_NAME_LENGTH}`}</Text>
              </S.UserNameInputContainer>
              <Button variant="plain" css={S.userInfoSubmitButton}>
                <CheckBlackIcon />
              </Button>
            </S.UserInfoForm>
          ) : (
            <>
              <Text as="span" size="xl" css={S.userName}>
                {name}
              </Text>
              <Button
                type="button"
                variant="plain"
                aria-label="닉네임 수정하기"
                css={S.userInfoEditButton}
                onClick={handleUserInfoEditButtonClick}
              >
                <EditIcon />
              </Button>
            </>
          )}
        </S.UserNameContainer>
        <Text as="span" css={S.email}>
          {email}
        </Text>
        <Button
          type="button"
          variant="normal"
          css={S.logoutButton}
          onClick={handleLogoutClick}
        >
          로그아웃
          <LogoutIcon />
        </Button>
        <Button
          type="button"
          variant="plain"
          css={S.serviceCenterButton}
          onClick={onServiceCenterButtonClick}
          aria-label="고객문의"
        >
          <Text size="sm">고객문의</Text>
        </Button>
      </S.Container>
    </Modal>
  );
};

export default UserInfoModal;
