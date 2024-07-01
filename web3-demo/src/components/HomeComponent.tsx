import { FieldType } from '@/containers/Home';
import { Accounts } from '@/interface/Home.interface';
import { Button, Flex, Form, FormInstance, Input, Modal, Select } from 'antd';
import propsType from 'prop-types';

export interface HomeComponentProps {
  createWallet: () => void;
  isModalOpen: boolean;
  onFinish: ((values: FieldType) => void) | undefined;
  form: FormInstance<FieldType>;
  mnemonic: string | null;
  onCopy: (value: string) => void;
  onClose: () => void;
  addNewAccount: boolean;
  accounts: Accounts[] | null;
  accountLoading: boolean;
}

export const HomeComponent = (props: HomeComponentProps) => {
  const {
    createWallet,
    isModalOpen,
    onFinish,
    form,
    mnemonic,
    onCopy,
    onClose,
    addNewAccount,
    accounts,
    accountLoading,
  } = props;

  return (
    <Flex style={{ width: '100%' }} gap="middle" vertical align="center">
      <Select
        style={{ width: '100%' }}
        loading={accountLoading}
        options={
          accounts?.map(item => ({
            value: item.privateKey,
            label: item.address,
          })) || []
        }
        placeholder="Select an Account"
      ></Select>
      <Flex style={{ width: '100%' }} gap="middle" vertical={false}>
        <Button style={{ width: '100%' }} type="primary" onClick={createWallet}>
          Create Wallet
        </Button>
        <Button style={{ width: '100%' }} type="primary">
          Import Wallet
        </Button>
      </Flex>
      {mnemonic ? (
        <>
          <Input.TextArea disabled={true} value={mnemonic}></Input.TextArea>
          <Button type="primary" onClick={() => onCopy(mnemonic)}>
            Copy
          </Button>
        </>
      ) : (
        addNewAccount && (
          <Button type="default" onClick={createWallet}>
            Add New Account
          </Button>
        )
      )}
      <Modal title="Create Wallet" open={isModalOpen} footer={<></>} onCancel={onClose}>
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: false }}
          onFinish={onFinish}
          autoComplete="new-password"
        >
          {mnemonic ? (
            <Form.Item<FieldType>
              label="Please enter mnemonic"
              name="mnemonic"
              rules={[
                {
                  required: true,
                  message: 'Please input your mnemonic!',
                },
              ]}
            >
              <Input placeholder="Please Enter Mnemonic" type="text" />
            </Form.Item>
          ) : (
            !addNewAccount && (
              <Form.Item<FieldType>
                label="Please enter password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      'Password must be at least 8 characters long, include at least one letter and one number, and not contain spaces.',
                  },
                  {
                    validator: (_, value) =>
                      value && /\s/.test(value)
                        ? Promise.reject('Password must not contain spaces.')
                        : Promise.resolve(),
                  },
                ]}
              >
                <Input.Password placeholder="Please Enter Password" type="text" maxLength={8} />
              </Form.Item>
            )
          )}
          {addNewAccount && (
            <Form.Item<FieldType>
              label="Please enter mnemonic"
              name="mnemonic"
              rules={[
                {
                  required: true,
                  message: 'Please input your mnemonic!',
                },
              ]}
            >
              <Input placeholder="Please Enter Mnemonic" type="text" />
            </Form.Item>
          )}
          <Form.Item>
            <Button style={{ width: '100%' }} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Flex>
  );
};

HomeComponent.propsTypes = {
  createWallet: propsType.func.isRequired,
  isModalOpen: propsType.bool.isRequired,
  onFinish: propsType.bool.isRequired,
  mnemonic: propsType.string,
  onCopy: propsType.func.isRequired,
  onClose: propsType.func.isRequired,
  addNewAccount: propsType.func.isRequired,
  accounts: propsType.shape({}).isRequired,
  accountLoading: propsType.bool.isRequired,
};
