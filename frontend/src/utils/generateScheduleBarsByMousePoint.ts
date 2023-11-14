import { generateScheduleBars } from '~/utils/generateScheduleBars';
import { CALENDAR, ONE_DAY } from '~/constants/calendar';
import type { Schedule } from '~/types/schedule';
import type { CalendarSize } from '~/types/size';

interface GenerateScheduleBarsByMousePointProps {
  schedule: Schedule;
  year: number;
  month: number;
  relativeX: number;
  relativeY: number;
  calendarWidth: number;
  calendarHeight: number;
  level: number;
  calendarSize: CalendarSize;
}

/**
 * 《generateScheduleBarsByMousePoint》
 * 제공된 마우스 상대좌표를 기반으로 렌더링에 적합한 모양의 스케줄 바와 렌더링에 필요한 부가 정보들을 생성하여 반환합니다.
 *
 * @typedef {GenerateScheduleBarsByMousePointProps} params
 * @property {schedule} schedule - 캘린더 바 생성에 사용할 일정 정보를 의미합니다.
 * @property {number} year - 캘린더의 연도를 의미합니다.
 * @property {number} month - 캘린더의 달을 의미합니다. 수를 0부터 셈에 주의하세요.
 * @property {number} relativeX - 드래그를 시작한 지점을 기준으로 현재 마우스의 상대적인 x좌표를 의미합니다.
 * @property {number} relativeY - 드래그를 시작한 지점을 기준으로 현재 마우스의 상대적인 y좌표를 의미합니다.
 * @property {number} calendarWidth - 캘린더 컴포넌트의 가로 길이를 의미합니다.
 * @property {number} calendarHeight - 캘린더 컴포넌트의 세로 길이를 의미합니다.
 * @property {number} level - 생성되는 스케줄 바에 지정되어야 할 레벨을 의미합니다. 레벨이란 여러 스케줄 바가 겹칠 경우 어느 위치에 렌더링되어야 할 지를 결정하는 값으로, 0이 최상단이고 값이 오를수록 아래에 배치됩니다.
 * @property {CalendarSize} calendarSize - 이 함수를 사용하는 캘린더의 크기를 의미합니다. 캘린더의 크기에 따라 생성되는 스케줄 바의 크기도 달라집니다.
 *
 * @returns {Object}
 * @property {GeneratedScheduleBar[]} scheduleBars - 생성된 스케줄 바들을 의미합니다.
 * @property {Schedule['startDateTime']} startDateTime - 상대좌표를 고려하여 새롭게 반영된 시작 날짜를 의미합니다.
 * @property {Schedule['endDateTime']} endDateTime - 상대좌표를 고려하여 새롭게 반영된 끝 날짜를 의미합니다.
 */
export const generateScheduleBarsByMousePoint = (
  params: GenerateScheduleBarsByMousePointProps,
) => {
  const {
    schedule,
    year,
    month,
    relativeX,
    relativeY,
    calendarWidth,
    calendarHeight,
    level,
    calendarSize,
  } = params;

  const difference = getCalendarDateDifferenceByMousePoint(
    relativeX,
    relativeY,
    calendarWidth,
    calendarHeight,
  );

  const { startDateTime, endDateTime } = schedule;
  const changedStartDateTime = changeDateTimeByDays(startDateTime, difference);
  const changedEndDateTime = changeDateTimeByDays(endDateTime, difference);
  const generatedScheduleBars = generateScheduleBars(year, month, [
    {
      ...schedule,
      startDateTime: changedStartDateTime,
      endDateTime: changedEndDateTime,
    },
  ]).map((scheduleBar) => ({
    ...scheduleBar,
    level,
    calendarSize,
  }));

  return {
    scheduleBars: generatedScheduleBars,
    startDateTime: changedStartDateTime,
    endDateTime: changedEndDateTime,
  };
};

/**
 * 《getCalendarDateDifferenceByMousePoint》
 * 제공된 마우스 상대좌표를 기반으로 올바른 모양의 캘린더 바를 보여주려면 날짜가 얼마나 바뀌어야 하는지를 계산하여 반환합니다.
 *
 * @param {number} relativeX - 드래그를 시작한 지점을 기준으로 현재 마우스의 상대적인 x좌표를 의미합니다.
 * @param {number} relativeY - 드래그를 시작한 지점을 기준으로 현재 마우스의 상대적인 y좌표를 의미합니다.
 * @param {number} calendarWidth - 캘린더 컴포넌트의 가로 길이를 의미합니다.
 * @param {number} calendarHeight - 캘린더 컴포넌트의 세로 길이를 의미합니다.
 *
 * @returns {number} calculatedDifference - 변경되어야 하는 날짜의 일 수를 정수 형태로 변환한 값을 의미합니다. 이 값은 음수일 수 있습니다.
 */
const getCalendarDateDifferenceByMousePoint = (
  relativeX: number,
  relativeY: number,
  calendarWidth: number,
  calendarHeight: number,
) => {
  const rowDifference = Math.round(
    (relativeY * CALENDAR.ROW_SIZE) / calendarHeight,
  );
  const columnDifference = Math.round(
    (relativeX * CALENDAR.COLUMN_SIZE) / calendarWidth,
  );
  const calculatedDifference =
    rowDifference * CALENDAR.COLUMN_SIZE + columnDifference;

  return calculatedDifference;
};

/**
 * 《changeDateTimeByDays》
 * YYYY-MM-DD 형식의 날짜와 함께 변경되어야 하는 날의 수가 주어지면, 이를 반영하여 똑같이 YYYY-MM-DD 형식으로 변경된 날짜를 반환합니다.
 *
 * @param {Schedule['startDateTime']} dateTime - 변경을 진행할 YYYY-MM-DD 형식의 날짜 정보입니다.
 * @param {number} days - 입력으로 들어가는 날짜 정보의 날짜를 얼마나 변경할 것인지를 의미합니다. 이 값은 정수여야 합니다.
 *
 * @returns {Schedule['startDateTime']} changedDateTime - 변경이 반영된 YYYY-MM-DD 형식의 날짜 정보입니다.
 */
const changeDateTimeByDays = (
  dateTime: Schedule['startDateTime'],
  days: number,
) => {
  const changedDate = new Date(Number(new Date(dateTime)) + ONE_DAY * days);

  const year = String(changedDate.getFullYear()).padStart(4, '0');
  const month = String(changedDate.getMonth() + 1).padStart(2, '0');
  const day = String(changedDate.getDate()).padStart(2, '0');
  const time = dateTime.split(' ')[1];
  const [minute, second] = time.split(':');

  const changedDateTime: Schedule['startDateTime'] = `${year}-${month}-${day} ${minute}:${second}`;

  return changedDateTime;
};
