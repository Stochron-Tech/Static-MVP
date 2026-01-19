import { useMemo } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart } from 'recharts';
import { Info, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface FinalAnalysisProps {
  stockSymbol: string;
  onBack: () => void;
}

// Mock data showing stock performance vs PFI correlation
const generateMockData = () => {
  const data = [];
  const startDate = new Date('2024-01-01');
  
  for (let i = 0; i < 90; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Generate mock PFI with some variation
    const pfi = 0.3 + Math.sin(i / 10) * 0.2 + Math.random() * 0.1;
    
    // Stock price inversely correlated with PFI (high PFI = lower price)
    const basePrice = 1500;
    const priceImpact = (0.5 - pfi) * 400;
    const price = basePrice + priceImpact + Math.random() * 50;
    
    data.push({
      date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      pfi: pfi,
      price: price,
      regime: pfi < 0.25 ? 'Stable' : pfi < 0.5 ? 'Watch' : pfi < 0.75 ? 'Alert' : 'Critical',
    });
  }
  
  return data;
};

export function FinalAnalysis({ stockSymbol, onBack }: FinalAnalysisProps) {
  const data = useMemo(() => generateMockData(), []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const pfi = payload[0].value;
      const price = payload[1].value;
      const regime = pfi < 0.25 ? 'Stable' : pfi < 0.5 ? 'Watch' : pfi < 0.75 ? 'Alert' : 'Critical';
      const regimeColor = pfi < 0.25 ? 'text-green-400' : pfi < 0.5 ? 'text-yellow-400' : pfi < 0.75 ? 'text-orange-400' : 'text-red-400';
      
      return (
        <div className="bg-gray-900 border border-cyan-500/30 p-3 rounded-lg shadow-xl">
          <p className="text-gray-300 text-sm mb-2">{label}</p>
          <div className="space-y-1 text-sm">
            <p className="text-cyan-400">PFI: {pfi.toFixed(3)}</p>
            <p className="text-blue-400">Price: ₹{price.toFixed(2)}</p>
            <p className={`font-semibold ${regimeColor}`}>Regime: {regime}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Calculate correlation
  const correlation = useMemo(() => {
    const pfiValues = data.map(d => d.pfi);
    const priceValues = data.map(d => d.price);
    
    const meanPfi = pfiValues.reduce((a, b) => a + b, 0) / pfiValues.length;
    const meanPrice = priceValues.reduce((a, b) => a + b, 0) / priceValues.length;
    
    let numerator = 0;
    let denomPfi = 0;
    let denomPrice = 0;
    
    for (let i = 0; i < data.length; i++) {
      const pfiDiff = pfiValues[i] - meanPfi;
      const priceDiff = priceValues[i] - meanPrice;
      numerator += pfiDiff * priceDiff;
      denomPfi += pfiDiff * pfiDiff;
      denomPrice += priceDiff * priceDiff;
    }
    
    return numerator / Math.sqrt(denomPfi * denomPrice);
  }, [data]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Button onClick={onBack} variant="ghost" className="mb-2 text-cyan-400 hover:text-cyan-300">
              <ArrowLeft className="size-4 mr-2" />
              Back to Network
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Final Analysis: {stockSymbol}
            </h1>
            <p className="text-gray-400 mt-1">Stock Performance vs. Pharma Foreboding Index</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Correlation Coefficient</div>
            <div className={`text-3xl font-bold ${
              Math.abs(correlation) > 0.7 ? 'text-green-400' :
              Math.abs(correlation) > 0.4 ? 'text-yellow-400' :
              'text-red-400'
            }`}>
              {correlation.toFixed(3)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {Math.abs(correlation) > 0.7 ? 'Strong' : Math.abs(correlation) > 0.4 ? 'Moderate' : 'Weak'} correlation
            </div>
          </div>
        </div>

        {/* Chart */}
        <Card className="p-6 bg-gray-900/50 border-cyan-500/30">
          <ResponsiveContainer width="100%" height={500}>
            <ComposedChart data={data}>
              <defs>
                <linearGradient id="pfiGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="date"
                stroke="#9ca3af"
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis
                yAxisId="pfi"
                orientation="left"
                stroke="#22d3ee"
                tick={{ fill: '#22d3ee', fontSize: 12 }}
                domain={[0, 1]}
                label={{ value: 'PFI', angle: -90, position: 'insideLeft', fill: '#22d3ee' }}
              />
              <YAxis
                yAxisId="price"
                orientation="right"
                stroke="#3b82f6"
                tick={{ fill: '#3b82f6', fontSize: 12 }}
                label={{ value: 'Price (₹)', angle: 90, position: 'insideRight', fill: '#3b82f6' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="line"
              />
              <Area
                yAxisId="pfi"
                type="monotone"
                dataKey="pfi"
                stroke="#22d3ee"
                strokeWidth={2}
                fill="url(#pfiGradient)"
                name="PFI Level"
              />
              <Line
                yAxisId="price"
                type="monotone"
                dataKey="price"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={false}
                name="Stock Price"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        {/* Explainer */}
        <Card className="p-6 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border-cyan-500/30">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="p-3 bg-cyan-500/20 rounded-lg">
                <Info className="size-6 text-cyan-400" />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-cyan-400">Understanding the Analysis</h3>
              <div className="text-gray-300 space-y-2">
                <p>
                  This chart shows the relationship between the Pharma Foreboding Index (PFI) and stock price over time.
                  The goal is to identify if changes in PFI can predict stock price movements.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-900/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-cyan-400 mb-2">Negative Correlation</h4>
                    <p className="text-sm text-gray-400">
                      When PFI increases (more foreboding), stock price tends to decrease, indicating that negative sentiment
                      correlates with lower valuations.
                    </p>
                  </div>
                  <div className="bg-gray-900/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-400 mb-2">Predictive Value</h4>
                    <p className="text-sm text-gray-400">
                      A strong correlation suggests that PFI can be used as an early warning system for potential stock
                      price movements, helping manage portfolio risk.
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-sm text-yellow-400">
                    <strong>Note:</strong> This analysis is for research purposes. Always conduct thorough due diligence
                    before making investment decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Regime Distribution */}
        <div className="grid md:grid-cols-4 gap-4">
          {['Stable', 'Watch', 'Alert', 'Critical'].map((regime, idx) => {
            const count = data.filter(d => d.regime === regime).length;
            const percentage = ((count / data.length) * 100).toFixed(1);
            const colors = ['from-green-500 to-green-600', 'from-yellow-500 to-yellow-600', 'from-orange-500 to-orange-600', 'from-red-500 to-red-600'];
            
            return (
              <Card
                key={regime}
                className={`p-4 bg-gradient-to-br ${colors[idx]} border-none`}
              >
                <div className="text-white">
                  <div className="text-sm opacity-90">{regime} Days</div>
                  <div className="text-3xl font-bold">{count}</div>
                  <div className="text-sm opacity-75">{percentage}% of period</div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
