import { styled } from 'styled-components';
import Calendar from '~/components/Calendar/Calendar';
import { useFetchSchedules } from '~/hooks/queries/useFetchSchedules';

const App = () => {
  const { schedules } = useFetchSchedules(1, 2023, 7);

  if (schedules === undefined) {
    return null;
  }

  return (
    <Container>
      <Calendar schedules={schedules} />
    </Container>
  );
};

const Container = styled.div`
  color: ${({ theme }) => theme.color.BLACK};
`;

export default App;
