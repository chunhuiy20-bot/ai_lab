// import { useState } from 'react'; // 1. 引入 useState
// import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// import { FlaskConical, Boxes, Server, Bot, Search, Bell } from 'lucide-react';
// import clsx from 'clsx'; 

// export default function MainLayout() {
//   const location = useLocation();
//   const navigate = useNavigate();
  
//   // 2. 定义一个状态，记录是否发生了滚动
//   const [isScrolled, setIsScrolled] = useState(false);

//   // 3. 滚动监听函数
//   const handleScroll = (e) => {
//     // e.target.scrollTop 获取当前滚动的垂直距离
//     // 如果滚动超过 10px，就认为“滚动了”
//     setIsScrolled(e.target.scrollTop > 10);
//   };

//   const navItems = [
//     { id: 'lab', path: '/lab', label: 'AI应用实验室', icon: FlaskConical },
//     { id: 'workflow', path: '/market/workflow', label: 'Workflow市场', icon: Boxes },
//     { id: 'mcp', path: '/market/mcp', label: 'MCP市场', icon: Server },
//     { id: 'agent', path: '/market/agent', label: 'Agent市场', icon: Bot },
//   ];

//   return (
//     <div className="relative w-screen h-screen bg-slate-50 overflow-hidden font-sans text-slate-700 selection:bg-blue-100">
      
//       {/* === 1. 左上角 Logo (随滚动隐藏) === */}
//       <div 
//         className={clsx(
//           "fixed top-6 left-6 z-40 transition-all duration-500 ease-in-out", // 添加过渡动画
//           // 如果滚动了：透明度变0，向上位移20px，且不可点击(pointer-events-none)
//           // 没滚动：正常显示
//           isScrolled 
//             ? "opacity-0 -translate-y-10 pointer-events-none" 
//             : "opacity-100 translate-y-0"
//         )}
//       >
//         <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-2 rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all cursor-pointer group">
//            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform">
//              AI
//            </div>
//            <div className="flex flex-col">
//              <span className="font-bold text-sm text-slate-800 leading-tight">Innovation</span>
//              <span className="text-[10px] text-slate-500 font-medium leading-tight">Lab</span>
//            </div>
//         </div>
//       </div>

//       {/* === 2. 中间悬浮导航岛 (永远固定，不受影响) === */}
//       <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100]">
//         <div className={clsx(
//           "flex items-center gap-1 backdrop-blur-xl border p-1.5 rounded-2xl transition-all duration-300",
//           // 可选优化：滚动时让导航栏背景更实一点，阴影更重一点，区分度更高
//           isScrolled 
//             ? "bg-white/95 border-slate-200 shadow-xl" 
//             : "bg-white/90 border-slate-200/60 shadow-lg shadow-slate-200/50"
//         )}>
//           {navItems.map((item) => {
//             const isActive = location.pathname.startsWith(item.path);
//             return (
//               <button
//                 key={item.id}
//                 onClick={() => navigate(item.path)}
//                 className={clsx(
//                   "px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-200",
//                   isActive 
//                     ? "bg-slate-100 text-blue-600 font-bold shadow-sm" 
//                     : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium"
//                 )}
//               >
//                 <item.icon 
//                   size={18} 
//                   strokeWidth={isActive ? 2.5 : 2}
//                   className={clsx("transition-colors", isActive ? "text-blue-600" : "text-slate-400")}
//                 />
//                 <span className="text-sm whitespace-nowrap">
//                   {item.label}
//                 </span>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* === 3. 右上角工具栏 (随滚动隐藏) === */}
//       <div 
//         className={clsx(
//           "fixed top-6 right-6 z-40 flex items-center gap-3 transition-all duration-500 ease-in-out",
//           // 同样的隐藏逻辑
//           isScrolled 
//             ? "opacity-0 -translate-y-10 pointer-events-none" 
//             : "opacity-100 translate-y-0"
//         )}
//       >
//          <button className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-white/50 flex items-center justify-center hover:bg-white text-slate-500 hover:text-blue-600 transition-all hover:scale-105">
//            <Search size={18} />
//          </button>
//          <button className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-white/50 flex items-center justify-center hover:bg-white text-slate-500 hover:text-blue-600 transition-all hover:scale-105 relative">
//            <Bell size={18} />
//            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
//          </button>
//          <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full shadow-lg shadow-blue-500/20 border-2 border-white cursor-pointer hover:ring-4 ring-blue-50/50 transition-all hover:scale-105"></div>
//       </div>

//       {/* === 页面内容区域 === */}
//       {/* 4. 绑定 onScroll 事件 */}
//       <main 
//         onScroll={handleScroll} 
//         className="w-full h-full pt-28 px-4 md:px-8 overflow-y-auto overflow-x-hidden scroll-smooth"
//       >
//         <Outlet />
//       </main>

//     </div>
//   );
// }


import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FlaskConical, Boxes, Server, Bot, Search, Bell } from 'lucide-react';
import clsx from 'clsx'; 

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (e) => {
    setIsScrolled(e.target.scrollTop > 10);
  };

  const navItems = [
    { id: 'lab', path: '/lab', label: 'AI应用实验室', icon: FlaskConical },
    { id: 'workflow', path: '/market/workflow', label: 'Workflow市场', icon: Boxes },
    { id: 'mcp', path: '/market/mcp', label: 'MCP市场', icon: Server },
    { id: 'agent', path: '/market/agent', label: 'Agent市场', icon: Bot },
  ];

  return (
    <div className="relative w-screen h-screen bg-slate-50 overflow-hidden font-sans text-slate-700 selection:bg-blue-100">
      
      {/* === 1. 左上角 Logo (随滚动隐藏) === */}
      <div 
        className={clsx(
          "fixed top-6 left-6 z-40 transition-all duration-500 ease-in-out",
          isScrolled ? "opacity-0 -translate-y-10 pointer-events-none" : "opacity-100 translate-y-0"
        )}
      >
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-2 rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all cursor-pointer group">
           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform">AI</div>
           <div className="flex flex-col">
             <span className="font-bold text-sm text-slate-800 leading-tight">Innovation</span>
             <span className="text-[10px] text-slate-500 font-medium leading-tight">Lab</span>
           </div>
        </div>
      </div>

      {/* === 2. 中间悬浮导航岛 (核心修改部分) === */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100]">
        <div className={clsx(
          "flex items-center gap-1 backdrop-blur-xl border p-1.5 rounded-2xl transition-all duration-300",
          isScrolled ? "bg-white/95 border-slate-200 shadow-xl" : "bg-white/90 border-slate-200/60 shadow-lg shadow-slate-200/50"
        )}>
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={clsx(
                  // 修改 1: 移除固定的 gap-2，由文字的 margin-left 来控制间距
                  // 修改 2: 动态 padding，选中时宽一点(px-5)，未选中窄一点(px-3)
                  "relative py-2.5 rounded-xl flex items-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]", 
                  isActive 
                    ? "px-5 bg-slate-100 text-blue-600 font-bold shadow-sm" 
                    : "px-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium"
                )}
              >
                <item.icon 
                  size={20} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className="transition-transform duration-300"
                />
                
                {/* 修改 3: 恢复折叠逻辑 */}
                <span className={clsx(
                  "text-sm whitespace-nowrap overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
                  isActive 
                    ? "w-auto opacity-100 translate-x-0 ml-2" // 选中：显示文字，左侧加间距
                    : "w-0 opacity-0 -translate-x-4"           // 未选中：宽度0，向左位移隐藏
                )}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* === 3. 右上角工具栏 (随滚动隐藏) === */}
      <div 
        className={clsx(
          "fixed top-6 right-6 z-40 flex items-center gap-3 transition-all duration-500 ease-in-out",
          isScrolled ? "opacity-0 -translate-y-10 pointer-events-none" : "opacity-100 translate-y-0"
        )}
      >
         <button className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-white/50 flex items-center justify-center hover:bg-white text-slate-500 hover:text-blue-600 transition-all hover:scale-105"><Search size={18} /></button>
         <button className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-white/50 flex items-center justify-center hover:bg-white text-slate-500 hover:text-blue-600 transition-all hover:scale-105 relative">
           <Bell size={18} />
           <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
         </button>
         <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full shadow-lg shadow-blue-500/20 border-2 border-white cursor-pointer hover:ring-4 ring-blue-50/50 transition-all hover:scale-105"></div>
      </div>

      {/* === 页面内容区域 === */}
      <main 
        onScroll={handleScroll} 
        className="w-full h-full pt-28 px-4 md:px-8 overflow-y-auto overflow-x-hidden scroll-smooth"
      >
        <Outlet />
      </main>

    </div>
  );
}
