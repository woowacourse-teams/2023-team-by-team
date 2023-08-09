import { useState } from 'react';
import type { ChangeEventHandler, FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteTeamPlace } from '~/hooks/queries/useDeleteTeamPlace';
import { useModal } from '~/hooks/useModal';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import { useToast } from '~/hooks/useToast';

const useTeamExitModal = () => {
  const navigate = useNavigate();
  const { teamPlaceId, displayName, resetTeamPlace } = useTeamPlace();
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
        showToast('success', '팀 탈퇴가 완료되었습니다.');
        closeModal();
        navigate('/team');
      },
    });
  };

  const handleClose = () => {
    setTeamName(() => '');
    closeModal();
  };

  return {
    teamName,

    handlers: {
      handleTeamNameChange,
      handleSubmit,
      handleClose,
    },
  };
};

export default useTeamExitModal;
