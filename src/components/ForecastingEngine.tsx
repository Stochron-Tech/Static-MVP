import { useState } from 'react';
import { Card } from './ui/card';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, ComposedChart } from 'recharts';
import { Badge } from './ui/badge';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

const forecastData = [
  { year: 2000, actual: 5.2, label: 'WTO Entry' },
  { year: 2001, actual: 7.8, label: 'WTO Entry' },
  { year: 2002, actual: 11.3, label: 'WTO Entry' },
  { year: 2003, actual: 15.6, label: 'Trade Growth' },
  { year: 2004, actual: 21.4, label: 'Trade Growth' },
  { year: 2005, actual: 26.8, label: 'Trade Growth' },
  { year: 2006, actual: 28.5, label: 'Trade Growth' },
  { year: 2007, actual: 32.1, label: 'Trade Growth' },
  { year: 2008, actual: 17.2, label: 'Financial Crisis' },
  { year: 2009, actual: 18.9, label: 'Financial Crisis' },
  { year: 2010, actual: 31.4, label: 'Recovery' },
  { year: 2011, actual: 33.2, label: 'Recovery' },
  { year: 2012, actual: 25.9, label: 'Recovery' },
  { year: 2013, actual: 28.1, label: 'Stable Period' },
  { year: 2014, actual: 31.4, label: 'Stable Period' },
  { year: 2015, actual: 27.3, label: 'Stable Period' },
  { year: 2016, actual: 31.2, label: 'Stable Period' },
  { year: 2017, actual: 32.9, label: 'Stable Period' },
  { year: 2018, actual: 8.2, label: 'Trade War' },
  { year: 2019, actual: 14.2, label: 'Trade War' },
  { year: 2020, actual: 26.9, label: 'Phase One Deal' },
  { year: 2021, actual: 31.7, label: 'Phase One Deal' },
  { year: 2022, actual: 29.4, label: 'Phase One Deal' },
  { year: 2023, actual: 24.1, label: 'Normalization' },
  { year: 2024, actual: null, arima: 26.3, sarima: 27.8, garch: 25.1, label: 'Forecast' },
  { year: 2025, actual: null, arima: 28.9, sarima: 29.4, garch: 26.7, label: 'Forecast' },
  { year: 2026, actual: null, arima: 31.2, sarima: 30.8, garch: 28.3, label: 'Forecast' },
  { year: 2027, actual: null, arima: 32.8, sarima: 31.9, garch: 29.8, label: 'Forecast' },
];

const periodInsights: Record<string, string> = {
  'WTO Entry': 'China joined the WTO in December 2001, opening agricultural markets. US soybean exports surged as China rapidly industrialized and expanded livestock production. Tariff reductions and quota expansions facilitated market access.',
  'Trade Growth': 'Sustained expansion driven by Chinese demand for animal feed and cooking oil. US captured dominant market position (60-70% share) during this golden period of bilateral agricultural trade.',
  'Financial Crisis': 'Global recession temporarily disrupted commodity flows. Chinese stimulus programs eventually sustained import demand, but volatility increased significantly.',
  'Recovery': 'Post-crisis normalization with China becoming world\'s largest soybean importer. US market share stabilized around 30-35 MMT annually.',
  'Stable Period': 'Mature trade relationship with predictable seasonal patterns. Competition from Brazil increased but US maintained strategic position.',
  'Trade War': 'Section 301 tariffs (25% retaliatory) decimated US exports. China pivoted to Brazilian suppliers. Exports fell >75% YoY in worst month.',
  'Phase One Deal': 'January 2020 agreement committed China to agricultural purchases. COVID-19 complicated implementation. Partial recovery achieved but pre-2018 levels not restored.',
  'Normalization': 'Trade settling into new equilibrium. US share permanently reduced. Brazil established as primary supplier. Geopolitical tensions persist.',
  'Forecast': 'Model projections assume continuation of current policy framework with moderate growth. SARIMA captures seasonality best. GARCH accounts for volatility clustering. ARIMA provides baseline trend.',
};

const modelRankings = [
  { rank: 1, model: 'SARIMA', score: 94.2, description: 'Seasonal ARIMA - Best captures cyclical patterns in agricultural trade' },
  { rank: 2, model: 'ARIMA', score: 89.7, description: 'AutoRegressive Integrated Moving Average - Solid baseline forecast' },
  { rank: 3, model: 'GARCH', score: 87.3, description: 'Generalized AutoRegressive Conditional Heteroskedasticity - Volatility modeling' },
];

export default function ForecastingEngine() {
  const [selectedPeriod, setSelectedPeriod] = useState('WTO Entry');
  const [expandedModels, setExpandedModels] = useState<Record<number, boolean>>({});

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card border-border shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-primary mb-1">Time Series Forecast</h2>
            <p className="text-muted-foreground text-sm">US Soybean Exports to China (Million Metric Tons)</p>
          </div>
          <Badge variant="outline" className="border-primary text-primary">
            2000-2027
          </Badge>
        </div>

        <div className="mb-6 h-96 bg-secondary/30 rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={forecastData}>
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
              <ReferenceLine x={2023} stroke="#00b4d8" strokeDasharray="3 3" label={{ value: 'Present', fill: '#00b4d8' }} />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Actual Exports"
                dot={{ fill: '#10b981', r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="sarima" 
                stroke="#00b4d8" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="SARIMA (Rank #1)"
              />
              <Line 
                type="monotone" 
                dataKey="arima" 
                stroke="#48cae4" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="ARIMA (Rank #2)"
              />
              <Line 
                type="monotone" 
                dataKey="garch" 
                stroke="#90e0ef" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="GARCH (Rank #3)"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Period Labels */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[...new Set(forecastData.map(d => d.label))].map(period => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 text-sm rounded-lg border transition-all ${
                selectedPeriod === period
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card text-muted-foreground border-border hover:border-primary hover:text-primary'
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Period Insights */}
        <Card className="p-4 bg-secondary/50 border-primary/30">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-primary mb-2">{selectedPeriod}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{periodInsights[selectedPeriod]}</p>
            </div>
          </div>
        </Card>
      </Card>

      {/* Model Rankings */}
      <Card className="p-6 bg-card border-border shadow-lg">
        <h3 className="text-primary mb-4">Model Performance Rankings</h3>
        <div className="space-y-3">
          {modelRankings.map((model) => (
            <Collapsible
              key={model.rank}
              open={expandedModels[model.rank]}
              onOpenChange={(open) => setExpandedModels({ ...expandedModels, [model.rank]: open })}
            >
              <div className="border border-border rounded-lg bg-card overflow-hidden">
                <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-secondary transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 ${
                      model.rank === 1 ? 'border-primary bg-primary/10 text-primary' :
                      model.rank === 2 ? 'border-primary/70 bg-primary/5 text-primary/80' :
                      'border-primary/50 bg-primary/5 text-primary/60'
                    }`}>
                      #{model.rank}
                    </div>
                    <div className="text-left">
                      <div className="text-foreground">{model.model}</div>
                      <div className="text-muted-foreground text-sm">{model.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="border-primary text-primary">
                      Score: {model.score}
                    </Badge>
                    {expandedModels[model.rank] ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 border-t border-border bg-secondary/30">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground mb-1">RMSE</div>
                        <div className="text-foreground">{(Math.random() * 3 + 2).toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground mb-1">MAE</div>
                        <div className="text-foreground">{(Math.random() * 2 + 1).toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground mb-1">R²</div>
                        <div className="text-foreground">{(Math.random() * 0.1 + 0.85).toFixed(3)}</div>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                      {model.model === 'SARIMA' && 'SARIMA(1,1,1)(1,1,1)[12] captures both trend and seasonal components. Best for agricultural commodities with clear cyclical patterns.'}
                      {model.model === 'ARIMA' && 'ARIMA(2,1,2) provides reliable baseline forecasts without seasonal adjustment. Useful for shorter-term predictions.'}
                      {model.model === 'GARCH' && 'GARCH(1,1) excels at modeling volatility clustering observed during geopolitical shocks. Critical for risk assessment.'}
                    </p>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>
      </Card>
    </div>
  );
}
