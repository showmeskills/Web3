<template>
    <h1>{{ title }}</h1>
    <h1>账户信息</h1>
    <p>Address : {{ accountInfo.address }}</p>
    <p>Private Key: {{ accountInfo.address }}</p>
    <p v-if="accountInfo.balance !== null">Balance: {{ accountInfo.balance }} ETH</p>

    <h1>转账操作</h1>
    <Button type="primary" :loading="loading" @click="onTransaction">转账</Button>
</template>

<script setup>
    import { getCurrentInstance, onMounted, reactive, toRefs, ref, } from 'vue';
    import Button from "vant/lib/button";

    const { proxy } = getCurrentInstance();
    
    const web3 = proxy.$web3;
    const toWei = web3.utils.toWei;
    const toEth = web3.utils.fromWei;
    const props = defineProps({
        title: String,
    })

    const accountInfo = reactive({
        address: '0xB0377492a9a467BB4dB3553c84592E347c84cAb9',
        privateKey: '0x6e6e5557b45283cb6342be11009b7f5efa8f60945671f95c81d38403bb0200d7',
        balance: null,
    });


    const loading = ref(false);

    const { title } = toRefs(props);

    onMounted(()=>{
        /** 每次执行都会产生一个新账号 */
        // const account = web3.eth.accounts.create('123');
        // accountInfo.address = account.address;
        // accountInfo.privateKey = account.privateKey;
        getBalance()
      
    })


    const getBalance = async () => {
        const balance = await web3.eth.getBalance(accountInfo.address);
        accountInfo.balance = toEth(balance || '0','ether');
    }


    const onTransaction = async () =>{
        loading.value = true;

        // 1. 构建转账参数
        // 获取交易次数
        const nonce = await web3.eth.getTransactionCount(accountInfo.address);
        // 获取预计转账Gas
        const gasPrice = await web3.eth.getGasPrice();
        // 转账金额 以 wei作为单位
        const value = toWei('0.01', 'ether');
        // 转账参数
        const rawTx = {
            from: accountInfo.address,
            to: '0x45CF70d2d07D826eB57A089700104463A595aF16',
            nonce:  web3.utils.toHex(nonce),
            gasPrice: web3.utils.toHex(gasPrice),
            value,
            data: '0x0000'
        }

        // 2.生成 serializedTx
        // 转化私钥
        // const privateKey = Buffer.from(accountInfo.privateKey.slice(2), "hex");
        // gas 估算
        const gas = await web3.eth.estimateGas(rawTx);
        rawTx['gasLimit'] = web3.utils.toHex(gas);
        // ethereumjs-tx 实现私钥加密
        // const tx = new Transaction(rawTx);
        // tx.sign(privateKey);
        //生成 serialize
        // const serialize = `0x${tx.serialize().toString('hex')}`;

        // 3.开始转账
        const signedTransaction = await web3.eth.accounts.signTransaction(rawTx, accountInfo.privateKey);
        const result = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
      
        loading.value = false;

        if(result){
            getBalance();
        }
    }
</script>

<style lang="less">

</style>