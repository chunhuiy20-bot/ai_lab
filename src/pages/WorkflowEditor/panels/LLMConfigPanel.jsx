import React from 'react';
import { Cpu, AlignLeft, Server, Braces, ArrowRightLeft } from 'lucide-react';
import StructureOutputBuilder from './StructureOutputBuilder';
import MCPToolSelector from './MCPToolSelector';

export default function LLMConfigPanel({ data, onChange, schemaKeys }) {
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
      {/* Model */}
      <div className="space-y-3"><label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1"><Cpu size={12} /> 模型配置</label><div className="space-y-3 p-3 bg-slate-50 rounded-lg border border-slate-100"><div><span className="text-[10px] text-slate-400 mb-1 block">Model</span><select value={config.model} onChange={(e) => handleConfigChange('model', e.target.value)} className="w-full bg-white border border-slate-200 rounded px-2 py-1.5 text-xs outline-none focus:border-blue-500"><option value="gpt-4">GPT-4</option><option value="gpt-3.5-turbo">GPT-3.5 Turbo</option></select></div><div><div className="flex justify-between mb-1"><span className="text-[10px] text-slate-400">Temperature</span><span className="text-[10px] font-mono text-slate-600">{config.temperature}</span></div><input type="range" min="0" max="1" step="0.1" value={config.temperature} onChange={(e) => handleConfigChange('temperature', parseFloat(e.target.value))} className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500" /></div></div></div>
      
      {/* Prompt */}
      <div className="space-y-2"><label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1"><AlignLeft size={12} /> System Prompt</label><textarea className="w-full h-32 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-600 focus:border-blue-500 focus:bg-white outline-none resize-none" placeholder="You are a helpful assistant..." value={config.system_prompt} onChange={(e) => handleConfigChange('system_prompt', e.target.value)} /></div>
      
      {/* MCP */}
      <div className="space-y-2"><label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1"><Server size={12} /> MCP 工具挂载</label><div className="bg-slate-50/50 rounded-lg p-2 border border-slate-100"><MCPToolSelector selectedIds={config.mcp_tools || []} onChange={(newTools) => handleConfigChange('mcp_tools', newTools)} /></div></div>
      
      {/* Structure Output */}
      <div className="space-y-2"><div className="flex items-center justify-between"><label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1"><Braces size={12} /> 结构化输出 (JSON)</label><button onClick={() => handleConfigChange('need_structure_output', !config.need_structure_output)} className={`w-8 h-4 rounded-full transition-colors relative ${config.need_structure_output ? 'bg-blue-600' : 'bg-slate-300'}`}><div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform ${config.need_structure_output ? 'left-4.5' : 'left-0.5'}`}></div></button></div>{config.need_structure_output && (<StructureOutputBuilder value={data.output_schema || {}} onChange={(v) => onChange('output_schema', v)} />)}</div>
      
      {/* Mapping */}
      <div className="space-y-3"><label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1"><ArrowRightLeft size={12} /> 变量映射</label><div className="p-3 bg-white border border-slate-200 rounded-lg space-y-4 shadow-sm"><div className="relative pl-3 border-l-2 border-blue-400"><span className="text-[10px] font-bold text-blue-600 absolute -top-2 left-2 bg-white px-1">INPUT</span><div className="grid grid-cols-1 gap-2 mt-1"><div><span className="text-[10px] text-slate-400">Source</span><select value={inputMapping.source || ''} onChange={(e) => handleMappingChange('input', 'source', e.target.value)} className="w-full mt-1 bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-xs outline-none focus:border-blue-500"><option value="" disabled>选择变量...</option>{schemaKeys.map(k => <option key={k} value={k}>{k}</option>)}</select></div></div></div><div className="relative pl-3 border-l-2 border-orange-400"><span className="text-[10px] font-bold text-orange-600 absolute -top-2 left-2 bg-white px-1">OUTPUT</span><div className="grid grid-cols-1 gap-2 mt-1"><div><span className="text-[10px] text-slate-400">Target</span><select value={outputMapping.target || ''} onChange={(e) => handleMappingChange('output', 'target', e.target.value)} className="w-full mt-1 bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-xs outline-none focus:border-orange-500"><option value="" disabled>选择变量...</option>{schemaKeys.map(k => <option key={k} value={k}>{k}</option>)}</select></div></div></div></div></div>
    </div>
  );
}
