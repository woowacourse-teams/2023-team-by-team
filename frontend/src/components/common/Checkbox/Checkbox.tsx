import * as S from './Checkbox.styled';
import type { CSSProp } from 'styled-components';
import type { CheckboxSize } from '~/types/size';
import { CheckIcon } from '~/assets/svg';

export interface CheckboxProps {
  isChecked: boolean;
  color?: string;
  size?: CheckboxSize;
  css?: CSSProp;
  onChange?: () => void;
}

const Checkbox = (props: CheckboxProps) => {
  const { isChecked, onChange, color, size = 'md', css } = props;

  return (
    <label>
      <S.RealCheckbox type="checkbox" checked={isChecked} onChange={onChange} />
      <S.CustomCheckbox color={color} css={css} size={size}>
        <S.CheckIconWrapper size={size}>
          <CheckIcon />
        </S.CheckIconWrapper>
      </S.CustomCheckbox>
    </label>
  );
};

export default Checkbox;
