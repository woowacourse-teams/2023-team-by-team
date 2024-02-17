import { styled, css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;

  width: 100%;
  height: 30px;
`;

export const Line = styled.div`
  flex-grow: 1;

  min-width: 8%;
  margin: auto;
  border-top: 1px solid ${({ theme }) => theme.color.BLUE300};
`;

export const Inner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 8px;

  max-width: 80%;
`;

export const IconWrapper = styled.div`
  width: 24px;
  height: 24px;

  & svg {
    width: 24px;
    height: 24px;

    color: ${({ theme }) => theme.color.BLUE500};
    fill: ${({ theme }) => theme.color.BLUE500};
  }
`;

export const content = css`
  overflow: hidden;

  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const time = css`
  display: block;

  color: ${({ theme }) => theme.color.BLUE500};
`;
