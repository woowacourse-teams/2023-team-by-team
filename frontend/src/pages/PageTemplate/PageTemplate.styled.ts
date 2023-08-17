import { styled } from 'styled-components';

export const PageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  overflow: hidden;
`;

export const Container = styled.div`
  display: flex;

  height: calc(100vh - 64px);
`;

export const PageWrapper = styled.main`
  flex: 1;
`;
