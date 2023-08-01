import type { ScheduleWithoutId, YYYYMMDDHHMM } from '~/types/schedule';
import * as S from './IntegratedDailyScheduleCell.styled';
import type { TeamPlaceColor } from '~/types/team';
import Text from '~/components/common/Text/Text';
import { ClockIcon } from '~/assets/svg';
import { GroupIcon } from '~/assets/svg';
import { formatTime } from '~/utils/formatTime';

export interface IntegratedDailyScheduleCellProps extends ScheduleWithoutId {
  teamPlaceColor: TeamPlaceColor;
  teamName: string;
  currentDateTime: YYYYMMDDHHMM;
}

const IntegratedDailyScheduleCell = (
  props: IntegratedDailyScheduleCellProps,
) => {
  const {
    teamPlaceColor,
    title,
    currentDateTime,
    startDateTime,
    endDateTime,
    teamName,
  } = props;

  const time = formatTime(currentDateTime, startDateTime, endDateTime);

  return (
    <S.Container teamPlaceColor={teamPlaceColor}>
      <div title={title}>
        <Text size="xl" weight="bold" css={S.titleText(teamPlaceColor)}>
          {title}
        </Text>
      </div>
      <S.InfoContainer>
        <S.Info>
          <ClockIcon />
          <Text size="xs" weight="bold">
            {time}
          </Text>
        </S.Info>
        <S.Info title={teamName}>
          <GroupIcon />
          <Text size="xs" weight="bold" css={S.teamName}>
            {teamName}
          </Text>
        </S.Info>
      </S.InfoContainer>
    </S.Container>
  );
};

export default IntegratedDailyScheduleCell;
