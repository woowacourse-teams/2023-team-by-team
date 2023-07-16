import { styled, css } from 'styled-components';

export const Container = styled.div`
  width: 551px;
  height: 272px;
  padding: 30px 40px;

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
    white-space: normal;
    overflow: visible;
  }
`;

export const MenuWrapper = styled.div`
  display: flex;
  gap: 12px;
`;
