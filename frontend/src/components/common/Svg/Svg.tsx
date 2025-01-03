import { type CSSProperties, type HTMLAttributes } from 'react';
import type { CSSProp } from 'styled-components';
import * as Icons from '~/assets/svg';
import * as S from './Svg.styled';

interface SvgProps extends HTMLAttributes<SVGElement> {
  type: keyof typeof Icons;
  fill?: string;
  stroke?: string;
  style?: CSSProperties;
  size?: string | number;
  width?: string;
  height?: string;
  css?: CSSProp;
}

const Svg = ({ type, fill, stroke, style, size, ...rest }: SvgProps) => {
  const SvgIcon = Icons[type];

  const svgProps = {
    style,
    ...(size ? { width: String(size), height: String(size) } : {}),
    ...(stroke ? { stroke } : {}),
  };

  return <S.Container $fill={fill} as={SvgIcon} {...svgProps} {...rest} />;
};

export default Svg;
