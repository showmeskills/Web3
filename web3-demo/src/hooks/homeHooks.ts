import { useNotification } from '@/providers';
import {
  fetchAccount,
  getMenmonic as fetchMenmonic,
  resetMnemonicState,
} from '@/store/modules/home.module';
import {
  selectAccount,
  selectAccountLoading,
  selectGetMnemonicData,
  selectGetMnemonicLoading,
  selectMnemonic,
  selectMnemonicLoading,
} from '@/store/selectors/homeSelect';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useAccount = () => {
  const dispatch = useDispatch();
  const accounts = useSelector(selectAccount);
  const accountLoading = useSelector(selectAccountLoading);
  useEffect(() => {
    dispatch(
      fetchAccount({
        accountId: '1234',
      }),
    );
  }, [dispatch]);

  return {
    accounts,
    accountLoading,
  };
};

export const useMnemonic = () => {
  const dispatch = useDispatch();
  const createMnemonicResponse = useSelector(selectMnemonic);
  const mnemonicLoading = useSelector(selectMnemonicLoading);
  const notification = useNotification();

  const getMnemonic = useSelector(selectGetMnemonicData);
  const getMnemonicLoading = useSelector(selectGetMnemonicLoading);

  useEffect(() => {
    dispatch(fetchMenmonic(null));
  }, []);

  useEffect(() => {
    if (createMnemonicResponse !== null) {
      if (createMnemonicResponse) {
        notification.open({
          message: 'Keys have created',
          duration: 1,
          type: 'success',
        });
      } else {
        notification.open({
          message: 'Keys have not created',
          duration: 1,
          type: 'error',
        });
      }
      dispatch(resetMnemonicState(''));
    }
  }, [createMnemonicResponse]);

  return {
    createMnemonicResponse,
    mnemonicLoading,
    getMnemonic,
    getMnemonicLoading,
  };
};
