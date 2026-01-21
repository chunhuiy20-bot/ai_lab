import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function useAuthAction() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * 执行需要登录的操作
   * @param {Function} action - 已登录时要执行的回调（比如跳转到创建页）
   */
  const performAction = (action) => {
    if (user) {
      // 如果已登录，直接执行操作
      action();
    } else {
      // 如果未登录，跳转去登录页，并记录当前位置（以便登录后跳回来）
      // 或者你可以记录 targetUrl，看具体需求
      navigate('/login', { state: { from: location } });
    }
  };

  return performAction;
}
