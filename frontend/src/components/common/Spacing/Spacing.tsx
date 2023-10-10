import * as S from './Spacing.styled';

export interface SpacingProps {
  size?: number;
  direction?: 'vertical' | 'horizontal';
}

const Spacing = (props: SpacingProps) => {
  const { size = 1, direction = 'vertical' } = props;

  return <S.SpacingRoot size={size} direction={direction} />;
};

export default Spacing;
