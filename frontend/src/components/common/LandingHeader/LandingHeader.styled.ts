import { styled, css } from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  height: 64px;
  padding: 0 14px;
`;

export const LandingPageLink = styled(Link)`
  display: flex;
  align-items: center;
  column-gap: 20px;
`;

export const headerTitle = css`
  font-size: 32px;
  font-weight: 800;
  color: ${({ theme }) => theme.color.PRIMARY};
  text-align: right;
`;
