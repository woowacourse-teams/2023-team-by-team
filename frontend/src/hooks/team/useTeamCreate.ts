import {
  type ChangeEventHandler,
  type FormEventHandler,
  type RefObject,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';
import { PATH_NAME } from '~/constants/routes';
import { useSendNewTeamPlace } from '~/hooks/queries/useSendNewTeamPlace';
import type { TeamInfo } from '~/types/team';

export const useTeamCreate = (inputRef: RefObject<HTMLInputElement>) => {
  const [teamName, setTeamName] = useState('');
  const navigate = useNavigate();

  const { mutateSendNewTeamPlace } = useSendNewTeamPlace();

  const handleTeamNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTeamName(() => e.target.value);
  };

  const handleTeamNameSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const isRightName = confirm(`"${teamName}"으로 팀을 생성하시겠습니까?`);

    if (!isRightName) {
      inputRef.current?.focus();
      return;
    }
    mutateSendNewTeamPlace(
      { name: teamName },
      {
        onSuccess: async (data) => {
          const response = await data.json();
          localStorage.setItem(
            LOCAL_STORAGE_KEY.TEAM_PLACE_ID,
            String(response.teamPlaceId as Pick<TeamInfo, 'teamPlaceId'>),
          );
          navigate(PATH_NAME.TEAM_SELECT);
        },
      },
    );
  };

  return {
    teamName,

    handlers: {
      handleTeamNameChange,
      handleTeamNameSubmit,
    },
  };
};
