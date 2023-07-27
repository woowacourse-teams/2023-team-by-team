import Button from '~/components/common/Button/Button';
import type { ButtonProps } from '~/components/common/Button/Button';
import type { PropsWithChildren } from 'react';
import { useMenu } from '~/hooks/useMenu';

type MenuButtonProps = ButtonProps;

const MenuButton = (props: PropsWithChildren<MenuButtonProps>) => {
  const { children, ...rest } = props;
  const { isMenuOpen, handleMenuOpen } = useMenu();

  return (
    <Button
      type="button"
      variant="plain"
      aria-haspopup="true"
      aria-expanded={isMenuOpen}
      onClick={handleMenuOpen}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default MenuButton;
