import React from 'react';
import { nodeTypesList } from './constants';

export default function Sidebar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    // 1. 定位修改：bottom-8 (距离底部), left-1/2 (水平居中)
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
      
      {/* 2. 容器样式：改为 Flex 行布局 (flex-row)，增加圆角和毛玻璃效果 */}
      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xl border border-slate-200/60 shadow-2xl shadow-blue-900/5 p-2 rounded-2xl transition-all hover:scale-105 duration-300 hover:shadow-3xl">
        
        {/* 左侧装饰性标题 */}
        <div className="px-3 border-r border-slate-200/60 mr-1 hidden sm:flex flex-col items-center justify-center">
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nodes</span>
        </div>

        {/* 3. 节点列表：改为横向排列 */}
        {nodeTypesList.map((item) => (
          <div
            key={item.type}
            onDragStart={(event) => onDragStart(event, item.type)}
            draggable
            className="group relative flex flex-col items-center justify-center w-18 p-2 rounded-xl cursor-grab transition-all hover:bg-white hover:shadow-md hover:-translate-y-2 active:cursor-grabbing"
          >
            
            {/* 图标容器 */}
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-sm transition-transform duration-300 group-hover:scale-110 ${
              item.type === 'start' ? 'bg-gradient-to-br from-green-400 to-green-600' :
              item.type === 'end' ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
              item.type === 'code' ? 'bg-gradient-to-br from-blue-400 to-blue-600' : 
              'bg-gradient-to-br from-purple-400 to-purple-600'
            }`}>
              {item.icon}
            </div>
            
            {/* 文字标签 (小字) */}
            <span className="text-[10px] font-bold text-slate-500 mt-1.5 opacity-80 group-hover:text-slate-800 group-hover:opacity-100">
              {item.label}
            </span>

            {/* Tooltip (鼠标悬停显示详细描述) */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
              {item.desc}
              {/* 小三角 */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
