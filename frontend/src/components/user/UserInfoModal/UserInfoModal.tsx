import Modal from '~/components/common/Modal/Modal';
import Button from '~/components/common/Button/Button';
import Text from '~/components/common/Text/Text';
import Input from '~/components/common/Input/Input';
import { useModal } from '~/hooks/useModal';
import { useUserInfoModal } from '~/hooks/user/useUserInfoModal';
import { CheckBlackIcon, EditIcon, LogoutIcon } from '~/assets/svg';
import * as S from './UserInfoModal.styled';

const UserInfoModal = () => {
  const { closeModal } = useModal();

  const {
    userInfo,
    containerRef,
    isUserInfoEditing,

    handlers: {
      handleLogoutClick,
      handleUserInfoEditButtonClick,
      handleUserInfoSubmit,
      handleContainerClick,
    },
  } = useUserInfoModal();

  if (!userInfo) {
    return <></>;
  }

  const { name, profileImageUrl, email } = userInfo;

  return (
    <Modal>
      <S.Backdrop onClick={closeModal} />
      <S.Container ref={containerRef} onClick={handleContainerClick}>
        <Text as="span" size="lg" weight="semiBold">
          프로필
        </Text>
        <S.ProfileImage src={profileImageUrl} alt="프로필 이미지" />
        <S.UserNameContainer>
          {isUserInfoEditing ? (
            <S.UserInfoForm onSubmit={handleUserInfoSubmit}>
              <Input
                width="200px"
                height="32px"
                placeholder={name}
                maxLength={20}
              />
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
      </S.Container>
    </Modal>
  );
};

export default UserInfoModal;
