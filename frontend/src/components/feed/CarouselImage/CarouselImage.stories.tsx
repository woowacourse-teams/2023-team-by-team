import type { Meta, StoryObj } from '@storybook/react';
import CarouselImage from '~/components/feed/CarouselImage/CarouselImage';

/**
 * `CarouselImage`는 `Carousel` 컴포넌트에 표시되는 하나의 이미지를 이루는 컴포넌트입니다. 이미지에 문제가 있어 표시할 수 없을 경우에는 관련된 오류 메시지를 대신 보여주게 됩니다.
 */
const meta = {
  title: 'feed/CarouselImage',
  component: CarouselImage,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'black', width: '100%', height: '500px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    image: {
      description:
        '컴포넌트에 표시할 이미지의 정보를 의미합니다. 유효하지 않은 이미지의 url이 주어져도 상관 없습니다.',
    },
  },
} satisfies Meta<typeof CarouselImage>;

export default meta;

type Story = StoryObj<typeof meta>;

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

/**
 * API 서버 측에서 이 이미지가 만료되었음을 명시하지 않았으나, 실제로 이미지를 로드한 결과 이미지의 url이 올바르지 않아 깨진 경우입니다.
 */
export const CorruptedImage: Story = {
  args: {
    image: {
      id: 9834,
      isExpired: false,
      name: 'neon.png',
      url: 'https://chicken-meokko-shipda.com/yangnium/ganjang/chicken.jpg',
    },
  },
};

/**
 * API 서버 측에서 이 이미지가 만료되었음을 명시한 경우입니다.
 */
export const ExpiredImage: Story = {
  args: {
    image: {
      id: 4657,
      isExpired: true,
      name: 'neon.png',
      url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    },
  },
};
