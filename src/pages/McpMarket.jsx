import React from 'react';
import { Server, Database, Cloud, Plus, ArrowRight } from 'lucide-react';

export default function McpMarket() {
  const connectors = [
    { name: "Notion", icon: "N", color: "bg-black text-white" },
    { name: "Google Drive", icon: "G", color: "bg-blue-600 text-white" },
    { name: "Slack", icon: "S", color: "bg-purple-600 text-white" },
    { name: "Github", icon: "G", color: "bg-gray-800 text-white" },
    { name: "MySQL", icon: "SQL", color: "bg-orange-500 text-white" },
    { name: "Stripe", icon: "S", color: "bg-indigo-600 text-white" },
    { name: "Jira", icon: "J", color: "bg-blue-500 text-white" },
    { name: "Shopify", icon: "Sh", color: "bg-green-600 text-white" }
  ];

  return (
    <div className="w-full pb-32">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* === 头部 Banner === */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Server className="text-orange-500" /> 
              MCP 连接器市场
            </h1>
            <p className="text-slate-500 mt-2 max-w-2xl leading-relaxed">
              Model Context Protocol (MCP) 标准连接器，让 AI 安全地访问您的数据。
              <br className="hidden md:block" />
              连接一切数据源，构建您的企业级知识网络。
            </p>
          </div>
          <div className="flex-shrink-0">
            <button className="group flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all hover:scale-105 shadow-xl shadow-slate-200">
              <Plus size={20} strokeWidth={3} />
              贡献我的 MCP
              <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </button>
          </div>
        </div>

        {/* === 筛选与搜索 === */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
           <div className="flex flex-wrap gap-2">
             {['全部', '数据库', '文档协作', '开发工具', '电商', '金融'].map((tag, idx) => (
               <button key={tag} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                 idx === 0 
                   ? 'bg-slate-900 text-white shadow-md shadow-slate-200' 
                   : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 hover:border-slate-300'
               }`}>
                 {tag}
               </button>
             ))}
           </div>
           <div className="relative group w-full md:w-64">
             <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
             </div>
             <input type="text" placeholder="搜索 MCP..." className="w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-full pl-10 pr-4 py-2.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm hover:border-slate-300" />
           </div>
        </div>

        {/* === 列表内容 === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {connectors.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-orange-200 transition-all cursor-pointer group">
              <div className="flex items-center justify-between mb-6">
                 <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-2xl font-bold shadow-md`}>
                   {item.icon}
                 </div>
                 <div className="px-2 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-md flex items-center gap-1">
                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                   Verified
                 </div>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">{item.name} MCP</h3>
              <p className="text-xs text-slate-400 mb-4">v1.2.0 • Official</p>
              <div className="space-y-2">
                 <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2 rounded-lg">
                    <Database size={14} /> 读取数据库表
                 </div>
                 <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2 rounded-lg">
                    <Cloud size={14} /> 访问云端文件
                 </div>
              </div>
              <button className="w-full mt-6 py-2 bg-slate-900 text-white text-sm font-medium rounded-xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                安装连接器
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
