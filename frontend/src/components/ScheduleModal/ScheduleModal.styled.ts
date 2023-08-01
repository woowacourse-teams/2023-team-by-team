import { styled, css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  z-index: ${({ theme }) => theme.zIndex.MODAL};
  gap: 28px;

  width: 551px;
  height: 272px;
  padding: 20px 30px 30px 40px;

  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.WHITE};

  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TeamWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

export const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const PeriodWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const teamName = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  max-width: 200px;
`;

export const menuIcon = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 42px;
  height: 42px;

  padding: 0;

  border-radius: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.color.GRAY100};
  }
`;

export const closeButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;

  width: 96px;
  height: 42px;
  padding: 10px 30px;

  cursor: pointer;
`;
