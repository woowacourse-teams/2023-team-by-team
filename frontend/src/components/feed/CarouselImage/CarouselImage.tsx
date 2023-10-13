import Text from '~/components/common/Text/Text';
import type { ThreadImage } from '~/types/feed';
import { useState } from 'react';
import * as S from './CarouselImage.styled';

interface CarouselImageProps {
  image: ThreadImage;
}

const CarouselImage = (props: CarouselImageProps) => {
  const { image } = props;
  const { isExpired, name, url } = image;
  const [errorMessage, setErrorMessage] = useState<string | null>(
    isExpired ? '이 이미지는 기간이 만료되었습니다.' : null,
  );

  return (
    <S.Container>
      {errorMessage ? (
        <Text as="span" size="xxl" css={S.errorText}>
          {errorMessage}
        </Text>
      ) : (
        <img
          src={url}
          alt={name}
          onError={() =>
            setErrorMessage(
              () =>
                '이미지를 표시하는 데 실패했습니다. 올바르지 않은 형식의 이미지거나, 이미지가 손상되었을 수 있습니다.',
            )
          }
        />
      )}
    </S.Container>
  );
};

export default CarouselImage;
