import type { PropsWithChildren } from 'react';
import type { CSSProp } from 'styled-components';
import Text from '~/components/common/Text/Text';
import { useMenu } from '~/hooks/useMenu';
import * as S from './MenuItem.styled';

export interface MenuItemProps {
  value: string;
  css?: CSSProp;
}

const MenuItem = (props: PropsWithChildren<MenuItemProps>) => {
  const { children, value, css } = props;
  const { selectedValue } = useMenu();
  const isSelected = selectedValue === value;

  return (
    <>
      <S.Wrapper
        role="menuitem"
        css={css}
        className={isSelected ? 'selected' : ''}
      >
        {isSelected && (
          <Text as="span" css={S.checkMark}>
            ✓
          </Text>
        )}
        {children}
      </S.Wrapper>
    </>
  );
};

export default MenuItem;
