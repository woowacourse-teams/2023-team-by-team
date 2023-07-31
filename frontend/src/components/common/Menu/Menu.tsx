import { MenuProvider } from '~/components/common/Menu/MenuContext';
import type { PropsWithChildren } from 'react';

const Menu = (props: PropsWithChildren) => {
  const { children } = props;

  return <MenuProvider>{children}</MenuProvider>;
};

export default Menu;
