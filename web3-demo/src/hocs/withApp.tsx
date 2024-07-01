import { Component } from 'react';
import Web3 from 'web3';

export interface WithAppState {
  $web3: null | Web3;
  $merchant: string | undefined;
}

export const withApp = (WrappedCompnoent: any) => {
  return class extends Component {
    constructor(props: any) {
      super(props);

      this.state = {
        $web3: null,
        $merchant: process.env.MERCHANT,
      };
    }

    componentDidMount() {
      const web3 = new Web3(Web3.givenProvider || 'wss://sepolia.infura.io/ws/v3/b2b200822bf0417b8db75bedd852cfc6');
      this.setState(item => ({
        ...item,
        $web3: web3,
      }));
    }

    render() {
      const { $web3, $merchant } = this.state as WithAppState;
      return <WrappedCompnoent {...this.props} $web3={$web3} $merchant={$merchant}></WrappedCompnoent>;
    }
  };
};
