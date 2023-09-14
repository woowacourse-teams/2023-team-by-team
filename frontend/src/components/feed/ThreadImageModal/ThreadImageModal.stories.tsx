import type { Meta, StoryObj } from '@storybook/react';
import ThreadImageModal from '~/components/feed/ThreadImageModal/ThreadImageModal';
import { useModal } from '~/hooks/useModal';
import Button from '~/components/common/Button/Button';

const meta = {
  title: 'feed/ThreadImageModal',
  component: ThreadImageModal,
  tags: ['autodocs'],
} satisfies Meta<typeof ThreadImageModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleModal = () => {
  const { openModal } = useModal();

  return (
    <>
      <Button onClick={openModal}>모달 열기</Button>
      <ThreadImageModal images={images} initialPage={1} />
    </>
  );
};

const images = [
  {
    id: 9283,
    isExpired: false,
    name: 'neon.png',
    url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
  },
  {
    id: 4165,
    isExpired: false,
    name: 'donut.png',
    url: 'https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80',
  },
  {
    id: 8729,
    isExpired: false,
    name: 'zXwMd93Xwz2V03M5xAw_fVmxzEwNiDv_93-xVm__902XvC-2XzOqPdR93F3Xz_24RzV01IjSwmOkVeZmIoPlLliFmMVc2__s9Xz.png',
    url: 'https://images.unsplash.com/photo-1591382386627-349b692688ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
  },
  {
    id: 1092,
    isExpired: false,
    name: 'icon.png',
    url: 'https://img.icons8.com/?size=256&id=VUoFEYkLOaMn&format=png&color=1A6DFF,C822FF',
  },
  {
    id: 3493,
    isExpired: true,
    name: '만료된 사진',
    url: '',
  },
];

export const Default: Story = {
  render: () => <SampleModal />,
  args: {
    images: [],
    initialPage: 1,
  },
};
