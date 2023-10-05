import { useState } from 'react';
import Text from '~/components/common/Text/Text';
import Button from '~/components/common/Button/Button';
import Modal from '~/components/common/Modal/Modal';
import Spacing from '~/components/common/Spacing/Spacing';
import { useModal } from '~/hooks/useModal';
import { useFetchICalendarUrl } from '~/hooks/queries/useFetchICalendarUrl';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import { useToast } from '~/hooks/useToast';
import { ClipboardIcon, CloseIcon, QuestionIcon } from '~/assets/svg';
import { ICALENDAR_USER_GUIDE_URL } from '~/constants/calendar';
import * as S from './ICalendarModal.styled';

const ICalendarModal = () => {
  const { closeModal } = useModal();
  const { showToast } = useToast();
  const { teamPlaceId } = useTeamPlace();

  const { url } = useFetchICalendarUrl(teamPlaceId);

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const handleCopyButtonClick = () => {
    if (url === '') {
      return;
    }

    try {
      navigator.clipboard.writeText(url);
      showToast('success', '내보내기 링크가 복사되었습니다.');
    } catch (error) {
      showToast('error', '내보내기 링크 복사에 실패했습니다.');
    }
  };

  return (
    <Modal>
      <S.Backdrop onClick={closeModal} />
      <S.Container>
        <S.Header>
          <Text as="span" size="xl" weight="semiBold">
            일정 내보내기
          </Text>
          <Spacing size={8} direction="horizontal" />
          <S.TooltipWrapper
            onMouseEnter={() => setIsTooltipOpen(true)}
            onMouseLeave={() => setIsTooltipOpen(false)}
          >
            <QuestionIcon />
            {isTooltipOpen && (
              <>
                <S.Tooltip>
                  <Text>
                    팀바팀 캘린더에 등록된 일정을 <br />
                    구글 캘린더, 애플의 iCal 등에서 사용 가능한{' '}
                    <Text as="span" weight="semiBold">
                      .ics
                    </Text>{' '}
                    파일로 내보내는 기능입니다.
                  </Text>
                </S.Tooltip>
              </>
            )}
          </S.TooltipWrapper>
          <Button
            variant="plain"
            type="button"
            onClick={closeModal}
            aria-label="일정 내보내기 모달 닫기"
            css={S.closeButton}
          >
            <CloseIcon />
          </Button>
        </S.Header>

        <Spacing size={16} />

        <Text as="span" weight="semiBold">
          내보낸 파일(.ics) 경로
        </Text>
        <S.UrlContainer>
          <S.UrlWrapper>
            <div title={url}>
              <Text as="span">{url}</Text>
            </div>
          </S.UrlWrapper>
          <Button
            type="button"
            variant="plain"
            css={S.copyButton}
            onClick={handleCopyButtonClick}
            aria-label="일정 내보내기 링크 복사하기"
            disabled={url === ''}
          >
            <ClipboardIcon />
          </Button>
        </S.UrlContainer>

        <S.UserGuideLink
          href={ICALENDAR_USER_GUIDE_URL}
          target="_blank"
          rel="noreferrer"
        >
          <Text as="span" size="lg" weight="semiBold" css={S.shortCutText}>
            📘 내보낸 파일(.ics) 사용법
          </Text>
        </S.UserGuideLink>
      </S.Container>
    </Modal>
  );
};

export default ICalendarModal;
