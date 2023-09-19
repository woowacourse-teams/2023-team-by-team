import type { Meta, StoryObj } from '@storybook/react';
import DeletableThumbnail from './DeletableThumbnail';

/**
 * `DeletableThumbnail` 은 이미지 업로드 서랍에서 사용할 수 있는 단일 이미지 썸네일 컴포넌트입니다. 삭제 버튼이 탑재되어 있습니다.
 */
const meta = {
  title: 'feed/DeletableThumbnail',
  component: DeletableThumbnail,
  tags: ['autodocs'],
  argTypes: {
    image: {
      description: '썸네일로 보여줄 이미지의 정보',
    },
    onDelete: {
      description: '썸네일에 해당하는 이미지를 삭제해야 할 때 실행될 함수',
    },
  },
} satisfies Meta<typeof DeletableThumbnail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    image: {
      id: 1004,
      isExpired: false,
      name: 'rabbit.png',
      url: 'https://images.unsplash.com/photo-1599169713100-120531cef331?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
    },
    onDelete: (imageId: number) => {
      alert(`onDelete(${imageId})`);
    },
  },
};

export const ExpiredThumbnail: Story = {
  args: {
    image: {
      id: 1029,
      isExpired: true,
      name: '만료된 이미지',
      url: '',
    },
    onDelete: (imageId: number) => {
      alert(`onDelete(${imageId})`);
    },
  },
};
