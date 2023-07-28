import { styled } from 'styled-components';
import type { InputProps } from './Input';

export const InputWrapper = styled.input<InputProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: 6px;

  border: 1px solid ${({ theme }) => theme.color.GRAY200};

  font-size: 14px;

  && {
    ${(props) => props.css}
  }
`;
