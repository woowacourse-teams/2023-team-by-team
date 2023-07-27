import { styled, css, keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  padding-top: 40px;
`;

export const expandButton = css`
  position: absolute;
  bottom: 0;
  right: 0;

  width: 100%;
  height: 100px;
  padding: 10px;

  background: linear-gradient(
    to top,
    ${({ theme }) => theme.color.WHITE} 50%,
    transparent
  );

  color: ${({ theme }) => theme.color.BLACK};
`;
