import { css, styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;

  width: 100%;
  max-height: 700px;
  height: auto;

  gap: 30px;
`;

export const lastThreadText = css`
  display: flex;
  align-self: center;
`;
