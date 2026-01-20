import { useNavigate } from 'react-router-dom';
import { FileText, TrendingUp, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/app/components/ui/accordion';

export default function PlatformOverview() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">
            Volatility Foreboding Index Platform
          </h1>
          <p className="text-xl text-slate-400">
            Predictive Analytics for Pharma Stock Volatility
          </p>
        </div>

        {/* Main Claim Section */}
        <Card className="border-2 border-slate-800 bg-slate-900/50">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-white">
              Re-engineering the Workflow of Risk & Portfolio Managers
            </CardTitle>
            <CardDescription className="text-lg mt-4 text-slate-400">
              Traditional approach vs. Our revolutionary approach
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Old Way */}
            <div className="bg-red-950/20 p-6 rounded-lg border-2 border-red-900/50">
              <h3 className="text-xl font-semibold mb-4 text-red-200 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-red-400" />
                Traditional Approach: Messy & Time-Consuming
              </h3>
              <div className="relative">
                <div className="flex flex-wrap gap-4 justify-center items-center">
                  <DocumentIcon label="Earnings Call" />
                  <ArrowRight className="w-6 h-6 text-red-700/50" />
                  <DocumentIcon label="News" />
                  <ArrowRight className="w-6 h-6 text-red-700/50" />
                  <DocumentIcon label="Filings" />
                  <ArrowRight className="w-6 h-6 text-red-700/50" />
                  <DocumentIcon label="Reports" />
                  <ArrowRight className="w-6 h-6 text-red-700/50" />
                  <div className="px-6 py-4 bg-red-900/40 border border-red-800 rounded-lg font-semibold text-red-200">
                    Final Analysis?
                  </div>
                </div>
                <p className="text-center mt-4 text-red-400/80 italic">
                  Hours of reading → Uncertain conclusions
                </p>
              </div>
            </div>

            {/* New Way */}
            <div className="bg-green-950/20 p-6 rounded-lg border-2 border-green-900/50">
              <h3 className="text-xl font-semibold mb-4 text-green-200 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-400" />
                Our Approach: Start with Analysis, Dive Deep as Needed
              </h3>
              <div className="flex flex-col items-center gap-4">
                <div className="px-8 py-6 bg-green-700 text-white rounded-lg font-semibold text-xl shadow-lg shadow-green-900/20">
                  Final Analysis (FI, TFI, Regime)
                </div>
                <ArrowRight className="w-6 h-6 text-green-500 rotate-90" />
                <div className="flex flex-wrap gap-4 justify-center">
                  <DocumentIcon label="Drill into Earnings" small />
                  <DocumentIcon label="Check News" small />
                  <DocumentIcon label="Review Filings" small />
                  <DocumentIcon label="Validate Sources" small />
                </div>
                <p className="text-center mt-4 text-green-400 font-semibold">
                  Immediate insights → Deep dive only where needed
                </p>
              </div>
            </div>

            <div className="text-center pt-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/interactive')}
                className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-500 text-white"
              >
                Start Analysis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-slate-800">
                <AccordionTrigger className="text-lg font-semibold text-slate-200 hover:text-white">
                  What is the statistical robustness of this model?
                </AccordionTrigger>
                <AccordionContent className="text-base space-y-4 text-slate-400">
                  <p>
                    Our methodology is inspired by rigorous academic research in economic uncertainty measurement:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Baker, S. R., Bloom, N., & Davis, S. J. (2016).</strong> Measuring economic policy uncertainty. 
                      <em> The Quarterly Journal of Economics, 131(3), 1593-1636.</em>
                    </li>
                    <li>
                      <strong>Roy Trivedi, S. (2024).</strong> Into the Unknown: Uncertainty, Foreboding and Financial Markets. 
                      <em> Asia-Pacific Financial Markets 31, 1–23.</em>
                    </li>
                  </ul>
                  <p className="mt-4 bg-blue-950/30 p-4 rounded border-l-4 border-blue-500 text-slate-300">
                    <strong className="text-blue-400">Academic Validation:</strong> Dr. Smita Roy Trivedi (Senior Researcher at the National Institute of Bank Management) 
                    is closely guiding our research team and evaluating our model for its statistical efficacy and robustness.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-slate-800">
                <AccordionTrigger className="text-lg font-semibold text-slate-200 hover:text-white">
                  What are the Foreboding Index (FI) and Term Frequency Foreboding Index (TFI)?
                </AccordionTrigger>
                <AccordionContent className="text-base text-slate-400">
                  <p className="mb-2">
                    The <strong className="text-slate-200">Foreboding Index (FI)</strong> measures the presence of foreboding language in text documents. 
                    It quantifies uncertainty and negative sentiment that may precede volatility.
                  </p>
                  <p>
                    The <strong className="text-slate-200">Term Frequency Foreboding Index (TFI)</strong> weights the FI by the frequency of foreboding terms, 
                    providing a more nuanced measure that accounts for how often concerning language appears.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-slate-800">
                <AccordionTrigger className="text-lg font-semibold text-slate-200 hover:text-white">
                  How are Regime levels determined?
                </AccordionTrigger>
                <AccordionContent className="text-base text-slate-400">
                  <p className="mb-4">
                    Regime levels categorize the current market state based on the FI score:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="w-24 px-3 py-1 bg-green-950/40 text-green-400 border border-green-900 rounded font-semibold">0.0 - 0.25</span>
                      <span>Stable: Low volatility expected</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-24 px-3 py-1 bg-yellow-950/40 text-yellow-400 border border-yellow-900 rounded font-semibold">0.25 - 0.5</span>
                      <span>Watch: Moderate concern, monitor closely</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-24 px-3 py-1 bg-orange-950/40 text-orange-400 border border-orange-900 rounded font-semibold">0.5 - 0.75</span>
                      <span>Alert: Elevated risk, prepare for volatility</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-24 px-3 py-1 bg-red-950/40 text-red-400 border border-red-900 rounded font-semibold">0.75 - 1.0</span>
                      <span>Critical: High volatility imminent</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-slate-800">
                <AccordionTrigger className="text-lg font-semibold text-slate-200 hover:text-white">
                  Which sectors and stocks are supported?
                </AccordionTrigger>
                <AccordionContent className="text-base text-slate-400">
                  <p>
                    Our platform currently focuses on the pharmaceutical sector within the Indian stock market, 
                    covering major companies across various sub-sectors including generic drugs, specialty pharma, 
                    biotech, and diagnostics. You can select from sector-categorized companies in the analysis interface.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-slate-800">
                <AccordionTrigger className="text-lg font-semibold text-slate-200 hover:text-white">
                  Can I customize the foreboding dictionaries?
                </AccordionTrigger>
                <AccordionContent className="text-base text-slate-400">
                  <p>
                    Yes! Our platform allows you to fully customize the dictionaries used for analysis. 
                    You can add or remove words from the Root Foreboding, Foreboding, Assurance, and Geopolitical dictionaries 
                    to tailor the analysis to your specific needs and domain expertise.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DocumentIcon({ label, small }: { label: string; small?: boolean }) {
  return (
    <div className={`flex flex-col items-center gap-1 ${small ? 'scale-75' : ''}`}>
      <div className="p-3 bg-slate-800 rounded-lg shadow-md border border-slate-700">
        <FileText className="w-8 h-8 text-blue-400" />
      </div>
      <span className="text-xs text-slate-400 font-medium">{label}</span>
    </div>
  );
}