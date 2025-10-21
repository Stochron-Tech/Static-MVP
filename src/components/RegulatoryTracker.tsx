import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';

interface RegulatoryItem {
  category: string;
  title: string;
  status: 'active' | 'resolved' | 'critical' | 'monitoring';
  severity: 'high' | 'medium' | 'low';
  description: string;
  impact: string;
  lastUpdated: string;
}

const regulatoryItems: RegulatoryItem[] = [
  {
    category: 'Tariffs',
    title: '25% Retaliatory Tariffs (Section 301)',
    status: 'active',
    severity: 'high',
    description: 'China imposed 25% tariffs on US soybeans in July 2018 in retaliation for Section 301 tariffs. Tariffs remain on the books but waivers granted for some purchases.',
    impact: 'Estimated $25-30/MT cost disadvantage vs Brazilian competitors. Makes US soybeans economically uncompetitive in most market conditions. State-owned importers require special approval for US purchases.',
    lastUpdated: '2024-09-15'
  },
  {
    category: 'Tariffs',
    title: 'Additional Tariff Exclusion Process',
    status: 'monitoring',
    severity: 'medium',
    description: 'MOFCOM maintains exclusion list allowing some imports at reduced or zero tariff rates. Process opaque and subject to political considerations.',
    impact: 'Creates uncertainty and inconsistency. Private crushers disadvantaged vs state firms with political connections. Exclusions granted on case-by-case basis with no clear criteria.',
    lastUpdated: '2024-10-01'
  },
  {
    category: 'SPS Measures',
    title: 'Biotech Trait Approval Delays',
    status: 'critical',
    severity: 'high',
    description: 'China delays approval of new GMO soybean varieties, preventing US farmers from planting latest genetics until Chinese approval secured. Currently 3-5 year backlog.',
    impact: 'Limits US productivity gains and creates asynchronous approval problem. Farmers must wait for Chinese approval before planting new varieties. Weaponization of food safety process for trade leverage.',
    lastUpdated: '2024-08-20'
  },
  {
    category: 'SPS Measures',
    title: 'MRL Standards for Pesticide Residues',
    status: 'active',
    severity: 'medium',
    description: 'Maximum Residue Limits (MRLs) for certain pesticides set below international standards or US practices. Glyphosate and dicamba subject to enhanced scrutiny.',
    impact: 'Requires US exporters to implement separate protocols for China-destined beans. Testing and certification costs ~$2-4/MT. Some cargoes rejected for exceeding limits.',
    lastUpdated: '2024-07-12'
  },
  {
    category: 'SPS Measures',
    title: 'Phytosanitary Certificates & Fumigation',
    status: 'monitoring',
    severity: 'low',
    description: 'China requires USDA-issued phytosanitary certificates and may require methyl bromide fumigation for pest concerns. Standards periodically tightened.',
    impact: 'Operational hurdle adding 5-7 days to export process. Fumigation adds $8-12/MT when required. Generally manageable but subject to arbitrary enforcement during tensions.',
    lastUpdated: '2024-06-30'
  },
  {
    category: 'Import Licensing',
    title: 'State Trading Enterprise Quota System',
    status: 'active',
    severity: 'high',
    description: 'Majority of soybean imports controlled by state-owned crushers (COFCO, Sinograin). Private firms face quota restrictions and approval requirements.',
    impact: 'Limits market access and concentrates purchasing power. Political considerations influence sourcing decisions. Private sector cannot freely import despite WTO commitments.',
    lastUpdated: '2024-09-01'
  },
  {
    category: 'Trade Agreements',
    title: 'Phase One Agreement Purchase Commitments',
    status: 'resolved',
    severity: 'medium',
    description: 'January 2020 agreement committed China to $80B in agricultural purchases over 2020-2021. Soybeans key component. Agreement largely expired with mixed compliance.',
    impact: 'China fell short of full commitments (~75% compliance) but purchases improved vs 2018-19 nadir. No enforcement mechanism. Provides diplomatic talking point but lacks teeth.',
    lastUpdated: '2024-01-15'
  },
  {
    category: 'Trade Agreements',
    title: 'WTO Dispute on Agricultural TRQs',
    status: 'monitoring',
    severity: 'medium',
    description: 'US challenged China\'s administration of Tariff Rate Quotas for corn, wheat, rice at WTO. Panel ruled in favor of US (2019). Implementation ongoing.',
    impact: 'Establishes precedent but doesn\'t directly affect soybeans (no TRQ). Demonstrates China\'s willingness to ignore WTO rulings. Agricultural trade increasingly governed by power politics rather than rules.',
    lastUpdated: '2024-04-20'
  },
  {
    category: 'Financial/Customs',
    title: 'Import VAT and Processing Fees',
    status: 'active',
    severity: 'low',
    description: '13% VAT on soybean imports (later rebated to crushers). Various port fees and inspection charges. Generally applied uniformly but subject to administrative discretion.',
    impact: 'Working capital requirements of ~$40/MT for VAT. Administrative fees add $3-5/MT. Transparent and predictable but adds cost. State firms may receive favorable financing terms.',
    lastUpdated: '2024-05-10'
  },
  {
    category: 'Financial/Customs',
    title: 'US Entity List Restrictions',
    status: 'active',
    severity: 'medium',
    description: 'Some Chinese SOEs placed on US Entity List for national security concerns. Creates legal uncertainty around transactions and financing.',
    impact: 'Complicates payment processing and trade finance. US banks reluctant to handle transactions with listed entities. Forces use of non-US banks and currencies, increasing costs and settlement risk.',
    lastUpdated: '2024-08-05'
  },
  {
    category: 'Environmental',
    title: 'Deforestation-Free Sourcing Pressure',
    status: 'monitoring',
    severity: 'low',
    description: 'Growing Chinese consumer and regulatory interest in Amazon deforestation linked to Brazilian soy. Could create differentiation opportunity for US.',
    impact: 'Still nascent in China (unlike EU). If Chinese government adopts deforestation regulations, US gains competitive advantage. Monitor EU precedent (EUDR) as potential model.',
    lastUpdated: '2024-09-28'
  },
  {
    category: 'Geopolitical',
    title: 'Export Control Risk - National Security',
    status: 'monitoring',
    severity: 'high',
    description: 'Risk that deteriorating US-China relations could lead to export controls on agricultural goods. No current restrictions but historical precedent (1973 soy embargo).',
    impact: 'Tail risk with catastrophic impact. Would terminate US-China soy trade entirely. China memories of 1973 embargo drive diversification strategy. Low probability but high consequence.',
    lastUpdated: '2024-10-10'
  },
];

const statusIcons = {
  active: <AlertTriangle className="w-5 h-5 text-orange-400" />,
  resolved: <CheckCircle className="w-5 h-5 text-green-400" />,
  critical: <XCircle className="w-5 h-5 text-red-400" />,
  monitoring: <Clock className="w-5 h-5 text-cyan-400" />,
};

const severityColors = {
  high: 'border-red-500 bg-red-500/10',
  medium: 'border-orange-500 bg-orange-500/10',
  low: 'border-green-500 bg-green-500/10',
};

export default function RegulatoryTracker() {
  const categories = [...new Set(regulatoryItems.map(item => item.category))];

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card border-border shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-primary mb-1">Regulatory Tracker</h2>
            <p className="text-muted-foreground text-sm">Policy, Legal, and Compliance Monitoring for US-China Soybean Trade</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="border-red-500 text-red-400">
              {regulatoryItems.filter(i => i.severity === 'high').length} High Severity
            </Badge>
            <Badge variant="outline" className="border-orange-500 text-orange-400">
              {regulatoryItems.filter(i => i.status === 'critical').length} Critical
            </Badge>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-secondary border-border">
            <div className="text-muted-foreground text-sm mb-1">Total Items</div>
            <div className="text-2xl text-foreground">{regulatoryItems.length}</div>
            <div className="text-muted-foreground text-xs mt-1">Under monitoring</div>
          </Card>
          <Card className="p-4 bg-red-500/10 border-red-500/30">
            <div className="text-red-400 text-sm mb-1">Critical Status</div>
            <div className="text-2xl text-red-300">{regulatoryItems.filter(i => i.status === 'critical').length}</div>
            <div className="text-red-400 text-xs mt-1">Immediate attention</div>
          </Card>
          <Card className="p-4 bg-orange-500/10 border-orange-500/30">
            <div className="text-orange-400 text-sm mb-1">Active Barriers</div>
            <div className="text-2xl text-orange-300">{regulatoryItems.filter(i => i.status === 'active').length}</div>
            <div className="text-orange-400 text-xs mt-1">Ongoing impact</div>
          </Card>
          <Card className="p-4 bg-green-500/10 border-green-500/30">
            <div className="text-green-400 text-sm mb-1">Resolved</div>
            <div className="text-2xl text-green-300">{regulatoryItems.filter(i => i.status === 'resolved').length}</div>
            <div className="text-green-400 text-xs mt-1">No longer active</div>
          </Card>
        </div>
      </Card>

      {/* Regulatory Items by Category */}
      {categories.map(category => (
        <Card key={category} className="p-6 bg-card border-border shadow-lg">
          <h3 className="text-primary mb-4">{category}</h3>
          <div className="space-y-3">
            {regulatoryItems
              .filter(item => item.category === category)
              .map((item, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 border-l-4 ${severityColors[item.severity]} border-y border-r border-border rounded-lg`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {statusIcons[item.status]}
                      <div>
                        <h4 className="text-foreground">{item.title}</h4>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </Badge>
                          <Badge variant="outline" className={`text-xs ${
                            item.severity === 'high' ? 'border-red-500 text-red-400' :
                            item.severity === 'medium' ? 'border-orange-500 text-orange-400' :
                            'border-green-500 text-green-400'
                          }`}>
                            {item.severity.toUpperCase()} SEVERITY
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Updated: {item.lastUpdated}
                    </div>
                  </div>
                  <div className="ml-8">
                    <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
                    <div className="bg-secondary/50 p-3 rounded mt-2">
                      <div className="text-xs text-primary mb-1">IMPACT ASSESSMENT</div>
                      <p className="text-muted-foreground text-sm">{item.impact}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      ))}

      {/* Key Takeaways */}
      <Card className="p-6 bg-card border-border shadow-lg">
        <h3 className="text-primary mb-4">Strategic Assessment</h3>
        <div className="space-y-3 text-sm">
          <p className="text-foreground leading-relaxed">
            The regulatory environment for US soybean exports to China remains <span className="text-red-400">highly adverse</span>. The 25% retaliatory tariff creates a structural cost disadvantage that cannot be overcome through operational efficiencies alone.
          </p>
          <p className="text-foreground leading-relaxed">
            Beyond tariffs, <span className="text-orange-400">non-tariff barriers</span> have proliferated: biotech approval delays, arbitrary SPS enforcement, and state trading enterprise dominance. These measures provide China with flexible tools to manage imports for political purposes.
          </p>
          <p className="text-foreground leading-relaxed">
            The <span className="text-yellow-400">Phase One Agreement</span> provided temporary relief but was incomplete in both compliance and enforcement. No comprehensive resolution framework exists. Agricultural trade increasingly operates outside formal rules-based system.
          </p>
          <p className="text-foreground leading-relaxed">
            <span className="text-cyan-400">Outlook:</span> Regulatory barriers likely to persist as long as broader US-China strategic competition continues. Exporters should plan for permanently elevated policy risk and maintain diversified market access. No near-term catalyst for fundamental improvement visible.
          </p>
        </div>
      </Card>
    </div>
  );
}
