import type { Meta, StoryObj } from '@storybook/react';
import ScheduleBarsIndicator from '~/components/team_calendar/ScheduleBarsIndicator/ScheduleBarsIndicator';

/**
 * `ScheduleBarsIndicator` 는 다수의 캘린더 바를 활용하여 스케줄 바가 놓일 위치에 대한 시각적인 정보를 제공하는 컴포넌트입니다.
 */
const meta = {
  title: 'Schedule/ScheduleBarsIndicator',
  component: ScheduleBarsIndicator,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
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
    scheduleBars: {
      description: '렌더링할 스케줄 바들의 정보를 의미합니다.',
    },
  },
} satisfies Meta<typeof ScheduleBarsIndicator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    scheduleBars: [
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
    ],
  },
};
