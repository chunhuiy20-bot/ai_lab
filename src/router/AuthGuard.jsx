import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthGuard() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // 未登录，重定向到登录页
    // replace: 替换历史记录，防止点后退死循环
    // state: 把当前地址传过去，登录成功后可以跳回来
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 已登录，渲染子路由
  return <Outlet />;
}
