import { styled, css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  row-gap: 20px;

  width: 690px;

  @media (max-width: 750px) {
    & {
      width: 333px;
    }
  }

  @media (max-width: 450px) {
    & {
      scale: 0.8;
    }
  }
`;

export const ErrorImage = styled.img`
  width: 333px;
  height: 307px;
`;

export const ErrorDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 12px;

  width: 300px;
  height: auto;
`;

export const ErrorTextImage = styled.img`
  width: 231px;
  height: 102px;

  @media (max-width: 750px) {
    & {
      width: 162px;
      height: 71px;
    }
  }
`;

export const errorText = css`
  font-size: 24px;
  white-space: nowrap;
`;
