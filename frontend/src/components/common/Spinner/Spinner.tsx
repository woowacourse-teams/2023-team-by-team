import type { SpinnerSize } from '~/types/size';
import * as S from './Spinner.styled';

export interface SpinnerProps {
  color?: string;
  size?: SpinnerSize;
}

const Spinner = (props: SpinnerProps) => {
  const { color, size = 'md' } = props;

  return (
    <S.Container>
      <S.Loader size={size}>
        <S.Ball color={color} />
        <S.Ball color={color} />
        <S.Ball color={color} />
        <S.Ball color={color} />
        <S.Ball color={color} />
        <S.Ball color={color} />
        <S.Ball color={color} />
        <S.Ball color={color} />
        <S.Ball color={color} />
        <S.Ball color={color} />
      </S.Loader>
    </S.Container>
  );
};

export default Spinner;
