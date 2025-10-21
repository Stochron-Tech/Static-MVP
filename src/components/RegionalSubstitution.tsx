import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const marketShareData = [
  { year: 2010, us: 31.4, brazil: 19.2, argentina: 8.4, others: 3.1, total: 62.1 },
  { year: 2011, us: 33.2, brazil: 22.8, argentina: 7.9, others: 3.5, total: 67.4 },
  { year: 2012, us: 25.9, brazil: 25.1, argentina: 9.2, others: 4.1, total: 64.3 },
  { year: 2013, us: 28.1, brazil: 28.9, argentina: 7.8, others: 4.6, total: 69.4 },
  { year: 2014, us: 31.4, brazil: 31.2, argentina: 8.9, others: 5.2, total: 76.7 },
  { year: 2015, us: 27.3, brazil: 35.6, argentina: 9.1, others: 5.8, total: 77.8 },
  { year: 2016, us: 31.2, brazil: 37.4, argentina: 8.2, others: 6.4, total: 83.2 },
  { year: 2017, us: 32.9, brazil: 39.1, argentina: 8.6, others: 7.2, total: 87.8 },
  { year: 2018, us: 8.2, brazil: 66.1, argentina: 7.3, others: 8.9, total: 90.5 },
  { year: 2019, us: 14.2, brazil: 65.8, argentina: 8.7, others: 9.6, total: 98.3 },
  { year: 2020, us: 26.9, brazil: 64.2, argentina: 9.8, others: 10.1, total: 111.0 },
  { year: 2021, us: 31.7, brazil: 61.3, argentina: 9.4, others: 11.8, total: 114.2 },
  { year: 2022, us: 29.4, brazil: 62.7, argentina: 10.2, others: 12.5, total: 114.8 },
  { year: 2023, us: 24.1, brazil: 68.3, argentina: 9.8, others: 13.2, total: 115.4 },
];

const forecastData = [
  { year: 2023, actual: 68.3, forecast: null },
  { year: 2024, actual: null, forecast: 71.2 },
  { year: 2025, actual: null, forecast: 74.8 },
  { year: 2026, actual: null, forecast: 77.9 },
  { year: 2027, actual: null, forecast: 80.5 },
];

const calculatePotentialShare = (brazilForecast: number, totalMarket: number) => {
  const usCurrentShare = 24.1;
  const potentialGain = Math.max(0, totalMarket - brazilForecast - 10 - 13); // subtract Argentina and others baseline
  return potentialGain;
};

export default function RegionalSubstitution() {
  const currentYear = marketShareData[marketShareData.length - 1];
  const usSharePercent = ((currentYear.us / currentYear.total) * 100).toFixed(1);
  const brazilSharePercent = ((currentYear.brazil / currentYear.total) * 100).toFixed(1);
  const potential2027 = calculatePotentialShare(80.5, 120);

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card border-border shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-primary mb-1">Regional Substitution Tracker</h2>
            <p className="text-muted-foreground text-sm">Market Share Evolution in China's Soybean Import Market</p>
          </div>
          <Badge variant="outline" className="border-primary text-primary">
            Total Market: {currentYear.total} MMT
          </Badge>
        </div>

        <div className="mb-6 h-96 bg-secondary/30 rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={marketShareData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="year" 
                stroke="#9ca3af"
                tick={{ fill: '#9ca3af', fontSize: 12 }}
              />
              <YAxis 
                stroke="#9ca3af"
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                label={{ value: 'Million Metric Tons', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
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
              <Area 
                type="monotone" 
                dataKey="brazil" 
                stackId="1" 
                stroke="#22c55e" 
                fill="#22c55e" 
                fillOpacity={0.6}
                name="Brazil"
              />
              <Area 
                type="monotone" 
                dataKey="us" 
                stackId="1" 
                stroke="#00b4d8" 
                fill="#00b4d8" 
                fillOpacity={0.6}
                name="United States"
              />
              <Area 
                type="monotone" 
                dataKey="argentina" 
                stackId="1" 
                stroke="#f59e0b" 
                fill="#f59e0b" 
                fillOpacity={0.6}
                name="Argentina"
              />
              <Area 
                type="monotone" 
                dataKey="others" 
                stackId="1" 
                stroke="#8b5cf6" 
                fill="#8b5cf6" 
                fillOpacity={0.6}
                name="Others"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-primary/10 border-primary/30">
            <div className="text-muted-foreground text-sm mb-1">US Market Share</div>
            <div className="text-2xl text-primary">{usSharePercent}%</div>
            <div className="text-muted-foreground text-xs mt-1">{currentYear.us} MMT</div>
          </Card>
          <Card className="p-4 bg-green-500/10 border-green-500/30">
            <div className="text-muted-foreground text-sm mb-1">Brazil Market Share</div>
            <div className="text-2xl text-green-400">{brazilSharePercent}%</div>
            <div className="text-muted-foreground text-xs mt-1">{currentYear.brazil} MMT</div>
          </Card>
          <Card className="p-4 bg-red-500/10 border-red-500/30">
            <div className="text-muted-foreground text-sm mb-1">Share Lost (2017-2023)</div>
            <div className="text-2xl text-red-400">-8.8 MMT</div>
            <div className="text-muted-foreground text-xs mt-1">-7.6 percentage points</div>
          </Card>
          <Card className="p-4 bg-green-500/10 border-green-500/30">
            <div className="text-muted-foreground text-sm mb-1">Brazil Gained</div>
            <div className="text-2xl text-green-400">+29.2 MMT</div>
            <div className="text-muted-foreground text-xs mt-1">Since 2017</div>
          </Card>
        </div>
      </Card>

      {/* Brazil Forecast */}
      <Card className="p-6 bg-card border-border shadow-lg">
        <h3 className="text-primary mb-4">Brazil Export Forecast to China</h3>
        <div className="mb-6 h-64 bg-secondary/30 rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="year" 
                stroke="#9ca3af"
                tick={{ fill: '#9ca3af', fontSize: 12 }}
              />
              <YAxis 
                stroke="#9ca3af"
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                label={{ value: 'Million Metric Tons', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
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
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#22c55e" 
                strokeWidth={3}
                name="Y: Brazil Actual"
                dot={{ fill: '#22c55e', r: 5 }}
              />
              <Line 
                type="monotone" 
                dataKey="forecast" 
                stroke="#22c55e" 
                strokeWidth={3}
                strokeDasharray="5 5"
                name="Y': Brazil Forecast"
                dot={{ fill: '#22c55e', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-green-500/10 border-green-500/30">
            <div className="text-muted-foreground text-sm mb-1">Y: Brazil 2023</div>
            <div className="text-2xl text-green-400">68.3 MMT</div>
            <div className="text-muted-foreground text-xs mt-1">Actual exports to China</div>
          </Card>
          <Card className="p-4 bg-green-500/10 border-green-500/30">
            <div className="text-muted-foreground text-sm mb-1">Y': Brazil 2027 Forecast</div>
            <div className="text-2xl text-green-400">80.5 MMT</div>
            <div className="text-muted-foreground text-xs mt-1">Projected dominance</div>
          </Card>
          <Card className="p-4 bg-orange-500/10 border-orange-500/30">
            <div className="text-muted-foreground text-sm mb-1">US Opportunity Gap</div>
            <div className="text-2xl text-orange-400">{potential2027.toFixed(1)} MMT</div>
            <div className="text-muted-foreground text-xs mt-1">Remaining addressable market</div>
          </Card>
        </div>
      </Card>

      {/* Strategic Analysis */}
      <Card className="p-6 bg-card border-border shadow-lg">
        <h3 className="text-primary mb-4">Strategic Implications</h3>
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="w-1 bg-red-500 flex-shrink-0 rounded-full"></div>
            <div>
              <div className="text-foreground mb-1">Brazil has achieved structural dominance</div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Post-2018 trade war, Brazil captured {'>'}60% market share and is projected to reach 67% by 2027. This represents a fundamental shift in global soybean trade patterns. US relegated to secondary supplier status.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-1 bg-orange-500 flex-shrink-0 rounded-full"></div>
            <div>
              <div className="text-foreground mb-1">Limited recapture potential without policy change</div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Even with tariff elimination, US faces structural disadvantages: Brazilian counter-season production, lower freight costs to China, and established relationships. Market forces favor Brazil absent major disruption.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-1 bg-yellow-500 flex-shrink-0 rounded-full"></div>
            <div>
              <div className="text-foreground mb-1">China benefits from diversification</div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Reduced US dependence enhances China's negotiating position. However, over-reliance on Brazil creates new vulnerability to South American weather, politics (Lula government), and infrastructure constraints.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-1 bg-primary flex-shrink-0 rounded-full"></div>
            <div>
              <div className="text-foreground mb-1">US strategy must focus on differentiation</div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Competing on price alone is losing strategy. Opportunities exist in: (1) sustainability certification, (2) non-GMO/organic niches, (3) protein content premiums, (4) political hedge value (Taiwan crisis scenario). Value-added positioning critical.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
