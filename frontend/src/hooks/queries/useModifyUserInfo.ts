import { useMutation, useQueryClient } from '@tanstack/react-query';
import { modifyUserInfo } from '~/apis/user';
import type { UserInfo } from '~/types/team';

export const useModifyUserInfo = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (body: Pick<UserInfo, 'name'>) => modifyUserInfo(body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['userInfo']);
      },
    },
  );

  return { mutateModifyUserInfo: mutate };
};
