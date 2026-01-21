import React, { useState, useCallback, useRef, useMemo } from 'react';
import { ReactFlow, ReactFlowProvider, addEdge, useNodesState, useEdgesState, Controls, Background, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css'; 
import Sidebar from './Sidebar';
import PropertiesPanel from './PropertiesPanel';
import CustomNode from './nodes/CustomNode'; 
import { Save, Trash2, LayoutTemplate, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

let id = 0;
const getId = () => `dndnode_${id++}`;

const initialNodes = [{ id: '1', type: 'start', position: { x: 400, y: 200 }, data: { label: 'Start', type: 'start', desc: '流程开始入口', schema: [] } }];

function WorkflowEditorContent() {
  const navigate = useNavigate();
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const nodeTypes = useMemo(() => ({ start: CustomNode, end: CustomNode, llm: CustomNode, code: CustomNode, condition: CustomNode, default: CustomNode }), []);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#64748b', strokeWidth: 2 } }, eds)), [setEdges]);
  const onDragOver = useCallback((event) => { event.preventDefault(); event.dataTransfer.dropEffect = 'move'; }, []);

  const onDrop = useCallback((event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) return;

      const position = reactFlowInstance.screenToFlowPosition({ x: event.clientX, y: event.clientY });
      const newNodeId = getId();
      
      // ✅ 默认数据初始化
      let defaultData = { label: `新 ${type} 节点`, type: type, desc: '请配置参数' };
      if (type === 'start') defaultData.schema = [];
      if (type === 'condition') {
        defaultData.label = '条件判断';
        defaultData.condition_key = '';
        defaultData.branches = [{ label: 'Yes', value: 'true' }, { label: 'No', value: 'false' }];
      }

      const newNode = { id: newNodeId, type, position, data: defaultData };
      setNodes((nds) => nds.concat(newNode));
      setSelectedNodeId(newNodeId);
    }, [reactFlowInstance, setNodes]);

  const onNodeClick = useCallback((event, node) => setSelectedNodeId(node.id), []);
  const onPaneClick = useCallback(() => setSelectedNodeId(null), []);
  const activeNode = useMemo(() => nodes.find((n) => n.id === selectedNodeId), [nodes, selectedNodeId]);

  return (
    <div className="w-screen h-screen flex flex-col bg-slate-50 overflow-hidden font-sans">
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-20 flex-shrink-0 shadow-sm">
        <div className="flex items-center gap-4"><button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"><ArrowLeft size={20} /></button><div className="flex items-center gap-2"><span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs font-bold border border-blue-100">Workflow</span><span className="font-bold text-slate-800 text-sm">未命名工作流</span></div></div>
        <div className="flex gap-2"><button onClick={() => setNodes([])} className="flex items-center gap-1 px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-medium"><Trash2 size={14} /> 清空</button><button className="flex items-center gap-1 px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 shadow-md"><Save size={14} /> 保存</button></div>
      </header>
      <div className="flex flex-1 overflow-hidden relative">
        <div className="flex-1 relative h-full bg-slate-50" ref={reactFlowWrapper}>
          <Sidebar />
          <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} onInit={setReactFlowInstance} onDrop={onDrop} onDragOver={onDragOver} onNodeClick={onNodeClick} onPaneClick={onPaneClick} fitView proOptions={{ hideAttribution: true }}>
            <Background color="#94a3b8" gap={20} size={1} />
            <Controls className="!bg-white !border-slate-200 !shadow-lg !rounded-lg overflow-hidden !left-4 !bottom-4" />
            <MiniMap className="!border-slate-200 !rounded-lg !shadow-lg !bottom-4 !right-4" nodeColor={(n) => n.type === 'start' ? '#22c55e' : n.type === 'condition' ? '#f59e0b' : '#3b82f6'} />
          </ReactFlow>
        </div>
        <PropertiesPanel selectedNode={activeNode} nodes={nodes} setNodes={setNodes} />
      </div>
    </div>
  );
}

export default function WorkflowEditor() { return <ReactFlowProvider><WorkflowEditorContent /></ReactFlowProvider>; }
