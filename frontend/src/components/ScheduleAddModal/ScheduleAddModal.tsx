import * as S from './ScheduleAddModal.styled';
import { useModal } from '~/hooks/useModal';
import { CloseIcon } from '~/assets/svg';
import Modal from '~/components/common/Modal/Modal';
import Text from '../common/Text/Text';
import Button from '../common/Button/Button';
import Input from '../common/Input/Input';
import useScheduleAddModal from '~/hooks/schedule/useScheduleAddModal';
import Checkbox from '~/components/common/Checkbox/Checkbox';
import TeamBadge from '~/components/common/TeamBadge/TeamBadge';
import TimeTableMenu from '~/components/TimeTableMenu/TimeTableMenu';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import { getInfoByTeamPlaceId } from '~/utils/getInfoByTeamPlaceId';
import { useRef, useEffect } from 'react';

interface ScheduleAddModalProps {
  clickedDate: Date;
}

const ScheduleAddModal = (props: ScheduleAddModalProps) => {
  const { clickedDate } = props;
  const { closeModal } = useModal();
  const { teamPlaces } = useTeamPlace();
  const {
    schedule,
    isAllDay,
    times,
    handlers: {
      handleScheduleChange,
      handleIsAllDayChange,
      handleStartTimeChange,
      handleEndTimeChange,
      handleScheduleSubmit,
    },
  } = useScheduleAddModal(clickedDate);

  const { teamPlaceColor, displayName } = getInfoByTeamPlaceId(teamPlaces, 1);

  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  return (
    <Modal>
      <S.Backdrop onClick={closeModal} />
      <S.Container>
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
              placeholder="일정 제목을 입력해주세요."
              css={S.title}
              name="title"
              value={schedule['title']}
              ref={titleInputRef}
              required
              onChange={handleScheduleChange}
            />
          </S.TitleWrapper>

          <S.TimeSelectContainer>
            <Text size="xxl" weight="bold">
              일정 시작
            </Text>
            <S.InputWrapper>
              <Input
                width={isAllDay ? '100%' : '50%'}
                height="40px"
                type="date"
                css={S.dateTimeLocalInput}
                name="startDateTime"
                value={schedule['startDateTime']}
                onChange={handleScheduleChange}
                aria-label={`일정 시작 일자는 ${schedule['startDateTime']} 입니다`}
                required
              />
              {!isAllDay && (
                <TimeTableMenu
                  displayValue={times['startTime']}
                  onClickMenu={handleStartTimeChange}
                />
              )}
            </S.InputWrapper>
          </S.TimeSelectContainer>
          <S.TimeSelectContainer>
            <Text size="xxl" weight="bold">
              일정 마감
            </Text>
            <S.InputWrapper>
              <Input
                width={isAllDay ? '100%' : '50%'}
                height="40px"
                type="date"
                css={S.dateTimeLocalInput}
                name="endDateTime"
                value={schedule['endDateTime']}
                min={schedule['endDateTime']}
                aria-label={`일정 마감 일자는 ${schedule['endDateTime']} 입니다`}
                onChange={handleScheduleChange}
                required
              />
              {!isAllDay && (
                <TimeTableMenu
                  displayValue={times['endTime']}
                  onClickMenu={handleEndTimeChange}
                />
              )}
            </S.InputWrapper>
          </S.TimeSelectContainer>
          <S.CheckboxContainer>
            <Text size="xl" weight="bold">
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
              <Text css={S.teamPlaceName}>{displayName}</Text>
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
