import { styled, css } from 'styled-components';

export const Container = styled.div`
  display: flex;

  width: 70px;
  height: 100%;
  padding-top: 80px;
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  gap: 30px;
`;

export const menuIcon = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 56px;
  height: 56px;
  padding: 0;

  border-radius: 50%;

  &:hover {
    background-color: ${({ theme }) => theme.color.GRAY200};
  }
`;
