import { css, styled } from 'styled-components';
import type { DailyScheduleModalProps } from '~/components/DailyScheduleModal/DailyScheduleModal';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const Container = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  z-index: ${({ theme }) => theme.zIndex.MODAL};

  width: 300px;
  height: 338px;
  padding: 10px 20px 20px 20px;

  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.WHITE};

  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 38px;
  padding-bottom: 4px;
  margin-bottom: 12px;

  border-bottom: ${({ theme }) => `1px solid ${theme.color.GRAY300}`};
`;

export const ScheduleWrapper = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  overflow: auto;

  width: 100%;
  max-height: 80%;
  height: auto;

  gap: 10px;
`;

export const ScheduleBox = styled.div<Pick<DailyScheduleModalProps, 'color'>>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 40px;
  column-gap: 10px;

  background-color: ${({ color }) => color};
  border-radius: 4px;

  color: ${({ theme }) => theme.color.WHITE};

  cursor: pointer;

  &:hover {
    opacity: 0.8;
    transition: 0.2s;
  }
`;

export const closeButton = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 22px;
  height: 38px;
  padding: 8px 0;
`;

export const teamName = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  max-width: 200px;
`;
