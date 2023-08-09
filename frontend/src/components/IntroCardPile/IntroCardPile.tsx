import * as S from './IntroCardPile.styled';

interface IntroCardPileProps {
  animation?: boolean;
}

const IntroCardPile = (props: IntroCardPileProps) => {
  const { animation = true } = props;

  return (
    <S.Container>
      <S.Card css={S.card1} />
      <S.Card css={S.card2} />
      <S.Card css={S.card3} />
    </S.Container>
  );
};

export default IntroCardPile;
