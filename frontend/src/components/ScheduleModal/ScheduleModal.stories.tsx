import type { Meta, StoryObj } from '@storybook/react';
import { useModal } from '~/hooks/useModal';
import ScheduleModal from '~/components/ScheduleModal/ScheduleModal';
import { useRef, useState } from 'react';

const meta = {
  title: 'ScheduleModal',
  component: ScheduleModal,
} satisfies Meta<typeof ScheduleModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { openModal } = useModal();
    const array = [1, 2, 3, 4, 5];
    const refs = array.map(() => useRef(null));

    const [targetRef, setTargetRef] = useState<React.RefObject<HTMLDivElement>>(
      refs[0],
    );

    const handleOpen = (index: number) => {
      openModal();
      setTargetRef(refs[index]);
    };

    return (
      <>
        {array.map((_, index) => {
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
        <ScheduleModal targetRef={targetRef} id={1} />
      </>
    );
  },
  args: {
    id: 1,
    // eslint-disable-next-line
    //@ts-ignore
    targetRef: null,
  },
};
