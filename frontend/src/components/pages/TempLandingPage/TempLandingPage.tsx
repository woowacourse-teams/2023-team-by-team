import Text from '~/components/common/Text/Text';
import * as S from './TempLandingPage.styled';
import { teamSelectImage } from '~/assets/png';

const TempLandingPage = () => {
  return (
    <S.Container>
      <S.PlaceHolder>
        <img src={teamSelectImage} />
        <Text weight="bold" css={S.placeHolderText}>
          팀을 선택해 주세요
        </Text>
      </S.PlaceHolder>
    </S.Container>
  );
};

export default TempLandingPage;
