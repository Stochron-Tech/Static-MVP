import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { LineChart, Line, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

// Mock data showing FI levels vs stock performance
const historicalData = [
  { date: '2024-01', fi: 0.25, stockPrice: 1450, regime: 'Watch' },
  { date: '2024-02', fi: 0.32, stockPrice: 1420, regime: 'Watch' },
  { date: '2024-03', fi: 0.48, stockPrice: 1380, regime: 'Watch' },
  { date: '2024-04', fi: 0.55, stockPrice: 1340, regime: 'Alert' },
  { date: '2024-05', fi: 0.62, stockPrice: 1290, regime: 'Alert' },
  { date: '2024-06', fi: 0.58, stockPrice: 1310, regime: 'Alert' },
  { date: '2024-07', fi: 0.42, stockPrice: 1370, regime: 'Watch' },
  { date: '2024-08', fi: 0.35, stockPrice: 1410, regime: 'Watch' },
  { date: '2024-09', fi: 0.28, stockPrice: 1445, regime: 'Watch' },
  { date: '2024-10', fi: 0.22, stockPrice: 1480, regime: 'Stable' },
  { date: '2024-11', fi: 0.19, stockPrice: 1510, regime: 'Stable' },
  { date: '2024-12', fi: 0.45, stockPrice: 1390, regime: 'Watch' },
];

const correlationData = [
  { fi: 0.15, returnPct: 5.2 },
  { fi: 0.22, returnPct: 3.8 },
  { fi: 0.28, returnPct: 2.1 },
  { fi: 0.35, returnPct: -0.5 },
  { fi: 0.42, returnPct: -2.3 },
  { fi: 0.48, returnPct: -3.9 },
  { fi: 0.55, returnPct: -5.8 },
  { fi: 0.62, returnPct: -7.2 },
  { fi: 0.70, returnPct: -9.1 },
  { fi: 0.78, returnPct: -11.5 },
];

const regimeBreakdown = [
  { regime: 'Stable', count: 28, avgReturn: 4.2, color: '#22c55e' },
  { regime: 'Watch', count: 42, avgReturn: 0.8, color: '#eab308' },
  { regime: 'Alert', count: 18, avgReturn: -4.5, color: '#f97316' },
  { regime: 'Critical', count: 12, avgReturn: -9.2, color: '#ef4444' },
];

// Tooltip style for Dark Mode
const tooltipStyle = {
  backgroundColor: '#1e293b', // slate-800
  borderColor: '#334155',     // slate-700
  color: '#f8fafc'            // slate-50
};

export default function FinalAnalysis() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-slate-200">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white">Final Analysis</h1>
            <p className="text-lg text-slate-400 mt-2">
              FI-Stock Performance Correlation Analysis
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate('/interactive')} className="bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Network
          </Button>
        </div>

        {/* Explainer Box */}
        <Card className="bg-blue-950/20 border-2 border-blue-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <TrendingUp className="w-6 h-6" />
              Understanding FI-Stock Performance Correlation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-blue-200">
            <p>
              This analysis demonstrates the <strong className="text-blue-100">correlation between the Foreboding Index (FI)</strong> and 
              <strong className="text-blue-100"> actual stock performance</strong>. The goal of this system is to provide early warning signals 
              for potential volatility.
            </p>
            <p>
              <strong className="text-blue-100">Key Insights:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-blue-300">
              <li>Higher FI values tend to precede stock price declines</li>
              <li>Lower FI values correlate with stable or positive performance</li>
              <li>Regime classifications help categorize risk levels for portfolio decisions</li>
              <li>The system enables proactive risk management rather than reactive responses</li>
            </ul>
          </CardContent>
        </Card>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* FI vs Stock Price Over Time */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">FI vs Stock Price Trend</CardTitle>
              <CardDescription className="text-slate-400">Monthly comparison of Foreboding Index and stock price movement</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" stroke="#94a3b8" />
                  <YAxis yAxisId="left" stroke="#ef4444" />
                  <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="fi" stroke="#ef4444" name="FI" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="stockPrice" stroke="#3b82f6" name="Stock Price" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Correlation Scatter Plot */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">FI-Return Correlation</CardTitle>
              <CardDescription className="text-slate-400">Relationship between FI levels and subsequent returns</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis type="number" dataKey="fi" name="FI" domain={[0, 1]} stroke="#94a3b8" />
                  <YAxis type="number" dataKey="returnPct" name="Return %" stroke="#94a3b8" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={tooltipStyle} />
                  <Scatter name="FI vs Return" data={correlationData} fill="#8b5cf6" />
                </ScatterChart>
              </ResponsiveContainer>
              <p className="text-sm text-slate-400 mt-3 text-center">
                Correlation coefficient: <strong className="text-red-400">-0.87</strong> (Strong negative correlation)
              </p>
            </CardContent>
          </Card>

          {/* Regime Performance */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Performance by Regime</CardTitle>
              <CardDescription className="text-slate-400">Average returns across different regime classifications</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={regimeBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="regime" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="avgReturn" name="Avg Return %">
                    {regimeBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Regime Frequency */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Regime Distribution</CardTitle>
              <CardDescription className="text-slate-400">Frequency of different regime classifications</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={regimeBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="regime" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="count" name="Occurrences">
                    {regimeBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Summary Statistics */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Key Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-green-950/20 rounded-lg border border-green-900/50">
                <div className="text-3xl font-bold text-green-400">+4.2%</div>
                <div className="text-sm text-green-300/80 mt-1">Avg Return (Stable)</div>
              </div>
              <div className="text-center p-4 bg-yellow-950/20 rounded-lg border border-yellow-900/50">
                <div className="text-3xl font-bold text-yellow-400">+0.8%</div>
                <div className="text-sm text-yellow-300/80 mt-1">Avg Return (Watch)</div>
              </div>
              <div className="text-center p-4 bg-orange-950/20 rounded-lg border border-orange-900/50">
                <div className="text-3xl font-bold text-orange-400">-4.5%</div>
                <div className="text-sm text-orange-300/80 mt-1">Avg Return (Alert)</div>
              </div>
              <div className="text-center p-4 bg-red-950/20 rounded-lg border border-red-900/50">
                <div className="text-3xl font-bold text-red-400">-9.2%</div>
                <div className="text-sm text-red-300/80 mt-1">Avg Return (Critical)</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <h4 className="font-semibold mb-3 text-white">Model Performance Metrics:</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-slate-400">Accuracy:</span>
                  <span className="ml-2 font-semibold text-white">82.5%</span>
                </div>
                <div>
                  <span className="text-slate-400">Precision:</span>
                  <span className="ml-2 font-semibold text-white">78.3%</span>
                </div>
                <div>
                  <span className="text-slate-400">R² Score:</span>
                  <span className="ml-2 font-semibold text-white">0.756</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}