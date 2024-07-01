import { createBrowserRouter } from 'react-router-dom';

export const routers = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const { Home } = await import('./containers');
      return { Component: Home };
    },
    // errorElement: <div>404</div>,
  },
]);
