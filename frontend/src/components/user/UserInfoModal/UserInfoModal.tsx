import { useNavigate } from 'react-router-dom';
import Modal from '~/components/common/Modal/Modal';
import * as S from './UserInfoModal.styled';
import { useModal } from '~/hooks/useModal';
import { useFetchUserInfo } from '~/hooks/queries/useFetchUserInfo';
import { LogoutIcon } from '~/assets/svg';
import Button from '~/components/common/Button/Button';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';
import { PATH_NAME } from '~/constants/routes';
import Text from '~/components/common/Text/Text';

const UserInfoModal = () => {
  const { userInfo } = useFetchUserInfo();
  const { closeModal } = useModal();
  const navigate = useNavigate();

  if (!userInfo) {
    return <></>;
  }

  const { name, profileImageUrl, email } = userInfo;

  const handleLogoutClick = () => {
    const isLogout = confirm('로그아웃 하시겠습니까?');

    if (!isLogout) return;

    alert('로그아웃 되었습니다.');
    localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEY.TEAM_PLACE_ID);

    navigate(PATH_NAME.LANDING);
  };

  return (
    <Modal>
      <S.Backdrop onClick={closeModal} />
      <S.Container>
        <Text size="lg" weight="semiBold">
          프로필
        </Text>
        <S.ProfileImage src={profileImageUrl} alt="프로필 이미지" />
        <Text as="span" size="xl" css={S.userName}>
          {name}
        </Text>
        <S.Email href={`mailto:${email}`}>{email}</S.Email>
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
