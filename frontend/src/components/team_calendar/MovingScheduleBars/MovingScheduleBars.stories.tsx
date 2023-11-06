import type { Meta, StoryObj } from '@storybook/react';
import MovingScheduleBars from '~/components/team_calendar/MovingScheduleBars/MovingScheduleBars';

/**
 * `MovingScheduleBars` 는 다수의 캘린더 바를 보여주는 컴포넌트이며, 제공되는 x, y값을 기반으로 상대위치만큼 이동하여 렌더링됩니다. **부모 요소가 `position: relative` 속성을 가지고 있어야 올바르게 동작합니다.**
 *
 * 마우스 조작을 통해 x, y 값을 계속해서 업데이트하면 마우스를 따라다니듯이 작동하도록 만들 수 있습니다. x, y 값을 변경하면서 컴포넌트의 변화를 테스트하세요.
 */
const meta = {
  title: 'Schedule/MovingScheduleBars',
  component: MovingScheduleBars,
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
    relativeX: {
      description:
        '기존 좌표에서 좌우로 얼마나 이동한 위치에 렌더링 시킬 것인지를 의미합니다. 이 값이 양수이면 기존 좌표에서 수치만큼 오른쪽으로 이동하여 렌더링되고, 음수일 경우 왼쪽으로 이동하여 렌더링됩니다. 단위는 픽셀(px)입니다.',
    },
    relativeY: {
      description:
        '기존 좌표에서 상하로 얼마나 이동한 위치에 렌더링 시킬 것인지를 의미합니다. 이 값이 양수이면 기존 좌표에서 수치만큼 아래쪽으로 이동하여 렌더링되고, 음수일 경우 위쪽으로 이동하여 렌더링됩니다. 단위는 픽셀(px)입니다.',
    },
  },
} satisfies Meta<typeof MovingScheduleBars>;

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
    relativeX: 0,
    relativeY: 0,
  },
};
