import { styled, css } from 'styled-components';

export const Container = styled.div<{ isOpen: boolean }>`
  display: flex;
  position: absolute;
  bottom: 46px;
  left: 30px;

  width: calc(100% - 60px);
  height: 136px;

  border-radius: 20px 20px 0 0;
  background: linear-gradient(30deg, #bfc3ff, #eaebff);

  transition: 0.35s;
  transform: translateY(${({ isOpen }) => (isOpen ? '-162px' : '0')});
`;

export const ContentWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  flex-grow: 1;
`;

export const CloseButtonWrapper = styled.div`
  width: 64px;
  height: 100%;
  padding: 14px;
`;

export const closeButton = css`
  width: 36px;
  height: 36px;
  padding: 0;

  svg {
    width: 36px;
    height: 36px;
  }

  svg > path {
    fill: #7f84ff;
  }
`;
