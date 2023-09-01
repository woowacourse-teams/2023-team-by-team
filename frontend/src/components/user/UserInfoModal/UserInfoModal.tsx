import { useRef, useState } from 'react';
import type { FormEventHandler, MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '~/components/common/Modal/Modal';
import Button from '~/components/common/Button/Button';
import Text from '~/components/common/Text/Text';
import Input from '~/components/common/Input/Input';
import { useModal } from '~/hooks/useModal';
import { useFetchUserInfo } from '~/hooks/queries/useFetchUserInfo';
import { useModifyUserInfo } from '~/hooks/queries/useModifyUserInfo';
import { useToast } from '~/hooks/useToast';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';
import { PATH_NAME } from '~/constants/routes';
import { CheckBlackIcon, EditIcon, LogoutIcon } from '~/assets/svg';
import * as S from './UserInfoModal.styled';

const UserInfoModal = () => {
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const { showToast } = useToast();

  const { userInfo } = useFetchUserInfo();
  const { mutateModifyUserInfo } = useModifyUserInfo();

  const [isUserInfoEditing, setIsUserInfoEditing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!userInfo) {
    return <></>;
  }

  const { name, profileImageUrl, email } = userInfo;

  const handleLogoutClick = () => {
    const isLogout = confirm('로그아웃 하시겠습니까?');

    if (!isLogout) {
      return;
    }

    alert('로그아웃 되었습니다.');

    localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEY.TEAM_PLACE_ID);

    navigate(PATH_NAME.LANDING);
  };

  const handleUserInfoEditButtonClick = () => {
    setIsUserInfoEditing(() => true);
  };

  const handleUserInfoSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const { target } = e;

    if (!(target instanceof HTMLFormElement)) {
      return;
    }

    const [nameInput] = target.elements;

    if (!(nameInput instanceof HTMLInputElement)) {
      return;
    }

    const name = nameInput.value;

    if (name === '' || name === userInfo.name) {
      setIsUserInfoEditing(() => false);
      return;
    }

    mutateModifyUserInfo(
      { name },
      {
        onSuccess: () => {
          setIsUserInfoEditing(() => false);
          showToast('success', '닉네임이 변경되었습니다.');
        },
        onError: () => {
          showToast('error', '닉네임 변경에 실패했습니다.');
        },
      },
    );
  };

  const handleContainerClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target !== containerRef.current) {
      return;
    }

    if (isUserInfoEditing) {
      setIsUserInfoEditing(() => false);
    }
  };

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
