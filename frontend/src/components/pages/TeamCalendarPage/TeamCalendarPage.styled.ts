import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;

  color: ${({ theme }) => theme.color.BLACK};

  overflow: hidden;
`;

export const CalendarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: calc(100vh - 64px);
`;

export const IntegratedCalendarWrapper = styled.div`
  margin-top: 20px;
`;
