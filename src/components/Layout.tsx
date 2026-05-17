import { Outlet, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Home, Search, PlusSquare, Heart, User, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../App';
import { mockCandidates } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import type { CandidateVerdict } from '../store';

export default function Layout() {
  const { officerName, verdicts, setVerdict } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [showAgentAlert, setShowAgentAlert] = useState(false);

  if (!officerName) {
    return <Navigate to="/login" replace />;
  }

  const allInvestigated = mockCandidates.every(c => verdicts[c.id]);

  const handleFinish = () => {
    navigate('/report');
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex pb-16 md:pb-0 md:pr-80">
      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around p-3 z-50">
        <button onClick={() => navigate('/feed')} className={`p-2 ${location.pathname === '/feed' ? 'font-bold' : ''}`}><Home /></button>
        <button className="p-2 text-gray-400"><Search /></button>
        <button className="p-2 text-gray-400"><PlusSquare /></button>
        <button className="p-2 text-gray-400"><Heart /></button>
        <button onClick={() => setShowAgentAlert(true)} className="p-2"><User /></button>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 max-w-xl mx-auto w-full bg-white min-h-screen border-x border-gray-200 relative pb-20">
        {/* Top Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 p-4 z-40 flex justify-between items-center">
          <h1 className="text-xl font-bold italic tracking-tighter cursor-pointer" onClick={() => navigate('/feed')}>ЖуликGram</h1>
          <div className="flex items-center gap-4 text-xs font-mono text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            ОКО-СБ АКТИВНО
          </div>
        </header>

        <main className="p-0">
          <Outlet />
        </main>
      </div>

      {/* Desktop Sidebar + Investigation Panel */}
      <div className="hidden md:flex flex-col w-80 bg-neutral-900 border-l border-neutral-800 text-neutral-200 fixed right-0 top-0 h-screen p-6 overflow-y-auto">
        <div className="pb-6 border-b border-neutral-800 mb-6">
          <div className="flex items-center gap-3 mb-2 text-green-500">
            <ShieldAlert className="w-6 h-6" />
            <h2 className="font-bold tracking-widest uppercase">Сводка СБ</h2>
          </div>
          <p className="text-neutral-400 text-sm">Сотрудник: <span className="text-white font-mono">{officerName}</span></p>
        </div>

        <div className="flex-1 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-4">Объекты проверки ({Object.keys(verdicts).length}/{mockCandidates.length})</h3>
          
          {mockCandidates.map(candidate => {
            const verdict = verdicts[candidate.id];
            return (
              <div key={candidate.id} className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
                <div className="flex items-center gap-3 mb-3 cursor-pointer hover:opacity-80" onClick={() => navigate(`/profile/${candidate.id}`)}>
                  <img src={candidate.avatarUrl} alt={candidate.username} className="w-10 h-10 rounded-full object-cover border border-neutral-600" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{candidate.fullName}</p>
                    <p className="text-xs text-neutral-400 truncate">@{candidate.username}</p>
                  </div>
                </div>
                
                {!verdict ? (
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <button onClick={() => setVerdict(candidate.id, 'CLEAN')} className="text-xs py-1.5 bg-green-900/30 text-green-400 rounded hover:bg-green-900/60 transition-colors">Чист</button>
                    <button onClick={() => setVerdict(candidate.id, 'SUSPICIOUS')} className="text-xs py-1.5 bg-yellow-900/30 text-yellow-400 rounded hover:bg-yellow-900/60 transition-colors">Подозрителен</button>
                    <button onClick={() => setVerdict(candidate.id, 'DANGEROUS')} className="text-xs py-1.5 bg-orange-900/30 text-orange-400 rounded hover:bg-orange-900/60 transition-colors">Опасен</button>
                    <button onClick={() => setVerdict(candidate.id, 'ARREST_ON_SIGHT')} className="text-xs py-1.5 bg-red-900/30 text-red-400 border border-red-900/50 rounded hover:bg-red-900/60 transition-colors font-bold">Взять</button>
                  </div>
                ) : (
                  <div className="mt-3 flex items-center gap-2 text-xs font-mono py-2 px-3 rounded bg-neutral-900 border border-neutral-700">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Вердикт: </span>
                    <span className={`font-bold ${
                      verdict === 'CLEAN' ? 'text-green-400' : 
                      verdict === 'SUSPICIOUS' ? 'text-yellow-400' : 
                      verdict === 'DANGEROUS' ? 'text-orange-400' : 'text-red-500 uppercase'
                    }`}>
                      {verdict}
                    </span>
                    <button onClick={() => setVerdict(candidate.id, undefined as any)} className="ml-auto text-neutral-500 hover:text-white underline text-[10px]">Изм</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {allInvestigated && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="mt-6 pt-6 border-t border-neutral-800"
          >
            <button 
              onClick={handleFinish}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded uppercase tracking-wider text-sm transition-colors shadow-[0_0_15px_rgba(37,99,235,0.4)]"
            >
              Сдать отчет руководству
            </button>
          </motion.div>
        )}
      </div>

      {allInvestigated && (
        <div className="md:hidden fixed bottom-16 left-0 w-full p-4 z-40 bg-gradient-to-t from-white via-white to-transparent">
          <button 
            onClick={handleFinish}
            className="w-full bg-blue-600 text-white font-bold py-3 pt-3 rounded-full uppercase tracking-wider text-sm shadow-lg border border-blue-500"
          >
            Сдать отчет руководству
          </button>
        </div>
      )}

      {/* Agent Secret Profile Alert Modal */}
      <AnimatePresence>
        {showAgentAlert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-neutral-900 border border-green-500/50 p-6 rounded-lg max-w-sm w-full shadow-[0_0_30px_rgba(34,197,94,0.15)]"
            >
              <div className="flex items-center gap-3 mb-4 text-red-500">
                <ShieldAlert className="w-8 h-8" />
                <h3 className="font-bold text-lg leading-tight uppercase">Доступ запрещен</h3>
              </div>
              <p className="text-green-500 font-mono text-sm mb-6">
                ОКО-СБ: Профиль действующего тайного агента строго засекречен. Попытка деанонимизации зафиксирована.
              </p>
              <button 
                onClick={() => setShowAgentAlert(false)}
                className="w-full bg-neutral-800 text-white border border-neutral-700 py-3 rounded font-bold hover:bg-neutral-700 hover:text-green-400 transition-colors"
              >
                Понял, продолжаю работу
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
