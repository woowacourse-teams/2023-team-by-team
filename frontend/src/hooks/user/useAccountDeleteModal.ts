import type { ChangeEvent, FormEventHandler } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';
import { PATH_NAME } from '~/constants/routes';
import { ACCOUNT_DELETE_CONFIRM_TEXT } from '~/constants/user';
import { useDeleteUserAccount } from '~/hooks/queries/useDeleteUserAccount';
import { useFetchUserInfo } from '~/hooks/queries/useFetchUserInfo';
import { useToast } from '~/hooks/useToast';
import { useToken } from '~/hooks/useToken';

export const useAccountDeleteModal = () => {
  const { userInfo } = useFetchUserInfo();
  const { mutateDeleteUserAccount } = useDeleteUserAccount();
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { resetToken } = useToken();

  const handleInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(() => e.target.value);
  };

  const handleDeleteAccountSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (inputValue !== ACCOUNT_DELETE_CONFIRM_TEXT) {
      alert('탈퇴를 위해 정확한 문구를 입력하세요');
      setInputValue(() => '');
    }

    mutateDeleteUserAccount(undefined, {
      onSuccess: () => {
        alert('정상적으로 회원탈퇴 되었습니다.');

        resetToken();
        localStorage.removeItem(LOCAL_STORAGE_KEY.TEAM_PLACE_ID);

        navigate(PATH_NAME.LANDING);
      },
      onError: () => {
        showToast('error', '탈퇴가 실패했습니다. 다시 시도해주세요');
        return;
      },
    });
  };

  return {
    username: userInfo?.name,
    inputValue,
    isDeleteButtonDisabled: inputValue !== ACCOUNT_DELETE_CONFIRM_TEXT,
    handlers: {
      handleInputValueChange,
      handleDeleteAccountSubmit,
    },
  };
};
