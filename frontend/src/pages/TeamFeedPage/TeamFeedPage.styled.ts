import { css, styled } from 'styled-components';

export const Container = styled.div<{ $isMobile: boolean }>`
  overflow: hidden;
  position: relative;

  width: 100%;
  height: 100%;
  padding: ${({ $isMobile }) => ($isMobile ? 0 : '20px 30px 30px')};

  background-color: ${({ theme }) => theme.color.GRAY100};

  z-index: 0;
  container-type: inline-size;
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  height: 100%;

  & > form {
    display: flex;
    flex-direction: column;
  }
`;

export const ThreadContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  height: 100%;

  background-color: ${({ theme }) => theme.color.WHITE};
  border-bottom: 1px solid ${({ theme }) => theme.color.PURPLE};
`;

export const ThreadListWrapper = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: 16px;
  padding: 20px 30px 0;

  background-color: ${({ theme }) => theme.color.WHITE};
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 20px 30px;

  border: none;

  font-size: 16px;

  resize: none;

  &:focus {
    outline: none;
  }
`;

export const ButtonContainer = styled.div<{ $isMobile: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 20px;

  border-radius: ${({ $isMobile }) => ($isMobile ? 0 : '0 0 20px 20px')};
  background-color: ${({ theme }) => theme.color.WHITE};

  & > div {
    display: flex;
    align-items: center;

    column-gap: 10px;
  }
`;

export const MenuButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  bottom: 10px;

  width: 40px;
  margin-top: auto;
  margin-left: calc(100% - 64px);

  & > button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 50px;
    height: 50px;

    border-radius: 20px;
  }
`;

export const ThreadInputForm = styled.form`
  z-index: 1;
`;

export const scrollBottomButton = css`
  background-color: ${({ theme }) => theme.color.WHITE};
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

export const noPaddingButton = css`
  padding: 0;
`;

export const noticeText = css`
  margin-right: 10px;

  color: ${({ theme }) => theme.color.GRAY800};

  @container (width < 360px) {
    display: none;
  }
`;
