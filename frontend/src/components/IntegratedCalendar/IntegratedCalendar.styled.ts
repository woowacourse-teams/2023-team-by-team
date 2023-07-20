import { styled } from 'styled-components';

export const Container = styled.div`
  width: 400px;

  border: 1px solid ${({ theme }) => theme.color.GRAY200};
  border-radius: 8px;
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 4px 10px 0 10px;
`;

export const DaysOfWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  border-bottom: 2px solid ${({ theme }) => theme.color.GRAY200};
`;

export const DayOfWeek = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.color.GRAY600};
`;

export const ScheduleBarContainer = styled.div`
  position: relative;
`;

export const DateView = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  height: 70px;

  background-color: ${({ theme }) => theme.color.WHITE};

  & > div {
    border-right: 2px solid ${({ theme }) => theme.color.GRAY200};
    border-bottom: 2px solid ${({ theme }) => theme.color.GRAY200};
  }

  & > div:nth-child(7n) {
    border-right: none;
  }
`;
