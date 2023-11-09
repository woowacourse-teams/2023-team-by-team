import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentType } from 'react';
import FakeScheduleBarsScreen from '~/components/team_calendar/FakeScheduleBarsScreen/FakeScheduleBarsScreen';
import type { GeneratedScheduleBar } from '~/types/schedule';

/**
 * `FakeScheduleBarsScreen` 는 캘린더 바의 드래그 기능을 구현하기 위해 사용자에게 보여주는 가짜 캘린더 바로 구성된, 시각적인 컴포넌트입니다.
 *
 * `mode = schedule`일 경우, 마우스 조작을 통해 x, y 값을 계속해서 업데이트하면 마우스를 따라다니듯이 작동하도록 만들 수 있습니다. x, y 값을 변경하면서 컴포넌트의 변화를 테스트하세요.
 */
const meta = {
  title: 'Schedule/FakeScheduleBarsScreen',
  component: FakeScheduleBarsScreen,
  tags: ['autodocs'],
  decorators: [
    (Story: ComponentType) => (
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '600px',
          height: '450px',
          border: '3px solid red',
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    mode: {
      description:
        '이 컴포넌트의 모드를 의미합니다. 사용 목적에 따라 `schedule`과 `indicator` 중 하나를 명시해 주세요.',
    },
    scheduleBars: {
      description: '렌더링할 스케줄 바들의 정보를 의미합니다.',
    },
    relativeX: {
      description:
        '기존 좌표에서 좌우로 얼마나 이동한 위치에 렌더링 시킬 것인지를 의미합니다. 이 값이 양수이면 기존 좌표에서 수치만큼 오른쪽으로 이동하여 렌더링되고, 음수일 경우 왼쪽으로 이동하여 렌더링됩니다. 단위는 픽셀(px)입니다. **이 프로퍼티는 `mode = schedule`일 때만 사용할 수 있습니다.**',
    },
    relativeY: {
      description:
        '기존 좌표에서 상하로 얼마나 이동한 위치에 렌더링 시킬 것인지를 의미합니다. 이 값이 양수이면 기존 좌표에서 수치만큼 아래쪽으로 이동하여 렌더링되고, 음수일 경우 위쪽으로 이동하여 렌더링됩니다. 단위는 픽셀(px)입니다. **이 프로퍼티는 `mode = schedule`일 때만 사용할 수 있습니다.**',
    },
  },
} satisfies Meta<typeof FakeScheduleBarsScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

const scheduleBars: GeneratedScheduleBar[] = [
  {
    id: '1',
    scheduleId: 1105,
    title: '바쁜 필립의 3주짜리 일정',
    row: 0,
    column: 1,
    duration: 6,
    level: 0,
    roundedStart: true,
    roundedEnd: false,
    schedule: {
      id: 1105,
      title: '바쁜 필립의 3주짜리 일정',
      startDateTime: '2023-06-26 00:00',
      endDateTime: '2023-07-12 23:59',
    },
  },
  {
    id: '2',
    scheduleId: 1105,
    title: '바쁜 필립의 3주짜리 일정',
    row: 1,
    column: 0,
    duration: 7,
    level: 0,
    roundedStart: false,
    roundedEnd: false,
    schedule: {
      id: 1105,
      title: '바쁜 필립의 3주짜리 일정',
      startDateTime: '2023-06-26 00:00',
      endDateTime: '2023-07-12 23:59',
    },
  },
  {
    id: '3',
    scheduleId: 1105,
    title: '바쁜 필립의 3주짜리 일정',
    row: 2,
    column: 0,
    duration: 4,
    level: 0,
    roundedStart: false,
    roundedEnd: true,
    schedule: {
      id: 1105,
      title: '바쁜 필립의 3주짜리 일정',
      startDateTime: '2023-06-26 00:00',
      endDateTime: '2023-07-12 23:59',
    },
  },
];

/**
 * 이 모드는 가짜 스케줄 바를 보여줘야 할 경우에 사용합니다.
 */
export const ScheduleMode: Story = {
  args: {
    mode: 'schedule',
    scheduleBars,
    relativeX: 0,
    relativeY: 0,
  },
};

/**
 * 이 모드는 스케줄 바가 놓일 위치를 시각적으로 보여줘야 할 경우에 사용합니다.
 */
export const IndicatorMode: Story = {
  args: {
    mode: 'indicator',
    scheduleBars,
  },
};
