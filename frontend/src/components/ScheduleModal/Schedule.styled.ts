import { styled, css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.MODAL};
  gap: 28px;

  width: 551px;
  height: 272px;
  padding: 30px 40px 30px 40px;

  border-radius: 10px;

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

export const TeamColor = styled.div`
  width: 23px;
  height: 23px;

  border-radius: 100%;
  background-color: ${({ theme }) => theme.color.PRIMARY};
`;

export const TeamName = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  max-width: 200px;

  &:hover {
    overflow: visible;
  }
`;

export const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const EditWrapper = styled.div`
  cursor: pointer;
`;

export const DeleteWrapper = styled.div`
  cursor: pointer;
`;

export const CloseWrapper = styled.div`
  display: flex;
  align-items: center;

  padding-left: 6px;

  cursor: pointer;
`;

export const PeriodWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const Button = css`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;

  width: 96px;
  height: 42px;
  padding: 10px 30px;

  cursor: pointer;
`;
