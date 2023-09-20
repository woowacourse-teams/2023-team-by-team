import { css } from 'styled-components';

export const imageAddButton = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 96px;
  height: 96px;

  border-radius: 12px;
  background-color: #dee1ff;

  transition: 0.2s;

  &:hover {
    background-color: #e8eaff;
  }

  & svg {
    color: #9792ff;
  }
`;
