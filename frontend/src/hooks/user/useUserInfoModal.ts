import { useState, useRef, useEffect } from 'react';
import type { ChangeEventHandler, FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchUserInfo } from '~/hooks/queries/useFetchUserInfo';
import { useModifyUserInfo } from '~/hooks/queries/useModifyUserInfo';
import { useClickOutside } from '~/hooks/useClickOutside';
import { useModal } from '~/hooks/useModal';
import { useToast } from '~/hooks/useToast';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';
import { PATH_NAME } from '~/constants/routes';
import { MAX_USER_NAME_LENGTH } from '~/constants/user';
import { useToken } from '~/hooks/useToken';

export const useUserInfoModal = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { closeModal } = useModal();
  const { resetToken } = useToken();

  const { mutateModifyUserInfo } = useModifyUserInfo();
  const { userInfo } = useFetchUserInfo();

  const [isUserInfoEditing, setIsUserInfoEditing] = useState(false);
  const [userName, setUserName] = useState('');
  const userNameRef = useRef<HTMLDivElement>(null);

  useClickOutside(userNameRef, () => {
    if (isUserInfoEditing) {
      setIsUserInfoEditing(() => false);
    }
  });

  const handleClose = () => {
    setIsUserInfoEditing(() => false);
    closeModal();
  };

  const handleLogoutClick = () => {
    const isLogout = confirm('로그아웃 하시겠습니까?');

    if (!isLogout) {
      return;
    }

    alert('로그아웃 되었습니다.');

    resetToken();
    localStorage.removeItem(LOCAL_STORAGE_KEY.TEAM_PLACE_ID);

    navigate(PATH_NAME.LANDING);
  };

  const handleUserInfoEditButtonClick = () => {
    setIsUserInfoEditing(() => true);
  };

  const handleUserNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUserName(() => e.target.value);
  };

  const handleUserInfoSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const name = userName.trim();

    if (name === '' || name === userInfo?.name) {
      setIsUserInfoEditing(() => false);
      return;
    }

    if (name.length > MAX_USER_NAME_LENGTH) {
      showToast(
        'error',
        `닉네임은 최대 ${MAX_USER_NAME_LENGTH}자까지 입력할 수 있습니다.`,
      );
      return;
    }

    setIsUserInfoEditing(() => false);

    mutateModifyUserInfo(
      { name },
      {
        onSuccess: () => {
          setIsUserInfoEditing(() => false);
          showToast('success', '닉네임이 변경되었습니다.');
        },
        onError: () => {
          setIsUserInfoEditing(() => true);
          showToast('error', '닉네임 변경에 실패했습니다.');
        },
      },
    );
  };

  useEffect(() => {
    if (userInfo) {
      setUserName(() => userInfo.name);
    }
  }, [userInfo, isUserInfoEditing]);

  return {
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
  };
};
