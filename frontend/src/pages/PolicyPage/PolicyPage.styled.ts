import { styled, css } from 'styled-components';

export const Container = styled.main`
  padding: 20px 30px;
`;

export const HeaderContainer = styled.header`
  height: 64px;
  padding: 0 14px;
`;

export const landingPageLinkButton = css`
  display: flex;
  align-items: center;

  padding: 0;
  column-gap: 20px;
`;

export const headerTitle = css`
  font-size: 32px;
  font-weight: 800;
  color: ${({ theme }) => theme.color.PRIMARY};
  text-align: right;
`;
