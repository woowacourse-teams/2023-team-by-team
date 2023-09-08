import { useState, useRef } from 'react';
import type { FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchUserInfo } from '~/hooks/queries/useFetchUserInfo';
import { useModifyUserInfo } from '~/hooks/queries/useModifyUserInfo';
import useClickOutside from '~/hooks/useClickOutside';
import { useModal } from '~/hooks/useModal';
import { useToast } from '~/hooks/useToast';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';
import { PATH_NAME } from '~/constants/routes';

export const useUserInfoModal = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { closeModal } = useModal();

  const { mutateModifyUserInfo } = useModifyUserInfo();
  const { userInfo } = useFetchUserInfo();

  const [isUserInfoEditing, setIsUserInfoEditing] = useState(false);
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

    const name = nameInput.value.trim();

    if (name === '' || name === userInfo?.name) {
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

  return {
    userInfo,
    userNameRef,
    isUserInfoEditing,

    handlers: {
      handleClose,
      handleLogoutClick,
      handleUserInfoEditButtonClick,
      handleUserInfoSubmit,
    },
  };
};
