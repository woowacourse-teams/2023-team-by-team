import { styled } from 'styled-components';

const App = () => {
  return <Container>Hello World!</Container>;
};

const Container = styled.div`
  color: ${({ theme }) => theme.color.BLACK};
`;

export default App;
