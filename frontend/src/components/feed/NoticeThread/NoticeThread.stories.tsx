import type { Meta, StoryObj } from '@storybook/react';
import NoticeThread from './NoticeThread';

/**
 * `NoticeThread` 는 피드 메뉴에서 사용될 공지 스레드 컴포넌트입니다.
 *  피드 메뉴와 모아보기 페이지에서의 두 UI를 모두 제공합니다.
 */
const meta = {
  title: 'Feed/NoticeThread',
  component: NoticeThread,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <div
          style={{
            padding: '50px',
            backgroundColor: '#eee',
          }}
        >
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof NoticeThread>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    authorName: '요술토끼',
    createdAt: '2022-03-04 12:34',
    content:
      '안녕하세요! 잘 부탁드립니다.\n안녕하세요! 잘 부탁드립니다.\n안녕하세요! 잘 부탁드립니다',
    images: [],
    onClickImage: () => {
      alert('onClickImage');
    },
  },
};

export const MiddleContent: Story = {
  args: {
    authorName: '루루',
    createdAt: '2022-03-04 12:34',
    content:
      '안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.',
    images: [],
    onClickImage: () => {
      alert('onClickImage');
    },
  },
};

export const TooLongContent: Story = {
  args: {
    authorName: '요술토끼',
    createdAt: '2022-03-04 12:34',
    content:
      'The Enigmatic Nature of Quantum Entanglement: Unraveling the Mysteries of Nonlocality\n\nIntroduction\n\nQuantum entanglement, a cornerstone phenomenon in quantum mechanics, has baffled physicists and philosophers alike since its discovery in the early 20th century. This essay delves into the intricacies of quantum entanglement, exploring its counterintuitive properties and profound implications on our understanding of reality. We shall embark on a journey through the mysterious realm of nonlocality, where seemingly disconnected particles share an inexplicable, instantaneous connection, defying classical notions of causality and locality.\n\nI. Historical Background and Quantum Entanglement Basics\n\nThe concept of quantum entanglement first emerged in 1935, as Erwin Schrödinger famously described it as "spooky action at a distance." The basic idea involves the entangling of two or more quantum particles, such as photons or electrons, in a way that their quantum states become inextricably linked. Once entangled, the particles exhibit a peculiar behavior - any change to the state of one particle instantaneously affects the state of its entangled partner, regardless of the spatial separation between them.\n\nII. Nonlocality and Bells Inequality\n\nThe nonlocality inherent in quantum entanglement challenges the classical principles of locality and causality. John Bells groundbreaking work in the 1960s led to the formulation of Bells inequality, a mathematical criterion to test whether quantum mechanics adheres to local realism or if it must embrace nonlocality.\n\nIII. Entanglement and the Measurement Problem\n\nThe measurement problem, a central conundrum in quantum mechanics, becomes even more enigmatic in the context of quantum entanglement. When we observe one of the entangled particles, it collapses into a definite state, instantaneously determining the state of its entangled partner, regardless of the distance between them. This raises philosophical questions about the nature of reality, the role of the observer, and the existence of multiple realities or parallel universes.\n\nIV. Quantum Entanglement and Quantum Computing\n\nThe mind-boggling implications of quantum entanglement extend far beyond philosophical debates. The field of quantum computing exploits the phenomenon of entanglement to perform computations exponentially faster than classical computers. Quantum bits, or qubits, in a superposition of states can be entangled to enhance information processing capabilities, revolutionizing various industries, including cryptography, optimization, and drug discovery.\n\nV. Entanglement and Spacetime\n\nQuantum entanglement also intertwines with the fabric of spacetime, as suggested by recent theoretical research. Some physicists propose that entanglement may have a crucial role in understanding quantum gravity, reconciling the macroscopic world of general relativity with the microscopic world of quantum mechanics. The entanglement entropy is believed to be linked to the holographic principle, providing a deeper understanding of the fundamental nature of our universe.\n\nConclusion\n\nIn conclusion, quantum entanglement stands as one of the most profound and bewildering phenomena in modern physics. Its inherent nonlocality challenges the very fabric of reality, forcing us to reconsider our classical intuitions about causality and locality. From philosophical dilemmas to groundbreaking technological applications, quantum entanglement continues to push the boundaries of our knowledge, enticing us with the promise of unraveling the deepest secrets of the cosmos. The enigma of entanglement reminds us that there are still uncharted territories in the universe, waiting for the curious minds of future generations to explore and understand fully.',
    images: [],
    onClickImage: () => {
      alert('onClickImage');
    },
  },
};

export const ImageContent: Story = {
  args: {
    authorName: '루루',
    createdAt: '2023-12-01 04:12',
    content: '중요공지!\n중요공지!\n중요공지!',
    images: [
      {
        id: 9283,
        isExpired: false,
        name: 'neon.png',
        url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
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
        url: 'https://wrong-link.com/must-show-fallback.png',
      },
      {
        id: 3493,
        isExpired: true,
        name: '만료된 사진',
        url: '',
      },
    ],
    onClickImage: () => {
      alert('onClickImage');
    },
  },
};

export const ContentWithLink: Story = {
  args: {
    authorName: '공지에서조차 팀바팀을 홍보하는 사람',
    createdAt: '2022-03-04 12:34',
    content: '회의 접속 링크: https://teamby.team/',
    images: [],
    onClickImage: () => {
      alert('onClickImage');
    },
  },
};
