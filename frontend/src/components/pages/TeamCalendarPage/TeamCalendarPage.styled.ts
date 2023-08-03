import { styled, css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  padding: 10px 80px 30px;
  gap: 10px;

  background-color: ${({ theme }) => theme.color.GRAY100};
`;

export const highLight = css`
  display: inline-block;

  padding-right: 10px;
  box-shadow: inset 0 -11px 0 ${({ theme }) => theme.color.GRAY350};
`;
