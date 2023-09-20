import * as S from './MyDailyScheduleListFallback.styled';
import Spinner from '~/components/common/Spinner/Spinner';

const MyDailyScheduleListFallback = () => {
  return (
    <S.ScheduleWrapper>
      <Spinner />
    </S.ScheduleWrapper>
  );
};

export default MyDailyScheduleListFallback;
