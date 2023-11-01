import { useState } from 'react';
import Text from '~/components/common/Text/Text';
import Button from '~/components/common/Button/Button';
import ThumbnailList from '../ThumbnailList/ThumbnailList';
import type { YYYYMMDDHHMM } from '~/types/schedule';
import { formatWriteTime } from '~/utils/formatWriteTime';
import type { NoticeSize } from '~/types/size';
import type { ThreadImage } from '~/types/feed';
import {
  ArrowExpandLessIcon,
  ArrowExpandMoreIcon,
  MegaphoneIcon,
} from '~/assets/svg';
import * as S from './NoticeThread.styled';
import { useCheckMobileWeb } from '~/hooks/useCheckMobileWeb';

interface NoticeThreadProps {
  authorName: string;
  createdAt: YYYYMMDDHHMM;
  content: string;
  images: ThreadImage[];
  onClickImage: (images: ThreadImage[], selectedImage: number) => void;
}

const NoticeThread = (props: NoticeThreadProps) => {
  const { authorName, createdAt, content, images, onClickImage } = props;
  const isMobile = useCheckMobileWeb();
  const [noticeSize, setNoticeSize] = useState<NoticeSize>('sm');

  const handleExpandMoreClick = () => {
    if (noticeSize === 'sm') setNoticeSize(() => 'md');

    if (noticeSize === 'md') setNoticeSize(() => 'lg');
  };

  const handleExpandLessClick = () => {
    setNoticeSize(() => 'sm');
  };

  return (
    <S.Container $noticeSize={noticeSize} $isMobile={isMobile}>
      <S.BackgroundContainer $noticeSize={noticeSize} $isMobile={isMobile}>
        <S.InnerContainer
          $noticeSize={noticeSize}
          aria-label={`${authorName}의 공지`}
        >
          <S.MegaphoneWrapper>
            <MegaphoneIcon />
          </S.MegaphoneWrapper>

          <S.ContentContainer $noticeSize={noticeSize}>
            <Text size="lg" weight="semiBold" css={S.contentField(noticeSize)}>
              {content}
            </Text>
            {images.length > 0 && noticeSize === 'lg' && (
              <ThumbnailList
                mode="view"
                size="sm"
                images={images}
                onClick={onClickImage}
              />
            )}
            {noticeSize !== 'sm' && (
              <S.AuthorInfo>
                <Text size="sm" weight="semiBold" css={S.authorInfoText}>
                  {authorName}
                </Text>
                <S.Divider />
                <time>
                  <Text size="xs" css={S.timeInfoText}>
                    {formatWriteTime(createdAt)}
                  </Text>
                </time>
              </S.AuthorInfo>
            )}
          </S.ContentContainer>
        </S.InnerContainer>
        <S.ArrowContainer>
          <Button
            type="button"
            variant="plain"
            disabled={noticeSize === 'sm'}
            onClick={handleExpandLessClick}
            css={S.arrowButton}
            aria-label="공지 접기"
          >
            <S.ArrowIcon disabled={noticeSize === 'sm'}>
              <ArrowExpandLessIcon />
            </S.ArrowIcon>
          </Button>
          <Button
            type="button"
            variant="plain"
            disabled={noticeSize === 'lg'}
            onClick={handleExpandMoreClick}
            css={S.arrowButton}
            aria-label="공지 펼치기"
          >
            <S.ArrowIcon disabled={noticeSize === 'lg'}>
              <ArrowExpandMoreIcon />
            </S.ArrowIcon>
          </Button>
        </S.ArrowContainer>
      </S.BackgroundContainer>
    </S.Container>
  );
};

export default NoticeThread;
