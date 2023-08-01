import type { Thread } from '~/types/feed';
import type { NoticeThread } from '~/types/feed';

export const threads: Thread[] = [
  {
    id: 1,
    type: 'notification',
    authorId: 4,
    authorName: 'schedule',
    profileImageUrl: null,
    createdAt: '2021-11-24 10:30',
    content: '오늘 예정된 일정이 있습니다.',
  },
  {
    id: 2,
    type: 'thread',
    authorId: 1,
    authorName: 'John',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-11-24 09:20',
    content: '안녕하세요. 오늘 날씨가 좋네요.',
  },
  {
    id: 3,
    type: 'thread',
    authorId: 2,
    authorName: 'Alice',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-11-24 07:55',
    content: '오늘 회의는 언제 시작되나요?',
  },
  {
    id: 4,
    type: 'notification',
    authorId: 2,
    authorName: 'schedule',
    profileImageUrl: null,
    createdAt: '2021-11-23 18:30',
    content: '내일 출장이 예정되어 있습니다.',
  },
  {
    id: 5,
    type: 'thread',
    authorId: 3,
    authorName: 'David',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-11-23 15:10',
    content: '다음 주 금요일은 대체공휴일이에요.',
  },
  {
    id: 6,
    type: 'thread',
    authorId: 4,
    authorName: 'Alice',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-11-23 13:00',
    content: '프로젝트 도중 문제가 발생했습니다. 도와주세요.',
  },
  {
    id: 7,
    type: 'notification',
    authorId: 4,
    authorName: 'schedule',
    profileImageUrl: null,
    createdAt: '2021-11-22 09:30',
    content: '이번 주 금요일은 연말 정산 마감일입니다.',
  },
  {
    id: 8,
    type: 'thread',
    authorId: 2,
    authorName: 'Alice',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-11-21 16:45',
    content: '다음 주 스케줄이 궁금합니다.',
  },
  {
    id: 9,
    type: 'thread',
    authorId: 1,
    authorName: 'John',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-11-21 10:25',
    content: '오늘 바쁘네요.',
  },
  {
    id: 10,
    type: 'notification',
    authorId: 2,
    authorName: 'schedule',
    profileImageUrl: null,
    createdAt: '2021-11-20 12:00',
    content: '크리스마스 선물 추천해주세요.',
  },
  {
    id: 11,
    type: 'thread',
    authorId: 3,
    authorName: 'David',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-11-20 09:35',
    content: '오늘 점심은 뭘 먹을까요?',
  },
  {
    id: 12,
    type: 'thread',
    authorId: 1,
    authorName: 'John',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-11-19 17:50',
    content: '주말에 뭐 하실 건가요?',
  },
  {
    id: 13,
    type: 'notification',
    authorId: 4,
    authorName: 'schedule',
    profileImageUrl: null,
    createdAt: '2021-11-18 14:20',
    content: '다음 주 출장 예정입니다.',
  },
  {
    id: 14,
    type: 'thread',
    authorId: 2,
    authorName: 'Alice',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-11-18 10:10',
    content: '오늘 오후 3시에 회의가 있어요.',
  },
  {
    id: 15,
    type: 'thread',
    authorId: 3,
    authorName: 'David',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-11-17 11:55',
    content: '프로젝트 일정을 어떻게 조정할까요?',
  },
  {
    id: 16,
    type: 'notification',
    authorId: 2,
    authorName: 'schedule',
    profileImageUrl: null,
    createdAt: '2021-11-16 08:00',
    content: '오늘부터 새로운 근무 시간이 적용됩니다.',
  },
  {
    id: 17,
    type: 'thread',
    authorId: 1,
    authorName: 'John',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-11-15 15:45',
    content: '프로젝트 추가 기능을 넣고 싶은데 어떻게 추가하면 될까요?',
  },
  {
    id: 18,
    type: 'thread',
    authorId: 3,
    authorName: 'David',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-11-14 19:20',
    content: '회사에 가기 전 무슨 일을 해요?',
  },
  {
    id: 19,
    type: 'notification',
    authorId: 4,
    authorName: 'schedule',
    profileImageUrl: null,
    createdAt: '2021-11-13 07:30',
    content: '오늘은 회사 축제가 열립니다.',
  },
  {
    id: 20,
    type: 'thread',
    authorId: 1,
    authorName: 'John',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-11-12 12:15',
    content:
      '20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 ',
  },
  {
    id: 21,
    type: 'thread',
    authorId: 2,
    authorName: 'Alice',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-11-11 09:40',
    content: '오늘 회사에서 좋은 소식을 들었습니다.',
  },
  {
    id: 22,
    type: 'notification',
    authorId: 2,
    authorName: 'schedule',
    profileImageUrl: null,
    createdAt: '2021-11-10 17:30',
    content: '새로운 프로젝트를 시작합니다.',
  },
  {
    id: 23,
    type: 'thread',
    authorId: 3,
    authorName: 'David',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-11-09 14:25',
    content: '프로젝트 디자인을 어떻게 해야할까요?',
  },
  {
    id: 24,
    type: 'thread',
    authorId: 1,
    authorName: 'John',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-11-08 11:50',
    content: '회사에서 잘 지내고 있어요.',
  },
  {
    id: 25,
    type: 'notification',
    authorId: 4,
    authorName: 'schedule',
    profileImageUrl: null,
    createdAt: '2021-11-07 08:00',
    content: '오늘 쉬는 날입니다.',
  },
  {
    id: 26,
    type: 'thread',
    authorId: 2,
    authorName: 'Alice',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-11-06 13:30',
    content: '프로젝트 코드를 검토하고 있습니다.',
  },
  {
    id: 27,
    type: 'thread',
    authorId: 3,
    authorName: 'David',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-11-05 09:15',
    content: '회사에서 사용하는 소프트웨어는 무엇인가요?',
  },
  {
    id: 28,
    type: 'notification',
    authorId: 4,
    authorName: 'schedule',
    profileImageUrl: null,
    createdAt: '2021-11-04 16:50',
    content: '다음 주 목요일은 출장이 예정되어 있습니다.',
  },
  {
    id: 29,
    type: 'thread',
    authorId: 1,
    authorName: 'John',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-11-03 14:00',
    content: '프로젝트 내용을 수정하고 있습니다.',
  },
  {
    id: 30,
    type: 'thread',
    authorId: 2,
    authorName: 'Alice',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-11-02 12:05',
    content: '회사에서 사용하는 스케줄러는 무엇인가요?',
  },
  {
    id: 31,
    type: 'notification',
    authorId: 4,
    authorName: 'schedule',
    profileImageUrl: null,
    createdAt: '2021-11-01 09:40',
    content: '오늘부터 새로운 업무를 시작합니다.',
  },
  {
    id: 32,
    type: 'thread',
    authorId: 3,
    authorName: 'David',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-10-31 15:20',
    content: '다음주까지 마감일이 얼마나 남았나요?',
  },
  {
    id: 33,
    type: 'thread',
    authorId: 1,
    authorName: 'John',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-10-30 19:40',
    content: '프로젝트 일정이 어려워요.',
  },
  {
    id: 34,
    type: 'notification',
    authorId: 2,
    authorName: 'schedule',
    profileImageUrl: null,
    createdAt: '2021-10-29 10:10',
    content: '오늘은 회사 조기 마감일입니다.',
  },
  {
    id: 35,
    type: 'thread',
    authorId: 4,
    authorName: 'Alice',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-10-28 07:30',
    content: '오늘도 화이팅!',
  },
  {
    id: 36,
    type: 'thread',
    authorId: 1,
    authorName: 'John',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-10-27 15:00',
    content: '회사에서 사용하는 디자인 툴은 무엇인가요?',
  },
  {
    id: 37,
    type: 'notification',
    authorId: 4,
    authorName: 'schedule',
    profileImageUrl: null,
    createdAt: '2021-10-26 17:50',
    content: '다음 주 출장 예정입니다.',
  },
  {
    id: 38,
    type: 'notification',
    authorId: 2,
    authorName: 'schedule',
    profileImageUrl: null,
    createdAt: '2021-10-25 19:40',
    content: '회사에서 새로운 프로젝트를 시작합니다.',
  },
  {
    id: 39,
    type: 'thread',
    authorId: 3,
    authorName: 'David',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-10-24 12:00',
    content: '회사에 출근하는 시간이 언제인가요?',
  },
  {
    id: 40,
    type: 'thread',
    authorId: 1,
    authorName: 'John',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-10-23 08:10',
    content:
      '40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 ',
  },
  {
    id: 41,
    type: 'notification',
    authorId: 4,
    authorName: 'schedule',
    profileImageUrl: null,
    createdAt: '2021-10-22 16:00',
    content: '다음 주 월요일은 휴무입니다.',
  },
  {
    id: 42,
    type: 'thread',
    authorId: 2,
    authorName: 'Alice',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-10-21 10:45',
    content: '회사에서 사용하는 교육 시스템은 무엇인가요?',
  },
  {
    id: 43,
    type: 'thread',
    authorId: 3,
    authorName: 'David',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-10-20 09:20',
    content: '프로젝트 일정을 어떻게 조정할까요?',
  },
  {
    id: 44,
    type: 'thread',
    authorId: 4,
    authorName: 'Alice',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-10-19 07:10',
    content: '오늘도 화이팅!',
  },
  {
    id: 45,
    type: 'notification',
    authorId: 2,
    authorName: 'schedule',
    profileImageUrl: null,
    createdAt: '2021-10-18 12:30',
    content: '새로운 기능을 추가하였습니다.',
  },
  {
    id: 46,
    type: 'thread',
    authorId: 1,
    authorName: 'John',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-10-17 08:15',
    content: '회사에서 사용하는 최신 기술은 무엇인가요?',
  },
  {
    id: 47,
    type: 'thread',
    authorId: 3,
    authorName: 'David',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-10-16 15:50',
    content: '회사에서 사용하는 패키지 매니저는 무엇인가요?',
  },
  {
    id: 48,
    type: 'notification',
    authorId: 4,
    authorName: 'schedule',
    profileImageUrl: null,
    createdAt: '2021-10-15 14:40',
    content: '다음 주 금요일은 연휴입니다.',
  },
  {
    id: 49,
    type: 'thread',
    authorId: 2,
    authorName: 'Alice',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-10-14 11:10',
    content: '회사에서 사용하는 데이터베이스는 무엇인가요?',
  },
  {
    id: 50,
    type: 'thread',
    authorId: 1,
    authorName: 'John',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-10-13 10:20',
    content: '다음주 회사에서 예정되어 있는 일정이 무엇인가요?',
  },
  {
    id: 51,
    type: 'notification',
    authorId: 4,
    authorName: 'schedule',
    profileImageUrl: null,
    createdAt: '2021-10-12 09:30',
    content: '오늘은 출근하기 좋은 날씨입니다.',
  },
  {
    id: 52,
    type: 'thread',
    authorId: 3,
    authorName: 'David',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-10-11 16:00',
    content: '회사에서 사용하는 웹 프레임워크는 무엇인가요?',
  },
  {
    id: 53,
    type: 'thread',
    authorId: 2,
    authorName: 'Alice',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-10-10 13:50',
    content: '회사에서 사용하는 모바일 앱 프레임워크는 무엇인가요?',
  },
  {
    id: 54,
    type: 'notification',
    authorId: 4,
    authorName: 'schedule',
    profileImageUrl: null,
    createdAt: '2021-10-09 09:45',
    content: '오늘 회사에서 발표가 예정되어 있습니다.',
  },
  {
    id: 55,
    type: 'thread',
    authorId: 1,
    authorName: 'John',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-10-08 08:00',
    content: '회사에서 사용하는 CI/CD 도구는 무엇인가요?',
  },
  {
    id: 56,
    type: 'thread',
    authorId: 3,
    authorName: 'David',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-10-07 14:30',
    content: '회사에서 사용하는 자동화 툴은 무엇인가요?',
  },
  {
    id: 57,
    type: 'notification',
    authorId: 2,
    authorName: 'schedule',
    profileImageUrl: null,
    createdAt: '2021-10-06 12:20',
    content: '다음 주 목요일은 KSA 국경일입니다.',
  },
  {
    id: 58,
    type: 'thread',
    authorId: 4,
    authorName: 'Alice',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-10-05 09:10',
    content: '회사에서 사용하는 메신저는 무엇인가요?',
  },
  {
    id: 59,
    type: 'thread',
    authorId: 1,
    authorName: 'John',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-10-04 11:30',
    content: '회사에서 사용하는 클라우드 프로바이더는 무엇인가요?',
  },
  {
    id: 60,
    type: 'notification',
    authorId: 4,
    authorName: 'schedule',
    profileImageUrl: null,
    createdAt: '2021-10-03 16:40',
    content: '60 60 60 60 60 60 60 60 60 60 일정',
  },
  {
    id: 61,
    type: 'thread',
    authorId: 2,
    authorName: 'Alice',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-10-02 19:50',
    content: '회사에서 사용하는 IDE는 무엇인가요?',
  },
  {
    id: 62,
    type: 'thread',
    authorId: 3,
    authorName: 'David',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-10-01 15:00',
    content: '회사에서 사용하는 소프트웨어 개발 방법론은 무엇인가요?',
  },
  {
    id: 63,
    type: 'notification',
    authorId: 4,
    authorName: 'schedule',
    profileImageUrl: null,
    createdAt: '2021-09-30 13:10',
    content: '다음 주 금요일은 비정규직 조기 퇴근일입니다.',
  },
  {
    id: 64,
    type: 'thread',
    authorId: 1,
    authorName: 'John',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-09-29 09:20',
    content: '회사에서 사용하는 버전관리 도구는 무엇인가요?',
  },
  {
    id: 65,
    type: 'thread',
    authorId: 2,
    authorName: 'Alice',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-09-28 14:30',
    content: '회사에서 사용하는 시스템 모니터링 도구는 무엇인가요?',
  },
  {
    id: 66,
    type: 'notification',
    authorId: 3,
    authorName: 'schedule',
    profileImageUrl: null,
    createdAt: '2021-09-27 16:40',
    content: '다음 주 월요일은 KSA 대체공휴일입니다.',
  },
  {
    id: 67,
    type: 'thread',
    authorId: 4,
    authorName: 'Alice',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-09-26 08:50',
    content: '회사에서 사용하는 온라인 회의 도구는 무엇인가요?',
  },
  {
    id: 68,
    type: 'thread',
    authorId: 1,
    authorName: 'John',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-09-25 17:00',
    content: '회사에서 사용하는 채팅 봇 프레임워크는 무엇인가요?',
  },
  {
    id: 69,
    type: 'notification',
    authorId: 4,
    authorName: 'schedule',
    profileImageUrl: null,
    createdAt: '2021-09-24 19:20',
    content: '다음 주 목요일은 KSA 국경일입니다.',
  },
  {
    id: 70,
    type: 'thread',
    authorId: 2,
    authorName: 'Alice',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-09-23 15:30',
    content: '회사에서 사용하는 AWS 서비스는 무엇인가요?',
  },
  {
    id: 71,
    type: 'thread',
    authorId: 3,
    authorName: 'David',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-09-22 11:40',
    content: '회사에서 사용하는 GCP 서비스는 무엇인가요?',
  },
  {
    id: 72,
    type: 'notification',
    authorId: 1,
    authorName: 'schedule',
    profileImageUrl: null,
    createdAt: '2021-09-21 13:50',
    content: '다음 주 월요일은 개천절 입니다.',
  },
  {
    id: 73,
    type: 'thread',
    authorId: 4,
    authorName: 'Alice',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-09-20 08:20',
    content: '회사에서 사용하는 로깅 시스템은 무엇인가요?',
  },
  {
    id: 74,
    type: 'thread',
    authorId: 1,
    authorName: 'John',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-09-19 14:30',
    content: '회사에서 사용하는 모니터링 시스템은 무엇인가요?',
  },
  {
    id: 75,
    type: 'notification',
    authorId: 2,
    authorName: 'schedule',
    profileImageUrl: null,
    createdAt: '2021-09-18 17:40',
    content: '다음 주 월요일은 추석입니다.',
  },
  {
    id: 76,
    type: 'thread',
    authorId: 3,
    authorName: 'David',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-09-17 19:50',
    content: '회사에서 사용하는 클러스터링 시스템은 무엇인가요?',
  },
  {
    id: 77,
    type: 'thread',
    authorId: 4,
    authorName: 'Alice',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-09-16 11:30',
    content: '회사에서 사용하는 서버 OS는 무엇인가요?',
  },
  {
    id: 78,
    type: 'notification',
    authorId: 1,
    authorName: 'schedule',
    profileImageUrl: null,
    createdAt: '2021-09-15 10:20',
    content: '다음 주 목요일은 중추절입니다.',
  },
  {
    id: 79,
    type: 'thread',
    authorId: 2,
    authorName: 'Alice',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-09-14 19:50',
    content: '회사에서 사용하는 DNS 서버는 무엇인가요?',
  },
  {
    id: 80,
    type: 'thread',
    authorId: 1,
    authorName: 'John',
    profileImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZjvO1QuvfgCfQxBwwzmJcHIT5pTXIBGOLeyBDIbZknn6Dhkd40WrU0ZCdjt-IoXLzI0&usqp=CAU',
    createdAt: '2021-09-13 14:00',
    content:
      '80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 ',
  },
];

export const noticeThread: NoticeThread = {
  id: 1,
  authorId: 4,
  authorName: '대충 기본으로 들어가는 목 데이터',
  profileImageUrl: 'https://avatars.githubusercontent.com/u/87642422?v=4',
  createdAt: '2023-12-03 12:34',
  content: '중요 공지입니다! 다들 스트레칭하세요',
};
