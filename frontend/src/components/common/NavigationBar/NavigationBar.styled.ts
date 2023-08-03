import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;

  width: 100px;
  height: 100%;
  padding-top: 14px;
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
