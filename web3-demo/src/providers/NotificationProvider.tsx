import { notification } from 'antd';
import { NotificationInstance } from 'antd/es/notification/interface';
import { ReactNode, createContext, useContext, useMemo } from 'react';

interface NotificationProviderProps {
  children: ReactNode;
}

const NotificationContext = createContext<NotificationInstance>({
  success: () => {},
  error: () => {},
  info: () => {},
  warning: () => {},
  open: () => {},
  destroy: (key?: React.Key) => {},
});

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();
  const providers = useMemo(() => ({ api, contextHolder }), [api, contextHolder]);
  return (
    <NotificationContext.Provider value={providers.api}>
      {providers.contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationInstance => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
