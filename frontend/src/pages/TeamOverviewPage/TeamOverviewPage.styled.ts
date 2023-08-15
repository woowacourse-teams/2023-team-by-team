import { styled } from 'styled-components';

export const Container = styled.main`
  display: grid;
  grid-template-rows: 50% 50%;
  grid-template-columns: 60% 40%;
  grid-template-areas:
    'calendar feed'
    'link feed';
  overflow: hidden;

  width: 100%;
  height: 100%;
  padding: 20px;

  background-color: ${({ theme }) => theme.color.GRAY100};
`;

export const TeamCalendarSection = styled.section`
  position: relative;
  grid-area: calendar;
  overflow: auto;

  & > div {
    overflow-y: auto;
  }
`;

export const TeamLinkSection = styled.section`
  position: relative;
  grid-area: link;
`;

export const TeamFeedSection = styled.section`
  position: relative;
  grid-area: feed;
  overflow: auto;
`;
