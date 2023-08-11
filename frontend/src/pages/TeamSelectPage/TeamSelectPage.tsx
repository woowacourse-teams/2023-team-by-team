import Text from '~/components/common/Text/Text';
import * as S from './TeamSelectPage.styled';
import { teamSelectImage } from '~/assets/png';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_NAME } from '~/constants/routes';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';

const TeamSelectPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const teamPlaceId = localStorage.getItem(LOCAL_STORAGE_KEY.TEAM_PLACE_ID);

    if (teamPlaceId) navigate(PATH_NAME.TEAM_CALENDAR);
  }, [navigate]);

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

export default TeamSelectPage;
