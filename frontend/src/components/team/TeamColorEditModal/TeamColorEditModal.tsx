import { useModal } from '~/hooks/useModal';
import * as S from './TeamColorEditModal.styled';
import type { TeamPlaceColor } from '~/types/team';
import TeamBadge from '~/components/team/TeamBadge/TeamBadge';
import { arrayOf } from '~/utils/arrayOf';
import Modal from '~/components/common/Modal/Modal';
import { type MouseEvent, useState, type MouseEventHandler } from 'react';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import Text from '~/components/common/Text/Text';
import Button from '~/components/common/Button/Button';
import { useModifyTeamPlaceColor } from '~/hooks/queries/useModifyTeamPlaceColor';
import { useToast } from '~/hooks/useToast';

const TeamColorEditModal = () => {
  const { closeModal } = useModal();
  const { teamPlaceId, teamPlaceColor, displayName } = useTeamPlace();
  const { showToast } = useToast();
  const { mutateModifyTeamPlaceColor } = useModifyTeamPlaceColor(teamPlaceId);
  const [teamColor, setTeamColor] = useState<TeamPlaceColor>(teamPlaceColor);

  const handleTeamColorChange = (teamColor: TeamPlaceColor) => {
    setTeamColor(() => teamColor);
  };

  const handleTeamPlaceColorEdit: MouseEventHandler<HTMLButtonElement> = (
    e,
  ) => {
    e.preventDefault();

    if (teamColor === teamPlaceColor) {
      closeModal();
      return;
    }

    mutateModifyTeamPlaceColor(
      { teamPlaceColor: teamColor },
      {
        onSuccess: () => {
          showToast('success', `'${displayName}' 팀 색상이 변경되었습니다.`);
        },
        onError: () => {
          showToast('error', '팀 색상 변경이 실패했습니다.');
        },
      },
    );
    closeModal();
  };

  const handleModalClose = () => {
    closeModal();
    setTeamColor(() => teamPlaceColor);
  };

  return (
    <Modal>
      <S.Backdrop onClick={handleModalClose} />
      <S.BubbleContainer onClick={handleModalClose}>
        <S.Triangle></S.Triangle>
        <S.InnerContainer>
          <Text size="sm" weight="semiBold">
            팀 색상 변경
          </Text>
          <S.BadgeContainer>
            {arrayOf(10).map((color) => (
              <S.BadgeWrapper
                isClicked={teamColor === color}
                key={color}
                onClick={(e: MouseEvent<HTMLDivElement>) => {
                  e.stopPropagation();
                  handleTeamColorChange(color as TeamPlaceColor);
                }}
              >
                <TeamBadge size="lg" teamPlaceColor={color as TeamPlaceColor} />
              </S.BadgeWrapper>
            ))}
          </S.BadgeContainer>
          <Button
            variant="normal"
            onClick={handleTeamPlaceColorEdit}
            css={S.colorEditButton}
          >
            변경하기
          </Button>
        </S.InnerContainer>
      </S.BubbleContainer>
    </Modal>
  );
};

export default TeamColorEditModal;
