import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Bot, Play, SquareTerminal, Code2, GitFork } from 'lucide-react';

const icons = {
  start: Play,
  end: SquareTerminal,
  llm: Bot,
  code: Code2,
  condition: GitFork,
};

const colors = {
  start: 'bg-green-500',
  end: 'bg-orange-500',
  llm: 'bg-purple-600',
  code: 'bg-blue-600',
  condition: 'bg-amber-500',
};

const CustomNode = ({ data, selected, id }) => {
  const Icon = icons[data.type] || Bot;
  const colorClass = colors[data.type] || 'bg-slate-500';
  const branches = data.branches || [];

  return (
    <div className={`
      min-w-[220px] bg-white rounded-xl border-2 transition-all duration-200 shadow-sm
      ${selected ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-slate-200 hover:border-slate-300'}
    `}>
      
      {/* === Header === */}
      <div className="flex items-center gap-3 p-3 border-b border-slate-100 bg-slate-50/50 rounded-t-lg">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm ${colorClass}`}>
          <Icon size={16} strokeWidth={2.5} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-slate-700 truncate">{data.label}</div>
          <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{data.type}</div>
        </div>
      </div>

      {/* === Content === */}
      <div className="p-3 bg-white rounded-b-lg">
        {data.type === 'condition' ? (
          // ✅ 条件节点专用布局 (增强版)
          <div className="space-y-3">
            
            {/* 1. 顶部显示的条件变量 */}
            <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
              <span>If Variable:</span>
              <span className="font-mono font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100 truncate max-w-[100px]">
                {data.condition_key || '未配置'}
              </span>
            </div>
            
            {/* 2. 分支列表 (展示详细逻辑) */}
            <div className="space-y-1.5">
              {branches.map((branch, index) => (
                <div key={index} className="relative flex items-center justify-between h-8 pl-2 pr-3 bg-slate-50 border border-slate-100 rounded-md text-xs group hover:border-amber-200 transition-colors">
                  
                  {/* 左侧：分支名 + 逻辑 */}
                  <div className="flex items-center gap-2 overflow-hidden mr-2">
                    <span className="font-bold text-slate-600 truncate max-w-[60px]" title={branch.label}>
                      {branch.label}
                    </span>
                    {/* 逻辑展示胶囊 */}
                    <div className="flex items-center gap-1 bg-white border border-slate-200 px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-500 whitespace-nowrap">
                      <span className="text-amber-500 font-bold">{branch.operator || '=='}</span>
                      <span className="truncate max-w-[50px]">{branch.value}</span>
                    </div>
                  </div>

                  {/* 右侧：连接点 */}
                  <Handle
                    type="source"
                    position={Position.Right}
                    id={`branch-${index}`} 
                    className="!w-2.5 !h-2.5 !bg-amber-400 !border-2 !border-white !-right-[7px] hover:!bg-amber-600 hover:scale-125 transition-all z-10"
                  />
                </div>
              ))}
            </div>

            {branches.length === 0 && <div className="text-[10px] text-red-400 text-center py-2 border border-dashed border-red-100 rounded bg-red-50">无分支，请配置</div>}
          </div>
        ) : (
          // ✅ 普通节点布局
          <div className="text-xs text-slate-500 leading-relaxed">
            {data.desc || "此节点暂无描述信息。"}
          </div>
        )}
      </div>

      {/* Input Handle */}
      {data.type !== 'start' && (
        <Handle type="target" position={Position.Left} className="!w-3 !h-3 !bg-slate-200 !border-2 !border-white hover:!bg-blue-500 transition-colors" />
      )}

      {/* Output Handle */}
      {data.type !== 'end' && data.type !== 'condition' && (
        <Handle type="source" position={Position.Right} className="!w-3 !h-3 !bg-slate-200 !border-2 !border-white hover:!bg-blue-500 transition-colors" />
      )}
    </div>
  );
};

export default memo(CustomNode);
