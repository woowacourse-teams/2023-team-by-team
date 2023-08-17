import { css, styled } from 'styled-components';
import type { ThreadSize } from '~/types/size';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 100%;
  height: 100%;
`;

export const ThreadContainer = styled.div<{ threadSize: ThreadSize }>`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 100%;
  height: 100%;
  padding: 10px ${({ threadSize }) => (threadSize === 'md' ? 54 : 40)}px 0;
  gap: 24px;

  background-color: ${({ theme }) => theme.color.GRAY100};

  overflow-x: hidden;
  overflow-y: auto;
`;

export const BottomSheetWrapper = styled.div`
  position: sticky;
  bottom: 0;

  width: 100%;
`;

export const MenuButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;

  position: sticky;
  bottom: 36px;

  width: 40px;
  margin-top: auto;
  margin-left: calc(100% - 14px);
  row-gap: 14px;

  & > button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 50px;
    height: 50px;

    border-radius: 20px;
  }
`;

export const scrollTopButton = css`
  background-color: ${({ theme }) => theme.color.WHITE};
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;
