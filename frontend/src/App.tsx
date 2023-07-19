import { styled } from 'styled-components';
import Calendar from '~/components/Calendar/Calendar';
import { schedules } from '~/mocks/fixtures/schedules';

const App = () => {
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
