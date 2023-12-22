import { RouteObject, useRoutes } from 'react-router-dom';
import { jotaiRoutes } from './pages/jotai-poc';
import { xstateRoutes } from './pages/xstate-poc';
import { zustandRoutes } from './pages/zustand-poc';
import RootPage from './pages/RootPage';

// eslint-disable-next-line react-refresh/only-export-components
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootPage />,
  },
  {
    path: '/jotai',
    children: [jotaiRoutes],
  },
  {
    path: '/xstate',
    children: [xstateRoutes],
  },
  {
    path: '/zustand',
    children: [zustandRoutes],
  },
];

export const Routes = () => {
  return useRoutes(routes);
};
