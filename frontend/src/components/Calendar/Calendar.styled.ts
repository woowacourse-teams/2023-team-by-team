import { styled } from 'styled-components';

export const Container = styled.div``;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;

  width: 220px;
  margin: 0 auto;
`;

export const CalendarBody = styled.div`
  margin-top: 24px;

  & > div {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
`;

export const DateView = styled.div`
  min-height: 614px;

  & > div {
    border-right: 2px solid ${({ theme }) => theme.color.GRAY200};
    border-bottom: 2px solid ${({ theme }) => theme.color.GRAY200};
  }

  & > div:nth-child(7n) {
    border-right: none;
  }

  & > div:nth-last-child(-n + 7) {
    border-bottom: none;
  }
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
