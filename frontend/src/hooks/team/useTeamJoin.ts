import {
  type ChangeEventHandler,
  type FormEventHandler,
  type RefObject,
  type MouseEventHandler,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';
import { PATH_NAME } from '~/constants/routes';
import { INVITE_CODE_LENGTH } from '~/constants/team';
import { useSendTeamPlace } from '~/hooks/queries/useSendTeamPlace';
import type { TeamInfo } from '~/types/team';

export const useTeamJoin = (inputRef: RefObject<HTMLInputElement>) => {
  const [inviteCode, setInviteCode] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [isRequired, setIsRequired] = useState(true);
  const [warningText, setWarningText] = useState('');
  const navigate = useNavigate();

  const { mutateSendTeamPlace } = useSendTeamPlace();

  const handleInviteCodeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value: rawCode } = e.target;
    const code = rawCode.replace(/[^A-z0-9]/g, '');

    if (rawCode.length !== code.length) {
      setWarningText(() => '영어 대,소문자와 숫자만 입력 가능합니다.');
    }

    if (rawCode.length === code.length) {
      setWarningText(() => '');
    }

    if (code.length > INVITE_CODE_LENGTH) {
      setWarningText(() => '참여코드는 8자리입니다.');
    }

    setInviteCode(() => code.slice(0, INVITE_CODE_LENGTH));
  };

  const handleTeamNameSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (inviteCode.length !== INVITE_CODE_LENGTH) {
      alert('8자리 초대코드를 입력해주세요.');
      inputRef.current?.focus();
      return;
    }

    mutateSendTeamPlace(inviteCode, {
      onSuccess: async (data) => {
        const response = await data.json();

        localStorage.setItem(
          LOCAL_STORAGE_KEY.TEAM_PLACE_ID,
          String(response.teamPlaceId as Pick<TeamInfo, 'teamPlaceId'>),
        );
        navigate(PATH_NAME.TEAM_SELECT);
      },
      onError: (error) => {
        const response = error as Response;
        if (response.status === 404) {
          alert('잘못된 초대코드입니다.');
          setInviteCode(() => '');
          inputRef.current?.focus();
        }
      },
    });
  };

  const handleCreatePageClicked: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    setIsRequired(() => false);
    setIsClicked(() => true);
  };
  return {
    inviteCode,
    isClicked,
    isRequired,
    warningText,

    handler: {
      handleInviteCodeChange,
      handleTeamNameSubmit,
      handleCreatePageClicked,
    },
  };
};
