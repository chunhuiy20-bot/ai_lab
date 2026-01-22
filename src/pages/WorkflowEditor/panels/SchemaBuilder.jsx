import React from 'react';
import { Trash2, Plus } from 'lucide-react';

export default function SchemaBuilder({ value = [], onChange }) {
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
}
