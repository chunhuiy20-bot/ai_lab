import React from 'react';
import { GitBranch, Play, Download, Star, Plus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. 引入
import { useAuthAction } from '../hooks/useAuthAction'; // 2. 引入

export default function WorkflowMarket() {
  const checkAuth = useAuthAction();
  const navigate = useNavigate();
  const workflows = Array.from({ length: 9 }).map((_, i) => ({
    id: i,
    title: i % 2 === 0 ? "RAG 知识库问答流" : "多Agent协同写作流",
    desc: "自动爬取网页数据，清洗后存入向量数据库，并结合 GPT-4 进行精准问答。",
    tags: ["Search", "RAG", "LLM"],
    runs: 1200 + i * 50,
    stars: 85 + i,
    author: "AI Lab Team"
  }));

  const handleCreateClick = () => {
    checkAuth(() => {
      // 只有登录后才会执行这里
      navigate('/studio/create-workflow'); // 跳转到私有的创建页
    });
  };

  return (
    <div className="w-full pb-32">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* === 头部 Banner (修改重点) === */}
        {/* 使用 flex 布局实现左右对齐，gap-6 保持间距 */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          
          {/* 左侧：文案区 */}
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 inline-block">
              Workflow 模版市场
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed">
              探索社区精选的工作流模版，一键克隆，快速构建您的自动化业务逻辑。
              <br className="hidden md:block" />
              无论是简单的自动化任务，还是复杂的 AI Agent 编排，都能在这里找到灵感。
            </p>
          </div>

          {/* 右侧：按钮区 */}
          {/* flex-shrink-0 防止按钮被挤压 */}
          <div className="flex-shrink-0">
            <button onClick={handleCreateClick} className="group flex items-center gap-2 bg-blue-600 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all hover:scale-105 shadow-xl shadow-blue-200">
              <Plus size={20} strokeWidth={3} />
              创建我的 Workflow
              <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </button>
          </div>
        </div>

        {/* === 筛选栏与搜索栏 (Flex 布局：两端对齐) === */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
           
           {/* 左侧：分类标签 */}
           <div className="flex flex-wrap gap-2">
             {['全部', '知识库', 'SEO优化', '数据分析', '办公自动化', '图像生成'].map((tag, idx) => (
               <button key={tag} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                 idx === 0 
                   ? 'bg-slate-900 text-white shadow-md shadow-slate-200' 
                   : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 hover:border-slate-300'
               }`}>
                 {tag}
               </button>
             ))}
           </div>

           {/* 右侧：搜索栏 */}
           <div className="relative group w-full md:w-64">
             {/* 搜索图标 */}
             <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
             </div>
             
             {/* 输入框 */}
             <input 
               type="text" 
               placeholder="搜索模版..." 
               className="w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-full pl-10 pr-4 py-2.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm hover:border-slate-300"
             />
             
             {/* 快捷键提示 (可选) */}
             <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
               <kbd className="inline-flex items-center border border-slate-200 rounded px-1.5 text-[10px] font-sans font-medium text-slate-400 bg-slate-50">⌘K</kbd>
             </div>
           </div>
           
        </div>

        {/* 列表网格 (保持不变) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflows.map((wf) => (
            <div key={wf.id} className="group bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden">
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full -z-0 opacity-50 group-hover:opacity-100 transition-opacity"></div>

              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                  <GitBranch size={24} />
                </div>
                <div className="flex gap-2">
                   <span className="flex items-center gap-1 text-xs font-semibold bg-slate-50 px-2 py-1 rounded-lg text-slate-500">
                     <Play size={10} fill="currentColor" /> {wf.runs}
                   </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors relative z-10">
                {wf.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2 relative z-10">
                {wf.desc}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50 relative z-10">
                 <div className="flex gap-2">
                    {wf.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 bg-slate-50 text-slate-500 rounded-md">#{tag}</span>
                    ))}
                 </div>
                 <button className="p-2 rounded-full hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors">
                   <Download size={18} />
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
