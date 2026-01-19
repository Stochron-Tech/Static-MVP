import { useState } from 'react';
import { PlatformOverview } from './components/PlatformOverview';
import { InteractivePage } from './components/InteractivePage';
import { FinalAnalysis } from './components/FinalAnalysis';

type Page = 'overview' | 'interactive' | 'analysis';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('overview');
  const [selectedStock] = useState('SUNPHARMA');

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return <PlatformOverview onGetStarted={() => setCurrentPage('interactive')} />;
      case 'interactive':
        return <InteractivePage onGoToAnalysis={() => setCurrentPage('analysis')} />;
      case 'analysis':
        return (
          <FinalAnalysis
            stockSymbol={selectedStock}
            onBack={() => setCurrentPage('interactive')}
          />
        );
      default:
        return <PlatformOverview onGetStarted={() => setCurrentPage('interactive')} />;
    }
  };

  return (
    <div className="dark">
      {renderPage()}
    </div>
  );
}
