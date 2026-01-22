import React from 'react';
import { Trash2, Layers, FileJson } from 'lucide-react';

const FieldEditor = ({ fields = {}, onChange, definedModels = [] }) => {
  const fieldList = Object.entries(fields).map(([key, val]) => ({ key, ...val }));
  const handleUpdate = (newList) => onChange(newList.reduce((acc, curr) => { if(curr.key) { const {key, ...rest} = curr; acc[key] = rest; } return acc; }, {}));
  const addField = () => { let k=`f_${fieldList.length+1}`; while(fieldList.some(f=>f.key===k)) k+='_n'; handleUpdate([...fieldList, { key: k, type: 'str' }]); };
  const updateField = (idx, k, v) => { const list = [...fieldList]; list[idx] = { ...list[idx], [k]: v }; handleUpdate(list); };
  const removeField = (idx) => { const list = [...fieldList]; list.splice(idx, 1); handleUpdate(list); };

  return (
    <div className="space-y-2 mt-2">
      {fieldList.map((f, i) => (
        <div key={i} className="flex flex-col gap-2 p-2 bg-white border border-slate-200 rounded-lg shadow-sm group">
          <div className="flex gap-2">
            <input placeholder="字段名" value={f.key} onChange={e => updateField(i, 'key', e.target.value)} className="flex-1 min-w-0 border-b border-slate-200 text-xs font-bold text-slate-700 outline-none focus:border-blue-400 px-1" />
            <select value={f.type} onChange={e => updateField(i, 'type', e.target.value)} className="w-24 text-[10px] bg-slate-50 border rounded outline-none cursor-pointer">
              <option value="str">Str</option><option value="int">Int</option><option value="bool">Bool</option>
              {definedModels.map(m => <option key={m} value={m}>{m}</option>)}
              {definedModels.map(m => <option key={`List[${m}]`} value={`List[${m}]`}>List[{m}]</option>)}
            </select>
            <button onClick={() => removeField(i)} className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12} /></button>
          </div>
          <input placeholder="Desc" value={f.description || ''} onChange={e => updateField(i, 'description', e.target.value)} className="w-full text-[10px] text-slate-500 italic bg-transparent outline-none px-1" />
          {f.type === 'int' && (
             <div className="flex gap-2 px-1">
               <span className="text-[9px] text-slate-400 self-center">Range:</span>
               <input placeholder="Min" type="number" value={f.ge || ''} onChange={e => updateField(i, 'ge', parseInt(e.target.value))} className="w-12 bg-slate-50 text-[9px] px-1 rounded border border-slate-100 outline-none" />
               <span className="text-[9px] text-slate-400 self-center">-</span>
               <input placeholder="Max" type="number" value={f.le || ''} onChange={e => updateField(i, 'le', parseInt(e.target.value))} className="w-12 bg-slate-50 text-[9px] px-1 rounded border border-slate-100 outline-none" />
             </div>
          )}
        </div>
      ))}
      <button onClick={addField} className="w-full py-1.5 text-[10px] font-medium text-blue-500 bg-blue-50/50 hover:bg-blue-50 rounded border border-dashed border-blue-200 transition-colors">+ 添加字段</button>
    </div>
  );
};

export default function StructureOutputBuilder({ value = {}, onChange }) {
  const nested = value.__nested__ || {};
  const rootFields = { ...value }; delete rootFields.__nested__;
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
          <div key={name} className="bg-white border border-slate-200 rounded-lg p-2 shadow-sm"><div className="flex items-center justify-between mb-1 pb-1 border-b border-slate-50"><span className="text-xs font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">{name}</span><button onClick={() => deleteModel(name)} className="text-slate-400 hover:text-red-500"><Trash2 size={10} /></button></div><FieldEditor fields={nested[name]} onChange={(f) => updateModelFields(name, f)} definedModels={definedModels} /></div>
        ))}
      </div>
      <div className="space-y-2 pt-2 border-t border-slate-200/50"><label className="text-xs font-bold text-slate-500 flex items-center gap-1"><FileJson size={12} /> Root Output</label><div className="bg-blue-50/30 border border-blue-100 rounded-lg p-2"><FieldEditor fields={rootFields} onChange={updateRootFields} definedModels={definedModels} /></div></div>
    </div>
  );
}
