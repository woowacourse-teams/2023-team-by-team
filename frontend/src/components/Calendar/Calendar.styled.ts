import { styled } from 'styled-components';

export const CalendarHeader = styled.div``;

export const CalendarBody = styled.div``;

export const DateView = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const DayOfWeek = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 32px;
`;
