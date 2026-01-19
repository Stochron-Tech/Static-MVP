import { useState } from 'react';
import { NetworkGraph } from './NetworkGraph';
import { StockSelector } from './StockSelector';
import { DictionaryEditor } from './DictionaryEditor';
import { Button } from './ui/button';
import { Calendar, Save, RefreshCw, BarChart3 } from 'lucide-react';

interface Stock {
  symbol: string;
  name: string;
}

interface InteractivePageProps {
  onGoToAnalysis: () => void;
}

export function InteractivePage({ onGoToAnalysis }: InteractivePageProps) {
  const [selectedStock, setSelectedStock] = useState<Stock | null>({
    symbol: 'SUNPHARMA',
    name: 'Sun Pharmaceutical',
  });
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [savedDate, setSavedDate] = useState<Date | null>(null);

  const handleUpdate = () => {
    setLastUpdated(new Date());
  };

  const handleSave = () => {
    setSavedDate(new Date());
  };

  const handleDictionaryUpdate = (dictionaries: any) => {
    console.log('Dictionaries updated:', dictionaries);
    // Process dictionary update
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      {/* Header */}
      <div className="border-b border-cyan-500/30 bg-gray-900/50 backdrop-blur-sm">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Pharma Foreboding Index - Interactive Network
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Stock Selector */}
        <div className="w-80 border-r border-cyan-500/30 p-4 overflow-auto">
          <StockSelector
            selectedStock={selectedStock}
            onSelectStock={setSelectedStock}
          />
        </div>

        {/* Center - Network Graph */}
        <div className="flex-1 relative">
          <NetworkGraph />
        </div>

        {/* Right Sidebar - Dictionary Editor */}
        <div className="w-96 border-l border-cyan-500/30 p-4 overflow-auto">
          <DictionaryEditor onUpdate={handleDictionaryUpdate} />
        </div>
      </div>

      {/* Bottom Control Bar */}
      <div className="border-t border-cyan-500/30 bg-gray-900/50 backdrop-blur-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="size-4" />
              <span>Last Updated:</span>
              <span className="text-white font-semibold">
                {lastUpdated.toLocaleString('en-IN', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>

            {selectedStock && (
              <div className="flex items-center gap-2 text-gray-400">
                <span>Stock:</span>
                <span className="text-cyan-400 font-semibold">{selectedStock.symbol}</span>
              </div>
            )}

            {savedDate && (
              <div className="flex items-center gap-2 text-green-400 text-xs">
                <Save className="size-3" />
                <span>Saved: {savedDate.toLocaleTimeString('en-IN')}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleUpdate}
              variant="outline"
              className="border-cyan-500/30 hover:bg-cyan-500/10"
            >
              <RefreshCw className="size-4 mr-2" />
              UPDATE
            </Button>

            <Button
              onClick={handleSave}
              variant="outline"
              className="border-green-500/30 hover:bg-green-500/10 text-green-400"
            >
              <Save className="size-4 mr-2" />
              SAVE
            </Button>

            <Button
              onClick={onGoToAnalysis}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
            >
              <BarChart3 className="size-4 mr-2" />
              GO TO FINAL ANALYSIS
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
