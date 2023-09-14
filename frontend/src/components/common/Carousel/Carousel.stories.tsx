import type { Meta, StoryObj } from '@storybook/react';
import Carousel from '~/components/common/Carousel/Carousel';

/**
 * `Carousel`는 이미지를 보여주며 자연스럽게 이미지 전환을 가능케 하는 슬라이드 쇼 컴포넌트입니다.
 */
const meta = {
  title: 'common/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'black' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: '100%',
    height: '700px',
    images: [
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      'https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80',
      'https://images.unsplash.com/photo-1591382386627-349b692688ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
      'https://img.icons8.com/?size=256&id=VUoFEYkLOaMn&format=png&color=1A6DFF,C822FF',
    ],
    currentPage: 1,
    onPageChange: (page: number) => {
      alert(`onPageChange(${page});`);
    },
  },
};
