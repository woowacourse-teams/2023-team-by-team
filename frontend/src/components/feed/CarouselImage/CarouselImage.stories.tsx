import type { Meta, StoryObj } from '@storybook/react';
import Carousel from '~/components/feed/Carousel/Carousel';

/**
 * `CarouselImage`는 `Carousel` 컴포넌트에 표시되는 하나의 이미지를 이루는 컴포넌트입니다. 이미지에 문제가 있어 표시할 수 없을 경우에는 관련된 오류 메시지를 대신 보여주게 됩니다.
 */
const meta = {
  title: 'feed/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{ backgroundColor: 'black', width: '700px', height: '500px' }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

const image = [
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
  args: {
    image: {
      id: 9283,
      isExpired: false,
      name: 'neon.png',
      url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    },
  },
};
