import { styled } from 'styled-components';

export const PageContainer = styled.div`
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  overflow: hidden;
`;

export const PageWrapper = styled.main`
  flex: 1;

  height: calc(var(--vh, 1vh) * 100 - 150px);
`;
