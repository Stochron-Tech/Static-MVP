import { useState, useCallback, useRef, useEffect } from 'react';
import { ReactFlow, Node, Edge, Controls, Background, useNodesState, useEdgesState, Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import '../../styles/react-flow.css';
import { Plus, Upload, FileText, TrendingUp, Trash2, FilePlus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';

const randomMetric = () => Number((Math.random() * 0.6 + 0.2).toFixed(2));

// --- HELPER: Rebalance weights evenly (1 / N) ---
const getEvenlyDistributedNodes = (nodes: Node[], edges: Edge[], parentId: string) => {
  // Find all children of this parent
  const childIds = edges
    .filter((e) => e.source === parentId)
    .map((e) => e.target);
    
  if (childIds.length === 0) return nodes;

  const newWeight = Number((1 / childIds.length).toFixed(2));

  return nodes.map((n) => {
    if (childIds.includes(n.id)) {
      return { ...n, data: { ...n.data, weight: newWeight } };
    }
    return n;
  });
};

// --- HELPER: Adjust siblings when one weight changes manually ---
const getAdjustedNeighborNodes = (nodes: Node[], edges: Edge[], changedNodeId: string, newWeight: number) => {
  const parentEdge = edges.find(e => e.target === changedNodeId);
  if (!parentEdge) return nodes;
  const parentId = parentEdge.source;

  const siblingIds = edges
    .filter(e => e.source === parentId)
    .map(e => e.target);

  if (siblingIds.length <= 1) return nodes;

  const clampedWeight = Math.max(0, Math.min(1, newWeight));
  const remainingWeight = Math.max(0, 1 - clampedWeight);
  
  const otherSiblingsCount = siblingIds.length - 1;
  const weightPerSibling = Number((remainingWeight / otherSiblingsCount).toFixed(2));

  return nodes.map(n => {
    if (n.id === changedNodeId) {
      return { ...n, data: { ...n.data, weight: clampedWeight } };
    }
    if (siblingIds.includes(n.id)) {
      return { ...n, data: { ...n.data, weight: weightPerSibling } };
    }
    return n;
  });
};

// Custom node component with regime color and STABLE editable weight input
function SourceNode({ id, data }: { id: string, data: any }) {
  const regimeColor = data.regime < 0.25 ? 'from-green-500 to-green-600' :
                      data.regime < 0.5 ? 'from-yellow-500 to-yellow-600' :
                      data.regime < 0.75 ? 'from-orange-500 to-orange-600' :
                      'from-red-500 to-red-600';

  const [localWeight, setLocalWeight] = useState(data.weight?.toString() || '0');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (document.activeElement !== inputRef.current) {
      setLocalWeight(data.weight?.toString() || '0');
    }
  }, [data.weight]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setLocalWeight(newVal);

    const num = parseFloat(newVal);
    if (!isNaN(num)) {
      const clamped = Math.min(Math.max(num, 0), 1);
      data.onWeightChange?.(id, clamped);
    }
  };

  // Determine if this is a "Category" node (not a document)
  const isCategory = !id.startsWith('doc-');

  return (
    <div className={`relative px-6 py-4 bg-gradient-to-br ${regimeColor} rounded-lg shadow-lg min-w-[200px] group`}>
      <Handle type="target" position={Position.Left} className="!bg-cyan-400" />
      
      {/* Indicator that you can add documents (Only for Categories) */}
      {isCategory && (
        <div className="absolute top-2 right-2 text-white/50 group-hover:text-white transition-colors" title="Add Documents">
          <FilePlus className="size-4" />
        </div>
      )}

      <div className="text-white">
        <div className="font-semibold text-sm mb-1 pr-4">{data.label}</div>
        
        {data.showMetrics && (
          <div className="text-xs space-y-0.5 opacity-90">
            <div>FI: {data.fi?.toFixed(2) || '0.00'}</div>
            <div>TFI: {data.tfi?.toFixed(2) || '0.00'}</div>
            <div>Regime: {data.regimeLabel || 'Stable'}</div>
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Right} className="!bg-cyan-400" />
      
      {/* Weight control - EDITABLE & STABLE */}
      {data.showWeight && (
        <div className="absolute -left-8 top-1/2 -translate-y-1/2">
          <input
            ref={inputRef}
            type="number"
            min="0"
            max="1"
            step="0.05"
            value={localWeight}
            onChange={handleInputChange}
            className="nodrag w-12 h-12 rounded-full bg-gray-800 border-2 border-cyan-400 text-white text-xs text-center focus:outline-none focus:border-cyan-300 transition-colors"
            onClick={(e) => e.stopPropagation()}
            title="Adjust Weight (0.0 - 1.0)"
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
      <Handle type="source" position={Position.Right} className="!bg-cyan-400 !w-3 !h-3" />
      <div className="text-white text-center">
        <TrendingUp className="size-8 mx-auto mb-2" />
        <div className="font-bold text-lg mb-2">{data.label}</div>
        <div className="space-y-1 text-sm">
          <div>FI: {data.fi?.toFixed(2) || '0.00'}</div>
          <div>TFI: {data.tfi?.toFixed(2) || '0.00'}</div>
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
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  
  const [documentText, setDocumentText] = useState('');
  const [documentName, setDocumentName] = useState('');
  
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Initialize with weighted nodes
  useEffect(() => {
    const initialNodes: Node[] = [
      {
        id: 'final',
        type: 'aggregation',
        position: { x: 200, y: 300 },
        data: {
          label: 'Final Aggregated Results',
          fi: 0.42,
          tfi: 0.38,
          regime: 0.42,
          regimeLabel: 'Watch',
        },
      },
      {
        id: 'earnings',
        type: 'source',
        position: { x: 700, y: 100 },
        data: {
          label: 'Earnings Calls',
          fi: 0.35,
          tfi: randomMetric(),
          regime: 0.35,
          regimeLabel: 'Watch',
          weight: 0.25,
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
          fi: 0.28,
          tfi: randomMetric(),
          regime: 0.28,
          regimeLabel: 'Watch',
          weight: 0.25,
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
          fi: 0.52,
          tfi: randomMetric(),
          regime: 0.52,
          regimeLabel: 'Alert',
          weight: 0.25,
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
          fi: 0.45,
          tfi: randomMetric(),
          regime: 0.45,
          regimeLabel: 'Watch',
          weight: 0.25,
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
      { id: 'e-final-earnings', source: 'final', target: 'earnings', animated: true, style: { stroke: '#22d3ee' } },
      { id: 'e-final-filings', source: 'final', target: 'filings', animated: true, style: { stroke: '#22d3ee' } },
      { id: 'e-final-regulatory', source: 'final', target: 'regulatory', animated: true, style: { stroke: '#22d3ee' } },
      { id: 'e-final-news', source: 'final', target: 'news', animated: true, style: { stroke: '#22d3ee' } },
    ];

    setNodes(initialNodes);
    setEdges(initialEdges);
  }, []);

  // Handler to update weight when the circle input is changed
  const handleWeightChangeExec = (id: string, value: number) => {
    setNodes((currentNodes) => getAdjustedNeighborNodes(currentNodes, edges, id, value));
  };

  // Bind weight change handler
  useEffect(() => {
    setNodes((nds) => nds.map(n => ({
      ...n,
      data: {
        ...n.data,
        onWeightChange: handleWeightChangeExec
      }
    })));
  }, [edges]);

  const handleAddCategoryClick = useCallback(() => {
    setSelectedCategory('custom');
    setSelectedNodeId(null);
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
      setSelectedNodeId(node.id);
      setShowDialog(true);
    },
    [handleAddCategoryClick]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };

  const handleDeleteNode = () => {
    if (!selectedNodeId) return;

    // Find parent before deleting to rebalance siblings
    const parentEdge = edges.find(e => e.target === selectedNodeId);
    const parentId = parentEdge?.source;

    // Remove node and edges
    const remainingNodes = nodes.filter((n) => n.id !== selectedNodeId);
    const remainingEdges = edges.filter(
      (e) => e.source !== selectedNodeId && e.target !== selectedNodeId
    );

    // Rebalance if there was a parent
    let balancedNodes = remainingNodes;
    if (parentId) {
      balancedNodes = getEvenlyDistributedNodes(remainingNodes, remainingEdges, parentId);
    }

    setNodes(balancedNodes);
    setEdges(remainingEdges);

    setShowDialog(false);
    setSelectedNodeId(null);
    setSelectedCategory(null);
    setDocumentText('');
    setDocumentName('');
    setUploadedFiles([]);
  };

  const handleAddDocument = () => {
    if ((!documentName && !documentText) && uploadedFiles.length === 0) return;

    const isNewCategory = selectedCategory === 'custom' && !selectedNodeId;
    
    const parentNode = isNewCategory 
        ? nodes.find(n => n.id === 'final')
        : nodes.find(n => n.id === selectedNodeId);

    let baseX = 900;
    let baseY = 300;

    if (isNewCategory) {
        const addBtnNode = nodes.find(n => n.id === 'add-category');
        if (addBtnNode) {
            baseX = addBtnNode.position.x;
            baseY = addBtnNode.position.y;
        }
    } else if (parentNode) {
        baseX = parentNode.position.x + 300;
        baseY = parentNode.position.y;
    }

    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];

    let targetParentId = selectedNodeId; 

    // 1. Create New Category
    if (isNewCategory) {
        const newCategoryId = `category-${Date.now()}`;
        targetParentId = newCategoryId;

        newNodes.push({
            id: newCategoryId,
            type: 'source',
            position: { x: baseX, y: baseY },
            data: {
                label: documentName || 'New Category',
                fi: randomMetric(),
                tfi: randomMetric(),
                regime: randomMetric(),
                regimeLabel: 'New',
                weight: 1, // Will be rebalanced
                showMetrics: true,
                showWeight: true,
            },
        });

        newEdges.push({
            id: `e-final-${newCategoryId}`,
            source: 'final',
            target: newCategoryId,
            animated: true,
            style: { stroke: '#22d3ee' },
        });

        // Shift Add Button
        setNodes((nds) => nds.map(n => {
            if (n.id === 'add-category') {
                return { ...n, position: { ...n.position, y: n.position.y + 150 } };
            }
            return n;
        }));
    } 
    
    // 2. Create Documents
    if (!isNewCategory) {
      const docBaseX = baseX;
      const docBaseY = baseY;

      if (documentText || documentName) {
           const textDocId = `doc-${Date.now()}-text`;
           newNodes.push({
              id: textDocId,
              type: 'source',
              position: { x: docBaseX + Math.random() * 50, y: docBaseY + Math.random() * 50 },
              data: {
                  label: documentName || 'Untitled Text',
                  fi: randomMetric(),
                  tfi: randomMetric(),
                  regime: randomMetric(),
                  regimeLabel: 'New',
                  weight: 1, // Will be rebalanced
                  showMetrics: true,
                  showWeight: true,
              },
          });

          if (targetParentId) {
              newEdges.push({
                  id: `e-${targetParentId}-${textDocId}`,
                  source: targetParentId,
                  target: textDocId,
                  animated: true,
                  style: { stroke: '#22d3ee', strokeDasharray: '5,5' },
              });
          }
      }

      if (uploadedFiles.length > 0) {
        uploadedFiles.forEach((file, index) => {
          const fileDocId = `doc-${Date.now()}-file-${index}`;
          newNodes.push({
            id: fileDocId,
            type: 'source',
            position: { x: docBaseX + Math.random() * 50, y: docBaseY + (index + 1) * 60 },
            data: {
              label: file.name,
              fi: randomMetric(),
              tfi: randomMetric(),
              regime: randomMetric(),
              regimeLabel: 'New',
              weight: 1, // Will be rebalanced
              showMetrics: true,
              showWeight: true,
            },
          });

          if (targetParentId) {
              newEdges.push({
                  id: `e-${targetParentId}-${fileDocId}`,
                  source: targetParentId,
                  target: fileDocId,
                  animated: true,
                  style: { stroke: '#22d3ee', strokeDasharray: '5,5' },
              });
          }
        });
      }
    }

    // Combine all info
    const allNodes = [...nodes, ...newNodes];
    const allEdges = [...edges, ...newEdges];

    // --- AUTOMATIC REBALANCING ---
    let finalNodes = allNodes;

    if (isNewCategory) {
      // Rebalance Categories (children of 'final')
      finalNodes = getEvenlyDistributedNodes(allNodes, allEdges, 'final');
    } else if (targetParentId) {
      // Rebalance Documents (children of the category)
      finalNodes = getEvenlyDistributedNodes(allNodes, allEdges, targetParentId);
    }

    setNodes(finalNodes);
    setEdges(allEdges);
    
    setShowDialog(false);
    setDocumentText('');
    setDocumentName('');
    setUploadedFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const isCategoryMode = selectedCategory === 'custom' && !selectedNodeId;

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

      {/* Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-gray-900 border-cyan-500/30 text-white">
          <DialogHeader>
            <DialogTitle className="text-cyan-400">
              {isCategoryMode ? 'Create New Category' : `Add to ${selectedCategory}`}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="doc-name">
                {isCategoryMode ? 'Category Name' : 'Document Name'}
              </Label>
              <Input
                id="doc-name"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                placeholder={isCategoryMode ? "e.g., Social Media Sentiment" : "e.g., Q1 2024 Earnings Call"}
                className="bg-gray-800 border-cyan-500/30"
              />
            </div>
            
            {!isCategoryMode && (
              <div>
                <Label>Upload or Paste Text</Label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`flex-1 ${uploadedFiles.length > 0 ? 'bg-cyan-900/30 text-cyan-400 border-cyan-500/50' : ''}`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="size-4 mr-2" />
                    {uploadedFiles.length > 0 ? `${uploadedFiles.length} Files Selected` : 'Upload Multiple Documents'}
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
            )}

            <div className="flex gap-2 items-center">
              {selectedNodeId && (
                <Button 
                  onClick={handleDeleteNode}
                  variant="destructive"
                  className="bg-red-900/40 border border-red-900 text-red-400 hover:bg-red-900/70 mr-auto px-3"
                  title="Delete this node"
                >
                  <Trash2 className="size-4" />
                </Button>
              )}

              <div className="flex gap-2 flex-1 justify-end">
                <Button onClick={handleAddDocument} className="bg-cyan-600 hover:bg-cyan-700">
                   {isCategoryMode ? 'Create Category' : 'Add Document'}
                </Button>
                <Button
                  onClick={() => setShowDialog(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}