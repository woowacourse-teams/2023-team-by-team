import type { Meta, StoryObj } from '@storybook/react';
import Spinner from '~/components/common/Spinner/Spinner';

const meta = {
  title: 'common/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <div
          style={{
            width: '150px',
            height: '150px',
          }}
        >
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const ColorArgs: Story = {
  args: {
    color: 'red',
  },
};

export const SmSpinner: Story = {
  args: { size: 'sm' },
};

export const MdSpinner: Story = {
  args: { size: 'md' },
};

export const LgSpinner: Story = {
  args: { size: 'lg' },
};
