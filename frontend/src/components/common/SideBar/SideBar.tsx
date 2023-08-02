import Text from '~/components/common/Text/Text';
import * as S from './SideBar.styled';
import MyCalendar from '~/components/MyCalendar/MyCalendar';

const SideBar = () => {
  return (
    <S.Container>
      <div>
        <Text as="h2" css={S.highLight}>
          내 일정
        </Text>
      </div>
      <MyCalendar />
      <div>
        <Text as="h3" css={S.highLight}>
          07월08일 일정
        </Text>
      </div>
    </S.Container>
  );
};

export default SideBar;
