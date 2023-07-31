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

  width: 100%;
  min-height: 400px;
  padding: 20px;
  row-gap: 20px;

  border-top-left-radius: 40px;
  border-top-right-radius: 40px;

  animation: ${({ theme, isClosing }) =>
      isClosing ? theme.animation.slideDown : theme.animation.slideUp}
    0.3s ease-in-out forwards;
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

export const ButtonWrapper = styled.div`
  display: flex;

  margin-left: auto;
  column-gap: 20px;
`;

export const title = css`
  font-size: 24px;
  font-weight: 700;
`;

export const notice = css`
  font-size: 18px;
  font-weight: 500;
`;

export const cancelButton = css`
  width: 100px;

  background-color: ${({ theme }) => theme.color.GRAY500};
`;

export const submitButton = css`
  width: 100px;
`;
