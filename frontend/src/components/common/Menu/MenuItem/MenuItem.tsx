import * as S from './MenuItem.styled';
import type { PropsWithChildren } from 'react';
import type { CSSProp } from 'styled-components';
import { useMenu } from '~/hooks/useMenu';

export interface MenuItemProps {
  value: string;
  css?: CSSProp;
}

const MenuItem = (props: PropsWithChildren<MenuItemProps>) => {
  const { children, value, css } = props;
  const { selectedValue } = useMenu();

  return (
    <S.Wrapper
      role="menuitem"
      css={css}
      className={selectedValue === value ? 'selected' : ''}
    >
      {children}
    </S.Wrapper>
  );
};

export default MenuItem;
