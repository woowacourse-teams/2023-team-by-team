import { styled, css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.color.GRAY100};
`;

export const PlaceHolder = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;

  width: 270px;
  height: 270px;
`;

export const placeHolderText = css`
  font-size: 30px;
  text-align: center;
  color: ${({ theme }) => theme.color.GRAY400};
`;
