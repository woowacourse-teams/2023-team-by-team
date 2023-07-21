import { useModal } from '~/hooks/useModal';
import * as S from './DayScheduleModal.styled';
import Modal from '~/components/common/Modal/Modal';
import { CloseIcon } from '~/assets/svg';
import Button from '~/components/common/Button/Button';
import Text from '~/components/common/Text/Text';

export interface DayScheduleModalProps {
  color?: string;
}

const DayScheduleModal = (props: DayScheduleModalProps) => {
  const { color = '#516FFF' } = props;
  const { closeModal } = useModal();

  const schedules = [
    'test1',
    'test2',
    'test3',
    'test4',
    'test5',
    'test6',
    'test7',
    'test8',
  ];

  return (
    <Modal>
      {/* <S.Backdrop onClick={closeModal} /> */}
      <S.Container>
        <S.Header>
          <Text>7월 5일</Text>
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
        <S.ScheduleWrapper>
          {schedules.map((scheduleTitle, index) => {
            return (
              <S.ScheduleBox key={index} color={color} title={scheduleTitle}>
                <Text size="lg" weight="bold" css={S.teamName}>
                  {scheduleTitle}
                </Text>
              </S.ScheduleBox>
            );
          })}
        </S.ScheduleWrapper>
      </S.Container>
    </Modal>
  );
};

export default DayScheduleModal;
