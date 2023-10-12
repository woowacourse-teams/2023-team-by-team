import type { Meta, StoryObj } from '@storybook/react';
import ViewableThumbnail from './ViewableThumbnail';

/**
 * `ViewableThumbnail` 은 이미지 업로드 서랍에서 사용할 수 있는 단일 이미지 썸네일 컴포넌트입니다. 이미지를 클릭할 경우 모달을 띄우기 위한 함수를 호출합니다.
 */
const meta = {
  title: 'feed/ViewableThumbnail',
  component: ViewableThumbnail,
  tags: ['autodocs'],
  argTypes: {
    image: {
      description: '썸네일로 보여줄 이미지의 정보',
    },
    onClick: {
      description:
        '썸네일에 해당하는 이미지가 클릭되었을 때, 해당 썸네일을 이미지 모달에 띄우기 위한 함수',
    },
  },
} satisfies Meta<typeof ViewableThumbnail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    image: {
      id: 2918,
      isExpired: false,
      name: 'rabbit.png',
      url: 'https://images.unsplash.com/photo-1599169713100-120531cef331?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
    },
    onClick: () => {
      alert('onClick()');
    },
  },
};

export const Small: Story = {
  args: {
    image: {
      id: 1145,
      isExpired: false,
      name: 'rabbit.png',
      url: 'https://images.unsplash.com/photo-1599169713100-120531cef331?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
    },
    size: 'sm',
    onClick: () => {
      alert('onClick()');
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
    onClick: () => {
      alert('onClick()');
    },
  },
};
