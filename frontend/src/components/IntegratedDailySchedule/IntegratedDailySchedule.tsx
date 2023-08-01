import type { ScheduleWithoutId, YYYYMMDDHHMM } from '~/types/schedule';
import * as S from './IntegratedDailySchedule.styled';
import type { TeamPlaceColor } from '~/types/team';
import Text from '~/components/common/Text/Text';
import { ClockIcon } from '~/assets/svg';
import { GroupIcon } from '~/assets/svg';
import { formatTime } from '~/utils/formatTime';

export interface IntegratedDailyScheduleProps extends ScheduleWithoutId {
  teamPlaceColor: TeamPlaceColor;
  teamName: string;
  currentDateTime: YYYYMMDDHHMM;
}

const IntegratedDailySchedule = (props: IntegratedDailyScheduleProps) => {
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
        <S.TimeInfo>
          <ClockIcon />
          <Text size="xs" weight="bold">
            {time}
          </Text>
        </S.TimeInfo>
        <S.TeamInfo title={teamName}>
          <GroupIcon />
          <Text size="xs" weight="bold" css={S.teamName}>
            {teamName}
          </Text>
        </S.TeamInfo>
      </S.InfoContainer>
    </S.Container>
  );
};

export default IntegratedDailySchedule;
