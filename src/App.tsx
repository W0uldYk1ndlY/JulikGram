import { useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { mockCandidates } from './data';
import type { CandidateVerdict } from './store';
import { Shield, ShieldAlert } from 'lucide-react';
import Feed from './screens/Feed';
import Profile from './screens/Profile';
import Login from './screens/Login';
import FinalReport from './screens/FinalReport';
import Layout from './components/Layout';

interface AppContextType {
  officerName: string;
  setOfficerName: (name: string) => void;
  verdicts: Record<string, CandidateVerdict>;
  setVerdict: (candidateId: string, verdict: CandidateVerdict) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

export default function App() {
  const [officerName, setOfficerName] = useState('');
  const [verdicts, setVerdicts] = useState<Record<string, CandidateVerdict>>({});

  const setVerdict = (candidateId: string, verdict: CandidateVerdict) => {
    setVerdicts(prev => ({ ...prev, [candidateId]: verdict }));
  };

  return (
    <AppContext.Provider value={{ officerName, setOfficerName, verdicts, setVerdict }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/feed" replace />} />
            <Route path="feed" element={<Feed />} />
            <Route path="profile/:id" element={<Profile />} />
          </Route>

          <Route path="/report" element={<FinalReport />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}
