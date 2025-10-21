import { useState, useCallback } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ChevronRight, ChevronDown, Trash2, Settings, FileText, Plus, TrendingUp, Link } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

interface VariableBlock {
  id: string;
  type: 'variable' | 'analysis';
  name: string;
  category?: string;
  value?: number | string;
  parameters?: Record<string, any>;
  position: { x: number; y: number };
  connections?: string[];
}

interface ToolboxItem {
  name: string;
  type: 'variable' | 'analysis';
  category?: string;
  children?: ToolboxItem[];
  defaultValue?: number;
  parameters?: Record<string, any>;
}

const toolboxItems: ToolboxItem[] = [
  {
    name: 'Forecasting Engine',
    type: 'variable',
    category: 'Forecasting',
    children: [
      { name: 'ARIMA Model', type: 'variable', category: 'Forecasting', defaultValue: 0, parameters: { p: 2, d: 1, q: 2 } },
      { name: 'SARIMA Model', type: 'variable', category: 'Forecasting', defaultValue: 0, parameters: { p: 1, d: 1, q: 1, P: 1, D: 1, Q: 1, s: 12 } },
      { name: 'GARCH Model', type: 'variable', category: 'Forecasting', defaultValue: 0, parameters: { p: 1, q: 1 } },
      { name: 'Forecast Horizon', type: 'variable', category: 'Forecasting', defaultValue: 4, parameters: { unit: 'years' } },
    ]
  },
  {
    name: 'Sentiment Analysis',
    type: 'variable',
    category: 'Sentiment',
    children: [
      { name: 'Trade Relations Index', type: 'variable', category: 'Sentiment', defaultValue: 16, parameters: { scale: 30 } },
      { name: 'Sentiment Lag (months)', type: 'variable', category: 'Sentiment', defaultValue: 3.2 },
      { name: 'Correlation Coefficient', type: 'variable', category: 'Sentiment', defaultValue: 0.847 },
    ]
  },
  {
    name: 'Supply Chain Vulnerability Index',
    type: 'variable',
    category: 'Supply Chain',
    children: [
      {
        name: 'Geographic Concentration',
        type: 'variable',
        category: 'Supply Chain',
        children: [
          { name: 'HHI Index', type: 'variable', category: 'Supply Chain', defaultValue: 0.68 },
          { name: 'Regional Dependency', type: 'variable', category: 'Supply Chain', defaultValue: 0.82 },
          { name: 'Alternative Destinations', type: 'variable', category: 'Supply Chain', defaultValue: 0.45 },
        ]
      },
      {
        name: 'Supplier Network',
        type: 'variable',
        category: 'Supply Chain',
        children: [
          { name: 'Tier Depth', type: 'variable', category: 'Supply Chain', defaultValue: 3.2 },
          { name: 'Node Density', type: 'variable', category: 'Supply Chain', defaultValue: 0.71 },
          { name: 'Intermodal Connectivity', type: 'variable', category: 'Supply Chain', defaultValue: 0.63 },
        ]
      },
      {
        name: 'Regulatory Risk',
        type: 'variable',
        category: 'Supply Chain',
        children: [
          { name: 'Tariff Exposure', type: 'variable', category: 'Supply Chain', defaultValue: 0.91 },
          { name: 'Export Control Risk', type: 'variable', category: 'Supply Chain', defaultValue: 0.43 },
          { name: 'Trade Agreement Coverage', type: 'variable', category: 'Supply Chain', defaultValue: 0.52 },
        ]
      },
      {
        name: 'Security & Political',
        type: 'variable',
        category: 'Supply Chain',
        children: [
          { name: 'Geopolitical Tension', type: 'variable', category: 'Supply Chain', defaultValue: 0.84 },
          { name: 'Maritime Security', type: 'variable', category: 'Supply Chain', defaultValue: 0.62 },
          { name: 'Cyber Risk', type: 'variable', category: 'Supply Chain', defaultValue: 0.58 },
        ]
      },
    ]
  },
  {
    name: 'Regional Substitution',
    type: 'variable',
    category: 'Regional',
    children: [
      { name: 'US Market Share (%)', type: 'variable', category: 'Regional', defaultValue: 20.9 },
      { name: 'Brazil Market Share (%)', type: 'variable', category: 'Regional', defaultValue: 59.2 },
      { name: 'Brazil Forecast (MMT)', type: 'variable', category: 'Regional', defaultValue: 80.5 },
      { name: 'Total Market Size (MMT)', type: 'variable', category: 'Regional', defaultValue: 115.4 },
    ]
  },
  {
    name: 'Regulatory Tracker',
    type: 'variable',
    category: 'Regulatory',
    children: [
      { name: 'Tariff Rate (%)', type: 'variable', category: 'Regulatory', defaultValue: 25 },
      { name: 'SPS Barrier Count', type: 'variable', category: 'Regulatory', defaultValue: 4 },
      { name: 'Approval Delay (months)', type: 'variable', category: 'Regulatory', defaultValue: 36 },
    ]
  },
  {
    name: 'Futures Sentiment',
    type: 'variable',
    category: 'Sentiment',
    children: [
      { name: 'Aggregate Expert Score', type: 'variable', category: 'Sentiment', defaultValue: 46 },
      { name: 'Bullish Experts Count', type: 'variable', category: 'Sentiment', defaultValue: 1 },
      { name: 'Bearish Experts Count', type: 'variable', category: 'Sentiment', defaultValue: 3 },
    ]
  },
];

const analysisTools: ToolboxItem[] = [
  { name: 'Linear Regression', type: 'analysis', parameters: { method: 'OLS' } },
  { name: 'Correlation Analysis', type: 'analysis', parameters: { method: 'Pearson' } },
  { name: 'Time Series Decomposition', type: 'analysis', parameters: { components: ['trend', 'seasonal', 'residual'] } },
  { name: 'Scenario Analysis', type: 'analysis', parameters: { scenarios: 3 } },
  { name: 'Sensitivity Test', type: 'analysis', parameters: { range: 0.2 } },
  { name: 'Monte Carlo Simulation', type: 'analysis', parameters: { iterations: 1000 } },
];

function ToolboxItemComponent({ item, level = 0 }: { item: ToolboxItem; level?: number }) {
  const [isOpen, setIsOpen] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'toolbox-item',
    item: { item },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  if (item.children) {
    return (
      <div style={{ marginLeft: `${level * 12}px` }}>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="flex items-center gap-2 py-1 px-2 hover:bg-secondary/50 w-full text-left text-sm rounded">
            {isOpen ? <ChevronDown className="w-3 h-3 text-muted-foreground" /> : <ChevronRight className="w-3 h-3 text-muted-foreground" />}
            <span className="text-foreground">{item.name}</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            {item.children.map((child, idx) => (
              <ToolboxItemComponent key={idx} item={child} level={level + 1} />
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  }

  return (
    <div
      ref={drag}
      style={{ marginLeft: `${level * 12}px`, opacity: isDragging ? 0.5 : 1 }}
      className="flex items-center gap-2 py-1 px-2 hover:bg-secondary cursor-move text-sm border-l-2 border-transparent hover:border-primary rounded"
    >
      <div className={`w-2 h-2 rounded-full ${item.type === 'analysis' ? 'bg-cyan-400' : 'bg-primary'}`}></div>
      <span className="text-foreground">{item.name}</span>
    </div>
  );
}

function WorkspaceBlock({ block, onDelete, onConfigure, onConnect }: { 
  block: VariableBlock; 
  onDelete: (id: string) => void;
  onConfigure: (id: string) => void;
  onConnect: (id: string) => void;
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'workspace-block',
    item: { id: block.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        position: 'absolute',
        left: block.position.x,
        top: block.position.y,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
      className={`bg-card border-2 ${
        block.type === 'analysis' ? 'border-cyan-400' : 'border-primary'
      } rounded-lg p-3 min-w-[180px] shadow-lg`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className={`text-xs ${block.type === 'analysis' ? 'text-cyan-400' : 'text-primary'}`}>
          {block.type.toUpperCase()}
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => onConnect(block.id)}
            className="p-1 hover:bg-secondary rounded"
          >
            <Link className="w-3 h-3 text-muted-foreground" />
          </button>
          <button
            onClick={() => onConfigure(block.id)}
            className="p-1 hover:bg-secondary rounded"
          >
            <Settings className="w-3 h-3 text-muted-foreground" />
          </button>
          <button
            onClick={() => onDelete(block.id)}
            className="p-1 hover:bg-red-500/20 rounded"
          >
            <Trash2 className="w-3 h-3 text-red-400" />
          </button>
        </div>
      </div>
      <div className="text-foreground text-sm mb-1">{block.name}</div>
      {block.value !== undefined && (
        <div className="text-muted-foreground text-xs">Value: {block.value}</div>
      )}
      {block.connections && block.connections.length > 0 && (
        <div className="mt-2 pt-2 border-t border-border">
          <div className="text-xs text-muted-foreground">Connected: {block.connections.length}</div>
        </div>
      )}
    </div>
  );
}

function ShockSimulationContent() {
  const [blocks, setBlocks] = useState<VariableBlock[]>([]);
  const [configureBlock, setConfigureBlock] = useState<VariableBlock | null>(null);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [generateDialogOpen, setGenerateDialogOpen] = useState(false);
  const [scenarioDescription, setScenarioDescription] = useState('');

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'toolbox-item',
    drop: (item: { item: ToolboxItem }, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset) {
        const workspaceRect = document.getElementById('workspace')?.getBoundingClientRect();
        if (workspaceRect) {
          addBlock(item.item, {
            x: offset.x - workspaceRect.left,
            y: offset.y - workspaceRect.top,
          });
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const addBlock = useCallback((item: ToolboxItem, position: { x: number; y: number }) => {
    if (item.children) return; // Don't add parent items

    const newBlock: VariableBlock = {
      id: `block-${Date.now()}-${Math.random()}`,
      type: item.type,
      name: item.name,
      category: item.category,
      value: item.defaultValue,
      parameters: item.parameters,
      position,
      connections: [],
    };

    setBlocks(prev => [...prev, newBlock]);
  }, []);

  const deleteBlock = useCallback((id: string) => {
    setBlocks(prev => prev.filter(b => b.id !== id));
  }, []);

  const updateBlock = useCallback((id: string, updates: Partial<VariableBlock>) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
    setConfigureBlock(null);
  }, []);

  const handleConnect = useCallback((id: string) => {
    if (connectingFrom === null) {
      setConnectingFrom(id);
    } else {
      // Create connection
      setBlocks(prev => prev.map(b => {
        if (b.id === connectingFrom) {
          return {
            ...b,
            connections: [...(b.connections || []), id]
          };
        }
        return b;
      }));
      setConnectingFrom(null);
    }
  }, [connectingFrom]);

  const generateDocument = () => {
    const summary = `
SHOCK SIMULATION SCENARIO ANALYSIS

Workspace contains ${blocks.length} variables/analysis blocks with ${blocks.reduce((sum, b) => sum + (b.connections?.length || 0), 0)} connections.

ACTIVE VARIABLES:
${blocks.filter(b => b.type === 'variable').map(b => `- ${b.name}: ${b.value}`).join('\n')}

ANALYTICAL TOOLS:
${blocks.filter(b => b.type === 'analysis').map(b => `- ${b.name}`).join('\n')}

USER SCENARIO DESCRIPTION:
${scenarioDescription || 'No scenario description provided'}

RECOMMENDED ANALYSIS:
Based on the selected variables and connections, this scenario tests the interaction between ${blocks.map(b => b.name).join(', ')}. 

The simulation suggests examining:
1. Direct correlations between connected variables
2. Lag effects in time-series relationships
3. Sensitivity of output metrics to parameter changes
4. Scenario probability under different policy assumptions

[Note: In production, this would integrate with ChatGPT API to generate detailed, context-aware analysis based on the specific variable combinations and user description.]
    `;

    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scenario-analysis-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
        <Card className="p-6 bg-card border-border shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-primary mb-1">SHOCK SIMULATION ENGINE</h2>
              <p className="text-muted-foreground text-sm">Interactive Scenario Testing // Drag & Drop Variable Sandbox</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="border-primary text-primary">
                {blocks.length} Blocks
              </Badge>
              <Button
                onClick={() => setBlocks([])}
                variant="outline"
                size="sm"
                className="border-red-500 text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
              <Button
                onClick={() => setGenerateDialogOpen(true)}
                variant="outline"
                size="sm"
                className="border-green-500 text-green-400 hover:bg-green-500/10"
                disabled={blocks.length === 0}
              >
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {/* Toolbox */}
            <div className="col-span-1 bg-secondary border border-border rounded-lg p-4 h-[600px] overflow-y-auto">
              <h3 className="text-primary text-sm mb-3">VARIABLE TOOLBOX</h3>
              <div className="mb-4">
                {toolboxItems.map((item, idx) => (
                  <ToolboxItemComponent key={idx} item={item} />
                ))}
              </div>
              <h3 className="text-cyan-400 text-sm mb-3 mt-6">ANALYSIS TOOLS</h3>
              <div>
                {analysisTools.map((item, idx) => (
                  <ToolboxItemComponent key={idx} item={item} />
                ))}
              </div>
              <div className="mt-4 p-3 bg-card border border-border rounded text-xs text-muted-foreground">
                <div className="mb-2 text-primary">INSTRUCTIONS:</div>
                <ul className="space-y-1">
                  <li>• Drag variables to workspace</li>
                  <li>• Click <Link className="w-3 h-3 inline" /> to connect blocks</li>
                  <li>• Click <Settings className="w-3 h-3 inline" /> to configure</li>
                  <li>• Generate report when ready</li>
                </ul>
              </div>
            </div>

            {/* Workspace */}
            <div className="col-span-3">
              <div
                id="workspace"
                ref={drop}
                className={`bg-background border-2 ${
                  isOver ? 'border-primary' : 'border-border'
                } border-dashed rounded-lg h-[600px] relative overflow-hidden`}
              >
                {blocks.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Plus className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <div className="text-sm">Drag variables and tools here to build your scenario</div>
                    </div>
                  </div>
                )}
                {connectingFrom && (
                  <div className="absolute top-2 left-2 right-2 bg-cyan-500/10 border border-cyan-500 p-2 text-cyan-400 text-sm rounded">
                    Connecting mode active. Click another block to create connection.
                  </div>
                )}
                {blocks.map(block => (
                  <WorkspaceBlock
                    key={block.id}
                    block={block}
                    onDelete={deleteBlock}
                    onConfigure={(id) => setConfigureBlock(blocks.find(b => b.id === id) || null)}
                    onConnect={handleConnect}
                  />
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Configuration Dialog */}
        <Dialog open={!!configureBlock} onOpenChange={() => setConfigureBlock(null)}>
          <DialogContent className="bg-card border-border text-foreground">
            {configureBlock && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-primary">{configureBlock.name}</DialogTitle>
                  <DialogDescription className="text-muted-foreground">Configure the parameters for this variable</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label className="text-foreground">Value</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={configureBlock.value as number}
                      onChange={(e) => setConfigureBlock({ ...configureBlock, value: parseFloat(e.target.value) })}
                      className="bg-secondary border-border text-foreground"
                    />
                  </div>
                  {configureBlock.parameters && Object.entries(configureBlock.parameters).map(([key, value]) => (
                    <div key={key}>
                      <Label className="text-foreground capitalize">{key}</Label>
                      <Input
                        type="text"
                        value={value}
                        onChange={(e) => setConfigureBlock({
                          ...configureBlock,
                          parameters: { ...configureBlock.parameters, [key]: e.target.value }
                        })}
                        className="bg-secondary border-border text-foreground"
                      />
                    </div>
                  ))}
                </div>
                <DialogFooter>
                  <Button
                    onClick={() => updateBlock(configureBlock.id, { 
                      value: configureBlock.value, 
                      parameters: configureBlock.parameters 
                    })}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Save Changes
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Generate Document Dialog */}
        <Dialog open={generateDialogOpen} onOpenChange={setGenerateDialogOpen}>
          <DialogContent className="max-w-2xl bg-card border-border text-foreground">
            <DialogHeader>
              <DialogTitle className="text-primary">Generate Scenario Analysis Report</DialogTitle>
              <DialogDescription className="text-muted-foreground">Create a comprehensive analysis document based on your scenario configuration</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-foreground">Scenario Description</Label>
                <Textarea
                  placeholder="Describe the shock scenario you're testing... (e.g., 'Taiwan crisis leading to 50% reduction in US-China trade, lasting 18 months')"
                  value={scenarioDescription}
                  onChange={(e) => setScenarioDescription(e.target.value)}
                  className="bg-secondary border-border text-foreground h-32"
                />
              </div>
              <div className="bg-secondary/50 border border-border p-4 rounded">
                <div className="text-sm text-muted-foreground mb-2">Active Variables: {blocks.filter(b => b.type === 'variable').length}</div>
                <div className="text-sm text-muted-foreground mb-2">Analysis Tools: {blocks.filter(b => b.type === 'analysis').length}</div>
                <div className="text-sm text-muted-foreground">Connections: {blocks.reduce((sum, b) => sum + (b.connections?.length || 0), 0)}</div>
              </div>
              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded">
                <div className="text-cyan-400 text-sm mb-1">ChatGPT Integration</div>
                <div className="text-muted-foreground text-xs">
                  In production, this would send your scenario configuration to GPT-4 for detailed analysis including:
                  statistical modeling, impact quantification, timeline projections, and strategic recommendations.
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setGenerateDialogOpen(false)}
                className="border-border"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  generateDocument();
                  setGenerateDialogOpen(false);
                }}
                className="bg-green-500 text-white hover:bg-green-600"
              >
                <FileText className="w-4 h-4 mr-2" />
                Generate & Download
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Usage Guide */}
        <Card className="p-6 bg-card border-border shadow-lg">
          <h3 className="text-primary mb-4">SHOCK SIMULATION WORKFLOW</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-secondary/50 p-4 border border-border rounded-lg">
              <div className="text-primary mb-2">1. BUILD SCENARIO</div>
              <p className="text-muted-foreground text-sm">
                Drag variables from the toolbox representing the factors you want to test. Include both independent variables (shocks) and dependent variables (outcomes).
              </p>
            </div>
            <div className="bg-secondary/50 p-4 border border-border rounded-lg">
              <div className="text-primary mb-2">2. CONFIGURE & CONNECT</div>
              <p className="text-muted-foreground text-sm">
                Adjust variable values to reflect your shock scenario. Use the link tool to connect variables, showing causal relationships. Add analysis blocks to specify testing methodology.
              </p>
            </div>
            <div className="bg-secondary/50 p-4 border border-border rounded-lg">
              <div className="text-primary mb-2">3. GENERATE INSIGHTS</div>
              <p className="text-muted-foreground text-sm">
                Describe your scenario and generate a comprehensive analysis report. The system quantifies impacts, identifies vulnerabilities, and recommends mitigation strategies.
              </p>
            </div>
          </div>
        </Card>
    </div>
  );
}

export default function ShockSimulationEngine() {
  return (
    <DndProvider backend={HTML5Backend}>
      <ShockSimulationContent />
    </DndProvider>
  );
}
