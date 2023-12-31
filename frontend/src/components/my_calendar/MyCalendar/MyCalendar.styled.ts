import { css, styled } from 'styled-components';

export const Container = styled.div`
  width: 260px;
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 10px 10px 10px;
  gap: 6px;
`;

export const DaysOfWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  height: 24px;
`;

export const ScheduleCircleWrapper = styled.div`
  display: flex;
  justify-content: center;

  padding-top: 2px;
  column-gap: 2px;
`;

export const DateView = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  height: 40px;

  background-color: ${({ theme }) => theme.color.WHITE};
`;

export const dayOfWeek = css`
  display: flex;
  justify-content: center;

  color: ${({ theme }) => theme.color.GRAY600};

  &:nth-child(1) {
    color: ${({ theme }) => theme.color.RED};
  }

  &:nth-child(7) {
    color: ${({ theme }) => theme.color.PURPLE};
  }
`;

export const monthButton = css`
  padding: 0;
  margin-top: 4px;
`;
