import styled from 'styled-components';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { OrderStateProvider } from './hooks/useOrderState';

const Layout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  overflow: hidden;
  height: 100%
`;

const Main = styled.main`
  overflow-y: auto;
  height: calc(100% - 6rem);
`;

function App() {
  return (
    <OrderStateProvider>
      <Layout>
        <Header />
        <Main>
          <ProductList />
        </Main>
      </Layout>
    </OrderStateProvider>
  );
}

export default App;
