import React from 'react';
import { Heart, Building2, Crown, Plus, ArrowRight } from 'lucide-react';

export default function Lab() {
  
  const contributors = [
    "https://i.pravatar.cc/150?u=1", "https://i.pravatar.cc/150?u=2", "https://i.pravatar.cc/150?u=3",
    "https://i.pravatar.cc/150?u=4", "https://i.pravatar.cc/150?u=5", "https://i.pravatar.cc/150?u=6",
    "https://i.pravatar.cc/150?u=8", "https://i.pravatar.cc/150?u=9", "https://i.pravatar.cc/150?u=10",
    "https://i.pravatar.cc/150?u=11", "https://i.pravatar.cc/150?u=12", "https://i.pravatar.cc/150?u=13"
  ];

  const sponsors = [
    { name: "Vercel", color: "text-black" },
    { name: "OpenAI", color: "text-emerald-600" },
    { name: "Stripe", color: "text-indigo-600" },
    { name: "AWS", color: "text-orange-500" }
  ];

  return (
    <div className="w-full pb-32"> 
      <div className="max-w-7xl mx-auto px-6">
        
        {/* === 头部 Banner === */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">AI 应用实验室</h1>
            <p className="text-slate-500 text-lg leading-relaxed">
              在这里构建、测试和发布你的下一代 AI 应用。再次测试能不能按照我的逻辑自动部署
              <br className="hidden md:block" />
              汇聚全球开发者的创新实验，探索 LLM 能力边界。
            </p>
          </div>
          <div className="flex-shrink-0">
            <button className="group flex items-center gap-2 bg-blue-600 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all hover:scale-105 shadow-xl shadow-blue-200">
              <Plus size={20} strokeWidth={3} />
              提交我的实验
              <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </button>
          </div>
        </div>

        {/* === 筛选与搜索 === */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
           <div className="flex flex-wrap gap-2">
             {['全部', '多模态', '视频生成', '3D模型', '语音合成', '代码助手'].map((tag, idx) => (
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
             <input type="text" placeholder="搜索实验..." className="w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-full pl-10 pr-4 py-2.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm hover:border-slate-300" />
           </div>
        </div>
        
        {/* === 实验项目列表 === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div key={i} className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🧪
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">实验项目 {i}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">这是一个用于测试最新 LLM 模型的沙盒环境，支持多模态输入。</p>
            </div>
          ))}
        </div>

        {/* === 致谢贡献者与企业赞助商 === */}
        <div className="border-t border-slate-200 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Heart className="text-pink-500" size={24} fill="currentColor" />
                <h2 className="text-2xl font-bold text-slate-900">核心贡献者</h2>
              </div>
              <p className="text-slate-500 mb-8">特别感谢以下开发者为 AI Lab 社区提交的代码、模版与反馈。</p>
              <div className="flex flex-wrap gap-3">
                {contributors.map((avatar, i) => (
                  <div key={i} className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-pink-500 to-purple-500 cursor-pointer hover:scale-110 transition-transform relative group">
                     <img src={avatar} alt="user" className="w-full h-full rounded-full border-2 border-white object-cover" />
                  </div>
                ))}
                <button className="w-12 h-12 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all text-xs font-medium">+99</button>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Crown className="text-amber-500" size={24} fill="currentColor" />
                <h2 className="text-2xl font-bold text-slate-900">企业赞助商</h2>
              </div>
              <p className="text-slate-500 mb-8">感谢以下合作伙伴为社区提供的算力支持与基础设施服务。</p>
              <div className="grid grid-cols-2 gap-4">
                {sponsors.map((sponsor, i) => (
                  <div key={i} className="h-20 bg-white border border-slate-200 rounded-xl flex items-center justify-center gap-3 hover:border-slate-400 hover:shadow-md transition-all cursor-pointer grayscale hover:grayscale-0 group">
                    <Building2 className={`w-6 h-6 ${sponsor.color} opacity-80 group-hover:opacity-100`} />
                    <span className={`text-lg font-bold text-slate-600 group-hover:text-slate-900`}>{sponsor.name}</span>
                  </div>
                ))}
                <div className="h-20 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer text-sm font-medium">成为赞助商</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
