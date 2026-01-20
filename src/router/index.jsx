import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthGuard from './AuthGuard'; // 引入守卫
import Login from '../pages/Login';
import Lab from '../pages/Lab';
import WorkflowMarket from '../pages/WorkflowMarket';
import McpMarket from '../pages/McpMarket';
import AgentMarket from '../pages/AgentMarket';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />, // 公开路由
  },
  {
    // === 受保护的根路径 ===
    // 所有的子路由都需要先通过 AuthGuard 的检查
    element: <AuthGuard />, 
    children: [
      {
        path: '/',
        element: <MainLayout />, // 只有登录了才能看到 Layout
        children: [
          {
            index: true,
            element: <Navigate to="/lab" replace />,
          },
          {
            path: 'lab',
            element: <Lab />,
          },
          {
            path: 'market/workflow',
            element: <WorkflowMarket />,
          },
          {
            path: 'market/mcp',
            element: <McpMarket />,
          },
          {
            path: 'market/agent',
            element: <AgentMarket />,
          }
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  }
]);

export default router;
