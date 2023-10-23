import { useEffect, type PropsWithChildren } from 'react';
import type { KeyboardEventHandler } from 'react';
import Button from '~/components/common/Button/Button';
import Text from '~/components/common/Text/Text';
import type { ButtonProps } from '~/components/common/Button/Button';
import { useMenu } from '~/hooks/useMenu';

type MenuButtonProps = ButtonProps & {
  value?: string;
};

const MenuButton = (props: PropsWithChildren<MenuButtonProps>) => {
  const { children, value = '', ...rest } = props;
  const { isMenuOpen, handleMenuOpen, handleSelectedValueChange } = useMenu();

  const handleKeyDown: KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (!['ArrowUp', 'ArrowDown'].includes(e.key)) {
      return;
    }

    e.preventDefault();

    if (!isMenuOpen) {
      handleMenuOpen();
    }
  };

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
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children ? children : <Text as="span">{value}</Text>}
    </Button>
  );
};

export default MenuButton;
