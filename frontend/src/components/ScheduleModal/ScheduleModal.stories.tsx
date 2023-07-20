import type { Meta, StoryObj } from '@storybook/react';
import { useModal } from '~/hooks/useModal';
import ScheduleModal from '~/components/ScheduleModal/ScheduleModal';
import { useRef, useState } from 'react';
import { arrayOf } from '~/utils/arrayOf';

const meta = {
  title: 'ScheduleModal',
  component: ScheduleModal,
} satisfies Meta<typeof ScheduleModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { openModal } = useModal();
    const refs = arrayOf(5).map(() => useRef(null));

    const [targetRef, setTargetRef] = useState<React.RefObject<HTMLDivElement>>(
      refs[0],
    );

    const handleOpen = (index: number) => {
      openModal();
      setTargetRef(refs[index]);
    };

    return (
      <>
        {arrayOf(5).map((_, index) => {
          return (
            <div
              key={index}
              ref={refs[index]}
              onClick={() => handleOpen(index)}
            >
              모달 열기
            </div>
          );
        })}
        <ScheduleModal
          schedule={{
            id: 0,
            title: 'test0',
            startDateTime: '2023-07-13 00:00',
            endDateTime: '2023-07-14 23:59',
          }}
          position={{
            row: 0,
            column: 0,
            level: 0,
          }}
          handleScheduleDelete={() => {
            alert('click');
          }}
        />
      </>
    );
  },
  args: {
    schedule: {
      id: 0,
      title: 'test0',
      startDateTime: '2023-07-13 00:00',
      endDateTime: '2023-07-14 23:59',
    },
    position: {
      row: 0,
      column: 0,
      level: 0,
    },
    handleScheduleDelete: () => {
      alert('click');
    },
  },
};
