import { RouterProvider } from 'react-router-dom';
import styled from 'styled-components';
import Web3 from 'web3';
import { routers } from './Routes';
import { withApp } from './hocs';
import { RouterPropsProvider } from './providers';

export interface AppProps {
  $merchant: string | undefined;
  $web3: Web3 | null;
}

const StyledLayout = styled.div<AppProps>`
  color: ${props => (String(props.$merchant) === '1' ? 'red' : 'blue')};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 16px;
  > * {
    flex: 1 1 100%;
  }
`;

const App = (props: AppProps) => {
  return (
    <StyledLayout {...props}>
      <h1>Web3 Demo Project</h1>
      <RouterPropsProvider props={props}>
        <RouterProvider router={routers} />
      </RouterPropsProvider>
    </StyledLayout>
  );
};

export default withApp(App);
