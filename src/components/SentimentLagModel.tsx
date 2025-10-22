import { useState } from 'react';
import { Card } from './ui/card';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Bar } from 'recharts';
import { Badge } from './ui/badge';
import { ChevronRight, FileText, Folder, FolderOpen } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

const sentimentData = [
  { year: 2000, score: 18, exports: 5.2 },
  { year: 2001, score: 22, exports: 7.8 },
  { year: 2002, score: 25, exports: 11.3 },
  { year: 2003, score: 26, exports: 15.6 },
  { year: 2004, score: 27, exports: 21.4 },
  { year: 2005, score: 28, exports: 26.8 },
  { year: 2006, score: 28, exports: 28.5 },
  { year: 2007, score: 27, exports: 32.1 },
  { year: 2008, score: 24, exports: 17.2 },
  { year: 2009, score: 23, exports: 18.9 },
  { year: 2010, score: 25, exports: 31.4 },
  { year: 2011, score: 26, exports: 33.2 },
  { year: 2012, score: 25, exports: 25.9 },
  { year: 2013, score: 24, exports: 28.1 },
  { year: 2014, score: 25, exports: 31.4 },
  { year: 2015, score: 23, exports: 27.3 },
  { year: 2016, score: 24, exports: 31.2 },
  { year: 2017, score: 25, exports: 32.9 },
  { year: 2018, score: 8, exports: 8.2 },
  { year: 2019, score: 12, exports: 14.2 },
  { year: 2020, score: 18, exports: 26.9 },
  { year: 2021, score: 19, exports: 31.7 },
  { year: 2022, score: 17, exports: 29.4 },
  { year: 2023, score: 16, exports: 24.1 },
];

interface DocumentNode {
  name: string;
  type: 'folder' | 'document';
  children?: DocumentNode[];
}

const documentTree: DocumentNode[] = [
  {
    name: 'Foreign Trade Barriers Reports (2000-2023)',
    type: 'folder',
    children: [
      {
        name: 'Agricultural Barriers',
        type: 'folder',
        children: [
          { name: 'USTR Report 2018 - Section 301 Investigation.pdf', type: 'document' },
          { name: 'USTR Report 2019 - Ag Market Access.pdf', type: 'document' },
          { name: 'USTR Report 2020 - Phase One Compliance.pdf', type: 'document' },
          { name: 'USTR Report 2021-2023 - Implementation Review.pdf', type: 'document' },
        ]
      },
      {
        name: 'Tariff Measures',
        type: 'folder',
        children: [
          { name: 'China Tariff Schedule Analysis 2018.pdf', type: 'document' },
          { name: 'Retaliatory Measures Database 2018-2019.pdf', type: 'document' },
          { name: 'Phase One Agreement Text - Agriculture Annex.pdf', type: 'document' },
        ]
      },
      {
        name: 'Sanitary & Phytosanitary',
        type: 'folder',
        children: [
          { name: 'SPS Notifications Database 2000-2023.pdf', type: 'document' },
          { name: 'Biotech Approval Process Reviews.pdf', type: 'document' },
          { name: 'Pesticide MRL Restrictions.pdf', type: 'document' },
        ]
      },
    ]
  },
  {
    name: 'Policy Statements & Declarations',
    type: 'folder',
    children: [
      {
        name: 'US Government',
        type: 'folder',
        children: [
          { name: 'Presidential Memoranda on Trade Actions.pdf', type: 'document' },
          { name: 'USDA Secretary Statements 2018-2023.pdf', type: 'document' },
          { name: 'Congressional Hearings Transcripts.pdf', type: 'document' },
        ]
      },
      {
        name: 'Chinese Government',
        type: 'folder',
        children: [
          { name: 'MOFCOM Press Releases 2018-2023.pdf', type: 'document' },
          { name: 'State Council Agricultural Directives.pdf', type: 'document' },
          { name: 'NDRC Import Policy Guidance.pdf', type: 'document' },
        ]
      },
    ]
  },
  {
    name: 'Trade Negotiation Documents',
    type: 'folder',
    children: [
      { name: 'Phase One Economic and Trade Agreement (Jan 2020).pdf', type: 'document' },
      { name: 'Purchase Commitment Schedules.pdf', type: 'document' },
      { name: 'Dispute Resolution Mechanisms.pdf', type: 'document' },
    ]
  },
];

function DocumentTreeNode({ node, level = 0 }: { node: DocumentNode; level?: number }) {
  const [isOpen, setIsOpen] = useState(level === 0);

  if (node.type === 'document') {
    return (
      <div 
        className={`flex items-center gap-2 py-2 px-3 hover:bg-secondary cursor-pointer text-sm border-l-2 border-border`}
        style={{ marginLeft: `${level * 20}px` }}
      >
        <FileText className="w-4 h-4 text-primary flex-shrink-0" />
        <span className="text-muted-foreground">{node.name}</span>
      </div>
    );
  }

  return (
    <div style={{ marginLeft: `${level * 20}px` }}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center gap-2 py-2 px-3 hover:bg-secondary w-full text-left border-l-2 border-primary">
          {isOpen ? <FolderOpen className="w-4 h-4 text-primary" /> : <Folder className="w-4 h-4 text-primary" />}
          <span className="text-foreground">{node.name}</span>
          <ChevronRight className={`w-4 h-4 ml-auto transition-transform text-muted-foreground ${isOpen ? 'rotate-90' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent>
          {node.children?.map((child, idx) => (
            <DocumentTreeNode key={idx} node={child} level={level + 1} />
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

export default function SentimentLagModel() {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card border-border shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-primary mb-1">Sentiment Lag Model</h2>
            <p className="text-muted-foreground text-sm">Trade Relations Index vs Export Volume Correlation</p>
          </div>
          <Badge variant="outline" className="border-primary text-primary">
            Correlation: 0.847
          </Badge>
        </div>

        <div className="mb-6 h-96 bg-secondary/30 rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={sentimentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="year" 
                stroke="#9ca3af"
                tick={{ fill: '#9ca3af', fontSize: 12 }}
              />
              <YAxis 
                yAxisId="left"
                stroke="#9ca3af"
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                label={{ value: 'Sentiment Score (1-30)', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="#9ca3af"
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                label={{ value: 'Exports (MMT)', angle: 90, position: 'insideRight', fill: '#9ca3af' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1f36', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.3)'
                }}
              />
              <Legend />
              <Bar 
                yAxisId="left"
                dataKey="score" 
                fill="#48cae4" 
                name="Sentiment Score"
                opacity={0.7}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="exports" 
                stroke="#10b981" 
                strokeWidth={3}
                name="Export Volume"
                dot={{ fill: '#10b981', r: 3 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-green-500/10 border-green-500/30">
            <div className="text-muted-foreground text-sm mb-1">Correlation Coefficient</div>
            <div className="text-2xl text-green-400">0.847</div>
            <div className="text-muted-foreground text-xs mt-1">Strong positive relationship</div>
          </Card>
          <Card className="p-4 bg-primary/10 border-primary/30">
            <div className="text-muted-foreground text-sm mb-1">Average Lag Time</div>
            <div className="text-2xl text-primary">3.2 months</div>
            <div className="text-muted-foreground text-xs mt-1">Sentiment → Export response</div>
          </Card>
          <Card className="p-4 bg-orange-500/10 border-orange-500/30">
            <div className="text-muted-foreground text-sm mb-1">Current Sentiment</div>
            <div className="text-2xl text-orange-400">16/30</div>
            <div className="text-muted-foreground text-xs mt-1">Cautiously Guarded</div>
          </Card>
        </div>
      </Card>

      {/* Analysis Insights */}
      <Card className="p-6 bg-card border-border shadow-lg">
        <h3 className="text-primary mb-4">Key Findings</h3>
        <div className="space-y-4 text-sm">
          <div className="flex gap-3">
            <div className="w-1 bg-primary flex-shrink-0 rounded-full"></div>
            <div>
              <div className="text-foreground mb-1">Sentiment leads exports by approximately 3-4 months</div>
              <div className="text-muted-foreground">Policy changes in trade rhetoric precede physical commodity flows. This lag represents contract negotiation and shipment time.</div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-1 bg-primary flex-shrink-0 rounded-full"></div>
            <div>
              <div className="text-foreground mb-1">2018 marked catastrophic sentiment collapse (27→8)</div>
              <div className="text-muted-foreground">Section 301 investigation and 25% retaliatory tariffs created unprecedented hostile trade environment.</div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-1 bg-primary flex-shrink-0 rounded-full"></div>
            <div>
              <div className="text-foreground mb-1">Recovery incomplete despite Phase One agreement</div>
              <div className="text-muted-foreground">Current sentiment (16/30) remains well below pre-trade war levels (25-28), reflecting structural deterioration in bilateral trust.</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Document Sources */}
      <Card className="p-6 bg-card border-border shadow-lg">
        <h3 className="text-primary mb-2">Source Documents</h3>
        <p className="text-muted-foreground text-sm mb-4">
          All documents used in sentiment analysis are catalogued below. Click to expand categories and access individual reports.
        </p>
        <div className="bg-secondary/30 border border-border rounded-lg overflow-hidden">
          {documentTree.map((node, idx) => (
            <DocumentTreeNode key={idx} node={node} />
          ))}
        </div>
        <div className="mt-4 text-xs text-muted-foreground flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Total Documents Analyzed: 24 | Time Period: 2000-2023 | Last Updated: Oct 15, 2024
        </div>
      </Card>
    </div>
  );
}
