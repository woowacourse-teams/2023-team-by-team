import Modal from '~/components/common/Modal/Modal';
import { useModal } from '~/hooks/useModal';
import * as S from './ScheduleEditModal.styled';
import Button from '~/components/common/Button/Button';
import { CloseIcon } from '~/assets/svg';
import Input from '~/components/common/Input/Input';
import Text from '~/components/common/Text/Text';
import useScheduleEditModal from '~/hooks/schedule/useScheduleEditModal';
import type { Schedule } from '~/types/schedule';
import TeamBadge from '~/components/common/TeamBadge/TeamBadge';
import TimeTableMenu from '~/components/TimeTableMenu/TimeTableMenu';
import Checkbox from '~/components/common/Checkbox/Checkbox';

interface ScheduleEditModalProps {
  teamPlaceName: string;
  scheduleId: Schedule['id'];
  initialSchedule?: Schedule;
}

const ScheduleEditModal = (props: ScheduleEditModalProps) => {
  const { teamPlaceName, scheduleId, initialSchedule } = props;
  const { closeModal } = useModal();
  const {
    schedule,
    times,
    isAllDay,

    handlers: {
      handleScheduleChange,
      handleScheduleSubmit,
      handleStartTimeChange,
      handleEndTimeChange,
      handleIsAllDayChange,
    },
  } = useScheduleEditModal(scheduleId, initialSchedule);

  if (initialSchedule === undefined) {
    return null;
  }

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
            aria-label="닫기"
          >
            <CloseIcon />
          </Button>
        </S.Header>
        <form onSubmit={handleScheduleSubmit}>
          <S.TitleWrapper>
            <Input
              width="100%"
              height="100%"
              placeholder="일정 제목"
              css={S.title}
              name="title"
              value={schedule['title']}
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
                name="startDate"
                value={schedule['startDate']}
                onChange={handleScheduleChange}
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
                name="endDate"
                value={schedule['endDate']}
                min={schedule['startDate']}
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
          </S.CheckboxContainer>
          <S.InnerContainer>
            <S.TeamNameContainer title={teamPlaceName}>
              <TeamBadge teamPlaceColor={0} size="lg" />
              <Text css={S.teamPlaceName}>{teamPlaceName}</Text>
            </S.TeamNameContainer>
            <S.ControlButtonWrapper>
              <Button variant="primary" css={S.submitButton}>
                수정
              </Button>
            </S.ControlButtonWrapper>
          </S.InnerContainer>
        </form>
      </S.Container>
    </Modal>
  );
};

export default ScheduleEditModal;
