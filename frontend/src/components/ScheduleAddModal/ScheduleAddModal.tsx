import * as S from './ScheduleAddModal.styled';
import { useModal } from '~/hooks/useModal';
import { CloseIcon } from '~/assets/svg';
import Modal from '~/components/common/Modal/Modal';
import Text from '../common/Text/Text';
import Button from '../common/Button/Button';
import Input from '../common/Input/Input';

interface ScheduleAddModalProps {
  teamPlaceName: string;
}

const ScheduleAddModal = (props: ScheduleAddModalProps) => {
  const { teamPlaceName } = props;
  const { closeModal } = useModal();

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
          />
        </S.TitleWrapper>

        <S.TimeSelectContainer>
          <Text size="xxl" weight="bold">
            일정 시작
          </Text>
          <Input
            width="220px"
            height="40px"
            type="datetime-local"
            css={S.dateTimeLocalInput}
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
            type="datetime-local"
            css={S.dateTimeLocalInput}
          />
        </S.TimeSelectContainer>
        <S.TeamNameContainer title={teamPlaceName}>
          <S.Circle />
          <Text css={S.teamPlaceName}>{teamPlaceName}</Text>
        </S.TeamNameContainer>
        <S.ControlButtonWrapper>
          <Button variant="primary" onClick={closeModal}>
            등록
          </Button>
        </S.ControlButtonWrapper>
      </S.Container>
    </Modal>
  );
};

export default ScheduleAddModal;
