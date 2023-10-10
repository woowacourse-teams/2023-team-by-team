import type { Meta, StoryObj } from '@storybook/react';
import { useModal } from '~/hooks/useModal';
import Button from '~/components/common/Button/Button';
import ICalendarModal from '~/components/team_calendar/ICalendarModal/ICalendarModal';

const meta = {
  title: 'Schedule/ICalendarModal',
  component: ICalendarModal,
  tags: ['autodocs'],
} satisfies Meta<typeof ICalendarModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleModal = () => {
  const { openModal } = useModal();

  return (
    <>
      <Button onClick={openModal}>모달 열기</Button>
      <ICalendarModal />
    </>
  );
};

export const Default: Story = {
  render: () => <SampleModal />,
  args: {},
};
