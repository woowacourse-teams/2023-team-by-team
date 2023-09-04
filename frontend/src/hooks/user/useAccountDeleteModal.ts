import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { ACCOUNT_DELETE_CONFIRM_TEXT } from '~/constants/user';
import { useFetchUserInfo } from '~/hooks/queries/useFetchUserInfo';

export const useAccountDeleteModal = () => {
  const { userInfo } = useFetchUserInfo();
  const [inputValue, setInputValue] = useState('');

  const handleInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(() => e.target.value);
  };

  return {
    username: userInfo?.name,
    inputValue,
    handleInputValueChange,
    isDeleteButtonDisabled: inputValue !== ACCOUNT_DELETE_CONFIRM_TEXT,
  };
};
