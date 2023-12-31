import Menu from '~/components/common/Menu/Menu';
import { TIME_TABLE } from '~/constants/calendar';
import * as S from './TimeTableMenu.styled';
import { getIsMobile } from '~/utils/getIsMobile';

interface TimeTableMenuProps {
  displayValue: string;
  onSelect: (value: string) => void;
}

const TimeTableMenu = (props: TimeTableMenuProps) => {
  const { displayValue, onSelect } = props;
  const isMobile = getIsMobile();
  const handleSelect = (value: string) => {
    onSelect(value);
  };

  return (
    <Menu>
      <Menu.Button css={S.timeTableButton(isMobile)} value={displayValue} />
      <Menu.List onSelect={handleSelect}>
        {TIME_TABLE.map((time) => (
          <Menu.Item key={time} value={time}>
            {time}
          </Menu.Item>
        ))}
      </Menu.List>
    </Menu>
  );
};

export default TimeTableMenu;
