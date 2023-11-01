import * as S from './Error404.styled';
import { error404Image, error404TextImage } from '~/assets/webp';
import Text from '~/components/common/Text/Text';
import BackButton from '~/components/common/BackButton/BackButton';
import { PATH_NAME } from '~/constants/routes';
import { useCheckMobileWeb } from '~/hooks/useCheckMobileWeb';

interface Error404Props {
  isLoggedIn: boolean;
}

const Error404 = (props: Error404Props) => {
  const { isLoggedIn } = props;
  const isMobile = useCheckMobileWeb();
  const location = window.location.href;

  return (
    <S.Container>
      <S.ErrorImage src={error404Image} alt="해당 페이지를 찾을 수 없어요" />
      <S.ErrorDetails>
        {isMobile && location.includes('overview') ? (
          <Text size="xxl" weight="bold" css={S.errorText}>
            모바일에서는 이용할 수 없는 페이지에요!
          </Text>
        ) : (
          <>
            <S.ErrorTextImage src={error404TextImage} alt="404" />
            <Text size="xxl" weight="bold" css={S.errorText}>
              해당 페이지를 찾을 수 없어요!
            </Text>
          </>
        )}
        <BackButton
          href={
            isLoggedIn
              ? isMobile
                ? PATH_NAME.TEAM_CALENDAR
                : PATH_NAME.TEAM_OVERVIEW
              : PATH_NAME.LANDING
          }
          label={
            isLoggedIn
              ? isMobile
                ? '팀 캘린더 페이지로'
                : '모아보기 페이지로'
              : '랜딩 페이지로'
          }
        />
      </S.ErrorDetails>
    </S.Container>
  );
};

export default Error404;
