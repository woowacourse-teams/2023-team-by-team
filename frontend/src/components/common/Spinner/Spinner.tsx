import type { SpinnerSize } from '~/types/size';
import * as S from './Spinner.styled';
import { arrayOf } from '~/utils/arrayOf';

export interface SpinnerProps {
  color?: string;
  size?: SpinnerSize;
}

const Spinner = (props: SpinnerProps) => {
  const { color, size = 'md' } = props;

  return (
    <S.Container>
      <S.Loader size={size}>
        {arrayOf(10).map((i) => (
          <S.Ball key={i} color={color} />
        ))}
      </S.Loader>
    </S.Container>
  );
};

export default Spinner;
