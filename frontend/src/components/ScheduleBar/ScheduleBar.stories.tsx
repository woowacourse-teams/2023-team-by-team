import type { Meta, StoryObj } from '@storybook/react';
import ScheduleBar from '~/components/ScheduleBar/ScheduleBar';

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
    onClick: () => alert('clicked!'),
  },
};
