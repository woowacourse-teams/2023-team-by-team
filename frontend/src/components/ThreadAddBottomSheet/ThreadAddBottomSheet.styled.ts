import { css, styled } from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Container = styled.div<{ isClosing: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  left: 0;

  padding: 20px 20px;
  row-gap: 20px;

  width: 100%;
  min-height: 400px;

  border-top-left-radius: 40px;
  border-top-right-radius: 40px;

  animation: ${({ theme, isClosing }) =>
      isClosing ? theme.animation.slideDown : theme.animation.slideUp}
    0.3s ease-in-out forwards;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 200px;

  background-color: ${({ theme }) => theme.color.GRAY100};

  font-size: 16px;

  padding: 20px;

  border: none;
  border-radius: 4px;

  resize: none;
`;

export const ButtonWrapper = styled.div`
  margin-left: auto;
`;

export const title = css`
  font-size: 24px;
  font-weight: 700;
`;

export const button = css`
  width: 100px;
`;
