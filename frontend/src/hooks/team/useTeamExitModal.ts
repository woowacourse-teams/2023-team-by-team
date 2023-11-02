import { useState } from 'react';
import type { ChangeEventHandler, FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_NAME } from '~/constants/routes';
import { useDeleteTeamPlace } from '~/hooks/queries/useDeleteTeamPlace';
import { useModal } from '~/hooks/useModal';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import { useToast } from '~/hooks/useToast';

export const useTeamExitModal = (onClose: () => void) => {
  const navigate = useNavigate();
  const { teamPlaces, teamPlaceId, displayName, resetTeamPlace } =
    useTeamPlace();
  const { showToast } = useToast();
  const { closeModal } = useModal();
  const { mutateDeleteTeamPlace } = useDeleteTeamPlace(teamPlaceId);

  const [teamName, setTeamName] = useState('');

  const handleTeamNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { target } = e;

    setTeamName(() => target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (teamName.trim() !== displayName) {
      showToast('error', '탈퇴하려는 팀 이름과 일치하지 않습니다.');
      return;
    }

    const isConfirmed = confirm(
      '정말 팀을 탈퇴하시겠어요? \n 해당 작업은 되돌릴 수 없습니다.',
    );

    if (!isConfirmed) {
      return;
    }

    mutateDeleteTeamPlace(undefined, {
      onSuccess: () => {
        resetTeamPlace();
        onClose();
        handleClose();
        showToast('success', '팀 탈퇴가 완료되었습니다.');

        if (teamPlaces.length === 1) {
          navigate(PATH_NAME.START);
          return;
        }

        navigate(PATH_NAME.TEAM_SELECT);
      },
    });
  };

  const handleClose = () => {
    setTeamName(() => '');
    closeModal();
  };

  return {
    teamName,
    displayName,

    handlers: {
      handleTeamNameChange,
      handleSubmit,
      handleClose,
    },
  };
};
