import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, TrendingDown, Minus, User } from 'lucide-react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart } from 'recharts';

interface ExpertAnalysis {
  name: string;
  affiliation: string;
  expertise: string;
  recentPosition: 'bullish' | 'bearish' | 'neutral';
  sentimentScore: number;
  date: string;
  keyQuote: string;
  modelImpact: string[];
}

const experts: ExpertAnalysis[] = [
  {
    name: 'Dr. Sarah Chen',
    affiliation: 'AgriFinance Group',
    expertise: 'China Agricultural Imports',
    recentPosition: 'bearish',
    sentimentScore: 35,
    date: '2024-10-15',
    keyQuote: 'Chinese crushers maintaining elevated Brazilian purchases through Q1 2025. US facing structural headwinds beyond tariffs - logistics costs and established relationships favor South American suppliers.',
    modelImpact: ['Export Volume Forecast ↓', 'Market Share Assumptions ↓', 'Regional Substitution ↑']
  },
  {
    name: 'Michael Rodriguez',
    affiliation: 'Commodity Traders Alliance',
    expertise: 'Futures Markets & Hedging',
    recentPosition: 'neutral',
    sentimentScore: 52,
    date: '2024-10-12',
    keyQuote: 'November-January basis traditionally strengthens but geopolitical premium keeping implied volatility elevated. Options market pricing 20% probability of major tariff modification before Chinese New Year.',
    modelImpact: ['Price Volatility Index ↑', 'Futures Sentiment ≈', 'Policy Event Probability ↑']
  },
  {
    name: 'Ambassador (ret.) James Patterson',
    affiliation: 'Center for Strategic Trade',
    expertise: 'US-China Relations',
    recentPosition: 'bearish',
    sentimentScore: 28,
    date: '2024-10-18',
    keyQuote: 'Strategic decoupling continues across all sectors. Agriculture insulated from worst but Taiwan situation deteriorating. Expect China to maintain supplier diversification regardless of tariff status.',
    modelImpact: ['Geopolitical Tension ↑', 'Trade Agreement Outlook ↓', 'Long-term Demand ↓']
  },
  {
    name: 'Lisa Yamamoto',
    affiliation: 'Pacific Rim Commodities',
    expertise: 'Asian Market Dynamics',
    recentPosition: 'bullish',
    sentimentScore: 68,
    date: '2024-10-10',
    keyQuote: 'Chinese hog herd rebuilding ahead of Lunar New Year creating protein demand surge. Strategic reserve drawdowns suggest restocking needed. Short-term US purchase window opening November-December.',
    modelImpact: ['Short-term Demand ↑', 'Inventory Needs ↑', 'Q4 Exports ↑']
  },
  {
    name: 'Dr. Paulo Mendes',
    affiliation: 'Brazilian Agribusiness Association',
    expertise: 'South American Production',
    recentPosition: 'neutral',
    sentimentScore: 48,
    date: '2024-10-08',
    keyQuote: 'Brazilian safrinha planting delayed by dry conditions in Mato Grosso. If La Niña persists, could reduce 2025 exportable surplus by 3-5 MMT. Creates potential US opportunity in Q2-Q3 2025.',
    modelImpact: ['Brazilian Supply ↓', 'US Opportunity ↑', 'Price Floor ↑']
  },
  {
    name: 'Tom Anderson',
    affiliation: 'Midwest Grain Cooperative',
    expertise: 'US Production & Logistics',
    recentPosition: 'bearish',
    sentimentScore: 38,
    date: '2024-10-05',
    keyQuote: 'Record US harvest but export pace lagging. Farmer selling pressure building as storage fills. China essentially absent from market - only token purchases for optics. Basis collapsing in river markets.',
    modelImpact: ['Export Pace ↓', 'Domestic Pressure ↑', 'China Sentiment ↓']
  },
  {
    name: 'Dr. Wei Zhang',
    affiliation: 'China National Grain Center',
    expertise: 'Chinese Food Security Policy',
    recentPosition: 'neutral',
    sentimentScore: 55,
    date: '2024-10-01',
    keyQuote: 'Central government balancing cost considerations against supply security. US soybeans price-competitive when including tariff waivers but approval process opaque. Expect selective purchases rather than systematic sourcing.',
    modelImpact: ['Policy Predictability ↓', 'Purchase Pattern: Tactical', 'Volume Uncertainty ↑']
  },
];

const sentimentTrendData = [
  { month: 'Apr 2024', score: 48 },
  { month: 'May 2024', score: 52 },
  { month: 'Jun 2024', score: 46 },
  { month: 'Jul 2024', score: 43 },
  { month: 'Aug 2024', score: 41 },
  { month: 'Sep 2024', score: 44 },
  { month: 'Oct 2024', score: 46 },
];

const aggregateScore = Math.round(
  experts.reduce((sum, e) => sum + e.sentimentScore, 0) / experts.length
);

export default function FuturesMarketSentiment() {
  const getPositionIcon = (position: string) => {
    switch (position) {
      case 'bullish': return <TrendingUp className="w-5 h-5 text-green-400" />;
      case 'bearish': return <TrendingDown className="w-5 h-5 text-red-400" />;
      case 'neutral': return <Minus className="w-5 h-5 text-yellow-400" />;
      default: return null;
    }
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'bullish': return 'border-green-500 text-green-400 bg-green-500/10';
      case 'bearish': return 'border-red-500 text-red-400 bg-red-500/10';
      case 'neutral': return 'border-yellow-500 text-yellow-400 bg-yellow-500/10';
      default: return 'border-border text-muted-foreground';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 60) return 'text-green-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card border-border shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-primary mb-1">Futures Market Sentiment</h2>
            <p className="text-muted-foreground text-sm">Expert Opinion Aggregation & Leading Indicator Analysis</p>
          </div>
          <Badge variant="outline" className={`border-primary ${getScoreColor(aggregateScore)} text-xl px-4 py-2`}>
            {aggregateScore}/100
          </Badge>
        </div>

        {/* Aggregate Sentiment Trend */}
        <div className="mb-6 h-64 bg-secondary/30 rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={sentimentTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="month" 
                stroke="#9ca3af"
                tick={{ fill: '#9ca3af' }}
              />
              <YAxis 
                stroke="#9ca3af"
                tick={{ fill: '#9ca3af' }}
                domain={[0, 100]}
                label={{ value: 'Aggregate Sentiment Score', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1f36', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#f9fafb'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="score" 
                fill="#f59e0b" 
                stroke="#f59e0b" 
                fillOpacity={0.3}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#f59e0b" 
                strokeWidth={3}
                dot={{ fill: '#f59e0b', r: 5 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="p-4 bg-green-500/10 border-green-500/30">
            <div className="text-green-400 text-sm mb-1">BULLISH EXPERTS</div>
            <div className="text-2xl text-green-300">{experts.filter(e => e.recentPosition === 'bullish').length}</div>
            <div className="text-green-400 text-xs mt-1">Expect improvement</div>
          </Card>
          <Card className="p-4 bg-yellow-500/10 border-yellow-500/30">
            <div className="text-yellow-400 text-sm mb-1">NEUTRAL EXPERTS</div>
            <div className="text-2xl text-yellow-300">{experts.filter(e => e.recentPosition === 'neutral').length}</div>
            <div className="text-yellow-400 text-xs mt-1">Wait-and-see</div>
          </Card>
          <Card className="p-4 bg-red-500/10 border-red-500/30">
            <div className="text-red-400 text-sm mb-1">BEARISH EXPERTS</div>
            <div className="text-2xl text-red-300">{experts.filter(e => e.recentPosition === 'bearish').length}</div>
            <div className="text-red-400 text-xs mt-1">Expect deterioration</div>
          </Card>
        </div>
      </Card>

      {/* Expert Analyses */}
      <div className="space-y-3">
        {experts.map((expert, idx) => (
          <Card key={idx} className="p-5 bg-card border-border shadow-lg">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-secondary border border-border rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-foreground">{expert.name}</h3>
                  <div className="text-muted-foreground text-sm">{expert.affiliation}</div>
                  <Badge variant="outline" className="text-xs mt-1 border-border text-muted-foreground">
                    {expert.expertise}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end mb-1">
                  {getPositionIcon(expert.recentPosition)}
                  <Badge className={getPositionColor(expert.recentPosition)}>
                    {expert.recentPosition.toUpperCase()}
                  </Badge>
                </div>
                <div className={`text-2xl ${getScoreColor(expert.sentimentScore)}`}>
                  {expert.sentimentScore}
                </div>
                <div className="text-xs text-muted-foreground">{expert.date}</div>
              </div>
            </div>

            <div className="bg-secondary/50 p-4 rounded mb-3 border-l-4 border-primary">
              <p className="text-muted-foreground text-sm italic">"{expert.keyQuote}"</p>
            </div>

            <div>
              <div className="text-muted-foreground text-xs mb-2">MODEL PARAMETER ADJUSTMENTS</div>
              <div className="flex flex-wrap gap-2">
                {expert.modelImpact.map((impact, impactIdx) => (
                  <Badge key={impactIdx} variant="outline" className="border-primary/30 text-primary bg-primary/10">
                    {impact}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Methodology */}
      <Card className="p-6 bg-card border-border shadow-lg">
        <h3 className="text-primary mb-4">SENTIMENT INTEGRATION METHODOLOGY</h3>
        <div className="space-y-3 text-sm text-foreground">
          <p>
            Expert sentiment is quantified using natural language processing of published analyses, conference presentations, and futures market positioning. Each expert assigned credibility weighting based on track record accuracy.
          </p>
          <p>
            <span className="text-primary">Sentiment scores (0-100):</span> Derived from tone analysis, directional language, and explicit forecasts. Scores below 40 indicate bearish outlook, 40-60 neutral, above 60 bullish.
          </p>
          <p>
            <span className="text-primary">Model integration:</span> Sentiment shifts trigger parameter reviews in affected modules. For example, increased bearish consensus on China purchases prompts downward revision of export forecasts. Large sentiment moves ({'>'}15 points) trigger immediate recalibration.
          </p>
          <p>
            <span className="text-primary">Current reading:</span> Aggregate score of {aggregateScore} reflects cautious pessimism. Consensus view: structural challenges persist, tactical opportunities exist but strategic outlook unchanged. No catalysts for fundamental improvement visible.
          </p>
        </div>
      </Card>

      {/* Parameter Impact Summary */}
      <Card className="p-6 bg-card border-border shadow-lg">
        <h3 className="text-primary mb-4">CURRENT PARAMETER ADJUSTMENT RECOMMENDATIONS</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
            <div className="text-red-400 mb-2">DOWNWARD REVISIONS</div>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Export Volume Forecast (Q4 2024 - Q1 2025): -8%</li>
              <li>• Market Share Recovery Timeline: +6 months</li>
              <li>• Policy Improvement Probability: -12 points</li>
              <li>• Long-term Demand Growth: -1.5% annually</li>
            </ul>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
            <div className="text-green-400 mb-2">UPWARD REVISIONS</div>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Price Volatility Index: +15%</li>
              <li>• Short-term Tactical Purchase Window: Q4 opportunity</li>
              <li>• Brazilian Supply Risk (2025): Moderate concern</li>
              <li>• Geopolitical Premium: +$3-5/MT</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
