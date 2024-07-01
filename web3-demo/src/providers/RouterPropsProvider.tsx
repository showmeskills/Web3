import React, { ReactNode, createContext, useContext, useMemo } from 'react';

interface RouterPropsProviderProps {
  children: ReactNode;
  props: any;
}

const RouterPropsContext = createContext<any>({
  $merchant: '',
  $web: null,
});

export const RouterPropsProvider: React.FC<RouterPropsProviderProps> = ({ children, props }) => {
  const providers = useMemo(
    () => ({
      $merchant: props.$merchant,
      $Web3: props.$web3,
    }),
    [props],
  );

  return <RouterPropsContext.Provider value={providers}>{children}</RouterPropsContext.Provider>;
};

export const useRouterProps = () => {
  return useContext(RouterPropsContext);
};
