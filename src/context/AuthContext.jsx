import React, { createContext, useContext, useState, useEffect } from 'react';

// 创建 Context
const AuthContext = createContext(null);

// 提供者组件
export const AuthProvider = ({ children }) => {
  // 初始化时尝试从 localStorage 读取 token，防止刷新丢失登录状态
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? { name: 'Admin', token } : null;
  });

  // 模拟登录函数
  const login = async (username, password) => {
    // 真实场景这里会调用 API
    if (password === '123456') {
      const fakeUser = { name: username, token: 'abc-123-xyz' };
      setUser(fakeUser);
      localStorage.setItem('token', fakeUser.token); // 持久化
      return true;
    }
    return false;
  };

  // 退出登录
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 自定义 Hook，方便组件调用
export const useAuth = () => {
  return useContext(AuthContext);
};
