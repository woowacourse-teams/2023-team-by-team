import { styled, css } from 'styled-components';
import theme from '~/styles/theme';
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
  display: flex;
  flex-direction: column;
  position: fixed;
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
      width: 380px;
      min-height: 300px;
      padding: 16px 20px;
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

    row-gap: 10px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
  height: 30px;
  margin-bottom: 18px;

  border-bottom: ${({ theme }) => `1px solid ${theme.color.GRAY300}`};
`;

export const TitleWrapper = styled.div`
  width: 100%;
  height: 38px;
`;

export const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;

export const ConvenientContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  column-gap: 8px;
`;

export const TimeSelectContainer = styled.div<{ $isMobile: boolean }>`
  display: flex;
  justify-content: space-between;

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

  width: ${({ $isMobile }) => !$isMobile && 'calc(100% - 70px)'};
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
  height: 38px;
`;

export const DescriptionDiv = styled.div<{ $isDescription: boolean }>`
  display: ${({ $isDescription }) => ($isDescription ? 'block' : 'none')};
`;

export const DescriptionTextarea = styled.textarea`
  display: inline-block;
  width: 100%;
  padding: 6px 10px;

  border: none;
  border-bottom: 1px solid ${theme.color.GRAY200};
  border-radius: 10px;

  font-size: 14px;
  resize: none;
  white-space: normal;
  overflow-wrap: break-word;
`;

export const WarnDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const title = css`
  padding: 10px 20px;

  border: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.GRAY200};

  font-size: 16px;
`;

export const closeButton = css`
  width: 24px;
  height: 24px;
  padding: 0;
  margin-bottom: 4px;

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const timetableButton = css`
  width: 150px;
  height: 40px;

  border: 1px solid ${({ theme }) => theme.color.GRAY200};
  border-radius: 4px;
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
  width: 76px;
  padding: 0;
`;

export const descriptionButton = ($isDescription: boolean) => css`
  display: flex;
  padding: 2px 6px;
  align-items: center;
  border: 1px solid ${theme.color.PRIMARY};
  border-radius: 25px;
  background-color: ${$isDescription ? theme.color.PRIMARY : theme.color.WHITE};
`;

export const descriptionText = ($isDescription: boolean) => css`
  color: ${$isDescription ? theme.color.WHITE : theme.color.PRIMARY};
`;

export const errorText = css`
  color: ${theme.color.RED};
`;
