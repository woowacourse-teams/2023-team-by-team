import { styled, css, keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;

  width: 100%;
  height: 100%;
  padding: 50px;
`;

export const SampleBadge = styled.div`
  width: 36px;
  height: 36px;

  border-radius: 18px;
  background-color: ${({ theme }) => theme.color.BLUE600};
`;

export const CalendarHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 16px;

  width: 100%;
  height: 40px;
`;

export const CalendarContainer = styled.div`
  position: relative;

  width: 100%;
  height: 500px;
`;

export const CalendarTable = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;

  width: 100%;
  height: 100%;
`;

export const SampleCalendarBarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`;

export const SampleCalendarBar = styled.div<{
  row: number;
  column: number;
  length: number;
  level: number;
  roundedStart: boolean;
  roundedEnd: boolean;
  color: string;
}>`
  position: absolute;
  top: ${({ row, level }) =>
    `calc(${(row * 100) / 6}% + ${(level + 1) * 28 - 4}px)`};
  left: ${({ column }) => `${(column * 100) / 7}%`};

  width: ${({ length, roundedStart, roundedEnd }) =>
    `calc(${(length * 100) / 7}% - ${
      10 * ((roundedStart ? 1 : 0) + (roundedEnd ? 1 : 0))
    }px)`};
  height: 24px;
  margin-left: ${({ roundedStart }) => (roundedStart ? '10px' : '0')};

  border-radius: ${({ roundedStart, roundedEnd }) =>
    `${roundedStart ? '8px' : '0'} ${roundedEnd ? '8px 8px' : '0 0'} ${
      roundedStart ? '8px' : '0'
    }`};
  background-color: ${({ color }) => color};
`;

export const CalendarCell = styled.div`
  background-color: ${({ theme }) => theme.color.BLUE200};
`;

const backAndForth = keyframes`
  0% {
    top: 70%;
    left: 70%;
    opacity: 0;
  }
  14% {
    top: 70%;
    left: 70%;
    opacity: 1;
  }
  28% {
    top: 50%;
    left: 80%;
    opacity: 1;
  }
  42% {
    top: 50%;
    left: 80%;
    opacity: 0;
  }
  56% {
    top: 50%;
    left: 80%;
    opacity: 1;
  }
  70% {
    top: 70%;
    left: 70%;
    opacity: 1;
  }
  84% {
    top: 70%;
    left: 70%;
    opacity: 0;
  }
`;

export const MousePointer = styled.img<{ animation: boolean }>`
  position: absolute;
  top: 70%;
  left: 70%;

  width: 40px;

  opacity: 0;

  ${({ animation = true }) =>
    animation &&
    css`
      animation: ${backAndForth} 7s infinite;
    `};
`;

export const calendarHeaderText = css`
  color: ${({ theme }) => theme.color.BLUE400};

  font-weight: 600;
  font-size: 28px;
`;
