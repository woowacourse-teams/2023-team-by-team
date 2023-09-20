import * as S from './Error404.styled';
import { error404Image, error404TextImage } from '~/assets/webp';
import Text from '~/components/common/Text/Text';
import BackButton from '~/components/common/BackButton/BackButton';
import { PATH_NAME } from '~/constants/routes';

interface Error404Props {
  isLoggedIn: boolean;
}

const Error404 = (props: Error404Props) => {
  const { isLoggedIn } = props;

  return (
    <S.Container>
      <S.ErrorImage src={error404Image} alt="해당 페이지를 찾을 수 없어요" />
      <S.ErrorDetails>
        <S.ErrorTextImage src={error404TextImage} alt="404" />
        <Text size="xxl" weight="bold" css={S.errorText}>
          해당 페이지를 찾을 수 없어요!
        </Text>
        <BackButton
          href={isLoggedIn ? PATH_NAME.TEAM_OVERVIEW : PATH_NAME.LANDING}
          label={isLoggedIn ? '모아보기 페이지로' : '랜딩 페이지로'}
        />
      </S.ErrorDetails>
    </S.Container>
  );
};

export default Error404;
