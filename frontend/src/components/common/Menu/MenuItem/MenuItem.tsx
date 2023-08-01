import * as S from './MenuItem.styled';
import type {
  ComponentPropsWithoutRef,
  MouseEventHandler,
  PropsWithChildren,
} from 'react';
import type { CSSProp } from 'styled-components';
import { useMenu } from '~/hooks/useMenu';

export interface MenuItemProps extends ComponentPropsWithoutRef<'li'> {
  value: string;
  css?: CSSProp;
}

const MenuItem = (props: PropsWithChildren<MenuItemProps>) => {
  const { children, value, onClick, css } = props;
  const { selectedValue, handleMenuOpen } = useMenu();

  const handleClick: MouseEventHandler<HTMLLIElement> = (e) => {
    onClick?.(e);
    handleMenuOpen();
  };

  return (
    <S.Wrapper
      role="menuitem"
      css={css}
      onClick={handleClick}
      className={selectedValue === value ? 'selected' : ''}
    >
      {children}
    </S.Wrapper>
  );
};

export default MenuItem;
