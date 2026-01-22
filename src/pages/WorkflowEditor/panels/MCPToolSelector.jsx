import React, { useState } from 'react';
import { FileText, Cloud, Code, Database, Globe, Server, CheckCircle2, Search, X, Plus } from 'lucide-react';
// 👇 注意这里的路径，根据你的目录结构调整
import Modal from '../../../components/ui/Modal'; 

export default function MCPToolSelector({ selectedIds = [], onChange }) {
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
}
