import { css, styled } from 'styled-components';
import type { CalendarSize } from '~/types/size';

export const Container = styled.div<{ $calendarSize: CalendarSize }>`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  padding: 0 ${({ $calendarSize }) => ($calendarSize === 'md' ? 10 : 0)}px;
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CalendarGrid = styled.div`
  position: relative;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const FeatureButtonContainer = styled.div`
  display: flex;
  align-items: center;

  column-gap: 8px;
`;

export const DaysOfWeek = styled.div<{ $calendarSize: CalendarSize }>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  height: ${({ $calendarSize }) => ($calendarSize === 'md' ? 24 : 20)}px;

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

export const DateView = styled.div<{ $calendarSize: CalendarSize }>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: ${({ $calendarSize }) =>
    $calendarSize === 'md' ? 110 : 80}px;

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

export const calendarTitle = (size: CalendarSize) => css`
  font-size: ${size === 'md' ? 24 : 18}px;
`;

export const scheduleAddButton = (calendarSize: CalendarSize) => css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${calendarSize === 'md' ? 30 : 24}px;
  height: ${calendarSize === 'md' ? 30 : 24}px;
  padding: 4px;

  font-size: 24px;
`;

export const arrowButton = (calendarSize: CalendarSize) => css`
  ${calendarSize === 'sm' && 'padding: 4px 8px'}
`;

export const exportButton = (calendarSize: CalendarSize) => css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${calendarSize === 'md' ? 30 : 24}px;
  height: ${calendarSize === 'md' ? 30 : 24}px;
  padding: 4px;

  background-color: ${({ theme }) => theme.color.GRAY500};
`;
