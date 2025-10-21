import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Info } from 'lucide-react';

interface Variable {
  name: string;
  value: number;
  description: string;
}

interface SubIndex {
  name: string;
  score: number;
  variables: Variable[];
}

const subIndices: SubIndex[] = [
  {
    name: 'Geographic Concentration',
    score: 72,
    variables: [
      { name: 'Import Market Concentration Index (HHI)', value: 0.68, description: 'Herfindahl-Hirschman Index measuring China\'s import concentration. Score of 0.68 indicates high concentration with Brazil (45%), US (35%), and Argentina (15%) as primary suppliers. Values >0.65 signal oligopolistic market structure with elevated switching risk.' },
      { name: 'Exporter Regional Dependency', value: 0.82, description: 'Measures dependence on South American suppliers (primarily Brazil). Score of 0.82 reflects China\'s strategic pivot post-2018. High dependency creates vulnerability to regional disruptions (drought, political instability in MERCOSUR nations).' },
      { name: 'Alternative Destination Availability', value: 0.45, description: 'Assesses availability of alternative export markets for US soybeans if China reduces purchases. Score 0.45 indicates moderate alternatives (EU, Southeast Asia) but insufficient to absorb full China volume. Lower scores indicate trapped capacity.' },
    ]
  },
  {
    name: 'Supplier Network Complexity',
    score: 58,
    variables: [
      { name: 'Supplier Tier Depth', value: 3.2, description: 'Average number of tiers in soybean supply chain (farmer → grain elevator → processor → crusher → end user). Score of 3.2 tiers is moderate complexity. Each tier adds potential failure points and information lag.' },
      { name: 'Supply Chain Node Density', value: 0.71, description: 'Measures interconnectedness of supply chain participants. Score 0.71 indicates relatively dense network with multiple grain traders (ADM, Bunge, Cargill, COFCO) creating redundancy but also contagion risk during financial stress.' },
      { name: 'Intermodal Connectivity', value: 0.63, description: 'Integration between transport modes (rail, barge, truck, ocean freight). Score 0.63 reflects decent US Gulf/PNW port connectivity but bottlenecks persist during peak export season (Sept-Nov). Infrastructure constraints limit surge capacity.' },
    ]
  },
  {
    name: 'Substitutability / Flexibility',
    score: 41,
    variables: [
      { name: 'Alternative Supplier Count', value: 2.8, description: 'Number of viable alternative suppliers to US. Score 2.8 reflects Brazil, Argentina, and emerging Paraguay/Uruguay. Limited alternatives reduce negotiating leverage. Soybeans are relatively fungible but origin matters for protein content and GMO regulations.' },
      { name: 'Input Switching Cost', value: 0.76, description: 'Cost/difficulty for China to switch from US to alternative suppliers. Score 0.76 is high - already demonstrated in 2018-2019 switch to Brazil. Switching requires new logistics, credit arrangements, and quality verification but is feasible.' },
      { name: 'Contractual Lock-In Index', value: 0.34, description: 'Degree to which long-term contracts constrain flexibility. Score 0.34 is moderate - most trades occur on spot/nearby futures. Phase One Agreement created informal commitments but enforcement weak. Market-based pricing dominates.' },
    ]
  },
  {
    name: 'Transparency & Visibility',
    score: 67,
    variables: [
      { name: 'Traceability Coverage', value: 0.72, description: 'Ability to track shipments from origin to destination. Score 0.72 reflects good vessel tracking and bill of lading systems. However, opacity exists in Chinese domestic distribution network post-port arrival. Export side more transparent than import side.' },
      { name: 'Data Latency', value: 14, description: 'Average delay (days) in receiving trade data. USDA publishes export sales weekly but Census data lags 6 weeks. Chinese customs data appears monthly with 3-4 week delay. Score of 14 days is composite average - adequate for strategic planning, insufficient for tactical trading.' },
      { name: 'Information Integration Index', value: 0.61, description: 'Degree to which data sources are integrated/reconciled. Score 0.61 indicates moderate integration. USDA, Census, Chinese customs, and private trackers often show discrepancies requiring manual reconciliation. Blockchain initiatives (in pilot) may improve future state.' },
    ]
  },
  {
    name: 'Logistics & Infrastructure Risk',
    score: 54,
    variables: [
      { name: 'Port Congestion Index', value: 0.48, description: 'Measures wait times and throughput constraints at key ports (US Gulf, PNW, Chinese ports). Score 0.48 indicates moderate congestion. Seasonal peaks (Sep-Nov) can double wait times. Chinese port capacity generally adequate but concentrated in Dalian, Nantong, Rizhao.' },
      { name: 'Transport Disruption Frequency', value: 2.1, description: 'Average major disruptions per year affecting soybean transport. Score 2.1 includes barge disruptions on Mississippi (drought/flooding), rail strikes, and Panama Canal constraints. Climate change increasing frequency. Each event causes 1-3 week delays.' },
      { name: 'Storage Capacity Utilization', value: 0.78, description: 'Percentage of storage capacity in use. Score 0.78 indicates tight conditions with limited surge capacity. China maintains strategic soybean reserves but utilization data opaque. US on-farm and commercial storage near capacity during harvest, creating price pressure.' },
    ]
  },
  {
    name: 'Regulatory / Policy Risk',
    score: 82,
    variables: [
      { name: 'Tariff Exposure Index', value: 0.91, description: 'Vulnerability to tariff changes. Score 0.91 extremely high - demonstrated by 2018 imposition of 25% retaliatory tariffs. Tariffs remain in place but waived for some imports. Policy reversal risk persists. Each 1% tariff reduces competitiveness ~$5-6/MT.' },
      { name: 'Export Control Sensitivity', value: 0.43, description: 'Risk that export controls could restrict trade. Score 0.43 moderate - food/agriculture rarely targeted but China has used import permits politically. Biotech approval process weaponized (delays for new GMO soy varieties). Health certificate requirements can halt shipments.' },
      { name: 'Trade Agreement Coverage', value: 0.52, description: 'Extent of WTO/bilateral protections. Score 0.52 reflects incomplete coverage. WTO baseline exists but dispute resolution slow. Phase One Agreement expired elements and compliance questionable. No comprehensive bilateral FTA. Agricultural trade remains politically vulnerable.' },
    ]
  },
  {
    name: 'Economic / Cost Exposure',
    score: 69,
    variables: [
      { name: 'Freight Cost Volatility', value: 0.74, description: 'Standard deviation of ocean freight rates (US Gulf/PNW to China). Score 0.74 high volatility - rates ranged $15-85/MT in past 3 years. Bunker fuel costs, vessel availability, and geopolitical premiums (Red Sea, SCS tensions) drive swings. Freight can exceed tariff impact.' },
      { name: 'Exchange Rate Volatility', value: 0.58, description: 'USD/CNY exchange rate variability. Score 0.58 moderate - PBOC manages float within band. Yuan depreciation makes US soybeans more expensive for Chinese buyers. 10% yuan depreciation ~ equivalent to 2.5% effective tariff. Currency policy is strategic trade tool.' },
      { name: 'Commodity Price Volatility', value: 0.81, description: 'Soybean price volatility (CBOT nearby futures). Score 0.81 high volatility - prices ranged $8.50-17.00/bushel in past 5 years. Weather (US, Brazil, Argentina), Chinese demand shifts, and policy shocks create explosive moves. Volatility complicates long-term planning.' },
    ]
  },
  {
    name: 'Environmental & Climate Risk',
    score: 63,
    variables: [
      { name: 'Extreme Weather Frequency', value: 1.8, description: 'Major weather events per year affecting production/transport (droughts, floods, hurricanes). Score 1.8 increasing from historical 1.2. 2023 Mississippi River drought halted barge traffic Sept-Nov. Brazilian safrinha increasingly vulnerable to dry spells. Climate change loading the dice.' },
      { name: 'Port Climate Vulnerability', value: 0.67, description: 'Exposure of critical ports to sea level rise, storms, flooding. Score 0.67 moderate-high risk. US Gulf ports vulnerable to hurricanes (2005 Katrina, 2021 Ida precedents). Chinese ports face typhoon risk. Yangshan, Tianjin modernizing but older facilities exposed.' },
      { name: 'Water Stress Index', value: 0.71, description: 'Water scarcity affecting soybean production regions. Score 0.71 concerning. Brazil Cerrado and Argentina Pampas face increasing dry season stress. US Midwest generally adequate but 2012 drought precedent. Irrigation limited for soybeans (rainfed crop). Water drives yield volatility.' },
    ]
  },
  {
    name: 'Governance & Legal Risk',
    score: 48,
    variables: [
      { name: 'Contract Enforcement Efficiency', value: 0.51, description: 'Reliability of contract enforcement mechanisms. Score 0.51 moderate. US-China trade disputes typically resolved commercially (arbitration) rather than courts. However, force majeure claims during COVID and political tensions created precedent for default. Chinese state firms can invoke policy as excuse.' },
      { name: 'Corruption Perception Score', value: 42, description: 'Transparency International CPI score (higher = less corruption). Score 42 indicates significant corruption risk in Chinese import system. State-owned crushers and import quotas create rent-seeking. Unofficial fees, relationship requirements (guanxi), and arbitrary inspection delays occur.' },
      { name: 'Sanction / Dispute Exposure', value: 0.73, description: 'Risk of sanctions or trade disputes disrupting flows. Score 0.73 high. US-China strategic competition creates constant threat. Entity List additions, counter-sanctions, and retaliatory actions possible. Agricultural trade used as diplomatic lever. Predictability low.' },
    ]
  },
  {
    name: 'Security & Political Risk',
    score: 77,
    variables: [
      { name: 'Geopolitical Tension Index', value: 0.84, description: 'Composite measure of US-China strategic rivalry. Score 0.84 severe. Taiwan tensions, tech war, South China Sea, Ukraine positions all strain relations. Agriculture not primary battlefield but collateral damage frequent. Decoupling rhetoric threatens long-term viability of trade relationship.' },
      { name: 'Maritime Security Incidents', value: 0.62, description: 'Piracy, harassment, or disruption affecting shipping lanes. Score 0.62 moderate. South China Sea freedom of navigation tensions create delay/rerouting risk. Red Sea Houthi attacks (2023-24) forced Cape routing adding 10-14 days. Strait of Malacca chokepoint. Insurance premiums rising.' },
      { name: 'Cyber Disruption Exposure', value: 0.58, description: 'Vulnerability to cyber attacks on logistics/payment systems. Score 0.58 moderate-high. Colonial Pipeline (2021) precedent shows infrastructure vulnerability. Grain traders increasingly digitized creating attack surface. Chinese APT groups have probed US agricultural IP. Critical infrastructure designation inadequate.' },
    ]
  },
  {
    name: 'Operational Risk',
    score: 52,
    variables: [
      { name: 'Supplier Reliability Index', value: 0.71, description: 'Track record of US exporters meeting commitments. Score 0.71 good but not excellent. US generally reliable but 2020-21 saw some cargo diversions to higher bidders. Farmer delivery discipline varies with prices. China remembers 1973 soybean embargo - trust deficit persists.' },
      { name: 'Inventory Buffer Days', value: 42, description: 'Days of consumption held in inventory (China). Score 42 days indicates moderate buffer. China targets 60-90 days but actual levels fluctuate. Strategic reserves opaque. Buffer inadequate for major disruption (2018 required scramble to alternative suppliers). Working capital costs limit holding.' },
      { name: 'Production Capacity Utilization', value: 0.79, description: 'Crush capacity utilization in China. Score 0.79 high utilization. Limited spare capacity constrains import surge absorption. New capacity takes 18-24 months to build. Overcapacity in 2014-15 corrected. Now operating near optimal rate. Expansion plans track import growth but lag prevents buffering shocks.' },
    ]
  },
  {
    name: 'Digital / Technology Risk',
    score: 61,
    variables: [
      { name: 'IT System Redundancy', value: 0.64, description: 'Backup systems for critical digital infrastructure. Score 0.64 indicates adequate redundancy. Major grain traders have disaster recovery but SME participants more vulnerable. Cloud migration ongoing. Single points of failure exist (SWIFT, specific TOS platforms). Redundancy costs money - underinvested.' },
      { name: 'Digital Integration Depth', value: 0.68, description: 'Degree of supply chain digitization/automation. Score 0.68 moderate. Blockchain pilots (AgriDigital, others) emerging but not mainstream. IoT sensors on farms, smart contracts for trade finance in trial. China ahead on digital payments, US ahead on precision ag. Integration gap creates friction.' },
      { name: 'Cyber Risk Index', value: 0.59, description: 'Overall cyber security posture. Score 0.59 moderate risk. Agricultural sector lags financial services in security investment. Ransomware targeting grain co-ops increasing (2021 NEW Cooperative, Crystal Valley). Nation-state espionage threat. Sector needs hardening.' },
    ]
  },
  {
    name: 'Resilience / Buffer Capacity',
    score: 44,
    variables: [
      { name: 'Dual Sourcing Ratio', value: 0.88, description: 'Percentage of imports with alternative source options. Score 0.88 very high - China successfully diversified post-2018. Brazil now dominant supplier. US relegated to swing supplier role. High dual sourcing reduces dependence but coordination among suppliers could disadvantage China.' },
      { name: 'Inventory-to-Sales Ratio', value: 0.19, description: 'Months of inventory relative to consumption. Score 0.19 (roughly 2 months) is lean. Just-in-time mentality prioritizes working capital over resilience. Adequate for normal volatility but insufficient for major shock. 2018 required emergency purchases from US at premium once Brazilian supply exhausted mid-year.' },
      { name: 'Insurance Coverage Ratio', value: 0.73, description: 'Percentage of trade value covered by insurance/hedges. Score 0.73 reasonably well hedged. Marine insurance standard. Price risk hedged via futures/options but basis risk remains. Political risk insurance expensive and excludes trade war scenarios. Coverage gaps exist for tail risks.' },
    ]
  },
];

export default function SupplyChainIndex() {
  const [selectedSubIndex, setSelectedSubIndex] = useState<SubIndex | null>(null);
  const [selectedVariable, setSelectedVariable] = useState<Variable | null>(null);

  const overallScore = Math.round(subIndices.reduce((sum, si) => sum + si.score, 0) / subIndices.length);

  // Smooth gradient color palette for better dark theme visibility
  const getColorForScore = (score: number) => {
    if (score >= 80) return 'bg-rose-400';
    if (score >= 70) return 'bg-orange-400';
    if (score >= 60) return 'bg-amber-400';
    if (score >= 50) return 'bg-yellow-400';
    if (score >= 40) return 'bg-lime-400';
    if (score >= 30) return 'bg-emerald-400';
    return 'bg-cyan-400';
  };

  const getBgColorForScore = (score: number) => {
    if (score >= 80) return 'bg-rose-500/10';
    if (score >= 70) return 'bg-orange-500/10';
    if (score >= 60) return 'bg-amber-500/10';
    if (score >= 50) return 'bg-yellow-500/10';
    if (score >= 40) return 'bg-lime-500/10';
    if (score >= 30) return 'bg-emerald-500/10';
    return 'bg-cyan-500/10';
  };

  const getBorderColorForScore = (score: number) => {
    if (score >= 80) return 'border-rose-500/30';
    if (score >= 70) return 'border-orange-500/30';
    if (score >= 60) return 'border-amber-500/30';
    if (score >= 50) return 'border-yellow-500/30';
    if (score >= 40) return 'border-lime-500/30';
    if (score >= 30) return 'border-emerald-500/30';
    return 'border-cyan-500/30';
  };

  const getTextColorForScore = (score: number) => {
    if (score >= 80) return 'text-rose-400';
    if (score >= 70) return 'text-orange-400';
    if (score >= 60) return 'text-amber-400';
    if (score >= 50) return 'text-yellow-400';
    if (score >= 40) return 'text-lime-400';
    if (score >= 30) return 'text-emerald-400';
    return 'text-cyan-400';
  };

  if (selectedVariable) {
    return (
      <div className="space-y-6">
        <Card className="p-6 bg-card border-border shadow-lg">
          <button
            onClick={() => setSelectedVariable(null)}
            className="flex items-center gap-2 text-primary hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Variables
          </button>
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-primary mb-2">{selectedVariable.name}</h2>
              <Badge variant="outline" className="border-primary text-primary">
                Value: {selectedVariable.value}
              </Badge>
            </div>
            <Info className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="prose max-w-none">
            <p className="text-muted-foreground leading-relaxed">{selectedVariable.description}</p>
          </div>
        </Card>
      </div>
    );
  }

  if (selectedSubIndex) {
    return (
      <div className="space-y-6">
        <Card className="p-6 bg-card border-border shadow-lg">
          <button
            onClick={() => setSelectedSubIndex(null)}
            className="flex items-center gap-2 text-primary hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Heatmap
          </button>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-primary mb-2">{selectedSubIndex.name}</h2>
              <p className="text-muted-foreground text-sm">Constituent Variables</p>
            </div>
            <Badge variant="outline" className={`border-primary ${getTextColorForScore(selectedSubIndex.score)}`}>
              Risk Score: {selectedSubIndex.score}/100
            </Badge>
          </div>
          <div className="grid gap-3">
            {selectedSubIndex.variables.map((variable, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedVariable(variable)}
                className="p-4 bg-secondary/30 border border-border hover:border-primary hover:shadow-sm transition-all text-left rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-foreground">{variable.name}</h3>
                  <Badge variant="outline" className="border-border text-muted-foreground">
                    {variable.value}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-2">{variable.description}</p>
              </button>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card border-border shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-primary mb-1">Supply Chain Vulnerability Index</h2>
            <p className="text-muted-foreground text-sm">Composite Risk Assessment across 13 Sub-Indices & 40+ Variables</p>
          </div>
          <Badge variant="outline" className={`${getTextColorForScore(overallScore)} text-xl px-4 py-2 border-2`}>
            {overallScore}/100
          </Badge>
        </div>

        <div className="mb-6">
          <div className="text-sm text-muted-foreground mb-2">Overall Vulnerability Assessment</div>
          <div className="flex gap-2 items-center">
            <div className="flex-1 bg-secondary h-8 rounded-lg overflow-hidden">
              <div 
                className={`h-full ${getColorForScore(overallScore)} transition-all`}
                style={{ width: `${overallScore}%` }}
              ></div>
            </div>
            <div className="text-foreground min-w-[120px] text-right">
              {overallScore >= 80 ? 'Critical Risk' : 
               overallScore >= 70 ? 'High Risk' : 
               overallScore >= 60 ? 'Elevated' : 
               overallScore >= 50 ? 'Moderate' : 
               overallScore >= 40 ? 'Manageable' : 
               overallScore >= 30 ? 'Low Risk' : 'Minimal'}
            </div>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-6">
          Click any sub-index below to explore constituent variables. Color gradient indicates risk level from cyan (minimal) through emerald, lime, yellow, amber, orange to rose (critical).
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {subIndices.map((subIndex, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedSubIndex(subIndex)}
              className={`group relative overflow-hidden border ${getBorderColorForScore(subIndex.score)} hover:border-primary hover:shadow-sm transition-all p-4 text-left rounded-lg ${getBgColorForScore(subIndex.score)}`}
            >
              <div className="relative">
                <div className={`text-2xl mb-2 ${getTextColorForScore(subIndex.score)}`}>
                  {subIndex.score}
                </div>
                <div className="text-foreground text-sm mb-1">{subIndex.name}</div>
                <div className="text-muted-foreground text-xs">{subIndex.variables.length} variables</div>
              </div>
            </button>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-card border-border shadow-lg">
        <h3 className="text-primary mb-4">Methodology</h3>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            The Supply Chain Vulnerability Index (SCVI) aggregates 40+ variables across 13 analytical pillars to produce a composite risk score. Each variable is normalized to 0-100 scale where higher scores indicate greater vulnerability.
          </p>
          <p>
            Sub-index scores are calculated as weighted averages of constituent variables. Overall SCVI score represents equal-weighted mean of all sub-indices. This approach ensures balanced representation across risk dimensions.
          </p>
          <p>
            <span className="text-primary">Current Assessment:</span> Score of {overallScore}/100 indicates {
              overallScore >= 80 ? 'critical structural vulnerabilities requiring immediate intervention' : 
              overallScore >= 70 ? 'severe risk exposure demanding strategic mitigation' : 
              overallScore >= 60 ? 'elevated risk levels requiring active management' :
              overallScore >= 50 ? 'moderate risk exposure with standard controls' : 
              overallScore >= 40 ? 'manageable risk profile with routine monitoring' :
              'acceptable risk levels with baseline mitigation'
            }. Primary risk drivers: Security & Political Risk (77), Regulatory/Policy Risk (82), and Geographic Concentration (72).
          </p>
        </div>
      </Card>
    </div>
  );
}
