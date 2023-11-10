import { useMutation, useQueryClient } from '@tanstack/react-query';
import { modifyUserInfo } from '~/apis/user';
import type { UserInfo } from '~/types/team';

const QUERY_KEY = ['userInfo'];

export const useModifyUserInfo = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (body: Pick<UserInfo, 'name'>) => modifyUserInfo(body),
    {
      onMutate: async (body) => {
        await queryClient.cancelQueries(QUERY_KEY);

        const previousUserInfo = queryClient.getQueryData<UserInfo>(QUERY_KEY);

        if (previousUserInfo) {
          queryClient.setQueryData<UserInfo>(QUERY_KEY, (old) => {
            if (old) {
              return { ...old, ...body };
            }
          });
        }

        return { previousUserInfo };
      },
      onError: (err, newName, context) => {
        if (context?.previousUserInfo) {
          queryClient.setQueryData<UserInfo>(
            QUERY_KEY,
            context.previousUserInfo,
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(QUERY_KEY);
      },
    },
  );

  return { mutateModifyUserInfo: mutate };
};
