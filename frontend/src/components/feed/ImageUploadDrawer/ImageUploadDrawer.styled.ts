import { styled, css } from 'styled-components';

export const Container = styled.div<{ bottom: number }>`
  display: flex;
  position: absolute;
  bottom: 0;

  width: 100%;
  height: 136px;

  border-radius: 20px 20px 0 0;
  background: linear-gradient(30deg, #bfc3ff, #eaebff);

  transition: 0.35s;
  transform: translateY(${({ bottom }) => `-${bottom}px`});
`;

export const ContentWrapper = styled.div`
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
