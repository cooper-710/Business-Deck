import { Hero } from './components/Hero';
import { TheSystem } from './components/TheSystem';
import { Precision } from './components/Precision';
import { InStadium } from './components/InStadium';
import { CrossSport } from './components/CrossSport';
import { UnifiedSystem } from './components/UnifiedSystem';
import { UnifiedInterface } from './components/UnifiedInterface';
import { MLBGrowth } from './components/MLBGrowth';
import { StrategicPosition } from './components/StrategicPosition';
import { YouthSportsMarket } from './components/YouthSportsMarket';
import { SportLogos } from './components/SportLogos';
import { SportsBillionKicker } from './components/SportsBillionKicker';
import { CashFlowEntry } from './components/CashFlowEntry';
import { FutureState } from './components/FutureState';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/fb1a77d5-7e84-4ece-9db6-a8678e2655a7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:13',message:'App component rendered',data:{timestamp:Date.now()},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
  // #endregion
  return (
    <div className="bg-white text-black">
      <CustomCursor />
      <Hero />
      <TheSystem />
      <Precision />
      <InStadium />
      <UnifiedInterface />
      <UnifiedSystem />
      <CrossSport />
      <MLBGrowth />
      <SportLogos />
      <SportsBillionKicker />
      <YouthSportsMarket />
      <StrategicPosition />
      <CashFlowEntry />
      <FutureState />
    </div>
  );
}
