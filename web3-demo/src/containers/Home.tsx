import { HomeComponent } from '@/components';
import { useAccount, useMnemonic } from '@/hooks/homeHooks';
import { useNotification, useRouterProps } from '@/providers';
import { createMnemonic } from '@/store/modules/home.module';
import { Form, FormProps, Spin } from 'antd';
import { generateMnemonic, mnemonicToSeed } from 'bip39';
import { hdkey } from 'ethereumjs-wallet';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
export type FieldType = {
  password: string;
  mnemonic: string;
};

export interface WalletInfo {
  address: string;
  privateKey: string;
  keyStore: any;
  mnemonic: string;
  balance: number;
}

export const Home = () => {
  const dispatch = useDispatch();
  const props = useRouterProps();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [mnemonic, setMnemonic] = useState<string | null>(null);
  const notification = useNotification();
  const [pwd, setPwd] = useState<string>('');
  const [addNewAccount, setAddNewAccount] = useState(false);
  const { accounts, accountLoading } = useAccount();
  const { mnemonicLoading, getMnemonic, getMnemonicLoading } = useMnemonic();

  useEffect(() => {
    if (getMnemonic?.mnemonic) setMnemonic(getMnemonic.mnemonic);
  }, [getMnemonic]);

  const createWallet = () => {
    setIsModalOpen(true);
  };

  const onFinish: FormProps<FieldType>['onFinish'] = value => {
    if (value.password && !mnemonic) {
      const mnemonic = generateMnemonic();
      setMnemonic(mnemonic);
      setPwd(value.password);
      dispatch(
        createMnemonic({
          mnemonic,
          password: value.password,
        }),
      );
    } else {
      onCreatProcess(value);
    }
    setIsModalOpen(false);
    onReset();
  };

  const onCreatProcess = async (value: FieldType) => {
    const seed = await mnemonicToSeed(value.mnemonic);
    const hdWallet = hdkey.fromMasterSeed(seed);
    let path = '';
    if (accounts?.length) {
      path = `m/44'/60'/0'/0/${accounts.length + 1}`;
    } else {
      path = `m/44'/60'/0'/0/0`;
    }
    const keyPair = hdWallet.derivePath(path);
    const wallet = keyPair.getWallet();
    const lowerCaseAddress = wallet.getAddressString();
    const checkSumAddress = wallet.getChecksumAddressString();
    const privateKey = wallet.getPrivateKey().toString('hex');
    const keyStore = await props?.$web3?.eth.accounts.encrypt(`0x${privateKey}`, pwd);

    // const storeInfo = storeWalletInfo
    //   ? [
    //       ...(storeWalletInfo || {}),
    //       {
    //         address: lowerCaseAddress,
    //         privateKey,
    //         keyStore,
    //         mnemonic: value.mnemonic,
    //         balance: 0,
    //       },
    //     ]
    //   : [
    //       {
    //         address: lowerCaseAddress,
    //         privateKey,
    //         keyStore,
    //         mnemonic: value.mnemonic,
    //         balance: 0,
    //       },
    //     ];
    // store.set('walletInfo', storeInfo);
    setMnemonic(null);
    setAddNewAccount(true);
  };

  const onCopy = (value: string) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        notification.open({
          message: 'Text copied to clipboard!',
          duration: 1,
          type: 'success',
        });
        createWallet();
      })
      .catch(() => {
        notification.open({
          message: 'Text copied to Error!',
          duration: 1,
          type: 'error',
        });
      });
  };

  const onReset = () => {
    form.resetFields();
  };

  const onClose = () => {
    setIsModalOpen(false);
    onReset();
  };

  if (mnemonicLoading || getMnemonicLoading) {
    return (
      <div style={{ height: '100%' }}>
        <Spin size="large"></Spin>
      </div>
    );
  }

  return (
    <HomeComponent
      createWallet={createWallet}
      isModalOpen={isModalOpen}
      onFinish={onFinish}
      form={form}
      mnemonic={mnemonic}
      onCopy={onCopy}
      onClose={onClose}
      addNewAccount={addNewAccount}
      accounts={accounts}
      accountLoading={accountLoading}
    />
  );
};
