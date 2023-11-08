import type { Meta, StoryObj } from '@storybook/react';
import ScheduleBar from '~/components/team_calendar/ScheduleBar/ScheduleBar';

/**
 * `ScheduleBar` 는 캘린더의 일정을 바 형태로 시각적으로 보여 주기 위한 컴포넌트입니다.
 */
const meta = {
  title: 'Schedule/ScheduleBar',
  component: ScheduleBar,
  tags: ['autodocs'],
} satisfies Meta<typeof ScheduleBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: '1',
    scheduleId: 1,
    schedule: {
      id: 1,
      title: '테스트',
      startDateTime: '2023-07-07 05:00',
      endDateTime: '2023-07-09 10:00',
    },
    title: '테스트',
    row: 1,
    column: 2,
    duration: 3,
    level: 0,
    roundedStart: true,
    roundedEnd: true,
    onClick: () => alert('clicked!'),
  },
};

export const RoundedStart: Story = {
  args: {
    id: '1',
    scheduleId: 1,
    schedule: {
      id: 1,
      title: '테스트',
      startDateTime: '2023-07-07 05:00',
      endDateTime: '2023-07-09 10:00',
    },
    title: '테스트',
    row: 1,
    column: 2,
    duration: 3,
    level: 0,
    roundedStart: true,
    roundedEnd: false,
    onClick: () => alert('clicked!'),
  },
};

export const RoundedEnd: Story = {
  args: {
    id: '1',
    scheduleId: 1,
    schedule: {
      id: 1,
      title: '테스트',
      startDateTime: '2023-07-07 05:00',
      endDateTime: '2023-07-09 10:00',
    },
    title: '테스트',
    row: 1,
    column: 2,
    duration: 3,
    level: 0,
    roundedStart: false,
    roundedEnd: true,
    onClick: () => alert('clicked!'),
  },
};

export const NotRounded: Story = {
  args: {
    id: '1',
    scheduleId: 1,
    schedule: {
      id: 1,
      title: '테스트',
      startDateTime: '2023-07-07 05:00',
      endDateTime: '2023-07-09 10:00',
    },
    title: '테스트',
    row: 1,
    column: 2,
    duration: 3,
    level: 0,
    roundedStart: false,
    roundedEnd: false,
    onClick: () => alert('clicked!'),
  },
};

export const LongTitle: Story = {
  args: {
    id: '1',
    scheduleId: 1,
    schedule: {
      id: 1,
      title: '테스트',
      startDateTime: '2023-07-07 05:00',
      endDateTime: '2023-07-09 10:00',
    },
    title:
      'Woowacourse Woowacourse Woowacourse Woowacourse Woowacourse Woowacourse',
    row: 1,
    column: 2,
    duration: 3,
    level: 0,
    roundedStart: true,
    roundedEnd: true,
    onClick: () => alert('clicked!'),
  },
};

/**
 * `mode` 값이 `no-interaction`일 경우, 해당 캘린더 바는 오로지 장식 용도가 되며 **상호작용이 불가능**하게 됩니다. 가짜 스케줄 바 드래그 화면 등 시각적인 효과를 위해 사용할 수 있습니다.
 */
export const NoInteraction: Story = {
  args: {
    id: '1',
    scheduleId: 1,
    schedule: {
      id: 1,
      title: 'No Interaction',
      startDateTime: '2023-07-07 05:00',
      endDateTime: '2023-07-09 10:00',
    },
    title: 'No Interaction',
    row: 1,
    column: 2,
    duration: 3,
    level: 0,
    roundedStart: true,
    roundedEnd: true,
    mode: 'no-interaction',
  },
};

/**
 * `mode` 값이 `indicator`일 경우, 해당 캘린더 바는 **상호작용이 불가능하고 캘린더 바의 윤곽만 드러내는** 시각적 요소가 됩니다. 캘린더 바가 놓일 위치를 시각적으로 표시하는 데에 사용합니다.
 */
export const Indicator: Story = {
  args: {
    id: '1',
    scheduleId: 1,
    schedule: {
      id: 1,
      title: 'This should not shown',
      startDateTime: '2023-07-07 05:00',
      endDateTime: '2023-07-09 10:00',
    },
    title: 'This should not shown',
    row: 1,
    column: 2,
    duration: 3,
    level: 0,
    roundedStart: true,
    roundedEnd: true,
    mode: 'indicator',
  },
};
