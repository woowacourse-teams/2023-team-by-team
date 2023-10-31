import { styled } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { css } from 'styled-components';

export const Nav = styled.nav<{ $isMobile: boolean }>`
  display: flex;
  ${({ $isMobile }) => {
    if ($isMobile)
      return css`
        width: 100$;
        height: 60px;
        padding: 10px;
      `;

    return css`
      width: 70px;
      height: 100%;
      padding: 14px 0 18px 0;
    `;
  }}
`;

export const MenuContainer = styled.div<{ $isMobile: boolean }>`
  display: flex;
  align-items: center;

  width: 100%;
  ${({ $isMobile }) => {
    if ($isMobile)
      return css`
        justify-content: space-between;
      `;

    return css`
      flex-direction: column;

      gap: 30px;
    `;
  }}
`;

export const MenuLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 62px;
  height: 62px;
  padding: 4px;

  border-radius: 50%;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.color.GRAY200};
  }

  & > span {
    margin-top: 3px;
    font-size: 13px;
  }

  &.active {
    background-color: ${({ theme }) => theme.color.GRAY200};
  }
`;

export const teamAddButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 62px;
  height: 62px;
  padding: 4px;

  border-radius: 50%;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.color.GRAY200};
  }
`;

export const teamAddText = css`
  font-size: 11px;
`;
