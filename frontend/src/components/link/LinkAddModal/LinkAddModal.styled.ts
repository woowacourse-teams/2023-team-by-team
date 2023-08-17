import { css, styled } from 'styled-components';
import type { LinkSize } from '~/types/size';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Container = styled.div<{ linkSize: LinkSize }>`
  position: fixed;
  ${({ linkSize }) => {
    if (linkSize === 'md')
      return css`
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `;

    if (linkSize === 'sm')
      return css`
        top: 100%;
        left: 14%;
        transform: translateY(-300px);
      `;
  }}

  display: flex;
  flex-direction: column;

  width: 496px;
  height: 286px;
  padding: 20px 30px;

  border-radius: 10px;
  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;
  background-color: ${({ theme }) => theme.color.WHITE};

  & > form {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 100%;
  height: 30px;
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
  height: 40px;
`;

export const submitButton = css`
  width: 90px;
`;

export const closeButton = css`
  width: 22px;
  height: 38px;
  padding: 0;
`;

export const title = css`
  padding: 10px 20px;

  border: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.GRAY200};

  font-size: 20px;
`;
