
import Web3 from "web3";
import { Lazyload } from 'vant';

export default (app)=>{
    (window).global = window;
    
    const web3 = new Web3(Web3.givenProvider || 'wss://sepolia.infura.io/ws/v3/b2b200822bf0417b8db75bedd852cfc6');

    app.use(Lazyload);

    app.config.globalProperties.$web3 = web3;
    return app;
}