<template>
    <h1>助建词</h1>
    <h1>{{ state.mnemonic }}</h1>
    <h1>路径</h1>
    <h1>"m/44'/60'/0'/0/0"</h1>
    <h1>钱包地址</h1>
    <h1>{{ state.lowerCaseAddress }}</h1>
    <h1>校验地址</h1>
    <h1>{{ state.checkAddress }}</h1>
    <Button type="primary" @click="onExportAccount" :loading="loading">导出</Button>
    <Button type="primary" @click="importAccount" :loading="loading">导入</Button>
</template>

<script setup>
    import { getCurrentInstance, onMounted, reactive, ref } from 'vue';
    import { generateMnemonic, mnemonicToSeed } from "bip39";
    import ethwallet, { hdkey } from "ethereumjs-wallet";
    import { Button } from 'vant';
    const { proxy } = getCurrentInstance();
    const web3 = proxy.$web3;

    const state = reactive({
        mnemonic: 'pause pilot catalog snow dune canoe story rail era better lecture civil',
        seed: null,
        keyPair: null,
        lowerCaseAddress: null,
        checkAddress: null,
        privateKey: null,
        wallet: null,
        priKey: null
    });

    const loading = ref(false);

    onMounted(async ()=>{
        //  创建助建词不能多次运行，会创建多个账户
        // state.mnemonic = generateMnemonic();
        // 生成密钥对 keypair
        state.seed = await mnemonicToSeed(state.mnemonic);

        const hdWallet = hdkey.fromMasterSeed(state.seed);
        // 生成密钥对 - 1个助建词可以生成多个密钥对，所以这里可以是动态值，"m/44'/60'/0'/0/0" 或者给用户一个输入框自行创建
        state.keyPair = hdWallet.derivePath("m/44'/60'/0'/0/0");
        // 获取私钥
        // 1.获取钱包对象
        state.wallet = state.keyPair.getWallet();
        // 2. 获取钱包地址
        state.lowerCaseAddress =  state.wallet.getAddressString();
        // 3. 获取钱包的校验地址
        state.checkAddress =  state.wallet.getChecksumAddressString();
        // 4. 获取私钥
        state.privateKey = `0x${state.wallet.getPrivateKey().toString('hex')}`;
        
    })  


    const onExportAccount = async () => { 
        loading.value = true;
        try{
            // 导出key store - 私钥加密码 
            // 1. 使用Web3 方法
            // const keyStore = await web3.eth.accounts.encrypt(state.privateKey, '123');
            // 2. 使用wallet方法
            const keyStore2 = await state.wallet.toV3('123');

            // 通过keyStore 获取私钥
            // 1. web3 获取
            // const result = await web3.eth.accounts.decrypt(keyStore, '123');
            
            // 2. 使用wallet 方法
            const result = await ethwallet.fromV3(keyStore2, '123');
            state.priKey = result.getPrivateKey().toString('hex');

        }catch(error){
            console.log(error)
        }finally{
            loading.value = false;
        }
      
    }

    const importAccount = async () =>{
        if(!state.priKey) {
            alert('state.priKey is empty')
            return;
        };
        const priKey = Buffer.from(state.priKey, 'hex');
        const wallet = ethwallet.fromPrivateKey(priKey)
        const lowerCaseAddress = wallet.getAddressString();
        console.log("===>",lowerCaseAddress)
    }

</script>

<style lang="less"></style>