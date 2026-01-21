import React, { useMemo, useState } from 'react';
import { Trash2, Plus, Code, Braces, Info, Cpu, AlignLeft, ArrowRightLeft, Terminal, Play, GitFork, Layers, FileJson, Server, Database, Globe, FileText, CheckCircle2, Cloud, Search, X } from 'lucide-react';
import Modal from '../../components/ui/Modal';

// ==================================================================================
// 1. Schema Builder (Start 节点专用)
// ==================================================================================
const SchemaBuilder = ({ value = [], onChange }) => {
  const handleAdd = () => onChange([...value, { key: '', type: 'str', reducer: '' }]);
  const handleDelete = (index) => { const v = [...value]; v.splice(index, 1); onChange(v); };
  const handleUpdate = (index, f, v) => { const val = [...value]; val[index] = { ...val[index], [f]: v }; onChange(val); };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">State Schema</label>
        <button onClick={handleAdd} className="flex items-center gap-1 text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100 font-medium"><Plus size={12} /> 添加</button>
      </div>
      <div className="space-y-2">
        {value.map((item, index) => (
          <div key={index} className="group relative bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <div className="flex gap-2 mb-2">
              <input type="text" placeholder="key" value={item.key} onChange={(e) => handleUpdate(index, 'key', e.target.value)} className="flex-1 min-w-0 bg-white border border-slate-200 rounded px-2 py-1 text-xs font-mono outline-none focus:border-blue-500" />
              <select value={item.type} onChange={(e) => handleUpdate(index, 'type', e.target.value)} className="w-20 bg-white border border-slate-200 rounded px-1 py-1 text-xs outline-none focus:border-blue-500">
                <option value="str">String</option><option value="list">List</option><option value="int">Int</option><option value="bool">Bool</option>
              </select>
            </div>
            {item.type === 'list' && (
              <input type="text" placeholder="reducer" value={item.reducer || ''} onChange={(e) => handleUpdate(index, 'reducer', e.target.value)} className="w-full bg-transparent border-b border-slate-200 text-[10px] focus:border-blue-400 outline-none" />
            )}
            <button onClick={() => handleDelete(index)} className="absolute -top-2 -right-2 w-5 h-5 bg-white border rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100"><Trash2 size={10} /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==================================================================================
// 2. Structure Output Builder (结构化输出专用)
// ==================================================================================
const FieldEditor = ({ fields = {}, onChange, definedModels = [] }) => {
  const fieldList = Object.entries(fields).map(([key, val]) => ({ key, ...val }));
  const handleUpdate = (newList) => onChange(newList.reduce((acc, curr) => { if(curr.key) { const {key, ...rest} = curr; acc[key] = rest; } return acc; }, {}));
  
  // 🔥 关键修复：生成唯一 Key
  const addField = () => { 
    let k=`f_${fieldList.length+1}`; 
    while(fieldList.some(f=>f.key===k)) k+='_n'; 
    handleUpdate([...fieldList, { key: k, type: 'str' }]); 
  };
  
  const updateField = (idx, k, v) => { const list = [...fieldList]; list[idx] = { ...list[idx], [k]: v }; handleUpdate(list); };
  const removeField = (idx) => { const list = [...fieldList]; list.splice(idx, 1); handleUpdate(list); };

  return (
    <div className="space-y-2 mt-2">
      {fieldList.map((f, i) => (
        <div key={i} className="flex flex-col gap-2 p-2 bg-white border border-slate-200 rounded-lg shadow-sm group">
          <div className="flex gap-2">
            <input placeholder="字段名" value={f.key} onChange={e => updateField(i, 'key', e.target.value)} className="flex-1 min-w-0 border-b border-slate-200 text-xs font-bold text-slate-700 outline-none focus:border-blue-400 focus:bg-blue-50 px-1 transition-colors" />
            <select value={f.type} onChange={e => updateField(i, 'type', e.target.value)} className="w-24 text-[10px] bg-slate-50 border rounded outline-none cursor-pointer">
              <option value="str">Str</option><option value="int">Int</option><option value="bool">Bool</option>
              {definedModels.map(m => <option key={m} value={m}>{m}</option>)}
              {definedModels.map(m => <option key={`List[${m}]`} value={`List[${m}]`}>List[{m}]</option>)}
            </select>
            <button onClick={() => removeField(i)} className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12} /></button>
          </div>
          <input placeholder="Desc" value={f.description || ''} onChange={e => updateField(i, 'description', e.target.value)} className="w-full text-[10px] text-slate-500 italic bg-transparent outline-none placeholder:text-slate-300 px-1" />
          {f.type === 'int' && (
             <div className="flex gap-2 px-1">
               <span className="text-[9px] text-slate-400 self-center">Range:</span>
               <input placeholder="Min" type="number" value={f.ge || ''} onChange={e => updateField(i, 'ge', parseInt(e.target.value))} className="w-12 bg-slate-50 text-[9px] px-1 rounded border border-slate-100 outline-none focus:border-blue-300" />
               <span className="text-[9px] text-slate-400 self-center">-</span>
               <input placeholder="Max" type="number" value={f.le || ''} onChange={e => updateField(i, 'le', parseInt(e.target.value))} className="w-12 bg-slate-50 text-[9px] px-1 rounded border border-slate-100 outline-none focus:border-blue-300" />
             </div>
          )}
        </div>
      ))}
      <button onClick={addField} className="w-full py-1.5 text-[10px] font-medium text-blue-500 bg-blue-50/50 hover:bg-blue-50 rounded border border-dashed border-blue-200 transition-colors">+ 添加字段</button>
    </div>
  );
};

const StructureOutputBuilder = ({ value = {}, onChange }) => {
  const nested = value.__nested__ || {};
  const rootFields = { ...value };
  delete rootFields.__nested__;
  const definedModels = Object.keys(nested);

  const addModel = () => { const name = prompt("Model Name:"); if (name) onChange({ ...value, __nested__: { ...nested, [name]: {} } }); };
  const updateModelFields = (name, fs) => onChange({ ...value, __nested__: { ...nested, [name]: fs } });
  const deleteModel = (name) => { if(confirm(`Del ${name}?`)) { const n = { ...nested }; delete n[name]; onChange({ ...value, __nested__: n }); }};
  const updateRootFields = (fs) => onChange({ __nested__: nested, ...fs });

  return (
    <div className="space-y-4 border-t border-slate-100 pt-4 bg-slate-50/50 -mx-3 px-3 pb-3">
      <div className="space-y-3">
        <div className="flex items-center justify-between"><label className="text-xs font-bold text-slate-500 flex items-center gap-1"><Layers size={12} /> Models</label><button onClick={addModel} className="text-[10px] bg-slate-200 px-2 py-0.5 rounded hover:bg-slate-300 transition-colors shadow-sm font-medium">New</button></div>
        {definedModels.length === 0 && <div className="text-[10px] text-slate-400 text-center py-2 border border-dashed border-slate-200 rounded">暂无嵌套模型</div>}
        {definedModels.map(name => (
          <div key={name} className="bg-white border border-slate-200 rounded-lg p-2 shadow-sm">
            <div className="flex items-center justify-between mb-1 pb-1 border-b border-slate-50"><span className="text-xs font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">{name}</span><button onClick={() => deleteModel(name)} className="text-slate-400 hover:text-red-500"><Trash2 size={10} /></button></div>
            <FieldEditor fields={nested[name]} onChange={(f) => updateModelFields(name, f)} definedModels={definedModels} />
          </div>
        ))}
      </div>
      <div className="space-y-2 pt-2 border-t border-slate-200/50">
        <label className="text-xs font-bold text-slate-500 flex items-center gap-1"><FileJson size={12} /> Root Output</label>
        <div className="bg-blue-50/30 border border-blue-100 rounded-lg p-2"><FieldEditor fields={rootFields} onChange={updateRootFields} definedModels={definedModels} /></div>
      </div>
    </div>
  );
};

// ==================================================================================
// 3. MCP Tool Selector (弹窗模式)
// ==================================================================================
const MCPToolSelector = ({ selectedIds = [], onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const availableMCPs = [
    { id: 'mcp.notion', name: 'Notion', icon: FileText, desc: 'Read pages & DBs' },
    { id: 'mcp.google_drive', name: 'Google Drive', icon: Cloud, desc: 'Access files' },
    { id: 'mcp.github', name: 'GitHub', icon: Code, desc: 'Repo & Issues' },
    { id: 'mcp.postgres', name: 'PostgreSQL', icon: Database, desc: 'Query SQL' },
    { id: 'mcp.tavily', name: 'Tavily Search', icon: Globe, desc: 'Web Search' },
    { id: 'mcp.fs', name: 'File System', icon: Server, desc: 'Local IO' },
  ];

  const filteredMCPs = availableMCPs.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const selectedMCPs = availableMCPs.filter(m => selectedIds.includes(m.id));

  const handleToggle = (id) => {
    if (selectedIds.includes(id)) onChange(selectedIds.filter(item => item !== id));
    else onChange([...selectedIds, id]);
  };

  return (
    <>
      <div className="space-y-2">
        {selectedMCPs.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedMCPs.map(mcp => {
              const Icon = mcp.icon;
              return (
                <div key={mcp.id} className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-100 text-xs font-medium group">
                  <Icon size={12} /> {mcp.name}
                  <button onClick={(e) => { e.stopPropagation(); handleToggle(mcp.id); }} className="ml-1 text-blue-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><X size={12} /></button>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-[10px] text-slate-400 text-center py-2 bg-slate-50 rounded border border-dashed border-slate-200">暂无挂载工具</div>
        )}
        <button onClick={() => setIsModalOpen(true)} className="w-full py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-1 shadow-sm"><Plus size={14} /> 添加工具</button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="挂载 MCP 工具">
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="搜索工具..." className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 transition-colors" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filteredMCPs.map(mcp => {
            const isSelected = selectedIds.includes(mcp.id);
            const Icon = mcp.icon;
            return (
              <div key={mcp.id} onClick={() => handleToggle(mcp.id)} className={`relative flex flex-col items-center justify-center p-4 rounded-xl border cursor-pointer transition-all duration-200 group ${isSelected ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50 hover:shadow-md'}`}>
                {isSelected && <div className="absolute top-2 right-2 text-blue-600"><CheckCircle2 size={16} fill="white" /></div>}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${isSelected ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-blue-500 transition-colors'}`}><Icon size={20} /></div>
                <div className={`text-sm font-bold mb-1 ${isSelected ? 'text-blue-700' : 'text-slate-700'}`}>{mcp.name}</div>
                <div className="text-[10px] text-slate-400 text-center">{mcp.desc}</div>
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
};

// ==================================================================================
// 4. LLM Config Panel
// ==================================================================================
const LLMConfigPanel = ({ data, onChange, schemaKeys }) => {
  const config = data.config || { model: 'gpt-4', temperature: 0.7, system_prompt: '', need_structure_output: false, mcp_tools: [] };
  const inputMapping = data.input_mapping || {};
  const outputMapping = data.output_mapping || {};

  const handleConfigChange = (field, val) => onChange('config', { ...config, [field]: val });
  const handleMappingChange = (type, field, val) => {
    const current = type === 'input' ? inputMapping : outputMapping;
    onChange(`${type}_mapping`, { ...current, [field]: val });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3"><label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1"><Cpu size={12} /> 模型配置</label><div className="space-y-3 p-3 bg-slate-50 rounded-lg border border-slate-100"><div><span className="text-[10px] text-slate-400 mb-1 block">Model</span><select value={config.model} onChange={(e) => handleConfigChange('model', e.target.value)} className="w-full bg-white border border-slate-200 rounded px-2 py-1.5 text-xs outline-none focus:border-blue-500"><option value="gpt-4">GPT-4</option><option value="gpt-3.5-turbo">GPT-3.5 Turbo</option></select></div><div><div className="flex justify-between mb-1"><span className="text-[10px] text-slate-400">Temperature</span><span className="text-[10px] font-mono text-slate-600">{config.temperature}</span></div><input type="range" min="0" max="1" step="0.1" value={config.temperature} onChange={(e) => handleConfigChange('temperature', parseFloat(e.target.value))} className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500" /></div></div></div>
      <div className="space-y-2"><label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1"><AlignLeft size={12} /> System Prompt</label><textarea className="w-full h-32 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-600 focus:border-blue-500 focus:bg-white outline-none resize-none" placeholder="You are a helpful assistant..." value={config.system_prompt} onChange={(e) => handleConfigChange('system_prompt', e.target.value)} /></div>
      <div className="space-y-2"><label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1"><Server size={12} /> MCP 工具挂载</label><div className="bg-slate-50/50 rounded-lg p-2 border border-slate-100"><MCPToolSelector selectedIds={config.mcp_tools || []} onChange={(newTools) => handleConfigChange('mcp_tools', newTools)} /></div></div>
      <div className="space-y-2"><div className="flex items-center justify-between"><label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1"><Braces size={12} /> 结构化输出 (JSON)</label><button onClick={() => handleConfigChange('need_structure_output', !config.need_structure_output)} className={`w-8 h-4 rounded-full transition-colors relative ${config.need_structure_output ? 'bg-blue-600' : 'bg-slate-300'}`}><div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform ${config.need_structure_output ? 'left-4.5' : 'left-0.5'}`}></div></button></div>{config.need_structure_output && (<StructureOutputBuilder value={data.output_schema || {}} onChange={(v) => onChange('output_schema', v)} />)}</div>
      <div className="space-y-3"><label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1"><ArrowRightLeft size={12} /> 变量映射</label><div className="p-3 bg-white border border-slate-200 rounded-lg space-y-4 shadow-sm"><div className="relative pl-3 border-l-2 border-blue-400"><span className="text-[10px] font-bold text-blue-600 absolute -top-2 left-2 bg-white px-1">INPUT</span><div className="grid grid-cols-1 gap-2 mt-1"><div><span className="text-[10px] text-slate-400">Source</span><select value={inputMapping.source || ''} onChange={(e) => handleMappingChange('input', 'source', e.target.value)} className="w-full mt-1 bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-xs outline-none focus:border-blue-500"><option value="" disabled>选择变量...</option>{schemaKeys.map(k => <option key={k} value={k}>{k}</option>)}</select></div></div></div><div className="relative pl-3 border-l-2 border-orange-400"><span className="text-[10px] font-bold text-orange-600 absolute -top-2 left-2 bg-white px-1">OUTPUT</span><div className="grid grid-cols-1 gap-2 mt-1"><div><span className="text-[10px] text-slate-400">Target</span><select value={outputMapping.target || ''} onChange={(e) => handleMappingChange('output', 'target', e.target.value)} className="w-full mt-1 bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-xs outline-none focus:border-orange-500"><option value="" disabled>选择变量...</option>{schemaKeys.map(k => <option key={k} value={k}>{k}</option>)}</select></div></div></div></div></div>
    </div>
  );
};

// ==================================================================================
// 5. Code Config Panel
// ==================================================================================
const CodeConfigPanel = ({ data, onChange, schemaKeys }) => {
  const config = data.config || { language: 'python', code: '' };
  const inputMapping = data.input_mapping || {};
  const outputMapping = data.output_mapping || {};
  const handleConfigChange = (field, val) => onChange('config', { ...config, [field]: val });
  const handleInputAdd = () => onChange('input_mapping', { ...inputMapping, [`arg_${Object.keys(inputMapping).length + 1}`]: '' });
  const handleInputChange = (oldKey, newKey, newVal) => { const newMapping = { ...inputMapping }; if (oldKey !== newKey) { delete newMapping[oldKey]; newMapping[newKey] = newVal; } else { newMapping[oldKey] = newVal; } onChange('input_mapping', newMapping); };
  const handleInputDelete = (key) => { const newMapping = { ...inputMapping }; delete newMapping[key]; onChange('input_mapping', newMapping); };
  return (
    <div className="space-y-6">
      <div className="space-y-3"><label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1"><Terminal size={12} /> 环境配置</label><select value={config.language} onChange={(e) => handleConfigChange('language', e.target.value)} className="w-full bg-white border border-slate-200 rounded px-2 py-1.5 text-xs outline-none focus:border-blue-500"><option value="python">Python 3.10</option><option value="javascript">JavaScript (Node.js)</option></select></div>
      <div className="space-y-3"><div className="flex items-center justify-between"><label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1"><ArrowRightLeft size={12} /> 入参映射</label><button onClick={handleInputAdd} className="text-[10px] text-blue-600 hover:bg-blue-50 px-2 py-0.5 rounded transition-colors">+ 添加参数</button></div><div className="space-y-2">{Object.entries(inputMapping).map(([argName, schemaKey], idx) => (<div key={idx} className="group relative bg-white border border-slate-200 p-2 rounded-lg flex items-center gap-2 hover:border-blue-300"><div className="flex-1"><span className="text-[9px] text-slate-400 block mb-0.5">代码变量</span><input type="text" value={argName} onChange={(e) => handleInputChange(argName, e.target.value, schemaKey)} className="w-full text-xs font-mono text-blue-600 outline-none border-b border-transparent focus:border-blue-200" /></div><div className="text-slate-300">←</div><div className="flex-1"><span className="text-[9px] text-slate-400 block mb-0.5">Schema</span><select value={schemaKey} onChange={(e) => handleInputChange(argName, argName, e.target.value)} className="w-full text-xs text-slate-700 outline-none bg-transparent"><option value="" disabled>选择...</option>{schemaKeys.map(k => <option key={k} value={k}>{k}</option>)}</select></div><button onClick={() => handleInputDelete(argName)} className="absolute -top-2 -right-2 bg-white border rounded-full p-0.5 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100"><Trash2 size={10} /></button></div>))}</div></div>
      <div className="space-y-2"><label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1"><Code size={12} /> 核心代码</label><div className="relative border border-slate-200 rounded-lg overflow-hidden"><div className="bg-slate-50 px-3 py-1 border-b border-slate-200 flex justify-between items-center"><span className="text-[10px] text-slate-500 font-mono">main.{config.language === 'python' ? 'py' : 'js'}</span><Play size={10} className="text-green-500 cursor-pointer" /></div><textarea className="w-full h-48 px-3 py-2 bg-[#1e1e1e] text-slate-300 text-xs font-mono outline-none resize-none" placeholder={config.language === 'python' ? "def main(params):\n    return params['arg1'] + 1" : "function main(params) {\n  return params.arg1 + 1;\n}"} value={config.code} onChange={(e) => handleConfigChange('code', e.target.value)} spellCheck="false" /></div></div>
      <div className="space-y-3"><label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1"><ArrowRightLeft size={12} /> 出参映射</label><div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm border-l-2 border-l-orange-400"><div className="grid grid-cols-1 gap-2"><div><span className="text-[10px] text-slate-400">Target</span><select value={outputMapping.target || ''} onChange={(e) => onChange('output_mapping', { ...outputMapping, target: e.target.value })} className="w-full mt-1 bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-xs outline-none focus:border-orange-500"><option value="" disabled>选择变量...</option>{schemaKeys.map(k => <option key={k} value={k}>{k}</option>)}</select></div></div></div></div>
    </div>
  );
};

// ==================================================================================
// 6. Condition Config Panel
// ==================================================================================
const getKeyType = (key, nodes) => { const startNode = nodes.find(n => n.type === 'start'); const schema = startNode?.data?.schema || []; const item = schema.find(i => i.key === key); return item?.type || 'str'; };
const ConditionConfigPanel = ({ data, onChange, schemaKeys, nodes }) => {
  const branches = data.branches || [];
  const selectedKey = data.condition_key || '';
  const keyType = getKeyType(selectedKey, nodes);
  const getOperators = (type) => { switch (type) { case 'int': return ['==', '>', '<', '>=', '<=', '!=']; case 'str': return ['equals', 'contains', 'starts_with', 'ends_with']; case 'bool': return ['is_true', 'is_false']; case 'list': return ['contains', 'length_eq', 'length_gt']; default: return ['==', '!=']; } };
  const operators = getOperators(keyType);
  const handleKeyChange = (val) => { const defaultOp = getOperators(getKeyType(val, nodes))[0]; const newBranches = branches.map(b => ({ ...b, operator: defaultOp, value: '' })); onChange('condition_key', val); onChange('branches', newBranches); };
  const handleAddBranch = () => onChange('branches', [...branches, { label: 'Branch', operator: operators[0], value: '' }]);
  const handleDeleteBranch = (index) => { const n = [...branches]; n.splice(index, 1); onChange('branches', n); };
  const handleUpdateBranch = (index, f, v) => { const n = [...branches]; n[index] = { ...n[index], [f]: v }; onChange('branches', n); };
  return (
    <div className="space-y-6">
      <div className="space-y-3"><label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1"><GitFork size={12} /> 条件对象</label><div className="p-3 bg-white border border-slate-200 rounded-lg"><div className="flex items-center justify-between mb-1"><span className="text-[10px] text-slate-400">Schema Key</span>{selectedKey && <span className="text-[9px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-mono uppercase">Type: {keyType}</span>}</div><select value={selectedKey} onChange={(e) => handleKeyChange(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-xs outline-none focus:border-amber-500"><option value="" disabled>选择变量...</option>{schemaKeys.map(k => <option key={k} value={k}>{k}</option>)}</select></div></div>
      <div className="space-y-3"><div className="flex items-center justify-between"><label className="text-xs font-bold text-slate-500 uppercase tracking-wider">分支路由</label><button onClick={handleAddBranch} className="text-[10px] text-amber-600 hover:bg-amber-50 px-2 py-0.5 rounded transition-colors">+ 添加</button></div><div className="space-y-2">{branches.map((branch, index) => (<div key={index} className="group relative bg-white border border-slate-200 p-2 rounded-lg flex items-center gap-2 hover:border-amber-300"><div className="flex-1"><span className="text-[9px] text-slate-400 block">Label</span><input type="text" value={branch.label} placeholder="分支名称" onChange={(e) => handleUpdateBranch(index, 'label', e.target.value)} className="w-full text-xs font-bold text-slate-700 outline-none border-b border-transparent focus:border-amber-200" /></div><div className="flex-1 border-l border-slate-100 pl-2"><span className="text-[9px] text-slate-400 block">Value</span><input type="text" value={branch.value} placeholder="值" onChange={(e) => handleUpdateBranch(index, 'value', e.target.value)} className="w-full text-xs font-mono text-slate-500 outline-none border-b border-transparent focus:border-amber-200" /></div><button onClick={() => handleDeleteBranch(index)} className="absolute -top-2 -right-2 bg-white border rounded-full p-0.5 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100"><Trash2 size={10} /></button></div>))}</div></div>
    </div>
  );
};

// ==================================================================================
// 7. Main Panel
// ==================================================================================
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

  if (!selectedNode) return <aside className="w-80 bg-white border-l p-6 text-slate-400 text-sm">未选择节点</aside>;

  return (
    <aside className="w-80 bg-white border-l border-slate-200 flex flex-col h-full z-10 shadow-xl">
      <div className="h-14 border-b flex items-center px-5 justify-between bg-white flex-shrink-0"><div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${selectedNode.type === 'start' ? 'bg-green-500' : selectedNode.type === 'llm' ? 'bg-purple-500' : selectedNode.type === 'code' ? 'bg-blue-600' : selectedNode.type === 'condition' ? 'bg-amber-500' : 'bg-slate-500'}`}></div><span className="font-bold text-slate-800 text-sm">属性配置</span></div><span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{selectedNode.id}</span></div>
      <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
        <div className="space-y-3"><label className="text-xs font-bold text-slate-500 uppercase tracking-wider">节点信息</label><input type="text" value={selectedNode.data.label} onChange={(e) => updateNodeData('label', e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:border-blue-500 outline-none text-sm font-medium" /></div>
        <div className="w-full h-px bg-slate-100"></div>
        {selectedNode.type === 'start' && <SchemaBuilder value={selectedNode.data.schema || []} onChange={(v) => updateNodeData('schema', v)} />}
        {selectedNode.type === 'llm' && <LLMConfigPanel data={selectedNode.data} onChange={updateNodeData} schemaKeys={schemaKeys} />}
        {selectedNode.type === 'code' && <CodeConfigPanel data={selectedNode.data} onChange={updateNodeData} schemaKeys={schemaKeys} />}
        {selectedNode.type === 'condition' && <ConditionConfigPanel data={selectedNode.data} onChange={updateNodeData} schemaKeys={schemaKeys} nodes={nodes} />}
        {renderDebugJson()}
      </div>
    </aside>
  );
}
