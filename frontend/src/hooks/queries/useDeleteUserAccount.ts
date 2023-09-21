import { useMutation } from '@tanstack/react-query';
import { deleteUserAccount } from '~/apis/user';

export const useDeleteUserAccount = () => {
  const { mutate } = useMutation(() => deleteUserAccount());

  return { mutateDeleteUserAccount: mutate };
};
