import { styled } from 'styled-components';

export const Container = styled.div`
  position: fixed;
  left: 50%;
  bottom: 40px;

  display: flex;
  flex-direction: column-reverse;

  row-gap: 10px;

  transform: translateX(-50%);

  z-index: ${({ theme }) => theme.zIndex.TOAST};
`;
