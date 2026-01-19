import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, FileText, TrendingUp, Brain, CheckCircle2, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface PlatformOverviewProps {
  onGetStarted: () => void;
}

export function PlatformOverview({ onGetStarted }: PlatformOverviewProps) {
  const [openFaq, setOpenFaq] = React.useState<string | null>('statistical');

  const faqs = [
    {
      id: 'statistical',
      question: 'What is the statistical robustness of this model?',
      answer: (
        <div className="space-y-3">
          <p>
            The Pharma Foreboding Index is inspired by rigorous academic research on uncertainty
            measurement and text-based financial analysis:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li className="text-gray-300">
              <strong>Baker, S. R., Bloom, N., & Davis, S. J. (2016).</strong> "Measuring economic
              policy uncertainty." <em>The Quarterly Journal of Economics, 131(3), 1593-1636.</em>
            </li>
            <li className="text-gray-300">
              <strong>Roy Trivedi, S. (2024).</strong> "Into the Unknown: Uncertainty, Foreboding
              and Financial Markets." <em>Asia-Pacific Financial Markets 31, 1–23.</em>
            </li>
          </ol>
          <p className="mt-4 text-cyan-400">
            <strong>Dr. Smita Roy Trivedi</strong> (Senior Researcher at the National Institute of
            Bank Management) is closely guiding us and evaluating our model for its statistical
            efficacy.
          </p>
        </div>
      ),
    },
    {
      id: 'how-it-works',
      question: 'How does the PFI calculation work?',
      answer: (
        <div className="space-y-2">
          <p>
            The Pharma Foreboding Index (PFI) is calculated by analyzing text from multiple sources
            using custom dictionaries:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
            <li>Each document is scored based on foreboding vs. assurance word frequencies</li>
            <li>Documents within a category are weighted and aggregated</li>
            <li>Category scores are combined using adjustable weights</li>
            <li>The final PFI value ranges from 0 (stable) to 1 (critical)</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'workflow',
      question: 'What is the traditional workflow vs. PFI workflow?',
      answer: (
        <div className="space-y-2">
          <p>
            <strong className="text-cyan-400">Traditional Workflow:</strong> Risk managers read
            hundreds of documents → manually synthesize information → arrive at final analysis
          </p>
          <p className="mt-3">
            <strong className="text-cyan-400">PFI Workflow:</strong> Start with aggregated analysis
            → drill down into specific categories → investigate relevant documents only
          </p>
          <p className="mt-3 text-green-400">
            This inverts the research process, saving time and reducing information overload.
          </p>
        </div>
      ),
    },
    {
      id: 'dictionaries',
      question: 'Can I customize the analysis dictionaries?',
      answer: (
        <p>
          Yes! The platform provides four customizable dictionaries: Root Foreboding, Foreboding,
          Assurance, and Geopolitical. You can add or remove words to tailor the analysis to your
          specific research needs.
        </p>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Re-engineering Risk Analysis
            </h1>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
              This system transforms the workflow of Risk Managers and Portfolio Managers
            </p>
          </motion.div>
        </div>
      </div>

      {/* Workflow Comparison */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Traditional Workflow */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-red-400 mb-6">Traditional Workflow</h3>
            <div className="relative">
              {/* Chaotic Documents */}
              <div className="space-y-4 p-6 bg-gray-900/50 border border-red-500/30 rounded-lg">
                {[
                  { icon: FileText, label: 'Earnings Call', color: 'text-red-400' },
                  { icon: FileText, label: 'News Article', color: 'text-orange-400' },
                  { icon: FileText, label: 'Company Filing', color: 'text-yellow-400' },
                  { icon: FileText, label: 'Regulatory Doc', color: 'text-pink-400' },
                  { icon: FileText, label: 'More Docs...', color: 'text-purple-400' },
                ].map((doc, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className={`flex items-center gap-3 ${doc.color}`}
                  >
                    <doc.icon className="size-5" />
                    <span className="text-sm">{doc.label}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -right-4 top-1/2 -translate-y-1/2"
              >
                <ArrowRight className="size-8 text-red-400" />
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="p-6 bg-red-900/20 border border-red-500/30 rounded-lg text-center"
            >
              <Brain className="size-12 text-red-400 mx-auto mb-3" />
              <p className="text-sm text-gray-300">Manual Synthesis</p>
              <p className="text-xs text-gray-500 mt-1">Hours of reading & analysis</p>
            </motion.div>
          </motion.div>

          {/* PFI Workflow */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-green-400 mb-6">PFI Workflow</h3>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-green-900/20 border border-green-500/30 rounded-lg text-center"
            >
              <TrendingUp className="size-12 text-green-400 mx-auto mb-3" />
              <p className="font-bold text-xl text-green-400">Start Here</p>
              <p className="text-sm text-gray-300 mt-2">Aggregated PFI Score</p>
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <ArrowRight className="size-8 text-green-400 mx-auto rotate-90" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="p-6 bg-cyan-900/20 border border-cyan-500/30 rounded-lg"
            >
              <p className="text-sm text-center text-gray-300">Drill down only where needed</p>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {['Category A', 'Category B', 'Category C', 'Category D'].map((cat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + idx * 0.1 }}
                    className="text-xs p-2 bg-cyan-500/10 rounded text-center"
                  >
                    {cat}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-12 text-center"
        >
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white"
          >
            Get Started
            <ArrowRight className="ml-2 size-5" />
          </Button>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <Collapsible
              key={faq.id}
              open={openFaq === faq.id}
              onOpenChange={(open) => setOpenFaq(open ? faq.id : null)}
            >
              <div className="border border-cyan-500/30 rounded-lg overflow-hidden bg-gray-900/50">
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-6 hover:bg-cyan-500/5 transition-colors">
                    <h3 className="text-lg font-semibold text-left">{faq.question}</h3>
                    <ChevronDown
                      className={`size-5 text-cyan-400 transition-transform ${
                        openFaq === faq.id ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-6 pb-6 text-gray-300">{faq.answer}</div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-cyan-500/20 bg-gray-900/30 backdrop-blur-sm mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <CheckCircle2 className="size-4 text-green-400" />
            <span>Academically validated approach</span>
            <span className="mx-2">•</span>
            <span>Expert supervision by Dr. Smita Roy Trivedi</span>
          </div>
        </div>
      </div>
    </div>
  );
}
