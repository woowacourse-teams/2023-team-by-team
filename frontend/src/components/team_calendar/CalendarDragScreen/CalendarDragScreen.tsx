import * as S from './CalendarDragScreen.styled';
import { useCalendarDragScreen } from './useCalendarDragScreen';

interface CalendarDragScreenProps {
  visible: boolean;
  onMouseUp: () => void;
}

const CalendarDragScreen = (props: CalendarDragScreenProps) => {
  const { visible, onMouseUp } = props;
  useCalendarDragScreen({ onMouseUp });

  return visible ? <S.Container /> : null;
};

export default CalendarDragScreen;
