import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { css } from 'styled-components';

export const Container = styled.div`
  display: flex;

  width: 100px;
  height: 100%;
  padding: 14px 0 18px 0;
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  gap: 30px;
`;

export const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 56px;
  height: 56px;
  padding: 0;

  border-radius: 50%;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.color.GRAY200};
  }
`;

export const exitButton = css`
  margin-top: auto;

  border-radius: 50%;

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme.color.GRAY200};
  }
`;
