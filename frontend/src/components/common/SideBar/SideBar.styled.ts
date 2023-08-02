import { css, styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 300px;
  height: 100%;
  padding: 12px 22px;
`;

export const highLight = css`
  display: inline-block;

  padding-right: 10px;
  box-shadow: inset 0 -11px 0 ${({ theme }) => theme.color.GRAY350};
`;
