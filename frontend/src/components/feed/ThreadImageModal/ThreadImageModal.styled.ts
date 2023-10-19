import { styled, css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background: ${({ theme }) => theme.gradient.SMOOTH_BLACK};
  backdrop-filter: blur(10px);
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 80px;
  padding: 20px;
`;

export const CarouselWrapper = styled.div`
  overflow: hidden;
  flex: 1 0;
`;

export const PageIndicatorWrapper = styled.div`
  display: flex;
  justify-content: center;

  height: 110px;
`;

export const title = css`
  overflow: hidden;

  font-size: 26px;
  color: ${({ theme }) => theme.color.WHITE};
  line-height: 40px;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const closeButton = css`
  width: 48px;
  height: 48px;
  padding: 5px;

  color: ${({ theme }) => theme.color.WHITE};

  & svg {
    width: 38px;
    height: 38px;
  }
`;
