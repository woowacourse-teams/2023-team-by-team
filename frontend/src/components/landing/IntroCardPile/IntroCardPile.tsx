import { useState, useRef } from 'react';
import * as S from './IntroCardPile.styled';
import TeamCalendarDecoration from '../TeamCalendarDecoration/TeamCalendarDecoration';
import FeedDecoration from '~/components/landing/FeedDecoration/FeedDecoration';
import FileDriveDecoration from '~/components/landing/FileDriveDecoration/FileDriveDecoration';
import { CARD_COUNT } from '~/constants/landing';

const IntroCardPile = () => {
  const [decorationNo, setDecorationNo] = useState(0);
  const blindRef = useRef<HTMLDivElement>(null);

  const handleAnimationIteration = () => {
    setDecorationNo((prev) => (prev + 1) % CARD_COUNT);
  };

  return (
    <S.Container>
      <S.Card css={S.card1} />
      <S.Card css={S.card2} />
      <S.Card css={S.card3}>
        {decorationNo === 0 ? (
          <TeamCalendarDecoration />
        ) : decorationNo === 1 ? (
          <FeedDecoration />
        ) : (
          <FileDriveDecoration />
        )}
        <S.Blind
          ref={blindRef}
          onAnimationIteration={handleAnimationIteration}
        />
      </S.Card>
    </S.Container>
  );
};

export default IntroCardPile;
