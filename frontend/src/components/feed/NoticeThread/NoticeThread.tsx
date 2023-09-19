import { useState } from 'react';
import * as S from './NoticeThread.styled';
import Text from '~/components/common/Text/Text';
import type { YYYYMMDDHHMM } from '~/types/schedule';
import { formatWriteTime } from '~/utils/formatWriteTime';
import type { NoticeSize } from '~/types/size';
import {
  ArrowExpandLessIcon,
  ArrowExpandMoreIcon,
  MegaphoneIcon,
} from '~/assets/svg';
import Button from '~/components/common/Button/Button';

interface NoticeThreadProps {
  authorName: string;
  createdAt: YYYYMMDDHHMM;
  content: string;
}

const NoticeThread = (props: NoticeThreadProps) => {
  const { authorName, createdAt, content } = props;

  const [noticeSize, setNoticeSize] = useState<NoticeSize>('md');

  const handleExpandMoreClick = () => {
    if (noticeSize === 'sm') setNoticeSize(() => 'md');

    if (noticeSize === 'md') setNoticeSize(() => 'lg');
  };

  const handleExpandLessClick = () => {
    if (noticeSize === 'lg') setNoticeSize(() => 'md');

    if (noticeSize === 'md') setNoticeSize(() => 'sm');
  };

  return (
    <S.Container noticeSize={noticeSize}>
      <S.BackgroundContainer noticeSize={noticeSize}>
        <S.InnerContainer
          noticeSize={noticeSize}
          aria-label={`${authorName}의 공지`}
        >
          <S.MegaphoneWrapper>
            <MegaphoneIcon />
          </S.MegaphoneWrapper>

          <S.ContentContainer noticeSize={noticeSize}>
            <Text size="xl" weight="semiBold" css={S.contentField(noticeSize)}>
              {content}
            </Text>
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
