import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { css } from 'styled-components';

export const Nav = styled.nav`
  display: flex;

  width: 70px;
  height: 100%;
  padding: 14px 0 18px 0;
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  gap: 20px;
`;

export const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 64px;
  height: 64px;
  padding: 0;

  border-radius: 50%;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.color.GRAY200};
  }

  & > span {
    margin-top: 4px;
    font-size: 13px;
  }

  &:last-child > span {
    font-size: 11px;
  }
`;

export const exitButton = css`
  margin-top: auto;

  border-radius: 50%;

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme.color.GRAY200};
  }
`;
