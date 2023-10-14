import * as S from './FeedDecoration.styled';
import { ArrowUpIcon, WriteIcon } from '~/assets/svg';

const FeedDecoration = () => {
  return (
    <S.Container>
      <S.SampleBadge />
      <S.SampleThread $css={S.sampleThread1}>
        <S.WritingLine $width="85%" $delay="1s" $color="light" />
        <S.WritingLine $width="55%" $delay="1.3s" $color="light" />
        <S.WritingLine $width="60%" $delay="1.6s" $color="light" />
      </S.SampleThread>
      <S.SampleThread $css={S.sampleThread2}>
        <S.WritingLine $width="70%" $delay="2.8s" $color="dark" />
        <S.WritingLine $width="30%" $delay="3.1s" $color="dark" />
      </S.SampleThread>
      <S.SampleThread $css={S.sampleThread3} />
      <S.CircleButtonsContainer>
        <S.CircleButton>
          <ArrowUpIcon />
        </S.CircleButton>
        <S.CircleButton>
          <WriteIcon />
        </S.CircleButton>
      </S.CircleButtonsContainer>
    </S.Container>
  );
};

export default FeedDecoration;
