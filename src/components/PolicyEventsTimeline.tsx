import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

interface PolicyEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  participants: string[];
  category: 'trade_negotiation' | 'summit' | 'regulatory_review' | 'agricultural_forum' | 'geopolitical';
  significance: 'critical' | 'high' | 'medium';
  description: string;
  potentialImpact: string;
  variablesAffected: string[];
  backgroundContext: string;
}

const upcomingEvents: PolicyEvent[] = [
  {
    id: 'apec-2024',
    title: 'APEC Economic Leaders Meeting',
    date: '2024-11-15',
    location: 'Lima, Peru',
    participants: ['US President', 'Chinese President', 'Trade Ministers'],
    category: 'summit',
    significance: 'critical',
    description: 'Annual Asia-Pacific Economic Cooperation summit. Potential for bilateral US-China meeting on sidelines.',
    potentialImpact: 'Bilateral engagement could produce agreement to resume trade talks or announce tariff modifications. Agricultural issues may be bargaining chip in broader tech/security discussions. No binding commitments expected but tone-setting important.',
    variablesAffected: ['Tariff Exposure Index', 'Geopolitical Tension Index', 'Sentiment Score', 'Trade Agreement Coverage'],
    backgroundContext: 'Previous APEC meetings (2016, 2018, 2023) produced mixed results. 2018 meeting occurred amid escalating trade war with no resolution. 2023 Blinken-Wang Yi meeting in Lima generated limited progress. Expectations low but symbolism matters.'
  },
  {
    id: 'ustr-review-2025',
    title: 'USTR Annual Section 301 Review',
    date: '2025-01-20',
    location: 'Washington, DC',
    participants: ['US Trade Representative', 'Industry Stakeholders', 'Congress'],
    category: 'regulatory_review',
    significance: 'critical',
    description: 'Mandatory review of Section 301 tariffs on Chinese goods including agricultural retaliation assessment.',
    potentialImpact: 'Could recommend tariff modifications, exclusions, or escalation. Agricultural sector will testify on retaliatory impact. Political pressure from farm states to negotiate resolution. However, China hawks in Congress oppose concessions.',
    variablesAffected: ['Tariff Exposure Index', 'Regulatory/Policy Risk', 'Export Volume Forecast', 'Market Sentiment'],
    backgroundContext: '2024 review resulted in maintenance of status quo with minor exclusions. 2025 review occurs amid presidential transition period, creating uncertainty. Farm Belt political pressure intensifying as subsidies prove inadequate compensation.'
  },
  {
    id: 'china-central-economic',
    title: 'China Central Economic Work Conference',
    date: '2024-12-10',
    location: 'Beijing, China',
    participants: ['CCP Politburo', 'NDRC', 'MOFCOM'],
    category: 'summit',
    significance: 'high',
    description: 'Annual meeting setting China\'s economic priorities for following year. Agricultural policy and food security directives issued.',
    potentialImpact: 'Will establish soybean import targets and supplier diversification strategy. Self-sufficiency rhetoric vs. practical import needs. May signal increased/decreased US sourcing appetite. Strategic reserves policy guidance.',
    variablesAffected: ['Import Volume Forecast', 'Supplier Diversification Strategy', 'Strategic Reserve Policy', 'Sentiment Score'],
    backgroundContext: '2023 conference emphasized food security and reduced foreign dependence. Led to increased domestic soy crushing capacity and South American sourcing. 2024 conference expected to continue de-risking theme but acknowledge import realities.'
  },
  {
    id: 'us-brazil-trade',
    title: 'US-Brazil Agricultural Trade Talks',
    date: '2025-02-05',
    location: 'Brasília, Brazil',
    participants: ['USDA Secretary', 'Brazilian Agriculture Minister', 'Industry Groups'],
    category: 'trade_negotiation',
    significance: 'medium',
    description: 'Bilateral discussions on agricultural trade coordination and potential market access issues.',
    potentialImpact: 'US and Brazil together supply 80%+ of China\'s soybeans. Coordination vs. competition dynamics critical. Discussions may cover: export pace management, price discipline, joint position on Chinese buyer practices. Also addresses US-Brazil direct trade (ethanol, beef).',
    variablesAffected: ['Supplier Coordination Risk', 'Price Volatility', 'Market Share Dynamics', 'Competitive Positioning'],
    backgroundContext: 'Historically adversarial relationship with US accusing Brazil of unfair subsidies. Recent attempts at producer cooperation to counter Chinese monopsony power. Lula government more willing to engage than Bolsonaro. Shared interest in price stability.'
  },
  {
    id: 'wto-agriculture',
    title: 'WTO Agriculture Committee Review',
    date: '2025-03-12',
    location: 'Geneva, Switzerland',
    participants: ['WTO Members', 'US Agriculture Counselor', 'Chinese Mission'],
    category: 'regulatory_review',
    significance: 'medium',
    description: 'Regular WTO committee meeting reviewing agricultural trade policies and disputes.',
    potentialImpact: 'US expected to challenge Chinese SPS measures and state trading practices. China will counter with US subsidy concerns. Unlikely to produce immediate resolution but establishes record for potential dispute settlement. Multilateral pressure tool.',
    variablesAffected: ['WTO Compliance Metrics', 'SPS Barriers', 'Trade Agreement Coverage', 'Regulatory Environment'],
    backgroundContext: 'WTO dispute resolution largely paralyzed by Appellate Body blockage. Agricultural Committee discussions symbolic rather than enforceable. However, establishes factual record and international legitimacy for positions. US has pending complaints on ag TRQs.'
  },
  {
    id: 'usda-outlook-forum',
    title: 'USDA Agricultural Outlook Forum',
    date: '2025-02-20',
    location: 'Arlington, VA',
    participants: ['USDA Economists', 'Industry Analysts', 'Commodity Groups'],
    category: 'agricultural_forum',
    significance: 'medium',
    description: 'Annual forum presenting USDA\'s 10-year agricultural projections including export forecasts.',
    potentialImpact: 'Official USDA baseline assumptions for China export recovery will influence farmer planting decisions, futures markets, and policy discussions. Conservative vs. optimistic scenarios. Interagency (State, USTR) coordination on China assumptions.',
    variablesAffected: ['Export Forecasts', 'Planting Intentions', 'Futures Market Expectations', 'Policy Planning Assumptions'],
    backgroundContext: '2024 Forum projected modest China export recovery to 25-27 MMT by 2028. Actual 2024 performance tracking below projections. 2025 Forum may revise downward, acknowledging structural market share loss. Politically sensitive given farm economy stress.'
  },
  {
    id: 'g7-agriculture',
    title: 'G7 Agriculture Ministers Meeting',
    date: '2025-04-18',
    location: 'Rome, Italy',
    participants: ['G7 Agriculture Ministers', 'FAO', 'WFP'],
    category: 'agricultural_forum',
    significance: 'medium',
    description: 'G7 ministerial on food security, sustainable agriculture, and trade policy coordination.',
    potentialImpact: 'Potential for coordinated position on Chinese agricultural trade practices. Discussion of export controls, food security vs. weaponization. Climate/sustainability standards potentially creating differentiation from Chinese preferred suppliers.',
    variablesAffected: ['Multilateral Coordination', 'Sustainability Standards', 'Allied Trade Policy', 'Regulatory Harmonization'],
    backgroundContext: 'G7 increasingly focused on China de-risking across sectors. Agricultural sector traditionally more cautious about antagonizing major market. Tension between farm interests (want China sales) and geopolitical strategy (reduce dependence).'
  },
  {
    id: 'china-biotech-review',
    title: 'Chinese GMO Trait Approval Committee Session',
    date: '2025-01-30',
    location: 'Beijing, China',
    participants: ['MOA Biosafety Committee', 'Chinese Scientists', 'Industry Observers'],
    category: 'regulatory_review',
    significance: 'high',
    description: 'Quarterly biosafety committee meeting reviewing pending GMO trait approvals for import.',
    potentialImpact: 'Currently 12 soybean traits pending approval (US, Brazil, Argentina applications). Approval timeline critical for US farmer planting decisions. Political considerations affect technical evaluations. Delays used as trade leverage tool.',
    variablesAffected: ['Biotech Approval Timeline', 'Planting Decisions', 'Competitive Position', 'SPS Risk', 'Innovation Pipeline'],
    backgroundContext: 'China has systematically delayed US trait approvals while fast-tracking Brazilian applications. Creates asynchronous approval problem where US farmers cannot plant varieties already approved in Brazil. Weaponization of food safety process transparent but effective.'
  },
  {
    id: 'argentina-election',
    title: 'Argentina Presidential Election',
    date: '2025-10-26',
    location: 'Buenos Aires, Argentina',
    participants: ['Presidential Candidates', 'Agricultural Sector', 'International Observers'],
    category: 'geopolitical',
    significance: 'high',
    description: 'National election determining agricultural export policy direction.',
    potentialImpact: 'Argentina is third-largest soybean exporter to China. Export taxes, infrastructure investment, and trade policy vary dramatically by government. Milei administration introduced free market reforms but economic instability persists. Election outcome affects global supply balance.',
    variablesAffected: ['Argentine Export Capacity', 'Global Supply Balance', 'Regional Competition', 'Market Share Dynamics'],
    backgroundContext: 'Argentina chronically underperforms potential due to policy instability. Export taxes have ranged 0-33% in past decade. Infrastructure investment neglected. Political crisis creates opportunity for US/Brazil but also global supply uncertainty.'
  },
];

export default function PolicyEventsTimeline() {
  const [selectedEvent, setSelectedEvent] = useState<PolicyEvent | null>(null);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'trade_negotiation': return 'bg-blue-500/20 border-blue-500 text-blue-400';
      case 'summit': return 'bg-purple-500/20 border-purple-500 text-purple-400';
      case 'regulatory_review': return 'bg-orange-500/20 border-orange-500 text-orange-400';
      case 'agricultural_forum': return 'bg-green-500/20 border-green-500 text-green-400';
      case 'geopolitical': return 'bg-red-500/20 border-red-500 text-red-400';
      default: return 'bg-muted border-border text-muted-foreground';
    }
  };

  const getSignificanceColor = (significance: string) => {
    switch (significance) {
      case 'critical': return 'border-red-500 text-red-400';
      case 'high': return 'border-orange-500 text-orange-400';
      case 'medium': return 'border-yellow-500 text-yellow-400';
      default: return 'border-border text-muted-foreground';
    }
  };

  const sortedEvents = [...upcomingEvents].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card border-border shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-primary mb-1">Policy Events Timeline</h2>
            <p className="text-muted-foreground text-sm">Upcoming High-Impact Events & Variable Revision Triggers</p>
          </div>
          <Badge variant="outline" className="border-primary text-primary">
            {upcomingEvents.length} Events Tracked
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <Card className="p-3 bg-blue-500/10 border-blue-500/30">
            <div className="text-blue-400 text-xs mb-1">TRADE NEGOTIATIONS</div>
            <div className="text-xl text-blue-300">{upcomingEvents.filter(e => e.category === 'trade_negotiation').length}</div>
          </Card>
          <Card className="p-3 bg-purple-500/10 border-purple-500/30">
            <div className="text-purple-400 text-xs mb-1">SUMMITS</div>
            <div className="text-xl text-purple-300">{upcomingEvents.filter(e => e.category === 'summit').length}</div>
          </Card>
          <Card className="p-3 bg-orange-500/10 border-orange-500/30">
            <div className="text-orange-400 text-xs mb-1">REGULATORY REVIEWS</div>
            <div className="text-xl text-orange-300">{upcomingEvents.filter(e => e.category === 'regulatory_review').length}</div>
          </Card>
          <Card className="p-3 bg-green-500/10 border-green-500/30">
            <div className="text-green-400 text-xs mb-1">AG FORUMS</div>
            <div className="text-xl text-green-300">{upcomingEvents.filter(e => e.category === 'agricultural_forum').length}</div>
          </Card>
          <Card className="p-3 bg-red-500/10 border-red-500/30">
            <div className="text-red-400 text-xs mb-1">GEOPOLITICAL</div>
            <div className="text-xl text-red-300">{upcomingEvents.filter(e => e.category === 'geopolitical').length}</div>
          </Card>
        </div>
      </Card>

      {/* Timeline */}
      <div className="space-y-3">
        {sortedEvents.map((event) => (
          <Card 
            key={event.id} 
            className="p-5 bg-card border-border hover:border-primary hover:shadow-md transition-all cursor-pointer"
            onClick={() => setSelectedEvent(event)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="outline" className={getSignificanceColor(event.significance)}>
                    {event.significance.toUpperCase()}
                  </Badge>
                  <Badge className={getCategoryColor(event.category)}>
                    {event.category.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
                <h3 className="text-foreground mb-2">{event.title}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {event.participants.length} participants
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">{event.description}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-primary ml-4 flex-shrink-0" />
            </div>
          </Card>
        ))}
      </div>

      {/* Event Details Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-3xl bg-card border-border max-h-[90vh] overflow-y-auto">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-primary text-xl">{selectedEvent.title}</DialogTitle>
                <DialogDescription className="text-muted-foreground">Detailed event information and impact analysis</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className={getSignificanceColor(selectedEvent.significance)}>
                    {selectedEvent.significance.toUpperCase()} SIGNIFICANCE
                  </Badge>
                  <Badge className={getCategoryColor(selectedEvent.category)}>
                    {selectedEvent.category.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-muted-foreground text-sm mb-1">DATE</div>
                    <div className="text-foreground">
                      {new Date(selectedEvent.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-sm mb-1">LOCATION</div>
                    <div className="text-foreground">{selectedEvent.location}</div>
                  </div>
                </div>

                <div>
                  <div className="text-muted-foreground text-sm mb-1">KEY PARTICIPANTS</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.participants.map((participant, idx) => (
                      <Badge key={idx} variant="outline" className="border-border text-muted-foreground">
                        {participant}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="bg-secondary/50 p-4 rounded">
                  <div className="text-primary mb-2">POTENTIAL IMPACT</div>
                  <p className="text-muted-foreground text-sm">{selectedEvent.potentialImpact}</p>
                </div>

                <div className="bg-secondary/50 p-4 rounded">
                  <div className="text-primary mb-2">BACKGROUND CONTEXT</div>
                  <p className="text-muted-foreground text-sm">{selectedEvent.backgroundContext}</p>
                </div>

                <div>
                  <div className="text-muted-foreground text-sm mb-2">VARIABLES REQUIRING REVISION POST-EVENT</div>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedEvent.variablesAffected.map((variable, idx) => (
                      <div key={idx} className="p-2 bg-primary/10 border border-primary/30 text-primary text-sm rounded">
                        {variable}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Monitoring Notes */}
      <Card className="p-6 bg-card border-border shadow-lg">
        <h3 className="text-primary mb-4">Monitoring Protocol</h3>
        <div className="space-y-3 text-sm text-foreground leading-relaxed">
          <p>
            Following each high-significance event, <span className="text-primary">all affected variables must be re-evaluated</span> within 72 hours. Events rated "CRITICAL" trigger immediate model recalibration.
          </p>
          <p>
            Timeline maintained through integration of: government announcements, trade press, diplomatic cables (where available), and industry intelligence. Event significance ratings may be upgraded/downgraded as circumstances evolve.
          </p>
          <p>
            <span className="text-red-400">Current Watch:</span> APEC Summit (Nov 15) and USTR Section 301 Review (Jan 20) represent highest near-term impact probability. Both could materially alter tariff assumptions underpinning export forecasts.
          </p>
        </div>
      </Card>
    </div>
  );
}
