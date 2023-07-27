import * as S from './MenuItem.styled';
import type { PropsWithChildren } from 'react';

const MenuItem = (props: PropsWithChildren) => {
  const { children } = props;

  return <S.Wrapper role="menuitem">{children}</S.Wrapper>;
};

export default MenuItem;
