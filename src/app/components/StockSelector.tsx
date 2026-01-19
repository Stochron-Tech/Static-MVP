import { useState } from 'react';
import { ChevronDown, ChevronRight, TrendingUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { ScrollArea } from './ui/scroll-area';

interface Stock {
  symbol: string;
  name: string;
}

interface Sector {
  name: string;
  stocks: Stock[];
}

const INDIAN_SECTORS: Sector[] = [
  {
    name: 'Pharmaceuticals',
    stocks: [
      { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical' },
      { symbol: 'DRREDDY', name: 'Dr. Reddy\'s Laboratories' },
      { symbol: 'CIPLA', name: 'Cipla' },
      { symbol: 'DIVISLAB', name: 'Divi\'s Laboratories' },
      { symbol: 'BIOCON', name: 'Biocon' },
      { symbol: 'AUROPHARMA', name: 'Aurobindo Pharma' },
      { symbol: 'LUPIN', name: 'Lupin' },
      { symbol: 'TORNTPHARM', name: 'Torrent Pharmaceuticals' },
    ],
  },
  {
    name: 'IT Services',
    stocks: [
      { symbol: 'TCS', name: 'Tata Consultancy Services' },
      { symbol: 'INFY', name: 'Infosys' },
      { symbol: 'WIPRO', name: 'Wipro' },
      { symbol: 'HCLTECH', name: 'HCL Technologies' },
      { symbol: 'TECHM', name: 'Tech Mahindra' },
    ],
  },
  {
    name: 'Banking',
    stocks: [
      { symbol: 'HDFCBANK', name: 'HDFC Bank' },
      { symbol: 'ICICIBANK', name: 'ICICI Bank' },
      { symbol: 'SBIN', name: 'State Bank of India' },
      { symbol: 'AXISBANK', name: 'Axis Bank' },
      { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank' },
    ],
  },
  {
    name: 'Automobiles',
    stocks: [
      { symbol: 'MARUTI', name: 'Maruti Suzuki' },
      { symbol: 'TATAMOTORS', name: 'Tata Motors' },
      { symbol: 'M&M', name: 'Mahindra & Mahindra' },
      { symbol: 'BAJAJ-AUTO', name: 'Bajaj Auto' },
      { symbol: 'HEROMOTOCO', name: 'Hero MotoCorp' },
    ],
  },
  {
    name: 'FMCG',
    stocks: [
      { symbol: 'HINDUNILVR', name: 'Hindustan Unilever' },
      { symbol: 'ITC', name: 'ITC' },
      { symbol: 'NESTLEIND', name: 'Nestle India' },
      { symbol: 'BRITANNIA', name: 'Britannia Industries' },
      { symbol: 'DABUR', name: 'Dabur India' },
    ],
  },
];

interface StockSelectorProps {
  selectedStock: Stock | null;
  onSelectStock: (stock: Stock) => void;
}

export function StockSelector({ selectedStock, onSelectStock }: StockSelectorProps) {
  const [expandedSector, setExpandedSector] = useState<string | null>('Pharmaceuticals');

  return (
    <div className="h-full bg-gray-900/50 border border-cyan-500/30 rounded-lg overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-b border-cyan-500/30">
        <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
          <TrendingUp className="size-5" />
          Select Stock
        </h3>
        {selectedStock && (
          <div className="mt-2 text-sm text-gray-300">
            Selected: <span className="text-white font-semibold">{selectedStock.symbol}</span>
          </div>
        )}
      </div>

      <ScrollArea className="h-[calc(100%-5rem)]">
        <div className="p-2 space-y-1">
          {INDIAN_SECTORS.map((sector) => (
            <Collapsible
              key={sector.name}
              open={expandedSector === sector.name}
              onOpenChange={(open) => setExpandedSector(open ? sector.name : null)}
            >
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between p-3 hover:bg-cyan-500/10 rounded-lg transition-colors">
                  <span className="font-medium text-gray-200">{sector.name}</span>
                  {expandedSector === sector.name ? (
                    <ChevronDown className="size-4 text-cyan-400" />
                  ) : (
                    <ChevronRight className="size-4 text-cyan-400" />
                  )}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="ml-4 space-y-1">
                  {sector.stocks.map((stock) => (
                    <button
                      key={stock.symbol}
                      onClick={() => onSelectStock(stock)}
                      className={`w-full text-left p-2 rounded text-sm transition-colors ${
                        selectedStock?.symbol === stock.symbol
                          ? 'bg-cyan-600 text-white'
                          : 'text-gray-300 hover:bg-cyan-500/10'
                      }`}
                    >
                      <div className="font-medium">{stock.symbol}</div>
                      <div className="text-xs opacity-75">{stock.name}</div>
                    </button>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
