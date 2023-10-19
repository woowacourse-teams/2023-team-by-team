import { styled, css } from 'styled-components';

export const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 10px;

  height: 66px;
`;

export const NumericIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;

  height: 40px;
`;

export const DotIndicator = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 4px;
`;

export const Dot = styled.button<{ selected: boolean }>`
  width: 14px;
  height: 14px;

  border-radius: 50%;
  background-color: ${({ theme, selected }) =>
    selected ? theme.color.WHITE : theme.color.GRAY550};

  transition: 0.2s;
`;

export const currentPageText = css`
  color: ${({ theme }) => theme.color.WHITE};
  font-size: 34px;
  line-height: 34px;
`;

export const pageCountText = css`
  color: ${({ theme }) => theme.color.GRAY550};
  font-size: 24px;
  line-height: 30px;
`;
