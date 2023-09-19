import type { ChangeEventHandler, FormEventHandler } from 'react';
import { useEffect, useRef, useState } from 'react';
import { MAX_USER_NAME_LENGTH } from '~/constants/user';
import { useFetchTeamPlaceInviteCode } from '~/hooks/queries/useFetchTeamPlaceInviteCode';
import { useFetchTeamPlaceMembers } from '~/hooks/queries/useFetchTeamPlaceMembers';
import { useModifyMyTeamPlaceUserInfo } from '~/hooks/queries/useModifyMyTeamPlaceUserInfo';
import useClickOutside from '~/hooks/useClickOutside';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import { useToast } from '~/hooks/useToast';
import type { UserInfo } from '~/types/team';

const getMe = (members: Omit<UserInfo, 'email'>[]) => {
  return members.find((member) => member.isMe);
};

const getMeFirstMembers = (members: Omit<UserInfo, 'email'>[]) => {
  const me = getMe(members);
  const others = members.filter((member) => member.isMe === false);

  if (me) {
    return [me, ...others];
  } else {
    return others;
  }
};

export const useTeamPlaceInfoModal = () => {
  const { teamPlaceId, teamPlaceColor, displayName } = useTeamPlace();
  const { showToast } = useToast();

  const { members } = useFetchTeamPlaceMembers(teamPlaceId);
  const { inviteCode } = useFetchTeamPlaceInviteCode(teamPlaceId);
  const { mutateModifyMyTeamPlaceUserInfo } =
    useModifyMyTeamPlaceUserInfo(teamPlaceId);

  const [isEditing, setIsEditing] = useState(false);
  const [myUserName, setMyUserName] = useState('');
  const myUserInfoRef = useRef<HTMLDivElement>(null);

  useClickOutside(myUserInfoRef, () => {
    setIsEditing(() => false);
  });

  const handleCopyButtonClick = () => {
    if (!inviteCode) {
      return;
    }

    try {
      navigator.clipboard.writeText(inviteCode);
      showToast('success', '초대 코드가 복사되었습니다.');
    } catch (error) {
      showToast('error', '초대 코드 복사에 실패했습니다.');
    }
  };

  const handleMyUserInfoSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const name = myUserName.trim();
    const previousName = getMe(members ?? [])?.name;

    if (name === '' || name === previousName) {
      setIsEditing(() => false);
      return;
    }

    if (name.length > MAX_USER_NAME_LENGTH) {
      showToast(
        'error',
        `닉네임은 최대 ${MAX_USER_NAME_LENGTH}자까지 입력할 수 있습니다.`,
      );
      return;
    }

    mutateModifyMyTeamPlaceUserInfo(
      { name: myUserName },
      {
        onSuccess: () => {
          setIsEditing(() => false);
          showToast('success', '닉네임이 변경되었습니다.');
        },
        onError: () => {
          showToast('error', '닉네임 변경에 실패했습니다.');
        },
      },
    );
  };

  const handleUserInfoEditButtonClick = () => {
    setIsEditing(() => true);
  };

  const handleMyUserNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value.length <= MAX_USER_NAME_LENGTH) {
      setMyUserName(() => e.target.value);
    }
  };

  useEffect(() => {
    const me = getMe(members ?? []);

    if (me) {
      setMyUserName(() => me.name);
    }
  }, [members, isEditing]);

  return {
    teamPlaceId,
    teamPlaceColor,
    displayName,
    members: getMeFirstMembers(members ?? []),
    inviteCode,
    isEditing,
    myUserName,
    myUserInfoRef,

    handlers: {
      handleCopyButtonClick,
      handleMyUserInfoSubmit,
      handleMyUserNameChange,
      handleUserInfoEditButtonClick,
    },
  };
};
