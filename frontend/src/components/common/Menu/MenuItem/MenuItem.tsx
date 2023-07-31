import * as S from './MenuItem.styled';
import type {
  ComponentPropsWithoutRef,
  MouseEventHandler,
  PropsWithChildren,
} from 'react';
import type { CSSProp } from 'styled-components';
import { useMenu } from '~/hooks/useMenu';

export interface MenuItemProps extends ComponentPropsWithoutRef<'li'> {
  css?: CSSProp;
}

const MenuItem = (props: PropsWithChildren<MenuItemProps>) => {
  const { children, onClick, css } = props;
  const { handleMenuOpen } = useMenu();

  const handleClick: MouseEventHandler<HTMLLIElement> = (e) => {
    onClick?.(e);
    handleMenuOpen();
  };

  // TODO: 현재 선택된 값으로 스크롤 이동
  return (
    <S.Wrapper role="menuitem" css={css} onClick={handleClick}>
      {children}
    </S.Wrapper>
  );
};

export default MenuItem;
