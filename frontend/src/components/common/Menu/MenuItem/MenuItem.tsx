import * as S from './MenuItem.styled';
import type { PropsWithChildren } from 'react';
import type { CSSProp } from 'styled-components';

export interface MenuItemProps {
  css?: CSSProp;
}

const MenuItem = (props: PropsWithChildren<MenuItemProps>) => {
  const { children, css } = props;

  return (
    <S.Wrapper role="menuitem" css={css}>
      {children}
    </S.Wrapper>
  );
};

export default MenuItem;
