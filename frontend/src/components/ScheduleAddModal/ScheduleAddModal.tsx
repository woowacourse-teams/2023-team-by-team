import * as S from './ScheduleAddModal.styled';
import { useModal } from '~/hooks/useModal';
import { CloseIcon } from '~/assets/svg';
import Modal from '~/components/common/Modal/Modal';
import Text from '../common/Text/Text';
import Button from '../common/Button/Button';
import Input from '../common/Input/Input';

interface ScheduleAddModalProps {
  teamPlaceLabel: string;
}

const ScheduleAddModal = (props: ScheduleAddModalProps) => {
  const { teamPlaceLabel } = props;
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
            css={S.closeButtonStyles}
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
            css={S.titleStyles}
          />
        </S.TitleWrapper>

        <S.TimeSelectContainer>
          <Text size="xxl" weight="bold">
            일정 시작
          </Text>
          <S.Input type="datetime-local" width="220px" />
          <Text size="xxl" weight="bold">
            종일
          </Text>
          <S.CheckBox type="checkbox" />
        </S.TimeSelectContainer>
        <S.TimeSelectContainer>
          <Text size="xxl" weight="bold">
            일정 마감
          </Text>
          <S.Input type="datetime-local" width="220px" />
        </S.TimeSelectContainer>
        <S.TeamNameContainer>
          <S.Circle title={teamPlaceLabel} />
          <Text css={S.teamPlaceNameStyles}>{teamPlaceLabel}</Text>
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
