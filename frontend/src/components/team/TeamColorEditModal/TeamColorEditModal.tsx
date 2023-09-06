import { useModal } from '~/hooks/useModal';
import * as S from './TeamColorEditModal.styled';
import type { TeamPlaceColor } from '~/types/team';
import TeamBadge from '~/components/team/TeamBadge/TeamBadge';
import { arrayOf } from '~/utils/arrayOf';
import Modal from '~/components/common/Modal/Modal';
import { type MouseEvent, useState } from 'react';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import Text from '~/components/common/Text/Text';
import Button from '~/components/common/Button/Button';

const TeamColorEditModal = () => {
  const { closeModal } = useModal();
  const { teamPlaceColor } = useTeamPlace();

  const [teamColor, setTeamColor] = useState<TeamPlaceColor>(teamPlaceColor);

  const handleTeamColorChange = (teamColor: TeamPlaceColor) => {
    setTeamColor(() => teamColor);
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
            type="button"
            variant="normal"
            onClick={() => console.log('clicked')}
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
