import { styled, css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: #00000070;
  backdrop-filter: blur(20px);
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
  font-size: 32px;
  color: ${({ theme }) => theme.color.WHITE};
  line-height: 40px;
`;

export const closeButton = css`
  width: 60px;
  height: 60px;
  padding: 5px;

  color: ${({ theme }) => theme.color.WHITE};

  & svg {
    width: 50px;
    height: 50px;
  }
`;
