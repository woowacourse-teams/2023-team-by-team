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

export const TeamColorBadge = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.PURPLE};
`;

export const teamPlaceName = css`
  font-size: 24px;
  font-weight: bold;
`;
