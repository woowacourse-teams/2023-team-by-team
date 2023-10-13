import { styled, css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 100%;

  width: 100%;
  height: 100%;
  padding: 0 100px;

  & > img {
    max-width: 100%;
    max-height: 100%;
  }
`;

export const errorText = css`
  color: ${({ theme }) => theme.color.WHITE};
`;
