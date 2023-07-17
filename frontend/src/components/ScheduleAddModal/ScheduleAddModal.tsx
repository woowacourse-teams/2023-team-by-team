import * as S from './ScheduleAddModal.styled';
import Modal from '~/components/common/Modal/Modal';
import { useModal } from '~/hooks/useModal';
import Text from '../common/Text/Text';
import { CloseIcon } from '~/assets/svg';
import Button from '../common/Button/Button';

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
          <S.CloseButton variant="plain" type="button" onClick={closeModal}>
            <CloseIcon aria-label="닫기" />
          </S.CloseButton>
        </S.Header>
        <S.TitleInput placeholder="일정 제목" />
        <S.TimeSelectMenu>
          <Text as="p" size="xxl" weight="bold">
            일정 시작
          </Text>
          <S.Input type="datetime-local" width="100px" />
          <S.Input width="80px" marginright="40px" />
          <Text as="p" size="xxl" weight="bold">
            종일
          </Text>
          <S.CheckBox type="checkbox" />
        </S.TimeSelectMenu>
        <S.TimeSelectMenu>
          <Text as="p" size="xxl" weight="bold">
            일정 마감
          </Text>
          <S.Input type="datetime-local" width="100px" />
          <S.Input width="80px" />
        </S.TimeSelectMenu>
        <S.TeamLabel>
          <S.Circle />
          <S.TeamPlaceLabelText as="p" size="md" title={teamPlaceLabel}>
            {teamPlaceLabel}
          </S.TeamPlaceLabelText>
        </S.TeamLabel>
        <S.ButtonMenu>
          <Button variant="primary" onClick={closeModal}>
            등록
          </Button>
        </S.ButtonMenu>
      </S.Container>
    </Modal>
  );
};

export default ScheduleAddModal;
