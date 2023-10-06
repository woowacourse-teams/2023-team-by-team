import { css, styled } from 'styled-components';

export const Aside = styled.aside`
  display: flex;
  flex-direction: column;

  width: 300px;
  height: 100%;
  padding: 24px 22px;
  row-gap: 28px;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;

  &:first-child {
    row-gap: 10px;
  }

  &:last-child {
    row-gap: 20px;
  }
`;

export const highLight = css`
  display: inline-block;

  padding-right: 10px;
  box-shadow: inset 0 -8px 0 ${({ theme }) => theme.color.GRAY350};

  font-weight: 600;
`;
