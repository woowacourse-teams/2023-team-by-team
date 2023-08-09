import { css, styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 300px;
  height: 100%;
  padding: 20px 22px;
  row-gap: 18px;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 18px;
`;

export const highLight = css`
  display: inline-block;

  padding-right: 10px;
  box-shadow: inset 0 -8px 0 ${({ theme }) => theme.color.GRAY350};

  font-weight: 600;
`;
