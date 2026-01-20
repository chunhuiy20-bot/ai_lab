import React from 'react';
import { Bot, MessageSquare, Zap, Star, Shield, ArrowRight, Plus } from 'lucide-react';

export default function AgentMarket() {
  const agents = [
    { 
      name: "Code Architect", role: "高级架构师", desc: "专注于分布式系统设计，精通 Microservices 与 Kubernetes 部署方案。", 
      model: "GPT-4 Turbo", speed: "Fast", price: "$0.03/run", tags: ["Python", "Go", "K8s"], color: "from-blue-500 to-cyan-400"
    },
    { 
      name: "Legal Mind", role: "资深法务", desc: "基于全球 5000 万份合同判例训练，为您审核商业合同风险。", 
      model: "Claude 3 Opus", speed: "Medium", price: "$0.06/run", tags: ["Contract", "Risk", "Audit"], color: "from-purple-500 to-pink-500"
    },
    { 
      name: "Growth Hacker", role: "增长黑客", desc: "分析用户行为数据，自动生成 A/B 测试方案与营销邮件。", 
      model: "Gemini Pro", speed: "Fast", price: "$0.01/run", tags: ["Marketing", "SEO", "Data"], color: "from-orange-500 to-red-500"
    },
    { 
      name: "UX Designer", role: "交互设计师", desc: "上传草图，自动生成 Figma 组件代码与交互逻辑说明。", 
      model: "GPT-4 Vision", speed: "Slow", price: "$0.05/run", tags: ["Figma", "React", "CSS"], color: "from-green-400 to-emerald-600"
    },
    // 为了填满网格，复制一份
    { 
      name: "Data Scientist", role: "数据科学家", desc: "处理百万级 CSV 数据，挖掘业务洞察并生成可视化报告。", 
      model: "GPT-4o", speed: "Fast", price: "$0.02/run", tags: ["Pandas", "Analysis", "Chart"], color: "from-indigo-500 to-violet-500"
    },
    { 
      name: "Copy Writer", role: "金牌文案", desc: "精通小红书、抖音爆款文案逻辑，一键生成吸睛标题。", 
      model: "Claude 3.5 Sonnet", speed: "Fast", price: "$0.01/run", tags: ["Copywriting", "Social", "Viral"], color: "from-pink-500 to-rose-400"
    },
  ];

  return (
    <div className="w-full pb-32">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* === 头部 Banner === */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full border border-blue-100 uppercase tracking-wider">AI Workforce</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">数字员工市场</h1>
            <p className="text-slate-500 text-lg max-w-2xl">
              不要从零开始。直接雇佣经过专业训练的 AI Agent，立即提升团队生产力。
            </p>
          </div>
          <button className="group flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-all hover:scale-105 shadow-xl shadow-slate-200">
            <Plus size={20} />
            创建我的 Agent
            <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </button>
        </div>

        {/* === 筛选与搜索 === */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
           <div className="flex flex-wrap gap-2">
             {['全部', '编程开发', '法律咨询', '市场营销', '数据分析', '人力资源'].map((tag, idx) => (
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
             <input type="text" placeholder="搜索 Agent..." className="w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-full pl-10 pr-4 py-2.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm hover:border-slate-300" />
           </div>
        </div>

        {/* === Agent 卡片列表 === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {agents.map((agent, i) => (
            <div key={i} className="group relative bg-white rounded-3xl p-1 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden">
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${agent.color} opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity duration-500 rounded-full -translate-y-1/2 translate-x-1/2`}></div>
              <div className="relative bg-white/50 backdrop-blur-sm rounded-[1.4rem] p-7 h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${agent.color} p-0.5 shadow-lg`}>
                      <div className="w-full h-full bg-white rounded-[0.9rem] flex items-center justify-center">
                        <Bot size={32} className={`text-transparent bg-clip-text bg-gradient-to-br ${agent.color}`} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{agent.name}</h3>
                      <p className="text-slate-500 text-sm font-medium flex items-center gap-2 mt-1">
                        {agent.role}
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600 border border-slate-200">{agent.model}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-sm bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">
                    <Star size={14} fill="currentColor" /> 4.9
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 border-l-2 border-slate-100 pl-4">{agent.desc}</p>
                <div className="flex items-center gap-2 mb-8 flex-wrap">
                  {agent.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium px-2.5 py-1 bg-slate-50 text-slate-600 rounded-md border border-slate-200">{tag}</span>
                  ))}
                </div>
                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex gap-6 text-xs font-medium text-slate-400">
                     <div className="flex items-center gap-1.5"><Zap size={14} className={agent.speed === "Fast" ? "text-green-500" : "text-yellow-500"} /> {agent.speed}</div>
                     <div className="flex items-center gap-1.5"><Shield size={14} /> 安全沙箱</div>
                  </div>
                  <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-slate-200 group-hover:shadow-blue-200">
                    <MessageSquare size={16} /> 雇佣
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
