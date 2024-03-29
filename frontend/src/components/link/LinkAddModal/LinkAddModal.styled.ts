import { css, styled } from 'styled-components';
import type { LinkSize } from '~/types/size';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Container = styled.div<{
  $linkSize: LinkSize;
  $isMobile: boolean;
}>`
  position: fixed;
  display: flex;
  flex-direction: column;
  ${({ $linkSize }) => {
    if ($linkSize === 'md')
      return css`
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `;

    if ($linkSize === 'sm')
      return css`
        top: 96%;
        left: 14%;
        transform: translateY(-300px);
      `;
  }}

  ${({ $isMobile }) => {
    if ($isMobile)
      return css`
        width: 300px;
        padding: 10px 26px 20px;
      `;

    return css`
      width: 400px;
      padding: 18px 22px;
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
    row-gap: 20px;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
  height: 34px;
  margin-bottom: 22px;

  border-bottom: ${({ theme }) => `1px solid ${theme.color.GRAY300}`};
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ControlButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
  height: 38px;
`;

export const submitButton = css`
  width: 80px;
  padding: 0;
`;

export const closeButton = css`
  width: 28px;
  height: 28px;
  padding: 0;
  margin-bottom: 4px;

  svg {
    width: 28px;
    height: 28px;
  }
`;

export const title = css`
  padding: 10px 16px;

  border: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.GRAY200};

  font-size: 18px;
`;
