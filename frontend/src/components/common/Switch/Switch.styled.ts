import styled, { css } from 'styled-components';
import theme from '~/styles/theme';
import type { SwitchSize } from '~/types/size';

const backgroundColor = (
  $isOn: boolean,
  $offColor?: string,
  $onColor?: string,
) => css`
  background-color: ${$isOn
    ? $onColor || theme.color.BLACK
    : $offColor || theme.color.GRAY200};
`;

const flexStyles = {
  column: css`
    flex-direction: column;
  `,
  row: css`
    flex-direction: row;
  `,
};

const sizeStyles = {
  xs: css`
    min-width: 28px;
    height: 16px;
  `,
  sm: css`
    min-width: 38px;
    height: 20px;
  `,
  md: css`
    min-width: 48px;
    height: 24px;
  `,
  lg: css`
    min-width: 58px;
    height: 30px;
  `,
};

const thumbSizes = {
  xs: css`
    font-size: 4px;
    width: 12px;
    height: 12px;
  `,
  sm: css`
    font-size: 6px;
    width: 16px;
    height: 16px;
  `,
  md: css`
    font-size: 8px;
    width: 20px;
    height: 20px;
  `,
  lg: css`
    font-size: 10px;
    width: 25px;
    height: 25px;
  `,
};

export const ContainerDiv = styled.div<{
  $descriptionPosition: 'top' | 'bottom' | 'left' | 'right';
}>`
  display: inline-flex;
  align-items: center;
  gap: 10px;

  ${({ $descriptionPosition }) =>
    ['top', 'bottom'].includes($descriptionPosition)
      ? flexStyles.column
      : flexStyles.row}
`;

export const Label = styled.label<{
  $size: SwitchSize;
}>`
  width: auto;
  display: flex;
  align-items: center;
  cursor: pointer;

  ${({ $size }) => sizeStyles[$size]}
`;

export const TrackDiv = styled.div<{
  $variant: 'solid' | 'raised';
  $isOn: boolean;
  $offColor: string | undefined;
  $onColor: string | undefined;
}>`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  transition: background 0.4s;
  background-color: ${({ $offColor }) =>
    $offColor ? $offColor : theme.color.GRAY200};

  ${({ $variant }) => {
    if ($variant === 'solid')
      return css`
        height: 100%;
      `;

    return css`
      height: 40%;
    `;
  }}

  ${({ $isOn, $offColor, $onColor }) =>
    backgroundColor($isOn, $offColor, $onColor)};
`;

export const LabelSpan = styled.span<{
  $size: SwitchSize;
  $isOn: boolean;
  $offColor: string | undefined;
  $onColor: string | undefined;
}>`
  font-size: 14px;
  white-space: nowrap;
  color: ${({ $isOn, $onColor, $offColor }) =>
    $isOn ? $onColor || theme.color.WHITE : $offColor || theme.color.GRAY700};
  flex-grow: 1;
  text-align: center;

  ${({ $size }) => {
    if ($size === 'sm') {
      return css`
        font-size: 12px;
      `;
    }

    if ($size === 'xs')
      return css`
        font-size: 8px;
      `;
  }}

  ${({ $isOn }) => {
    if ($isOn)
      return css`
        margin-left: 10px;
      `;

    return css`
      margin-right: 10px;
    `;
  }}


  ${({ $size, $isOn }) =>
    css`
      margin-${$isOn ? 'right' : 'left'}: calc(${
        $size === 'xs'
          ? '18px'
          : $size === 'sm'
          ? '23px'
          : $size === 'md'
          ? '28px'
          : '34px'
      });
    `};
`;

export const ThumbSpan = styled.span<{
  $variant: 'solid' | 'raised';
  $size: SwitchSize;
  $isOn: boolean;
  $offColor: string | undefined;
  $onColor: string | undefined;
}>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  ${({ $isOn, $offColor, $onColor }) =>
    backgroundColor(
      $isOn,
      $offColor ?? theme.color.WHITE,
      $onColor ?? theme.color.WHITE,
    )};

  ${({ $size }) => thumbSizes[$size]};

  ${({ $size, $isOn, $variant }) => {
    const isSolid = $variant === 'solid';
    const solidLeftPositions = {
      xs: 'calc(100% - 14px)',
      sm: 'calc(100% - 19px)',
      md: 'calc(100% - 23px)',
      lg: 'calc(100% - 29px)',
    };

    if (isSolid) {
      return css`
        left: ${$isOn
          ? solidLeftPositions[$size]
          : $size === 'xs'
          ? '2px'
          : '3px'};
        transition: left 0.4s;
      `;
    }

    return css`
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      left: 0;
      transition: transform 0.4s;
      ${$isOn && 'transform: translateX(142%);'}
    `;
  }}
`;

export const ToggleInput = styled.input.attrs({ type: 'checkbox' })`
  display: none;

  &:disabled + ${TrackDiv},&:disabled + ${ThumbSpan} {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
