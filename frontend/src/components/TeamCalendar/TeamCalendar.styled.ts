import { css, styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  padding: 0 10px;
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;

  margin-left: 30px;
`;

export const DaysOfWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  height: 24px;

  border-bottom: 2px solid ${({ theme }) => theme.color.GRAY200};
`;

export const DayOfWeek = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 16px;

  &:nth-child(1) {
    color: ${({ theme }) => theme.color.RED};
  }

  &:nth-child(7) {
    color: ${({ theme }) => theme.color.PURPLE};
  }
`;

export const DateView = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 110px;

  background-color: ${({ theme }) => theme.color.WHITE};

  border-left: 2px solid ${({ theme }) => theme.color.GRAY200};

  & > div {
    border-right: 2px solid ${({ theme }) => theme.color.GRAY200};
    border-bottom: 2px solid ${({ theme }) => theme.color.GRAY200};
  }
`;

export const ScheduleBarContainer = styled.div`
  position: relative;
`;

export const calendarTitle = css`
  font-size: 24px;
  font-weight: 600;
`;

export const scheduleAddButton = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 30px;
  height: 30px;
  padding: 4px;

  font-size: 24px;
`;
