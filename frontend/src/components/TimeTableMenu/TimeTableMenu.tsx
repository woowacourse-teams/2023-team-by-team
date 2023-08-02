import Menu from '~/components/common/Menu/Menu';
import * as S from './TimeTableMenu.styled';
import { TIME_TABLE } from '~/constants/calendar';
import type { MouseEventHandler } from 'react';

interface TimeTableMenuProps {
  displayValue: string;
  onClickMenu: (value: string) => void;
}

const TimeTableMenu = (props: TimeTableMenuProps) => {
  const { displayValue, onClickMenu } = props;

  const handleMenuClick: MouseEventHandler<HTMLUListElement> = (e) => {
    const { target } = e;

    if (!(target instanceof HTMLLIElement)) {
      return;
    }

    onClickMenu(target.textContent ?? '');
  };

  return (
    <Menu>
      <Menu.Button css={S.timeTableButton} value={displayValue} />
      <Menu.List onClick={handleMenuClick}>
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
