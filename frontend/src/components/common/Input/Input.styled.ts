import { styled } from 'styled-components';
import type { InputProps } from './Input';

export const Input = styled.input<InputProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: 10px 20px;

  border: 1px solid ${({ theme }) => theme.color.GRAY200};
  border-radius: 10px;

  font-size: 16px;

  && {
    ${(props) => props.css}
  }
`;
