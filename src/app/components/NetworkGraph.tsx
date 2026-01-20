import { useState, useCallback } from 'react';
import { ReactFlow, Node, Edge, Controls, Background, useNodesState, useEdgesState, Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import '../../styles/react-flow.css';
import { Plus, Upload, FileText, TrendingUp } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';

// Custom node component with regime color and weight input
function SourceNode({ data }: any) {
  const regimeColor = data.regime < 0.25 ? 'from-green-500 to-green-600' :
                      data.regime < 0.5 ? 'from-yellow-500 to-yellow-600' :
                      data.regime < 0.75 ? 'from-orange-500 to-orange-600' :
                      'from-red-500 to-red-600';

  return (
    <div className={`relative px-6 py-4 bg-gradient-to-br ${regimeColor} rounded-lg shadow-lg min-w-[200px]`}>
      <Handle type="target" position={Position.Left} className="!bg-cyan-400" />
      <div className="text-white">
        <div className="font-semibold text-sm mb-1">{data.label}</div>
        {data.showMetrics && (
          <div className="text-xs space-y-0.5 opacity-90">
            <div>PFI: {data.pfi?.toFixed(2) || '0.00'}</div>
            <div>Regime: {data.regimeLabel || 'Stable'}</div>
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Right} className="!bg-cyan-400" />
      {/* Weight control */}
      {data.showWeight && (
        <div className="absolute -left-8 top-1/2 -translate-y-1/2">
          <input
            type="number"
            min="0"
            max="1"
            step="0.1"
            value={data.weight || 0}
            onChange={(e) => data.onWeightChange?.(parseFloat(e.target.value))}
            className="w-12 h-12 rounded-full bg-gray-800 border-2 border-cyan-400 text-white text-xs text-center"
          />
        </div>
      )}
      {/* Animated dots */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: '50%',
              left: `${20 + i * 30}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function AddNode({ data }: any) {
  return (
    <div
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        data.onClick?.();
      }}
      className="px-4 py-4 bg-gray-800 border-2 border-dashed border-cyan-500 rounded-lg cursor-pointer hover:bg-cyan-900/30 transition-colors min-w-[150px]"
    >
      <Handle type="target" position={Position.Left} className="!bg-cyan-400" />
      <div className="flex items-center justify-center gap-2 text-cyan-400">
        <Plus className="size-5" />
        <span className="text-sm font-semibold">{data.label}</span>
      </div>
      <Handle type="source" position={Position.Right} className="!bg-cyan-400" />
    </div>
  );
}

function AggregationNode({ data }: any) {
  const regimeColor = data.regime < 0.25 ? 'from-green-500 to-green-700' :
                      data.regime < 0.5 ? 'from-yellow-500 to-yellow-700' :
                      data.regime < 0.75 ? 'from-orange-500 to-orange-700' :
                      'from-red-500 to-red-700';

  return (
    <div className={`relative px-8 py-6 bg-gradient-to-br ${regimeColor} rounded-xl shadow-2xl min-w-[250px]`}>
      <Handle type="target" position={Position.Left} className="!bg-cyan-400 !w-3 !h-3" />
      <div className="text-white text-center">
        <TrendingUp className="size-8 mx-auto mb-2" />
        <div className="font-bold text-lg mb-2">{data.label}</div>
        <div className="space-y-1 text-sm">
          <div>PFI: {data.pfi?.toFixed(2) || '0.00'}</div>
          <div>PTFI: {data.ptfi?.toFixed(2) || '0.00'}</div>
          <div className="font-semibold">{data.regimeLabel || 'Stable'}</div>
        </div>
      </div>
    </div>
  );
}

const nodeTypes = {
  source: SourceNode,
  add: AddNode,
  aggregation: AggregationNode,
};

export function NetworkGraph() {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [documentText, setDocumentText] = useState('');
  const [documentName, setDocumentName] = useState('');

  const handleAddCategoryClick = useCallback(() => {
    setSelectedCategory('custom');
    setShowDialog(true);
  }, []);

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      if (node.type === 'add') {
        handleAddCategoryClick();
        return;
      }

      const label = typeof node.data?.label === 'string' ? node.data.label : node.id;
      setSelectedCategory(label);
      setShowDialog(true);
    },
    [handleAddCategoryClick]
  );

  // Initial nodes setup
  const initialNodes: Node[] = [
    // Aggregation node (final result)
    {
      id: 'final',
      type: 'aggregation',
      position: { x: 1200, y: 300 },
      data: {
        label: 'Final Aggregated Results',
        pfi: 0.42,
        ptfi: 0.38,
        regime: 0.42,
        regimeLabel: 'Watch',
      },
    },
    // Source category nodes
    {
      id: 'earnings',
      type: 'source',
      position: { x: 700, y: 100 },
      data: {
        label: 'Earnings Calls',
        pfi: 0.35,
        regime: 0.35,
        regimeLabel: 'Watch',
        weight: 0.4,
        showMetrics: true,
        showWeight: true,
      },
    },
    {
      id: 'filings',
      type: 'source',
      position: { x: 700, y: 250 },
      data: {
        label: 'Company Filings',
        pfi: 0.28,
        regime: 0.28,
        regimeLabel: 'Watch',
        weight: 0.2,
        showMetrics: true,
        showWeight: true,
      },
    },
    {
      id: 'regulatory',
      type: 'source',
      position: { x: 700, y: 400 },
      data: {
        label: 'Regulatory Announcements',
        pfi: 0.52,
        regime: 0.52,
        regimeLabel: 'Alert',
        weight: 0.2,
        showMetrics: true,
        showWeight: true,
      },
    },
    {
      id: 'news',
      type: 'source',
      position: { x: 700, y: 550 },
      data: {
        label: 'News Articles',
        pfi: 0.45,
        regime: 0.45,
        regimeLabel: 'Watch',
        weight: 0.2,
        showMetrics: true,
        showWeight: true,
      },
    },
    {
      id: 'add-category',
      type: 'add',
      position: { x: 700, y: 700 },
      draggable: false,
      selectable: false,
      data: {
        label: 'Add Category',
        onClick: handleAddCategoryClick,
      },
    },
  ];

  const initialEdges: Edge[] = [
    { id: 'e-earnings-final', source: 'earnings', target: 'final', animated: true, style: { stroke: '#22d3ee' } },
    { id: 'e-filings-final', source: 'filings', target: 'final', animated: true, style: { stroke: '#22d3ee' } },
    { id: 'e-regulatory-final', source: 'regulatory', target: 'final', animated: true, style: { stroke: '#22d3ee' } },
    { id: 'e-news-final', source: 'news', target: 'final', animated: true, style: { stroke: '#22d3ee' } },
  ];

  const [nodes, _setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, _setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleAddDocument = () => {
    if (!documentName || !documentText) return;
    
    // Add logic to process document and add to graph
    setShowDialog(false);
    setDocumentText('');
    setDocumentName('');
  };

  return (
    <div className="h-full w-full bg-gray-950">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"
      >
        <Background color="#1f2937" gap={20} />
        <Controls className="bg-gray-800 border-cyan-500/30" />
      </ReactFlow>

      {/* Add Document Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-gray-900 border-cyan-500/30 text-white">
          <DialogHeader>
            <DialogTitle className="text-cyan-400">
              {selectedCategory ? `Add New Document • ${selectedCategory}` : 'Add New Document'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="doc-name">Document Name</Label>
              <Input
                id="doc-name"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                placeholder="e.g., Q1 2024 Earnings Call"
                className="bg-gray-800 border-cyan-500/30"
              />
            </div>
            <div>
              <Label>Upload or Paste Text</Label>
              <div className="flex gap-2 mb-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Upload className="size-4 mr-2" />
                  Upload PDF
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <FileText className="size-4 mr-2" />
                  Paste Text
                </Button>
              </div>
              <Textarea
                value={documentText}
                onChange={(e) => setDocumentText(e.target.value)}
                placeholder="Paste document text here..."
                rows={8}
                className="bg-gray-800 border-cyan-500/30"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddDocument} className="flex-1 bg-cyan-600 hover:bg-cyan-700">
                Add Document
              </Button>
              <Button
                onClick={() => setShowDialog(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
