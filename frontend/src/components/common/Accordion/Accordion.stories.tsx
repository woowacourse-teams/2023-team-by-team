import type { Meta, StoryObj } from '@storybook/react';
import Accordion from '~/components/common/Accordion/Accordion';

const meta = {
  title: 'common/Accordion',
  component: Accordion,
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Accordion width={'300px'}>
        <Accordion.Item>
          <Accordion.Header id={0}>아코디언1</Accordion.Header>
          <Accordion.Body id={0}>응애응애</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header id={1}>아코디언2</Accordion.Header>
          <Accordion.Body id={1}>
            아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애
            아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애
            아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애
            아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애
            아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애
            아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애
            아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애
            아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애
            아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애
            아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애
            아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애
            아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애
            아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애
            아주 긴 응애응애 아주 긴 응애응애
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header id={2}>아코디언3</Accordion.Header>
          <Accordion.Body id={2}>
            아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애
            아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애
            아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애
            아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애
            아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애
            아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애
            아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애
            아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애
            아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애
            아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애
            아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애
            아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애
            아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애 아주 긴 응애응애
            아주 긴 응애응애 아주 긴 응애응애
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  },
  args: {},
};
