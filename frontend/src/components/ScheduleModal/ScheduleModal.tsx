import type { CSSProperties } from 'react';
import Modal from '~/components/common/Modal/Modal';
import Text from '~/components/common/Text/Text';
import { useModal } from '~/hooks/useModal';
import * as S from './Schedule.styled';
import { CloseIcon, DeleteIcon, EditIcon } from '~/assets/svg';
import Button from '~/components/common/Button/Button';

interface ScheduleModalProps {
  id: number;
  targetRef: React.RefObject<HTMLDivElement>;
}
const ScheduleModal = (props: ScheduleModalProps) => {
  const { targetRef } = props;
  const { closeModal } = useModal();

  const modalLocation: CSSProperties = {
    position: 'absolute',
    top: `${targetRef.current?.getBoundingClientRect().bottom}px`,
    left: `${targetRef.current?.getBoundingClientRect().left}px`,
  };

  return (
    <Modal>
      <S.Backdrop onClick={closeModal} />
      <S.Container style={modalLocation}>
        <S.Header>
          <S.TeamWrapper>
            <S.TeamColor />
            <Text css={S.TeamName}>
              현대사회와 범죄 5조현대사회와 범죄 5조현대사회와 범죄
              5조현대사회와 범죄 5조현대사회와 범죄 5조
            </Text>
          </S.TeamWrapper>
          <S.MenuWrapper>
            <Button size="sm" variant="plain">
              <EditIcon />
            </Button>
            <Button size="sm" variant="plain">
              <DeleteIcon />
            </Button>
            <Button size="sm" variant="plain" onClick={closeModal}>
              <CloseIcon />
            </Button>
          </S.MenuWrapper>
        </S.Header>
        <Text as="h4">1차 데모데이</Text>
        <S.PeriodWrapper>
          <Text size="lg">07월 13일 15:00</Text>
          <Text size="lg">~</Text>
          <Text size="lg">07월 13일 19:00</Text>
        </S.PeriodWrapper>
        <Button
          type="button"
          variant="primary"
          css={S.Button}
          onClick={closeModal}
        >
          확인
        </Button>
      </S.Container>
    </Modal>
  );
};

export default ScheduleModal;
