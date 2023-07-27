import * as S from './ScheduleAddModal.styled';
import { useModal } from '~/hooks/useModal';
import { CloseIcon } from '~/assets/svg';
import Modal from '~/components/common/Modal/Modal';
import Text from '../common/Text/Text';
import Button from '../common/Button/Button';
import Input from '../common/Input/Input';
import useScheduleAddModal from '~/hooks/schedule/useScheduleAddModal';

interface ScheduleAddModalProps {
  teamPlaceName: string;
  clickedDate: Date;
}

const ScheduleAddModal = (props: ScheduleAddModalProps) => {
  const { teamPlaceName, clickedDate } = props;
  const { closeModal } = useModal();
  const {
    schedule,
    handlers: { handleScheduleChange, handleScheduleSubmit },
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

        <form onSubmit={handleScheduleSubmit}>
          <S.TimeSelectContainer>
            <Text size="xxl" weight="bold">
              일정 시작
            </Text>
            <Input
              width="220px"
              height="40px"
              type="date"
              css={S.dateTimeLocalInput}
              name="startDateTime"
              value={schedule['startDateTime']}
              onChange={handleScheduleChange}
              required
            />
            <Text size="xxl" weight="bold">
              종일
            </Text>
            <S.CheckBox type="checkbox" />
          </S.TimeSelectContainer>
          <S.TimeSelectContainer>
            <Text size="xxl" weight="bold">
              일정 마감
            </Text>
            <Input
              width="220px"
              height="40px"
              type="date"
              css={S.dateTimeLocalInput}
              name="endDateTime"
              value={schedule['endDateTime']}
              onChange={handleScheduleChange}
              required
            />
          </S.TimeSelectContainer>
          <S.TeamNameContainer title={teamPlaceName}>
            <S.Circle />
            <Text css={S.teamPlaceName}>{teamPlaceName}</Text>
          </S.TeamNameContainer>
          <S.ControlButtonWrapper>
            <Button variant="primary">등록</Button>
          </S.ControlButtonWrapper>
        </form>
      </S.Container>
    </Modal>
  );
};

export default ScheduleAddModal;
