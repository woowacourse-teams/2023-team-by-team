import Button from '~/components/common/Button/Button';
import { useEffect, type PropsWithChildren } from 'react';
import { useMenu } from '~/hooks/useMenu';
import Text from '~/components/common/Text/Text';
import type { ButtonProps } from '~/components/common/Button/Button';

type MenuButtonProps = ButtonProps & {
  value?: string;
};

const MenuButton = (props: PropsWithChildren<MenuButtonProps>) => {
  const { children, value = '', ...rest } = props;
  const { isMenuOpen, handleMenuOpen, handleSelectedValueChange } = useMenu();

  useEffect(() => {
    if (value === '') {
      return;
    }

    handleSelectedValueChange(value);
  }, [value, handleSelectedValueChange]);

  return (
    <Button
      type="button"
      variant="plain"
      aria-haspopup="true"
      aria-expanded={isMenuOpen}
      onClick={handleMenuOpen}
      {...rest}
    >
      {children ? children : <Text as="span">{value}</Text>}
    </Button>
  );
};

export default MenuButton;
