import { styled, css } from 'styled-components';

export const Container = styled.div`
  display: inline-block;
  position: relative;

  width: 96px;
  height: 96px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 12px;

  object-fit: cover;
`;

export const deleteButton = css`
  position: absolute;
  top: -4px;
  right: -4px;

  width: 30px;
  height: 30px;
  padding: 0;

  border-radius: 4px;
  box-shadow: 0 3px 6px ${({ theme }) => theme.color.GRAY400};
  background-color: ${({ theme }) => theme.color.GRAY100};

  & svg {
    width: 24px;
  }

  & svg > path {
    width:;
  }
`;
