import { styled, css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  padding: 10px 80px 30px;
  gap: 10px;

  background-color: ${({ theme }) => theme.color.GRAY100};

  @media screen and (max-width: 1320px) {
    padding: 10px 50px 30px;
  }

  @media screen and (max-width: 1000px) {
    padding: 10px 10px 30px;
  }

  @media screen and (max-width: 660px) {
    padding: 10px 10px 30px;
  }
`;

export const highLight = css`
  display: inline-block;

  padding-right: 10px;
  box-shadow: inset 0 -11px 0 ${({ theme }) => theme.color.GRAY350};
`;
