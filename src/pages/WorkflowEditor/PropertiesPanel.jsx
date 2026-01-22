import React, { useMemo } from 'react';
import { Braces, Info, Code } from 'lucide-react';

// 引入拆分后的子组件
import SchemaBuilder from './panels/SchemaBuilder';
import LLMConfigPanel from './panels/LLMConfigPanel';
import CodeConfigPanel from './panels/CodeConfigPanel';
import ConditionConfigPanel from './panels/ConditionConfigPanel';

export default function PropertiesPanel({ selectedNode, nodes, setNodes }) {
  
  const schemaKeys = useMemo(() => {
    const startNode = nodes?.find(n => n.type === 'start');
    return (startNode?.data?.schema || []).map(item => item.key).filter(Boolean);
  }, [nodes]);

  const updateNodeData = (key, value) => {
    setNodes((nds) => nds.map((n) => n.id === selectedNode.id ? { ...n, data: { ...n.data, [key]: value } } : n));
  };

  const renderDebugJson = () => (
    <div className="mt-8 pt-4 border-t border-slate-100">
      <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-2 font-mono uppercase"><Braces size={10} /> Data Preview</div>
      <div className="bg-slate-900 rounded-lg p-3 overflow-hidden"><pre className="text-[9px] text-green-400 font-mono overflow-x-auto">{JSON.stringify(selectedNode.data, null, 2)}</pre></div>
    </div>
  );

  if (!selectedNode) return <aside className="w-80 bg-white border-l p-6 flex flex-col items-center justify-center text-slate-400 z-10 shadow-sm select-none"><div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 text-slate-300"><Info size={32} /></div><p className="font-medium text-sm">未选择节点</p></aside>;

  return (
    <aside className="w-80 bg-white border-l border-slate-200 flex flex-col h-full z-10 shadow-xl">
      <div className="h-14 border-b flex items-center px-5 justify-between bg-white flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${selectedNode.type === 'start' ? 'bg-green-500' : selectedNode.type === 'llm' ? 'bg-purple-500' : selectedNode.type === 'code' ? 'bg-blue-600' : selectedNode.type === 'condition' ? 'bg-amber-500' : 'bg-slate-500'}`}></div>
          <span className="font-bold text-slate-800 text-sm">属性配置</span>
        </div>
        <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 truncate max-w-[80px]">{selectedNode.id}</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
        {/* 通用：基础信息 */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">节点信息</label>
          <div>
            <span className="text-xs text-slate-400 mb-1 block">节点名称</span>
            <input type="text" value={selectedNode.data.label} onChange={(e) => updateNodeData('label', e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:border-blue-500 outline-none text-sm font-medium" />
          </div>
          <div>
            <span className="text-xs text-slate-400 mb-1 block">节点类型</span>
            <div className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 text-xs font-mono flex items-center gap-2"><Code size={12} />{selectedNode.type}</div>
          </div>
        </div>
        
        <div className="w-full h-px bg-slate-100"></div>

        {/* 动态加载子面板 */}
        {selectedNode.type === 'start' && <SchemaBuilder value={selectedNode.data.schema || []} onChange={(v) => updateNodeData('schema', v)} />}
        {selectedNode.type === 'llm' && <LLMConfigPanel data={selectedNode.data} onChange={updateNodeData} schemaKeys={schemaKeys} />}
        {selectedNode.type === 'code' && <CodeConfigPanel data={selectedNode.data} onChange={updateNodeData} schemaKeys={schemaKeys} />}
        {selectedNode.type === 'condition' && <ConditionConfigPanel data={selectedNode.data} onChange={updateNodeData} schemaKeys={schemaKeys} nodes={nodes} />}

        {renderDebugJson()}
      </div>
    </aside>
  );
}
