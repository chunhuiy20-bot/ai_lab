import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Fingerprint } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('Admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // 获取原本想去的页面，如果没有就默认去首页
  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      // 登录成功，跳转回原本想去的页面
      navigate(from, { replace: true });
    } else {
      setError('密码错误 (提示: 123456)');
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
            <Fingerprint size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">欢迎回来</h1>
          <p className="text-slate-500 text-sm mt-2">AI Innovation Lab 安全网关</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">账号</label>
            <input 
              type="text" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">密码</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="输入 123456"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
            />
          </div>
          
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-95">
            立即登录
          </button>
        </form>
      </div>
    </div>
  );
}
