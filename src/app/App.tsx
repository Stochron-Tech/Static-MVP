import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import PlatformOverview from './components/PlatformOverview';
import { InteractivePage } from './components/InteractivePage';
// FIX BELOW: Removed curly braces because it is a default export
import FinalAnalysis from './components/FinalAnalysis'; 

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="dark">
      <Routes>
        <Route path="/" element={<PlatformOverview />} />
        <Route 
          path="/interactive" 
          element={
            <InteractivePage 
              onGoToAnalysis={() => {
                console.log('Navigating to /analysis');
                navigate('/analysis');
              }} 
            />
          } 
        />
        <Route 
          path="/analysis" 
          element={
            <FinalAnalysis 
            // Note: We don't need stockSymbol/onBack if the component doesn't use them, 
            // but keeping them doesn't hurt.
            />
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}