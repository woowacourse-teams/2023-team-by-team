import { styled, css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

export const PlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 18px;

  width: 100%;
  height: 100%;

  opacity: 0;
`;

export const LinkEmptyImage = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 10px;
`;

export const placeholderButton = css`
  width: 380px;
  height: 220px;
  padding: 0;
`;

export const titleText = css`
  font-size: 28px;
  color: ${({ theme }) => theme.color.GRAY400};
`;

export const clickToAddText = css`
  font-size: 20px;
  color: ${({ theme }) => theme.color.GRAY500};
`;
