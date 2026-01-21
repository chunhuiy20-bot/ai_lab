// 为了让 React Flow 知道怎么渲染不同类型的节点，我们可以定义样式或组件
// 这里先用默认节点，后面可以自定义 CustomNode
export const initialNodes = [
  { id: '1', type: 'input', data: { label: 'Start 节点' }, position: { x: 250, y: 5 } },
];

export const nodeTypesList = [
  { type: 'start', label: '开始节点', desc: '流程起点 (唯一)', icon: '▶' },
  { type: 'end', label: '结束节点', desc: '流程终点', icon: '■' },
  { type: 'code', label: 'Code 节点', desc: '执行自定义代码', icon: '💻' },
  { type: 'llm', label: 'LLM 节点', desc: '调用大语言模型', icon: '🤖' },
  // ✅ 新增
  { type: 'condition', label: '条件判断', desc: '根据变量分流', icon: '⤛' }, 
];
