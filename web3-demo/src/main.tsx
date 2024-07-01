import App from '@/App';
import '@/assets/styles/reset.css';
import store from '@/store/store';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import init from './init';
import { NotificationProvider } from './providers';
const root = createRoot(document.getElementById('root')!);

init();

root.render(
  <Provider store={store}>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </Provider>,
);
