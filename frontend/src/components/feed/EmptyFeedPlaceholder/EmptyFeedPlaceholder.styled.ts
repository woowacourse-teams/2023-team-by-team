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

  width: 380px;
`;

export const FeedEmptyImage = styled.img`
  width: 18%;
  margin-bottom: 10px;
`;

export const titleText = css`
  font-size: 28px;
  color: ${({ theme }) => theme.color.GRAY400};
`;

export const clickToAddText = css`
  font-size: 20px;
  color: ${({ theme }) => theme.color.GRAY500};
`;
