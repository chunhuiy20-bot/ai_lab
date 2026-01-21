import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthGuard from './AuthGuard'; 
import Login from '../pages/Login';
import Lab from '../pages/Lab';
import WorkflowMarket from '../pages/WorkflowMarket';
import McpMarket from '../pages/McpMarket';
import AgentMarket from '../pages/AgentMarket';
import WorkflowEditor from '../pages/WorkflowEditor';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    // === 公开路由区域 (MainLayout 包裹，但不需要 AuthGuard) ===
    path: '/',
    element: <MainLayout />, 
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
  {
    // === 受保护的区域 (真正需要登录才能看的页面) ===
    // 比如：个人中心、创建编辑器页面
    path: '/studio', 
    element: <AuthGuard />,
    children: [
      {
        path: 'create-workflow',
        element: <WorkflowEditor /> // ✅ 挂载在这里
      },
      {
        path: 'profile',
        element: <div>👤 个人中心 (需要登录)</div> // 占位
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/lab" replace />,
  }
]);

export default router;
