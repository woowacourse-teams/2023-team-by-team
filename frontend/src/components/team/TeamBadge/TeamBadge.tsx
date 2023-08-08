import type { TeamBadgeSize } from '~/types/size';
import type { TeamPlaceColor } from '~/types/team';
import * as S from './TeamBadge.styled';

export interface TeamBadgeProps {
  teamPlaceColor: TeamPlaceColor;
  size?: TeamBadgeSize;
}

const TeamBadge = (props: TeamBadgeProps) => {
  const { teamPlaceColor, size = 'md' } = props;

  return <S.Wrapper teamPlaceColor={teamPlaceColor} size={size} />;
};

export default TeamBadge;
