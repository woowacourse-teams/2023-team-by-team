import * as S from './ScheduleAddModal.styled';
import { useModal } from '~/hooks/useModal';
import { CloseIcon } from '~/assets/svg';
import Modal from '~/components/common/Modal/Modal';
import Text from '../common/Text/Text';
import Button from '../common/Button/Button';
import Input from '../common/Input/Input';
import useScheduleAddModal from '~/hooks/schedule/useScheduleAddModal';
import Checkbox from '~/components/common/Checkbox/Checkbox';
import Menu from '~/components/common/Menu/Menu';
import MenuButton from '~/components/common/Menu/MenuButton/MenuButton';
import MenuItem from '~/components/common/Menu/MenuItem/MenuItem';
import MenuList from '~/components/common/Menu/MenuList/MenuList';
import { TIME_TABLE } from '~/constants/calendar';

interface ScheduleAddModalProps {
  teamPlaceName: string;
  clickedDate: Date;
}

const ScheduleAddModal = (props: ScheduleAddModalProps) => {
  const { teamPlaceName, clickedDate } = props;
  const { closeModal } = useModal();
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
                name="startDateTime"
                value={schedule['startDateTime']}
                onChange={handleScheduleChange}
                required
              />
              {!isAllDay && (
                <Menu>
                  <MenuButton css={S.timetableButton}>
                    {times['startTime']}
                  </MenuButton>
                  <MenuList>
                    {TIME_TABLE.map((time) => (
                      <MenuItem
                        key={time}
                        value={time}
                        onClick={(e) => {
                          handleStartTimeChange(
                            e.currentTarget.textContent ?? '',
                          );
                        }}
                      >
                        {time}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
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
                min={schedule['startDateTime']}
                onChange={handleScheduleChange}
                required
              />
              {!isAllDay && (
                <Menu>
                  <MenuButton css={S.timetableButton}>
                    {times['endTime']}
                  </MenuButton>
                  <MenuList>
                    {TIME_TABLE.map((time) => (
                      <MenuItem
                        key={time}
                        value={time}
                        onClick={(e) => {
                          handleEndTimeChange(
                            e.currentTarget.textContent ?? '',
                          );
                        }}
                      >
                        {time}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              )}
            </S.InputWrapper>
          </S.TimeSelectContainer>
          <S.CheckboxContainer>
            <Text size="xl" weight="bold">
              종일
            </Text>
            <Checkbox isChecked={isAllDay} onChange={handleIsAllDayChange} />
          </S.CheckboxContainer>
          <S.TeamNameContainer title={teamPlaceName}>
            <S.Circle />
            <Text css={S.teamPlaceName}>{teamPlaceName}</Text>
          </S.TeamNameContainer>
          <S.ControlButtonWrapper>
            <Button variant="primary" css={S.submitButton}>
              등록
            </Button>
          </S.ControlButtonWrapper>
        </form>
      </S.Container>
    </Modal>
  );
};

export default ScheduleAddModal;
