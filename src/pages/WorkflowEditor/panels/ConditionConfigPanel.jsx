import React from 'react';
import { GitFork, Trash2, ArrowRight } from 'lucide-react';

// 获取 Schema 变量类型
const getKeyType = (key, nodes) => {
  const startNode = nodes.find(n => n.type === 'start');
  const schema = startNode?.data?.schema || [];
  const item = schema.find(i => i.key === key);
  return item?.type || 'str';
};

export default function ConditionConfigPanel({ data, onChange, schemaKeys, nodes }) {
  const branches = data.branches || [];
  const selectedKey = data.condition_key || '';
  const keyType = getKeyType(selectedKey, nodes);

  // 根据类型定义可用的操作符
  const getOperators = (type) => {
    switch (type) {
      case 'int': return ['==', '>', '<', '>=', '<=', '!='];
      case 'str': return ['equals', 'contains', 'starts_with', 'ends_with'];
      case 'bool': return ['is_true', 'is_false'];
      case 'list': return ['contains', 'length_eq', 'length_gt'];
      default: return ['==', '!='];
    }
  };
  const operators = getOperators(keyType);

  // 切换变量时重置
  const handleKeyChange = (val) => {
    const defaultOp = getOperators(getKeyType(val, nodes))[0];
    const newBranches = branches.map(b => ({ ...b, operator: defaultOp, value: '' }));
    onChange('condition_key', val);
    onChange('branches', newBranches);
  };

  const handleAddBranch = () => onChange('branches', [...branches, { label: 'New Branch', operator: operators[0], value: '' }]);
  const handleDeleteBranch = (index) => { const n = [...branches]; n.splice(index, 1); onChange('branches', n); };
  const handleUpdateBranch = (index, f, v) => { const n = [...branches]; n[index] = { ...n[index], [f]: v }; onChange('branches', n); };

  return (
    <div className="space-y-6">
      
      {/* 1. 变量选择 */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
          <GitFork size={12} /> 条件对象 (Variable)
        </label>
        <div className="p-3 bg-white border border-slate-200 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-slate-400">Schema Key</span>
            {selectedKey && (
              <span className="text-[9px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-mono uppercase">
                Type: {keyType}
              </span>
            )}
          </div>
          <select 
            value={selectedKey} 
            onChange={(e) => handleKeyChange(e.target.value)} 
            className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-xs outline-none focus:border-amber-500"
          >
            <option value="" disabled>选择变量...</option>
            {schemaKeys.map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
      </div>

      {/* 2. 分支管理 (逻辑核心) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">分支路由 (Branches)</label>
          <button onClick={handleAddBranch} className="text-[10px] text-amber-600 hover:bg-amber-50 px-2 py-0.5 rounded transition-colors">+ 添加分支</button>
        </div>

        <div className="space-y-3">
          {branches.map((branch, index) => (
            <div key={index} className="group relative bg-white border border-slate-200 p-2.5 rounded-lg hover:border-amber-300 shadow-sm transition-all">
              
              {/* 第一行：Label (分支名) */}
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-50">
                <span className="text-[9px] text-slate-400 w-8">Name</span>
                <input 
                  type="text" 
                  value={branch.label} 
                  placeholder="分支名称"
                  onChange={(e) => handleUpdateBranch(index, 'label', e.target.value)}
                  className="flex-1 text-xs font-bold text-slate-700 outline-none placeholder:text-slate-300 focus:text-amber-600 bg-transparent"
                />
              </div>

              {/* 第二行：逻辑表达式 (IF key OP val) */}
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-slate-400">If</span>
                
                {/* 🔥 核心修复：操作符选择框 🔥 */}
                <select 
                  value={branch.operator || operators[0]} 
                  onChange={(e) => handleUpdateBranch(index, 'operator', e.target.value)}
                  className="w-20 bg-slate-50 border border-slate-200 rounded px-1 py-1 text-[10px] outline-none focus:border-amber-500 font-mono cursor-pointer"
                >
                  {operators.map(op => <option key={op} value={op}>{op}</option>)}
                </select>

                {/* 值输入框 (bool 类型不显示) */}
                {keyType !== 'bool' && (
                  <input 
                    type="text" 
                    value={branch.value} 
                    placeholder="Compare Value"
                    onChange={(e) => handleUpdateBranch(index, 'value', e.target.value)}
                    className="flex-1 min-w-0 bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs font-mono text-slate-600 outline-none focus:border-amber-500"
                  />
                )}
              </div>

              <button onClick={() => handleDeleteBranch(index)} className="absolute -top-2 -right-2 bg-white border rounded-full p-0.5 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 shadow-md transition-all">
                <Trash2 size={10} />
              </button>
            </div>
          ))}
        </div>
        
        {branches.length > 0 && (
          <p className="text-[10px] text-slate-400 mt-2 pl-1 border-l-2 border-slate-200">
            提示: 逻辑将按顺序执行，匹配第一个满足条件的分支。
          </p>
        )}
      </div>

    </div>
  );
}
