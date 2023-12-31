import { styled, css } from 'styled-components';

export const Container = styled.div<{ $width: string; $height: string }>`
  position: relative;

  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
`;

export const SlidesView = styled.div`
  overflow: hidden;

  width: 100%;
  height: 100%;
  padding: 20px 0;
`;

export const Slides = styled.div<{ $currentPage: number }>`
  display: flex;
  height: 100%;

  transition: 0.4s;
  transform: ${({ $currentPage }) => `translateX(-${$currentPage - 1}00%)`};
`;

const buttonWrapper = css`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;

  width: 90px;
  height: 100%;
`;

export const ArrowCircleLeftButtonWrapper = styled.div`
  ${buttonWrapper}

  left: 0;
`;

export const ArrowCircleRightButtonWrapper = styled.div`
  ${buttonWrapper}

  right: 0;
`;

export const closeButton = css`
  width: 40px;
  height: 40px;
`;

export const arrowButton = (disabled: boolean) => css`
  width: 90px;
  padding: 0;

  cursor: ${disabled ? 'not-allowed' : 'pointer'};

  & svg {
    width: 60px;
    height: 60px;
  }

  & svg > path {
    opacity: ${disabled ? 0.3 : 1};
    stroke: ${({ theme }) => theme.color.WHITE};
  }
`;
