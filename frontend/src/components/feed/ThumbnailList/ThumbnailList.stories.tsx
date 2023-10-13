import type { Meta, StoryObj } from '@storybook/react';
import type { PreviewImage, ThreadImage } from '~/types/feed';
import ThumbnailList from './ThumbnailList';

/**
 * `ThumbnailList` 은 이미지 서랍, 또는 채팅에서 사용할 수 있는 썸네일 모음집입니다.
 */
const meta = {
  title: 'feed/ThumbnailList',
  component: ThumbnailList,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      description:
        '썸네일 리스트를 어떤 용도로 사용할 지를 정할 수 있습니다. `delete`일 경우 리스트의 이미지들을 삭제할 수 있으며, `view`일 경우 리스트의 썸네일을 클릭하여 모달에 이미지를 띄울 수 있습니다.',
    },
    images: {
      description:
        '썸네일 리스트를 보여주기 위해 사용할 이미지들의 정보입니다.',
    },
    onDelete: {
      description:
        "**`mode = 'delete'` 일때만 필요합니다.** 이미지가 클릭되었을 때 이미지를 지우는 함수를 의미합니다.",
    },
    onClick: {
      description:
        "**`mode = 'view'` 일때만 필요합니다.** 이미지가 클릭되었을 때 모달을 띄우는 함수를 의미합니다.",
    },
  },
} satisfies Meta<typeof ThumbnailList>;

export default meta;

type Story = StoryObj<typeof meta>;

const deleteModeImages: PreviewImage[] = [
  {
    uuid: '69aaaf99-a02d-4800-a175-7314c64e2a84',
    url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
  },
  {
    uuid: 'aaf9a0de-8289-455e-8112-37eebc42944a',
    url: 'https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80',
  },
  {
    uuid: 'ac49b5ed-11f4-468b-b278-5880fcf7bf16',
    url: 'https://images.unsplash.com/photo-1591382386627-349b692688ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
  },
  {
    uuid: '3e658b3c-5664-4225-b94a-25e6cece4ac5',
    url: 'https://img.icons8.com/?size=256&id=VUoFEYkLOaMn&format=png&color=1A6DFF,C822FF',
  },
];

const viewModeImages: ThreadImage[] = [
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

/**
 * 이미지 서랍에 사용할 경우 이 옵션을 사용하세요. `mode = 'delete'` 로 설정하시면 됩니다.
 */
export const DeletableList: Story = {
  args: {
    mode: 'delete',
    images: [],
    onDelete: (imageUuid) => {
      alert(`onDelete(${imageUuid});`);
    },
    onChange: () => {
      alert(`onChange()`);
    },
  },
};

/**
 * `mode = delete`이고, 이미지 개수가 최대로 올릴 수 있는 이미지 개수를 넘지 않았다면, 이미지 추가 버튼이 보이게 됩니다.
 */
export const NotMaxDeletableList: Story = {
  args: {
    mode: 'delete',
    images: deleteModeImages.slice(0, 2),
    onDelete: (imageUuid) => {
      alert(`onDelete(${imageUuid});`);
    },
    onChange: () => {
      alert(`onChange()`);
    },
  },
};

export const EmptyDeletableList: Story = {
  args: {
    mode: 'delete',
    images: [],
    onDelete: (imageUuid) => {
      alert(`onDelete(${imageUuid});`);
    },
    onChange: () => {
      alert(`onChange()`);
    },
  },
};

/**
 * 채팅 메시지에 사용할 경우 이 옵션을 사용하세요. `mode = 'view'` 로 설정하시면 됩니다.
 */
export const ViewableList: Story = {
  args: {
    mode: 'view',
    images: viewModeImages,
    onClick: (images: ThreadImage[], selectedImage: number) => {
      alert(`onClick(${JSON.stringify(images)}, ${selectedImage});`);
    },
  },
};

export const ViewableListSmall: Story = {
  args: {
    mode: 'view',
    size: 'sm',
    images: viewModeImages,
    onClick: (images: ThreadImage[], selectedImage: number) => {
      alert(`onClick(${JSON.stringify(images)}, ${selectedImage});`);
    },
  },
};
