import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Activity, 
  TrendingUp, 
  Shield, 
  Map, 
  FileText, 
  Calendar, 
  Radio, 
  Zap,
  ArrowRight,
  Database,
  BarChart3,
  AlertTriangle,
  Target,
  Eye,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface Section {
  title: string;
  content: string;
  expanded?: boolean;
}

export default function ModelIntroduction() {
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({
    0: true,
  });

  const toggleSection = (index: number) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const sections: Section[] = [
    {
      title: "What Is This Platform?",
      content: "The Strategic Trade Intelligence Platform is a comprehensive geopolitical risk analysis system designed to help international businesses understand and anticipate disruptions to US-China soybean trade. This multi-module analytical framework combines quantitative forecasting, sentiment analysis, supply chain mapping, and scenario simulation to provide actionable intelligence for strategic decision-making. Whether you're a trader, supply chain manager, policy analyst, or corporate strategist, this platform translates complex geopolitical dynamics into clear risk assessments and forward-looking insights."
    },
    {
      title: "Why US-China Soybean Trade Matters",
      content: "US-China agricultural trade represents one of the most politically sensitive and economically significant bilateral relationships in global commerce. Soybeans are the largest US agricultural export (~$20B annually pre-trade war) and critical to China's food security (livestock feed, cooking oil). This trade has been weaponized during geopolitical tensions (2018 tariffs), making it a bellwether for broader US-China relations. Disruptions cascade through global supply chains, affecting farmers in Iowa, crushers in Shandong, and consumers worldwide. Understanding this market requires integrating agricultural economics, trade policy, logistics, and strategic competition dynamics."
    },
    {
      title: "Who Should Use This Platform?",
      content: "This platform serves multiple stakeholder groups: (1) Agricultural Traders & Commodity Firms - needing real-time risk assessment for hedging and procurement decisions; (2) Supply Chain & Logistics Professionals - managing port operations, shipping contracts, and inventory buffers; (3) Policy & Government Affairs Teams - tracking regulatory changes and trade negotiations; (4) Corporate Strategy & Risk Officers - conducting scenario planning for food, agribusiness, and manufacturing companies; (5) Financial Analysts & Investors - evaluating commodity markets, agricultural equities, and macro trends; (6) Academic & Research Institutions - studying trade policy, food security, and geopolitical economics."
    },
    {
      title: "How The Platform Works: Data → Analysis → Intelligence",
      content: "The platform operates as an intelligence production pipeline: (1) Data Collection - Ingests structured data (USDA reports, customs statistics, futures prices) and unstructured data (policy announcements, media reports, shipping manifests); (2) Processing & Normalization - Cleans, standardizes, and reconciles data across sources, handling lags and discrepancies; (3) Multi-Model Analysis - Applies 8 specialized analytical modules (detailed below), each focused on a specific risk dimension; (4) Integration & Synthesis - Combines outputs into composite risk scores and scenario probabilities; (5) Visualization & Reporting - Presents findings through interactive dashboards, drill-down capabilities, and natural language explanations; (6) Decision Support - Enables 'what-if' scenario testing and generates actionable recommendations."
    }
  ];

  const modules = [
    {
      id: 1,
      name: "Forecasting Engine",
      icon: Activity,
      description: "Time-Series Prediction Models",
      details: "Employs ARIMA (AutoRegressive Integrated Moving Average), SARIMA (Seasonal ARIMA), and GARCH (Generalized AutoRegressive Conditional Heteroskedasticity) models to forecast export volumes, prices, and volatility. ARIMA captures trend and cyclical patterns, SARIMA adds seasonal components (harvest cycles, shipping seasons), and GARCH models volatility clustering (periods of calm vs turbulence). Outputs include point forecasts, confidence intervals, and probability distributions for 3, 6, and 12-month horizons.",
      inputs: "Historical export volumes, prices, seasonal indices",
      outputs: "Volume/price forecasts, volatility estimates, confidence bands"
    },
    {
      id: 2,
      name: "Sentiment Lag Model",
      icon: TrendingUp,
      description: "Policy Sentiment → Trade Flow Analysis",
      details: "Analyzes how policy announcements and media sentiment affect trade flows with time lags. Processes government statements, media reports, and trade documents through natural language processing to generate sentiment indices (1-30 scale: hostile to cooperative). Regression models estimate lag structures (typically 2-8 weeks from announcement to cargo impact). Distinguishes between genuine policy shifts and rhetorical posturing by correlating sentiment with actual trade data.",
      inputs: "Trade policy announcements, media sentiment, cargo data",
      outputs: "Sentiment index (1-30), lag coefficients, predictive signals"
    },
    {
      id: 3,
      name: "Supply Chain Vulnerability Index",
      icon: Shield,
      description: "40+ Variables Across 13 Risk Pillars",
      details: "Comprehensive vulnerability assessment across: Geographic Concentration, Supplier Network Complexity, Substitutability, Transparency, Logistics Infrastructure, Regulatory Risk, Economic Exposure, Environmental/Climate Risk, Governance, Security/Political Risk, Operational Risk, Digital/Technology Risk, and Resilience/Buffer Capacity. Each pillar contains 3-4 micro-variables (e.g., Port Congestion Index, Tariff Exposure, Inventory Buffer Days). Scores normalized to 0-100 where higher indicates greater vulnerability. Provides drill-down from composite score → sub-index → individual variables with detailed narratives.",
      inputs: "40+ variables from customs, logistics, policy, climate data",
      outputs: "Composite vulnerability score (0-100), sub-index scores, heatmap visualization"
    },
    {
      id: 4,
      name: "Regional Substitution Tracker",
      icon: Map,
      description: "US vs Brazil/Argentina Market Share",
      details: "Tracks competitive dynamics among major soybean exporters. Monitors US, Brazil, and Argentina market shares in Chinese imports over time, identifying switching patterns. Analyzes substitution drivers: relative pricing (FOB plus freight), harvest timing (Brazil Jan-May, US Sep-Dec, Argentina Mar-Jun), quality differentials (protein content, GMO status), and political factors. Calculates cross-price elasticities and substitution rates. Identifies arbitrage opportunities and strategic vulnerabilities (e.g., Brazil supply exhaustion mid-year).",
      inputs: "Export data by origin, FOB prices, freight rates, harvest calendars",
      outputs: "Market share trends, substitution matrices, competitiveness indices"
    },
    {
      id: 5,
      name: "Regulatory Tracker",
      icon: FileText,
      description: "Tariffs, Quotas, Inspections & Permits",
      details: "Maintains real-time database of regulatory barriers affecting trade: tariff rates (MFN vs retaliatory), tariff-rate quotas (TRQ), state trading enterprises (China's import quotas), phytosanitary requirements (pest/disease inspections), GMO approval status (biotech trait approvals), and customs procedures. Tracks pending changes, implementation timelines, and waiver mechanisms. Translates regulatory text into quantitative impacts (e.g., tariff translates to $/MT cost increase).",
      inputs: "Trade law databases, government gazettes, customs notices",
      outputs: "Regulatory barrier inventory, timeline of changes, cost impact estimates"
    },
    {
      id: 6,
      name: "Policy Events Timeline",
      icon: Calendar,
      description: "Key Trade Policy Milestones & Impacts",
      details: "Chronicles major policy events affecting trade relationship: Section 301 investigation (Mar 2018), retaliatory tariffs (Jul 2018), Phase One Agreement (Jan 2020), purchase commitments, trade war escalations/de-escalations, leadership changes, diplomatic incidents. Each event tagged with: date, actors, policy instrument, quantitative impact on trade flows (if measurable), and current status. Enables pattern recognition (e.g., seasonal negotiation cycles, pre/post-election volatility).",
      inputs: "Policy announcements, diplomatic cables, trade negotiation outcomes",
      outputs: "Interactive timeline, event categorization, impact correlation analysis"
    },
    {
      id: 7,
      name: "Futures Market Sentiment",
      icon: Radio,
      description: "CBOT Soybean Futures Analysis",
      details: "Analyzes Chicago Board of Trade (CBOT) soybean futures and options markets for forward-looking sentiment. Monitors: futures curve structure (contango vs backwardation indicating supply expectations), open interest (market participant positioning), volume and liquidity, options skew (put/call ratio revealing hedging behavior), and speculator vs commercial positions (CFTC Commitments of Traders). Market-implied volatility from options pricing provides risk perception. Integrates futures signals with physical trade flows to identify divergences.",
      inputs: "CBOT futures prices, options data, CFTC positioning reports",
      outputs: "Market sentiment indicators, implied volatility, positioning analysis"
    },
    {
      id: 8,
      name: "Shock Simulation Engine",
      icon: Zap,
      description: "Scenario Testing & What-If Analysis",
      details: "Interactive scenario modeling tool allowing users to test custom shock combinations: tariff changes (+/-X%), supply disruptions (drought reducing Brazil crop by Y%), demand shifts (Chinese pig herd expansion), logistics disruptions (port closures), policy events (sanctions, trade deal). Drag-and-drop interface for combining multiple shocks. Propagates shocks through all modules using calibrated elasticities and correlations. Generates detailed scenario reports including: trade flow impacts, price effects, supply chain stress points, and mitigation recommendations. Powered by AI (ChatGPT integration) for natural language scenario narratives.",
      inputs: "User-defined shock parameters (tariffs, supply, demand, logistics, policy)",
      outputs: "Integrated impact assessment, stress test results, AI-generated scenario reports"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Introduction */}
      <Card className="p-8 bg-gradient-to-br from-card via-card to-secondary/20 border-border shadow-xl">
        <div className="max-w-4xl">
          <Badge variant="outline" className="mb-4 border-primary text-primary">
            Platform Overview
          </Badge>
          <h1 className="text-primary mb-4">
            Strategic Trade Intelligence Platform
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            A comprehensive geopolitical risk analysis system for US-China soybean trade, integrating quantitative forecasting, 
            sentiment analysis, supply chain mapping, and AI-powered scenario simulation to provide actionable strategic intelligence.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-card border border-border rounded-lg">
              <div className="text-primary text-3xl mb-1">8</div>
              <div className="text-muted-foreground text-sm">Analysis Modules</div>
            </div>
            <div className="text-center p-4 bg-card border border-border rounded-lg">
              <div className="text-primary text-3xl mb-1">40+</div>
              <div className="text-muted-foreground text-sm">Risk Variables</div>
            </div>
            <div className="text-center p-4 bg-card border border-border rounded-lg">
              <div className="text-primary text-3xl mb-1">13</div>
              <div className="text-muted-foreground text-sm">Risk Dimensions</div>
            </div>
            <div className="text-center p-4 bg-card border border-border rounded-lg">
              <div className="text-primary text-3xl mb-1">∞</div>
              <div className="text-muted-foreground text-sm">Scenarios</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Understanding The Platform */}
      <Card className="p-8 bg-card border-border shadow-lg">
        <h2 className="text-primary mb-6">Understanding the Platform</h2>
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div key={index} className="border border-border rounded-lg overflow-hidden bg-secondary/20">
              <button
                onClick={() => toggleSection(index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/30 transition-colors"
              >
                <h3 className="text-foreground">{section.title}</h3>
                {expandedSections[index] ? (
                  <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                )}
              </button>
              {expandedSections[index] && (
                <div className="px-5 pb-5">
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Dynamic Pipeline Visualization */}
      <Card className="p-8 bg-card border-border shadow-lg">
        <div className="mb-6">
          <h2 className="text-primary mb-2">Intelligence Production Pipeline</h2>
          <p className="text-muted-foreground">
            Visual representation of how data flows through the 8 analytical modules to generate strategic insights
          </p>
        </div>

        {/* Pipeline Flow */}
        <div className="space-y-6">
          {/* Data Input Stage */}
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-16 h-16 bg-primary/10 border-2 border-primary/30 rounded-lg flex items-center justify-center">
              <Database className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-foreground">Data Collection Layer</h3>
                <Badge variant="outline" className="border-primary text-primary text-xs">
                  Input
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm">
                USDA Reports • Customs Statistics • Futures Prices • Policy Announcements • Media Sentiment • Shipping Data
              </p>
            </div>
          </div>

          {/* Arrow Down */}
          <div className="flex justify-center">
            <ArrowRight className="w-6 h-6 text-primary rotate-90" />
          </div>

          {/* Processing Modules */}
          <div className="grid md:grid-cols-2 gap-4">
            {modules.map((module, idx) => {
              const Icon = module.icon;
              return (
                <div
                  key={module.id}
                  className="group relative bg-secondary/30 border border-border hover:border-primary transition-all rounded-lg p-5 hover:shadow-md"
                  style={{
                    animationDelay: `${idx * 100}ms`
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="border-primary/50 text-primary text-xs">
                          Module {module.id}
                        </Badge>
                      </div>
                      <h4 className="text-foreground mb-1">{module.name}</h4>
                      <p className="text-muted-foreground text-sm mb-3">{module.description}</p>
                      
                      {/* Expandable Details */}
                      <details className="group/details">
                        <summary className="cursor-pointer text-primary text-sm hover:underline list-none flex items-center gap-1">
                          <span>View Details</span>
                          <ChevronDown className="w-4 h-4 group-open/details:rotate-180 transition-transform" />
                        </summary>
                        <div className="mt-3 pt-3 border-t border-border space-y-2">
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {module.details}
                          </p>
                          <div className="grid grid-cols-1 gap-2 mt-3">
                            <div className="flex gap-2 text-xs">
                              <Eye className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                              <div>
                                <span className="text-emerald-400">Inputs:</span>
                                <span className="text-muted-foreground ml-2">{module.inputs}</span>
                              </div>
                            </div>
                            <div className="flex gap-2 text-xs">
                              <Target className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                              <div>
                                <span className="text-cyan-400">Outputs:</span>
                                <span className="text-muted-foreground ml-2">{module.outputs}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </details>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Arrow Down */}
          <div className="flex justify-center">
            <ArrowRight className="w-6 h-6 text-primary rotate-90" />
          </div>

          {/* Integration Layer */}
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-16 h-16 bg-amber-500/10 border-2 border-amber-500/30 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-amber-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-foreground">Integration & Synthesis Layer</h3>
                <Badge variant="outline" className="border-amber-500 text-amber-400 text-xs">
                  Processing
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm">
                Cross-module correlation • Composite risk scoring • Scenario probability weighting • Anomaly detection
              </p>
            </div>
          </div>

          {/* Arrow Down */}
          <div className="flex justify-center">
            <ArrowRight className="w-6 h-6 text-primary rotate-90" />
          </div>

          {/* Output Stage */}
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-16 h-16 bg-cyan-500/10 border-2 border-cyan-500/30 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-cyan-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-foreground">Strategic Intelligence Output</h3>
                <Badge variant="outline" className="border-cyan-500 text-cyan-400 text-xs">
                  Actionable
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm">
                Risk assessments • Forward-looking forecasts • Scenario impact analysis • Decision recommendations • Alert notifications
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Getting Started */}
      <Card className="p-8 bg-gradient-to-br from-primary/5 to-transparent border-border shadow-lg">
        <h2 className="text-primary mb-4">Getting Started</h2>
        <div className="space-y-4 text-muted-foreground">
          <p className="leading-relaxed">
            <span className="text-primary">For First-Time Users:</span> Start with the <span className="text-foreground">Forecasting Engine</span> to understand baseline trade projections, 
            then explore the <span className="text-foreground">Supply Chain Vulnerability Index</span> to identify key risk factors. The <span className="text-foreground">Policy Events Timeline</span> provides 
            historical context for current dynamics.
          </p>
          <p className="leading-relaxed">
            <span className="text-primary">For Advanced Analysis:</span> Use the <span className="text-foreground">Shock Simulation Engine</span> to test custom scenarios combining 
            multiple risk factors. Cross-reference findings across modules to develop comprehensive risk mitigation strategies.
          </p>
          <p className="leading-relaxed">
            <span className="text-primary">Navigation:</span> Use the sidebar menu to switch between modules. Each module offers drill-down capabilities—click on charts, 
            tables, and indicators to access underlying data and detailed explanations. Modules are designed to work independently or in combination.
          </p>
        </div>
      </Card>
    </div>
  );
}
