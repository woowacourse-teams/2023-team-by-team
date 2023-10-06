import styled, { css } from 'styled-components';
import type { ICalendarModalProps } from '~/components/team_calendar/ICalendarModal/ICalendarModal';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Container = styled.div<ICalendarModalProps>`
  position: fixed;
  display: flex;
  flex-direction: column;
  ${({ calendarSize }) => {
    if (calendarSize === 'md') {
      return css`
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `;
    }

    if (calendarSize === 'sm') {
      return css`
        top: 25%;
        left: 14.4%;
      `;
    }
  }}

  width: 400px;
  min-height: 200px;
  padding: 20px;

  border-radius: 8px;
  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;
  background-color: ${({ theme }) => theme.color.WHITE};
`;

export const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  & > button {
    margin-left: auto;
  }
`;

export const TooltipWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Tooltip = styled.div`
  position: absolute;
  top: 30px;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 320px;
  height: 100px;
  padding: 10px 20px;

  border: 1px solid ${({ theme }) => theme.color.GRAY300};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.WHITE};

  & > p {
    line-height: 1.3;
  }
`;

export const UrlContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 1px solid ${({ theme }) => theme.color.GRAY300};
  border-radius: 8px;

  margin: 10px 0 20px 0;
`;

export const UrlWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 90%;
  height: 40px;
  padding: 0 8px;

  & > div {
    width: 100%;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const UserGuideLink = styled.a`
  width: 220px;
`;

export const closeButton = css`
  padding: 0;
`;

export const copyButton = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 40px;
  padding: 0;

  background-color: ${({ theme }) => theme.color.GRAY100};
  border-radius: 0 8px 8px 0;
`;

export const shortCutText = css`
  color: ${({ theme }) => theme.color.GRAY800};
`;
