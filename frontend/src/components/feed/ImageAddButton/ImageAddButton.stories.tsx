import type { Meta, StoryObj } from '@storybook/react';
import ImageAddButton from './ImageAddButton';

/**
 * `ImageAddButton` 은 채팅에서 이미지 등록을 위해 사용하는 버튼입니다.
 *  클릭 시에 별도의 이벤트는 발생하지 않지만, 파일 업로드 프롬프트를 띄우며 선택된 파일이 변경되었을 경우 이벤트를 호출합니다.
 */
const meta = {
  title: 'feed/ImageAddButton',
  component: ImageAddButton,
  tags: ['autodocs'],
  argTypes: {
    onChangeImage: {
      description:
        '사용자가 새로운 파일을 업로드하여 파일의 내용물에 변동사항이 생길 경우 호출되는 함수입니다. 여기에 파일을 업로드하기 위한 함수를 넣어 주세요.',
    },
  },
} satisfies Meta<typeof ImageAddButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChangeImage: () => {
      alert('onChangeImage');
    },
  },
};
