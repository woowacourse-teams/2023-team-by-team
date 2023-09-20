import { styled, css } from 'styled-components';

export const Container = styled.li`
  flex-shrink: 0;

  width: 96px;
  height: 96px;

  border-radius: 12px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 12px;

  object-fit: cover;
`;

export const viewButton = css`
  width: 100%;
  height: 100%;
  padding: 0;

  border-radius: 12px;
`;
