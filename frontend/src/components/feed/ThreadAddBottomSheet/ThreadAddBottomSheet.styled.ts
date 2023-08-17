import { css, styled } from 'styled-components';
import type { ThreadSize } from '~/types/size';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.3);
`;

export const Container = styled.div<{ isClosing: boolean }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;

  width: 100%;
  min-height: 400px;
  padding: 40px 24px 0;
  row-gap: 20px;

  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: ${({ theme }) => theme.color.WHITE};

  box-shadow: 0px -4px 12px rgba(0, 0, 0, 0.1);

  animation: ${({ theme, isClosing }) =>
      isClosing ? theme.animation.slideDown : theme.animation.slideUp}
    0.4s ease-in-out forwards;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NoticeWrapper = styled.div`
  display: flex;
  align-items: center;

  column-gap: 10px;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 20px;

  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.GRAY100};

  font-size: 16px;

  resize: none;
`;

export const ButtonWrapper = styled.div<{ size: ThreadSize }>`
  display: flex;
  ${({ size }) => {
    if (size === 'sm') {
      return css`
        justify-content: center;
        column-gap: 30px;
      `;
    }

    if (size === 'md') {
      return css`
        margin-left: auto;
        column-gap: 20px;
      `;
    }
  }}

  margin-top: 10px;
`;

export const title = (size: ThreadSize) => css`
  font-size: ${size === 'md' ? '24px' : '20px'};
  font-weight: 700;
`;

export const notice = (size: ThreadSize) => css`
  font-size: ${size === 'md' ? '18px' : '16px'};
  font-weight: 500;
`;

export const cancelButton = css`
  width: 100px;

  background-color: ${({ theme }) => theme.color.GRAY500};
`;

export const submitButton = css`
  width: 100px;
`;
