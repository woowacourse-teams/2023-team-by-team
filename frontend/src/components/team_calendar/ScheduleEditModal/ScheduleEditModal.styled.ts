import { styled, css } from 'styled-components';
import type { CalendarSize } from '~/types/size';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Container = styled.div<{
  $calendarSize: CalendarSize;
  $isMobile: boolean;
}>`
  position: fixed;
  display: flex;
  flex-direction: column;
  ${({ $calendarSize, $isMobile }) => {
    if ($calendarSize === 'md' || $isMobile)
      return css`
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `;

    if ($calendarSize === 'sm')
      return css`
        top: 20%;
        left: 13.5%;
      `;
  }}

  ${({ $isMobile }) => {
    if ($isMobile)
      return css`
        width: 300px;
        padding: 10px 26px 20px;
      `;

    return css`
      width: 496px;
      min-height: 380px;
      padding: 20px 30px;
    `;
  }}

  border-radius: 10px;
  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;
  background-color: ${({ theme }) => theme.color.WHITE};

  & > form {
    display: flex;
    flex-direction: column;

    row-gap: ${({ $isMobile }) => ($isMobile ? '10px' : '20px')};
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
  margin-bottom: 22px;

  border-bottom: ${({ theme }) => `1px solid ${theme.color.GRAY300}`};
`;

export const TitleWrapper = styled.div`
  width: 100%;
  height: 44px;
`;

export const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;

  column-gap: 8px;
`;

export const TimeSelectContainer = styled.div<{ $isMobile: boolean }>`
  display: flex;

  width: 100%;
  height: ${({ $isMobile }) => ($isMobile ? '74px' : '40px')};

  ${({ $isMobile }) => {
    if ($isMobile)
      return css`
        flex-direction: column;
        gap: 4px;
      `;

    return css`
      align-items: center;
    `;
  }}
`;

export const InputWrapper = styled.div<{ $isMobile: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: ${({ $isMobile }) => !$isMobile && 'calc(100% - 100px)'};

  margin-left: ${({ $isMobile }) => !$isMobile && 'auto'};
`;

export const TeamNameContainer = styled.div`
  display: flex;
  align-items: center;

  height: 23px;

  gap: 5px;
`;

export const ControlButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
  height: 40px;
`;

export const title = css`
  padding: 10px 20px;

  border: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.GRAY200};

  font-size: 20px;
`;

export const closeButton = css`
  width: 22px;
  height: 38px;
  padding: 8px 0;
  margin-bottom: 4px;
`;

export const dateTimeLocalInput = css`
  border-radius: 4px;

  text-align: center;
`;

export const teamPlaceName = css`
  overflow: hidden;

  max-width: 250px;

  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const submitButton = css`
  width: 90px;
`;
