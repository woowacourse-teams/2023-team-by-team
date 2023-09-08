import { styled, css } from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`;

export const BubbleContainer = styled.div`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.MODAL};

  width: 200px;
  padding: 18px 22px 12px;

  background-color: ${({ theme }) => theme.color.WHITE};
  border-radius: 10px;

  transform: translate(36px, 64px);

  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;
`;

export const Triangle = styled.div`
  position: absolute;
  z-index: 2;
  top: -12px;
  left: 20%;

  width: 28px;
  height: 28px;

  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.WHITE};

  box-shadow: -1px 1px rgb(178 178 178 / 0.6);

  transform: rotate(135deg);
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 6px;
`;

export const BadgeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  position: relative;
  justify-items: center;
  row-gap: 14px;
`;

export const BadgeWrapper = styled.div<{ isClicked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 28px;
  height: 28px;

  border-radius: 50%;
  ${({ isClicked }) => {
    if (isClicked)
      return css`
        border: 2px solid ${({ theme }) => theme.color.GRAY350};
      `;
  }}

  cursor: pointer;
`;

export const colorEditButton = css`
  padding: 4px;

  font-size: 12px;
`;
