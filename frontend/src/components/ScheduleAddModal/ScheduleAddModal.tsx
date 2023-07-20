import { useState } from 'react';
import * as S from './ScheduleAddModal.styled';
import { useModal } from '~/hooks/useModal';
import { CloseIcon } from '~/assets/svg';
import Modal from '~/components/common/Modal/Modal';
import Text from '../common/Text/Text';
import Button from '../common/Button/Button';
import Input from '../common/Input/Input';
import { useSendSchedule } from '~/hooks/queries/useSendSchedule';
import type { ChangeEventHandler, FormEventHandler } from 'react';
import type { ScheduleWithoutId } from '~/types/schedule';

interface ScheduleAddModalProps {
  teamPlaceName: string;
}

const ScheduleAddModal = (props: ScheduleAddModalProps) => {
  const { teamPlaceName } = props;
  const { closeModal } = useModal();
  const [schedule, setSchedule] = useState({
    title: '',
    startDateTime: '2023-07-20T00:00',
    endDateTime: '2023-07-20T00:00',
  });
  const { mutateSendSchedule } = useSendSchedule(1);

  const handleScheduleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setSchedule((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleScheduleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const { startDateTime, endDateTime } = schedule;

    mutateSendSchedule(
      {
        ...schedule,
        startDateTime: startDateTime.replace(
          'T',
          ' ',
        ) as ScheduleWithoutId['startDateTime'],
        endDateTime: endDateTime.replace(
          'T',
          ' ',
        ) as ScheduleWithoutId['startDateTime'],
      },
      {
        onSuccess: () => closeModal(),
      },
    );
  };

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
              type="datetime-local"
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
              type="datetime-local"
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
