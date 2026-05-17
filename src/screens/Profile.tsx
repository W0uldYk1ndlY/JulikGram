import { useParams, useNavigate } from 'react-router-dom';
import { mockCandidates } from '../data';
import { Grid, Bookmark, UserSquare, TerminalSquare, ShieldAlert, X } from 'lucide-react';
import { useAppContext } from '../App';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { verdicts, setVerdict } = useAppContext();
  const [showMobileVerdictMenu, setShowMobileVerdictMenu] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const candidate = mockCandidates.find(c => c.id === id);

  useEffect(() => {
    // scroll to top on profile load
    window.scrollTo(0, 0);
  }, [id]);

  const handleRunOSINT = () => {
    if (!candidate) return;
    setShowTerminal(true);
    setTerminalLines([]);
    
    // Animate lines appearing one by one
    candidate.osintInfo.forEach((line, index) => {
      setTimeout(() => {
        setTerminalLines(prev => [...prev, line]);
      }, (index + 1) * 800); // 800ms delay between lines
    });
  };

  if (!candidate) return <div className="p-8 text-center">Профиль закрыт или удален</div>;

  const currentVerdict = verdicts[candidate.id];

  return (
    <div className="bg-white min-h-screen" ref={containerRef}>
      {/* Profile Header */}
      <div className="p-4 flex items-center justify-between">
        <h2 className="font-bold text-lg">{candidate.username}</h2>
      </div>

      {/* Profile Info */}
      <div className="p-4 pb-0 flex items-center gap-6">
        <div className="relative">
          <img src={candidate.avatarUrl} alt="avatar" className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border border-gray-200" />
          {currentVerdict && (
            <div className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white
              ${currentVerdict === 'CLEAN' ? 'bg-green-500' : 
                currentVerdict === 'SUSPICIOUS' ? 'bg-yellow-500' : 
                currentVerdict === 'DANGEROUS' ? 'bg-orange-500' : 'bg-red-600'}
            `}>
              !
            </div>
          )}
        </div>
        
        <div className="flex-1 flex justify-around text-center">
          <div>
            <p className="font-bold text-lg">{candidate.posts.length}</p>
            <p className="text-sm text-gray-500">Публикаций</p>
          </div>
          <div>
            <p className="font-bold text-lg">
              {candidate.followers >= 1000 ? `${(candidate.followers/1000).toFixed(1)}k` : candidate.followers}
            </p>
            <p className="text-sm text-gray-500">Подписчиков</p>
          </div>
          <div>
            <p className="font-bold text-lg">{candidate.following}</p>
            <p className="text-sm text-gray-500">Подписок</p>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="p-4 pt-3">
        <p className="font-bold">{candidate.fullName}</p>
        <p className="text-sm text-gray-500 mb-1">Кандидат на: {candidate.appliedPosition}</p>
        <p className="text-sm whitespace-pre-wrap">{candidate.bio}</p>
        
        {/* OSINT Button */}
        <button 
          onClick={handleRunOSINT}
          className="mt-3 w-full bg-neutral-900 border border-green-500 text-green-400 font-mono text-sm uppercase tracking-wider py-2 rounded flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors shadow-[0_0_10px_rgba(34,197,94,0.1)] hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]"
        >
          <TerminalSquare className="w-4 h-4" />
          Пробить по базам данных
        </button>
      </div>

      {/* Terminal Modal */}
      <AnimatePresence>
        {showTerminal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-black border border-green-500/50 rounded-lg max-w-lg w-full overflow-hidden shadow-[0_0_30px_rgba(34,197,94,0.2)]"
            >
              <div className="bg-neutral-900 border-b border-green-500/30 p-3 flex justify-between items-center text-green-500 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Терминал ОКО-СБ :: ЗАПРОС К ЗАКРЫТЫМ БД</span>
                </div>
                <button onClick={() => setShowTerminal(false)} className="hover:text-red-500 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-4 h-64 overflow-y-auto font-mono text-sm bg-black text-green-400 space-y-2">
                <p className="opacity-50">Выполняется защищенное соединение...</p>
                <p className="opacity-50">Поиск тов. {candidate.fullName} по СНИЛС/ИНН...</p>
                <div className="mt-4 space-y-2">
                  {terminalLines.map((line, idx) => (
                    <motion.p 
                      key={idx}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={line.startsWith('>') ? 'text-green-500 font-bold mt-4' : 'text-green-200 pl-4 border-l-2 border-green-900'}
                    >
                      {line}
                    </motion.p>
                  ))}
                  {terminalLines.length < candidate.osintInfo.length && (
                    <span className="inline-block w-2 h-4 bg-green-500 animate-pulse ml-1 mt-2"></span>
                  )}
                </div>
              </div>
              
              {terminalLines.length === candidate.osintInfo.length && (
                <div className="p-3 bg-neutral-900 border-t border-green-500/30">
                  <button 
                    onClick={() => setShowTerminal(false)}
                    className="w-full bg-green-500/10 text-green-500 border border-green-500 py-2 rounded font-mono text-sm hover:bg-green-500 hover:text-black transition-all uppercase"
                  >
                    Анализ завершен. Закрыть.
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Investigation Panel (visible only on mobile) */}
      <div className="md:hidden px-4 mb-4">
        {!currentVerdict ? (
          <div>
            <button 
              onClick={() => setShowMobileVerdictMenu(!showMobileVerdictMenu)}
              className="w-full bg-red-50 text-red-600 font-bold border border-red-200 rounded p-2 text-sm text-center font-mono"
            >
              ВЫНЕСТИ ВЕРДИКТ СБ
            </button>

            {showMobileVerdictMenu && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                <button onClick={() => { setVerdict(candidate.id, 'CLEAN'); setShowMobileVerdictMenu(false); }} className="text-xs p-2 bg-green-100 text-green-700 rounded border border-green-200 font-bold">Чист</button>
                <button onClick={() => { setVerdict(candidate.id, 'SUSPICIOUS'); setShowMobileVerdictMenu(false); }} className="text-xs p-2 bg-yellow-100 text-yellow-700 rounded border border-yellow-200 font-bold">Подозрителен</button>
                <button onClick={() => { setVerdict(candidate.id, 'DANGEROUS'); setShowMobileVerdictMenu(false); }} className="text-xs p-2 bg-orange-100 text-orange-700 rounded border border-orange-200 font-bold">Опасен</button>
                <button onClick={() => { setVerdict(candidate.id, 'ARREST_ON_SIGHT'); setShowMobileVerdictMenu(false); }} className="text-xs p-2 bg-red-100 text-red-700 rounded border border-red-200 font-bold uppercase">Взять</button>
              </div>
            )}
          </div>
        ) : (
          <div className="p-3 rounded border font-mono text-sm bg-gray-50 flex justify-between items-center">
            <span>ВЕРДИКТ: <span className="font-bold text-black">{currentVerdict}</span></span>
            <button onClick={() => setVerdict(candidate.id, undefined as any)} className="text-gray-400 text-xs underline">Изм.</button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-t border-gray-200">
        <div className="flex-1 py-3 flex justify-center border-t-2 border-black -mt-[1px]">
          <Grid className="w-6 h-6" />
        </div>
        <div className="flex-1 py-3 flex justify-center text-gray-400">
          <Bookmark className="w-6 h-6" />
        </div>
        <div className="flex-1 py-3 flex justify-center text-gray-400">
          <UserSquare className="w-6 h-6" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-0.5">
        {candidate.posts.map(post => (
          <div key={post.id} className="aspect-square bg-gray-100 cursor-pointer" onClick={() => navigate('/feed')}>
            <img src={post.imageUrl} alt="post" className="w-full h-full object-cover" />
          </div>
        ))}
        {/* Fill empty spots to make it look like a real profile */}
        <div className="aspect-square bg-gray-100 flex items-center justify-center text-gray-400 text-xs">Нет фото</div>
      </div>
    </div>
  );
}
