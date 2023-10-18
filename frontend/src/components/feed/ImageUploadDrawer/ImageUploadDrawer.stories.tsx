import type { Meta, StoryObj } from '@storybook/react';
import ImageUploadDrawer from '~/components/feed/ImageUploadDrawer/ImageUploadDrawer';

/**
 * `ImageUploadDrawer`는 이미지 업로드 메뉴를 담고 있는 서랍장 컴포넌트입니다. 사용자의 의사에 따라 열고 닫을 수 있습니다.
 * 이 컴포넌트는 `position: absolute` 속성을 가지며, 기본적으로 최하단에 위치할 것입니다. 컴포넌트를 사용하기 위해서는 부모 요소에 `display: relative` 속성을 적용해 주셔야 합니다.
 * 스토리에 표시되는 검은 윤곽선의 컨테이너는 단지 이해를 돕기 위한 것으로, 컴포넌트에 포함되지 않습니다.
 */
const meta = {
  title: 'feed/ImageUploadDrawer',
  component: ImageUploadDrawer,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100%',
          height: '500px',
          border: '1px solid black',
          position: 'relative',
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    isOpen: {
      description:
        '서랍장이 열려 있는지의 여부입니다. 이 prop을 조작하여 서랍장을 열고 닫을 수 있습니다.',
    },
    children: {
      description:
        '랜더링할 자식 요소를 의미합니다. `ThumbnailList` 컴포넌트가 여기에 오면 됩니다.',
    },
    onClose: {
      description:
        '서랍장이 닫히게 될 때 실행시킬 함수를 의미합니다. 서랍장을 실질적으로 닫는 함수를 여기에 넣어 주시면 됩니다.',
    },
  },
} satisfies Meta<typeof ImageUploadDrawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: false,
    children: (
      <div style={{ fontSize: '32px', padding: '40px' }}>
        이 자리에 썸네일 리스트 컴포넌트가 올 것입니다.
      </div>
    ),
    onClose: () => {
      alert('onClose();');
    },
    isDisabled: false,
  },
};

export const Opened: Story = {
  args: {
    isOpen: true,
    children: (
      <div style={{ fontSize: '32px', padding: '40px' }}>
        이 자리에 썸네일 리스트 컴포넌트가 올 것입니다.
      </div>
    ),
    onClose: () => {
      alert('onClose();');
    },
    isDisabled: false,
  },
};
