import {
  type ChangeEventHandler,
  type FormEventHandler,
  type RefObject,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';
import { PATH_NAME } from '~/constants/routes';
import { useSendCreateTeamPlace } from '~/hooks/queries/useSendCreateTeamPlace';
import type { TeamInfo } from '~/types/team';

export const useTeamCreate = (inputRef: RefObject<HTMLInputElement>) => {
  const [teamName, setTeamName] = useState('');
  const navigate = useNavigate();

  const { mutateSendCreateTeamPlace: mutateSendNewTeamPlace } =
    useSendCreateTeamPlace();

  const handleTeamNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTeamName(() => e.target.value);
  };

  const handleTeamNameSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const isRightName = confirm(`"${teamName}"으로 팀을 개설하시겠습니까?`);

    if (!isRightName) {
      inputRef.current?.focus();
      return;
    }
    mutateSendNewTeamPlace(
      { name: teamName },
      {
        onSuccess: async (data) => {
          const response: { teamPlaceId: Pick<TeamInfo, 'teamPlaceId'> } =
            await data.json();
          localStorage.setItem(
            LOCAL_STORAGE_KEY.TEAM_PLACE_ID,
            String(response.teamPlaceId),
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
