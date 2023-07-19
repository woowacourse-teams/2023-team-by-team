import { css, styled } from 'styled-components';

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 280px;
  margin: 0 auto;
`;

export const CalendarBody = styled.div`
  margin-top: 24px;
`;

export const DaysOfWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const DayOfWeek = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 32px;

  &:nth-child(1) {
    color: ${({ theme }) => theme.color.RED};
  }

  &:nth-child(7) {
    color: ${({ theme }) => theme.color.PURPLE};
  }
`;

export const DateContainer = styled.div`
  & > div:nth-last-child(2) {
    & > div {
      border-bottom: none;
    }
  }
`;

export const DateView = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  height: 120px;

  background-color: ${({ theme }) => theme.color.WHITE};

  & > div {
    border-right: 2px solid ${({ theme }) => theme.color.GRAY200};
    border-bottom: 2px solid ${({ theme }) => theme.color.GRAY200};
  }

  & > div:nth-child(7n) {
    border-right: none;
  }
`;

export const ScheduleBarContainer = styled.div`
  position: relative;
`;

export const calendarTitle = css`
  font-size: 28px;
  font-weight: 600;
`;
