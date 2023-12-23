import * as S from './ScheduleAddModal.styled';
import { useModal } from '~/hooks/useModal';
import { CloseIcon } from '~/assets/svg';
import Modal from '~/components/common/Modal/Modal';
import Text from '../../common/Text/Text';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { useScheduleAddModal } from '~/hooks/schedule/useScheduleAddModal';
import Checkbox from '~/components/common/Checkbox/Checkbox';
import TeamBadge from '~/components/team/TeamBadge/TeamBadge';
import TimeTableMenu from '~/components/team_calendar/TimeTableMenu/TimeTableMenu';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import { useRef, useEffect } from 'react';
import type { CalendarSize } from '~/types/size';
import { getIsMobile } from '~/utils/getIsMobile';

interface ScheduleAddModalProps {
  calendarSize?: CalendarSize;
  clickedDate: Date;
}

const ScheduleAddModal = (props: ScheduleAddModalProps) => {
  const { clickedDate, calendarSize = 'md' } = props;
  const { closeModal } = useModal();
  const { teamPlaceColor, displayName } = useTeamPlace();
  const isMobile = getIsMobile();
  const {
    schedule,
    isAllDay,
    times,
    handlers: {
      handleScheduleChange,
      handleScheduleBlur,
      handleIsAllDayChange,
      handleStartTimeChange,
      handleEndTimeChange,
      handleScheduleSubmit,
    },
  } = useScheduleAddModal(clickedDate);

  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  return (
    <Modal>
      <S.Backdrop onClick={closeModal} />
      <S.Container $calendarSize={calendarSize} $isMobile={isMobile}>
        <S.Header>
          <Button
            variant="plain"
            type="button"
            onClick={closeModal}
            css={S.closeButton}
            aria-label="일정 등록 모달 닫기"
          >
            <CloseIcon />
          </Button>
        </S.Header>
        <form onSubmit={handleScheduleSubmit}>
          <S.TitleWrapper>
            <Input
              width="100%"
              height="100%"
              placeholder="일정 제목을 입력해 주세요."
              css={S.title}
              name="title"
              maxLength={250}
              value={schedule.title}
              ref={titleInputRef}
              required
              onChange={handleScheduleChange}
            />
          </S.TitleWrapper>

          <S.TimeSelectContainer $isMobile={isMobile}>
            <Text size="xl" weight="semiBold">
              일정 시작
            </Text>
            <S.InputWrapper $isMobile={isMobile}>
              <Input
                width={isAllDay ? '100%' : '50%'}
                height="40px"
                type="date"
                css={S.dateTimeLocalInput}
                name="startDate"
                value={schedule.startDate}
                onChange={handleScheduleChange}
                onBlur={handleScheduleBlur}
                aria-label={`일정 시작 일자는 ${schedule.startDate} 입니다`}
                required
              />
              {!isAllDay && (
                <TimeTableMenu
                  displayValue={times.startTime}
                  onSelect={handleStartTimeChange}
                />
              )}
            </S.InputWrapper>
          </S.TimeSelectContainer>
          <S.TimeSelectContainer $isMobile={isMobile}>
            <Text size="xl" weight="semiBold">
              일정 마감
            </Text>
            <S.InputWrapper $isMobile={isMobile}>
              <Input
                width={isAllDay ? '100%' : '50%'}
                height="40px"
                type="date"
                css={S.dateTimeLocalInput}
                name="endDate"
                value={schedule.endDate}
                aria-label={`일정 마감 일자는 ${schedule.endDate} 입니다`}
                onChange={handleScheduleChange}
                onBlur={handleScheduleBlur}
                required
              />
              {!isAllDay && (
                <TimeTableMenu
                  displayValue={times.endTime}
                  onSelect={handleEndTimeChange}
                />
              )}
            </S.InputWrapper>
          </S.TimeSelectContainer>
          <S.CheckboxContainer>
            <Text size="lg" weight="semiBold">
              종일
            </Text>
            <Checkbox isChecked={isAllDay} onChange={handleIsAllDayChange} />

            <p
              className="hidden"
              aria-live="assertive"
              aria-relevant="additions"
            >
              {isAllDay
                ? '종일 일정이 선택되었습니다.'
                : '종일 일정이 해제되었습니다.'}
            </p>
          </S.CheckboxContainer>
          <S.InnerContainer>
            <S.TeamNameContainer title={displayName}>
              <TeamBadge teamPlaceColor={teamPlaceColor} size="lg" />
              {!isMobile && <Text css={S.teamPlaceName}>{displayName}</Text>}
            </S.TeamNameContainer>
            <S.ControlButtonWrapper>
              <Button variant="primary" css={S.submitButton}>
                등록
              </Button>
            </S.ControlButtonWrapper>
          </S.InnerContainer>
        </form>
      </S.Container>
    </Modal>
  );
};

export default ScheduleAddModal;
