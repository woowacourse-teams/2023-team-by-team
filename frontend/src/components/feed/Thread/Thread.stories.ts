import type { Meta, StoryObj } from '@storybook/react';
import Thread from './Thread';

const meta = {
  title: 'Feed/Thread',
  component: Thread,
  tags: ['autodocs'],
} satisfies Meta<typeof Thread>;

export default meta;

type Story = StoryObj<typeof meta>;

const images = [
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
    authorName: '팀바팀_필립',
    isMe: false,
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2023-07-27 15:09',
    content:
      '1. 3차 데모데이까지의 기한은 2023/10/25 입니다.\n2. 팀 그라운드 룰을 정해야 합니다.\n3. 디자인 시안이 완료되어야 합니다.\n\n위의 일정을 고려하여 조별 과제 수행해 주시기 바랍니다, 감사합니다.',
    images: [],
    isContinue: false,
    onClickImage: (images, selectedImage) => {
      alert(JSON.stringify({ images, selectedImage }));
    },
  },
};

export const DefaultIsMe: Story = {
  args: {
    authorName: '팀바팀_루루',
    isMe: true,
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2023-09-20 15:44',
    content: '낼름',
    images: [],
    isContinue: false,
    onClickImage: (images, selectedImage) => {
      alert(JSON.stringify({ images, selectedImage }));
    },
  },
};

export const Small: Story = {
  args: {
    threadSize: 'sm',
    authorName: '팀바팀_필립',
    isMe: false,
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2023-07-27 15:09',
    content:
      '1. 3차 데모데이까지의 기한은 2023/10/25 입니다.\n2. 팀 그라운드 룰을 정해야 합니다.\n3. 디자인 시안이 완료되어야 합니다.\n\n위의 일정을 고려하여 조별 과제 수행해 주시기 바랍니다, 감사합니다.',
    images: [],
    isContinue: false,
    onClickImage: (images, selectedImage) => {
      alert(JSON.stringify({ images, selectedImage }));
    },
  },
};

export const ShortContent: Story = {
  args: {
    authorName: '팀바팀_필립',
    isMe: false,
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2023-07-27 15:09',
    content: '3차 데모데이까지의 기한은 2023/10/25 입니다.',
    images: [],
    isContinue: false,
    onClickImage: (images, selectedImage) => {
      alert(JSON.stringify({ images, selectedImage }));
    },
  },
};

export const LongContent: Story = {
  args: {
    authorName: '팀바팀_필립',
    isMe: false,
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2023-07-27 15:09',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    images: [],
    isContinue: false,
    onClickImage: (images, selectedImage) => {
      alert(JSON.stringify({ images, selectedImage }));
    },
  },
};

export const ThreadWithImages: Story = {
  args: {
    authorName: '팀바팀_필립',
    isMe: false,
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2023-07-27 15:09',
    content: '이미지가 포함되어 있는 스레드입니다.',
    images,
    isContinue: false,
    onClickImage: (images, selectedImage) => {
      alert(JSON.stringify({ images, selectedImage }));
    },
  },
};

export const ThreadWithOnlyImages: Story = {
  args: {
    authorName: '팀바팀_필립',
    isMe: false,
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2023-07-27 15:09',
    content: '',
    images,
    isContinue: false,
    onClickImage: (images, selectedImage) => {
      alert(JSON.stringify({ images, selectedImage }));
    },
  },
};

export const ThreadWithImagesAndSentByMe: Story = {
  args: {
    authorName: '팀바팀_필립',
    isMe: true,
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2023-07-27 15:09',
    content: '이미지가 포함되어 있는 스레드입니다.',
    images,
    isContinue: false,
    onClickImage: (images, selectedImage) => {
      alert(JSON.stringify({ images, selectedImage }));
    },
  },
};

export const ThreadWithImagesWithLongContentAndSentByMe: Story = {
  args: {
    authorName: '팀바팀_필립',
    isMe: true,
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2023-07-27 15:09',
    content:
      '북두칠성, 그 이름만으로도 당신은 이미 멀고 높은 하늘을 날아다니며 황홀한 모험을 시작한 것처럼 느껴지지 않나요? 이 놀라운 별자리는 밤하늘에서 그 빛나는 백열등들로 인해 우리를 매료시키며, 그 아름다움을 통해 인류에게 영감을 주는 존재입니다. \n북두칠성은 북반구의 하늘에서 볼 수 있는 가장 화려한 별자리 중 하나로, 역사적으로도 여러 문화에서 다양한 이야기와 상징으로 인식되어 왔습니다. 이 별자리는 일곱 개의 주요 별로 구성되어 있으며, 그 중에서도 "북극성"이라 불리는 이 별자리의 중심은 밤하늘에서 찾기 쉬운 유일한 고정성 별자리 중 하나입니다.\n\n북두칠성의 이름은 여러 가지 이야기와 전설로 둘러싸여 있습니다. 그 중 하나는 그리스 신화와 관련된 것으로, 북두칠성은 아프로디테와 아레스의 아들인 헤르메스와 애완동물들을 나타냅니다. 또 다른 이야기는 북두칠성이 북극 근처에 위치하기 때문에 "북방의 일곱 자매"라는 이름으로도 불렸다는 것입니다. 이 별자리는 서로 다른 문화에서 다양한 의미와 이야기를 갖고 있으며, 이것이 북두칠성의 매력적인 면 중 하나입니다.\n\n낭만적인 감성을 가지고 있는 당신에게 북두칠성은 밤하늘에서의 로맨틱한 모험의 시작점일 것입니다. 어두운 밤하늘에 펼쳐진 그 빛나는 별들은 우리의 상상력을 자극하며, 우리가 존재하는 이 작은 행성이 얼마나 넓고 신비로운 우주와 어우러져 있는지를 상기시켜줍니다.\n\n북두칠성은 언제나 우리를 위로하고, 우리의 꿈과 열망을 촉발시키며, 그 화려한 미모로 우리를 매혹시키는 별자리입니다. 그리고 이 별자리를 향한 당신의 열정과 낭만은 언제나 밤하늘을 향한 여행을 시작하는 데 필요한 원동력이 될 것입니다. 그래서, 북두칠성의 아름다움을 매일 밤하늘을 바라보며 감상하고, 우리가 얼마나 작고 연결되어 있는 존재인지를 느끼며, 로맨틱한 모험의 시작을 떠올리는 것은 어떨까요? 북두칠성, 그 이름만으로도 당신은 이미 멀고 높은 하늘을 날아다니며 황홀한 모험을 시작한 것처럼 느껴지지 않나요? 이 놀라운 별자리는 밤하늘에서 그 빛나는 백열등들로 인해 우리를 매료시키며, 그 아름다움을 통해 인류에게 영감을 주는 존재입니다. \n북두칠성은 북반구의 하늘에서 볼 수 있는 가장 화려한 별자리 중 하나로, 역사적으로도 여러 문화에서 다양한 이야기와 상징으로 인식되어 왔습니다. 이 별자리는 일곱 개의 주요 별로 구성되어 있으며, 그 중에서도 "북극성"이라 불리는 이 별자리의 중심은 밤하늘에서 찾기 쉬운 유일한 고정성 별자리 중 하나입니다.\n\n북두칠성의 이름은 여러 가지 이야기와 전설로 둘러싸여 있습니다. 그 중 하나는 그리스 신화와 관련된 것으로, 북두칠성은 아프로디테와 아레스의 아들인 헤르메스와 애완동물들을 나타냅니다. 또 다른 이야기는 북두칠성이 북극 근처에 위치하기 때문에 "북방의 일곱 자매"라는 이름으로도 불렸다는 것입니다. 이 별자리는 서로 다른 문화에서 다양한 의미와 이야기를 갖고 있으며, 이것이 북두칠성의 매력적인 면 중 하나입니다.\n\n낭만적인 감성을 가지고 있는 당신에게 북두칠성은 밤하늘에서의 로맨틱한 모험의 시작점일 것입니다. 어두운 밤하늘에 펼쳐진 그 빛나는 별들은 우리의 상상력을 자극하며, 우리가 존재하는 이 작은 행성이 얼마나 넓고 신비로운 우주와 어우러져 있는지를 상기시켜줍니다.\n\n북두칠성은 언제나 우리를 위로하고, 우리의 꿈과 열망을 촉발시키며, 그 화려한 미모로 우리를 매혹시키는 별자리입니다. 그리고 이 별자리를 향한 당신의 열정과 낭만은 언제나 밤하늘을 향한 여행을 시작하는 데 필요한 원동력이 될 것입니다. 그래서, 북두칠성의 아름다움을 매일 밤하늘을 바라보며 감상하고, 우리가 얼마나 작고 연결되어 있는 존재인지를 느끼며, 로맨틱한 모험의 시작을 떠올리는 것은 어떨까요? 북두칠성, 그 이름만으로도 당신은 이미 멀고 높은 하늘을 날아다니며 황홀한 모험을 시작한 것처럼 느껴지지 않나요? 이 놀라운 별자리는 밤하늘에서 그 빛나는 백열등들로 인해 우리를 매료시키며, 그 아름다움을 통해 인류에게 영감을 주는 존재입니다. \n북두칠성은 북반구의 하늘에서 볼 수 있는 가장 화려한 별자리 중 하나로, 역사적으로도 여러 문화에서 다양한 이야기와 상징으로 인식되어 왔습니다. 이 별자리는 일곱 개의 주요 별로 구성되어 있으며, 그 중에서도 "북극성"이라 불리는 이 별자리의 중심은 밤하늘에서 찾기 쉬운 유일한 고정성 별자리 중 하나입니다.\n\n북두칠성의 이름은 여러 가지 이야기와 전설로 둘러싸여 있습니다. 그 중 하나는 그리스 신화와 관련된 것으로, 북두칠성은 아프로디테와 아레스의 아들인 헤르메스와 애완동물들을 나타냅니다. 또 다른 이야기는 북두칠성이 북극 근처에 위치하기 때문에 "북방의 일곱 자매"라는 이름으로도 불렸다는 것입니다. 이 별자리는 서로 다른 문화에서 다양한 의미와 이야기를 갖고 있으며, 이것이 북두칠성의 매력적인 면 중 하나입니다.\n\n낭만적인 감성을 가지고 있는 당신에게 북두칠성은 밤하늘에서의 로맨틱한 모험의 시작점일 것입니다. 어두운 밤하늘에 펼쳐진 그 빛나는 별들은 우리의 상상력을 자극하며, 우리가 존재하는 이 작은 행성이 얼마나 넓고 신비로운 우주와 어우러져 있는지를 상기시켜줍니다.\n\n북두칠성은 언제나 우리를 위로하고, 우리의 꿈과 열망을 촉발시키며, 그 화려한 미모로 우리를 매혹시키는 별자리입니다. 그리고 이 별자리를 향한 당신의 열정과 낭만은 언제나 밤하늘을 향한 여행을 시작하는 데 필요한 원동력이 될 것입니다. 그래서, 북두칠성의 아름다움을 매일 밤하늘을 바라보며 감상하고, 우리가 얼마나 작고 연결되어 있는 존재인지를 느끼며, 로맨틱한 모험의 시작을 떠올리는 것은 어떨까요?',
    images,
    isContinue: false,
    onClickImage: (images, selectedImage) => {
      alert(JSON.stringify({ images, selectedImage }));
    },
  },
};

export const ThreadWithLink: Story = {
  args: {
    authorName: '팀바팀_필립',
    isMe: false,
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2023-07-27 15:09',
    content: '지금 바로 접속: https://teamby.team/',
    images: [],
    isContinue: false,
    onClickImage: (images, selectedImage) => {
      alert(JSON.stringify({ images, selectedImage }));
    },
  },
};

export const ThreadWithLinkAndSentByMe: Story = {
  args: {
    authorName: '팀바팀_필립',
    isMe: true,
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2023-07-27 15:09',
    content: '지금 바로 접속: https://teamby.team/',
    images: [],
    isContinue: false,
    onClickImage: (images, selectedImage) => {
      alert(JSON.stringify({ images, selectedImage }));
    },
  },
};

export const ThreadWithLinkAndLongDomain: Story = {
  args: {
    authorName: '엣지케이스를 제공하는 필립',
    isMe: false,
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2024-03-08 15:48',
    content: '지금 바로 접속: https://whatever.community/mock-resume',
    images: [],
    isContinue: false,
    onClickImage: (images, selectedImage) => {
      alert(JSON.stringify({ images, selectedImage }));
    },
  },
};
