import Button from '~/components/common/Button/Button';
import Skeleton from '~/components/common/Skeleton/Skeleton';
import { LogoIcon, TeamIcon } from '~/assets/svg';
import * as S from './HeaderFallback.styled';

const HeaderFallback = () => {
  return (
    <S.Container>
      <S.InnerContainer>
        <LogoIcon />
        <div>
          <S.TeamBadgePlaceholder>
            <Skeleton variant="circle" />
          </S.TeamBadgePlaceholder>
          <S.TeamPlaceMenuPlaceholder>
            <Skeleton />
          </S.TeamPlaceMenuPlaceholder>
        </div>
      </S.InnerContainer>

      <S.ButtonContainer>
        <Button type="button" variant="plain" disabled>
          <TeamIcon />
        </Button>

        <S.Divider />

        <Button type="button" variant="plain" disabled>
          <S.ProfileImagePlaceholder>
            <Skeleton variant="circle" />
          </S.ProfileImagePlaceholder>
        </Button>
      </S.ButtonContainer>
    </S.Container>
  );
};

export default HeaderFallback;
