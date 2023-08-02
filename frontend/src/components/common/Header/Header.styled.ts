import { css, styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  column-gap: 40px;
  height: 64px;
  padding: 0 23px;

  border-bottom: 2px solid ${({ theme }) => theme.color.GRAY200};

  & > div {
    display: flex;
    align-items: center;
    column-gap: 12px;
  }
`;

export const teamPlaceName = css`
  font-size: 24px;
  font-weight: bold;
`;
