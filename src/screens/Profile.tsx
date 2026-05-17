import { useParams, useNavigate } from 'react-router-dom';
import { mockCandidates } from '../data';
import { Grid, Bookmark, UserSquare, TerminalSquare, ShieldAlert, X, MessageCircleWarning, Flame, ShoppingCart, Mic, Search, MapPin, Headphones } from 'lucide-react';
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
  const [showDms, setShowDms] = useState(false);
  const [showDating, setShowDating] = useState(false);
  const [showPurchases, setShowPurchases] = useState(false);
  const [showSmartHome, setShowSmartHome] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showGeo, setShowGeo] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

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
        
        <div className="flex flex-col gap-2 mt-3">
          {/* OSINT Button */}
          <button 
            onClick={handleRunOSINT}
            className="w-full bg-neutral-900 border border-green-500 text-green-400 font-mono text-sm uppercase tracking-wider py-2 rounded flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors shadow-[0_0_10px_rgba(34,197,94,0.1)] hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]"
          >
            <TerminalSquare className="w-4 h-4" />
            Пробить по базам данных
          </button>
          
          {/* Detailed Intercepts Grid */}
          <div className="grid grid-cols-2 gap-2">
            {/* DMs Intercept Button */}
            <button 
              onClick={() => setShowDms(true)}
              className="bg-blue-50 border border-blue-500 text-blue-600 font-mono text-xs uppercase tracking-tight py-2 px-1 rounded flex items-center justify-center gap-1 hover:bg-blue-100 transition-colors shadow-[0_0_10px_rgba(59,130,246,0.1)]"
            >
              <MessageCircleWarning className="w-3.5 h-3.5 shrink-0" />
              <span>Директ</span>
            </button>

            {/* Dating Profile (Tinder/VK) Intercept */}
            <button 
              onClick={() => setShowDating(true)}
              className="bg-pink-50 border border-pink-500 text-pink-600 font-mono text-xs uppercase tracking-tight py-2 px-1 rounded flex items-center justify-center gap-1 hover:bg-pink-100 transition-colors shadow-[0_0_10px_rgba(236,72,153,0.1)]"
            >
              <Flame className="w-3.5 h-3.5 shrink-0" />
              <span>Тайный дейтинг</span>
            </button>

            {/* Purchases Intercept */}
            <button 
              onClick={() => setShowPurchases(true)}
              className="bg-purple-50 border border-purple-500 text-purple-600 font-mono text-xs uppercase tracking-tight py-2 px-1 rounded flex items-center justify-center gap-1 hover:bg-purple-100 transition-colors shadow-[0_0_10px_rgba(168,85,247,0.1)]"
            >
              <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
              <span>Корзина Ozon</span>
            </button>
            
            {/* Geolocation Intercept */}
            <button 
              onClick={() => setShowGeo(true)}
              className="bg-emerald-50 border border-emerald-500 text-emerald-600 font-mono text-xs uppercase tracking-tight py-2 px-1 rounded flex items-center justify-center gap-1 hover:bg-emerald-100 transition-colors shadow-[0_0_10px_rgba(16,185,129,0.1)]"
            >
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>Спутниковый трекинг</span>
            </button>

            {/* Audio Transcript Intercept */}
            <button 
              onClick={() => setShowTranscript(true)}
              className="bg-indigo-50 border border-indigo-500 text-indigo-600 font-mono text-xs uppercase tracking-tight py-2 px-1 rounded flex items-center justify-center gap-1 hover:bg-indigo-100 transition-colors shadow-[0_0_10px_rgba(99,102,241,0.1)]"
            >
              <Headphones className="w-3.5 h-3.5 shrink-0" />
              <span>Прослушка связи</span>
            </button>
            
            {/* Smart Home Wiretap */}
            <button 
              onClick={() => setShowSmartHome(true)}
              className="bg-orange-50 border border-orange-500 text-orange-600 font-mono text-xs uppercase tracking-tight py-2 px-1 rounded flex items-center justify-center gap-1 hover:bg-orange-100 transition-colors shadow-[0_0_10px_rgba(249,115,22,0.1)]"
            >
              <Mic className="w-3.5 h-3.5 shrink-0" />
              <span>Умная колонка</span>
            </button>

            {/* Browser History */}
            <button 
              onClick={() => setShowSearch(true)}
              className="col-span-2 bg-gray-50 border border-gray-500 text-gray-700 font-mono text-xs uppercase tracking-tight py-2 px-1 rounded flex items-center justify-center gap-1 hover:bg-gray-200 transition-colors"
            >
              <Search className="w-3.5 h-3.5 shrink-0" />
              <span>Удаленная история браузера</span>
            </button>
          </div>
        </div>
      </div>

      {/* DMs Modal */}
      <AnimatePresence>
        {showDms && candidate.dms && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-xl max-w-md w-full overflow-hidden flex flex-col h-[80vh] md:h-[600px] shadow-2xl"
            >
              {/* Header */}
              <div className="bg-gray-100 border-b border-gray-200 p-3 flex justify-between items-center z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                    {candidate.dms.contactName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm leading-tight text-gray-900">{candidate.dms.contactName}</h3>
                    <p className="text-xs text-gray-500">Был(а) недавно</p>
                  </div>
                </div>
                <button onClick={() => setShowDms(false)} className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors">
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              {/* Messages Area */}
              <div className="p-4 flex-1 overflow-y-auto bg-[#e5ddd5] flex flex-col gap-3 relative">
                {/* Background Pattern Mock */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
                
                <div className="bg-yellow-100 text-yellow-800 text-[10px] text-center py-1 px-4 rounded md:mx-10 uppercase tracking-widest font-mono opacity-80 z-10 relative">
                  Сообщения перехвачены сервером ОКО-СБ
                </div>
                
                <div className="text-center text-xs text-gray-500 my-2">Сегодня</div>

                {candidate.dms.messages.map((msg) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg.id} 
                    className={`max-w-[80%] flex flex-col relative z-10 ${msg.isOutgoing ? 'self-end' : 'self-start'}`}
                  >
                    <div className={`p-3 text-sm shadow-sm
                      ${msg.isOutgoing 
                        ? 'bg-[#dcf8c6] text-gray-900 rounded-tl-xl rounded-b-xl' 
                        : 'bg-white text-gray-900 rounded-tr-xl rounded-b-xl'
                      }
                    `}>
                      {msg.text}
                    </div>
                    <span className={`text-[10px] text-gray-500 mt-1 ${msg.isOutgoing ? 'text-right' : 'text-left'}`}>
                      {msg.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDating && candidate.datingProfile && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="bg-gradient-to-br from-pink-500 to-orange-400 rounded-xl max-w-sm w-full overflow-hidden shadow-2xl pb-4">
              <div className="bg-black/20 p-3 flex justify-between items-center text-white backdrop-blur flex-shrink-0">
                <div className="font-bold flex items-center gap-2"><Flame className="w-5 h-5 text-white" /> {candidate.datingProfile.appName} (Перехват)</div>
                <button onClick={() => setShowDating(false)} className="hover:text-pink-200 transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="bg-white m-4 rounded-xl overflow-hidden shadow-lg">
                <div className="bg-gray-200 aspect-[3/4] relative">
                  <img src={candidate.avatarUrl} className="w-full h-full object-cover" alt="dating" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pb-2 pt-12">
                    <h3 className="text-white font-bold text-2xl">{candidate.datingProfile.name}, {candidate.datingProfile.age}</h3>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <div className="text-xs uppercase tracking-widest text-pink-500 font-bold mb-1">О себе</div>
                  <p className="text-gray-800 text-sm">{candidate.datingProfile.bio}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {showPurchases && candidate.purchases && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="bg-white rounded-xl max-w-sm w-full overflow-hidden shadow-2xl flex flex-col h-[60vh] max-h-[500px]">
              <div className="bg-purple-600 p-3 flex justify-between items-center text-white">
                <div className="font-bold flex items-center gap-2 border-b-0"><ShoppingCart className="w-5 h-5" /> Корзина: {candidate.purchases.store}</div>
                <button onClick={() => setShowPurchases(false)} className="hover:bg-purple-700 p-1 rounded transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-4 flex-1 overflow-y-auto bg-gray-50 flex flex-col gap-3">
                <div className="bg-yellow-100 text-yellow-800 text-xs text-center border-l-4 border-yellow-500 p-2 font-mono">
                  Слепок данных получен из кеша приложения
                </div>
                {candidate.purchases.items.map((item, i) => (
                  <div key={i} className="bg-white p-3 border border-gray-200 rounded shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded flex items-center justify-center text-purple-600 font-bold">{i+1}</div>
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {showSmartHome && candidate.smartHomeRecords && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="bg-neutral-900 border border-neutral-700 rounded-xl max-w-md w-full overflow-hidden shadow-2xl">
              <div className="bg-neutral-800 p-3 flex justify-between items-center text-orange-500 font-mono border-b border-neutral-700">
                <div className="font-bold flex items-center gap-2"><Mic className="w-5 h-5" /> АУДИОПЕРЕХВАТ IOT</div>
                <button onClick={() => setShowSmartHome(false)} className="hover:text-white transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-4 bg-black text-orange-200 space-y-4 font-mono text-sm">
                <div className="flex items-center gap-2 text-xs text-neutral-500 mb-4 animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div> Расшифровка голосовых команд...
                </div>
                {candidate.smartHomeRecords.map((rec, i) => (
                  <div key={i} className="border-l-2 border-orange-500 pl-3">
                    <div className="text-xs text-neutral-500 mb-1">{rec.time} | [{rec.device}]</div>
                    <p>"{rec.command}"</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {showSearch && candidate.searchHistory && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="bg-white border rounded-xl max-w-md w-full overflow-hidden shadow-2xl">
              <div className="bg-gray-100 p-3 flex justify-between items-center border-b font-mono text-xs text-gray-700">
                <div className="font-bold flex items-center gap-2"><Search className="w-4 h-4" /> ИСТОРИЯ ПОИСКА (УДАЛЕННОЕ)</div>
                <button onClick={() => setShowSearch(false)} className="hover:bg-gray-200 p-1 rounded transition-colors"><X className="w-4 h-4" /></button>
              </div>
              <div className="p-0">
                {candidate.searchHistory.map((query, i) => (
                  <div key={i} className="border-b border-gray-100 p-3 hover:bg-gray-50 flex items-center gap-3">
                    <Search className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-800">{query}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {showGeo && candidate.geolocation && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="bg-neutral-900 rounded-xl max-w-md w-full overflow-hidden shadow-2xl border border-emerald-500/50">
              <div className="bg-emerald-900 border-b border-emerald-500 p-3 flex justify-between items-center text-emerald-300 font-mono">
                <div className="font-bold flex items-center gap-2"><MapPin className="w-5 h-5" /> КООРДИНАТЫ: {candidate.geolocation.lat.toFixed(4)}, {candidate.geolocation.lng.toFixed(4)}</div>
                <button onClick={() => setShowGeo(false)} className="hover:text-white transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="relative aspect-video w-full bg-black">
                <img src={candidate.geolocation.mapImageUrl} className="w-full h-full object-cover opacity-70" alt="map" />
                <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border-2 border-emerald-500 flex items-center justify-center relative overflow-hidden bg-black/50 shadow-[0_0_15px_#10b981]">
                     <img src={candidate.avatarUrl} className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-2 bg-emerald-900 border border-emerald-500 text-emerald-300 text-xs px-2 py-1 rounded shadow-lg">TARGET LOCKED</div>
                </div>
              </div>
              <div className="p-4 bg-black font-mono">
                <p className="text-emerald-500 text-xs uppercase mb-1">Распознанная локация:</p>
                <p className="text-white text-sm">{candidate.geolocation.placeName}</p>
              </div>
            </motion.div>
          </div>
        )}

        {showTranscript && candidate.callTranscript && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="bg-slate-900 rounded-xl max-w-md w-full overflow-hidden shadow-2xl border border-indigo-500/50">
              <div className="bg-indigo-900 border-b border-indigo-500 p-3 flex justify-between items-center text-indigo-300 font-mono text-xs">
                <div className="font-bold flex items-center gap-2"><Headphones className="w-5 h-5 animate-pulse text-indigo-400" /> ПРОСЛУШКА</div>
                <div className="text-indigo-200">ID: {Math.floor(Math.random() * 100000)}</div>
                <button onClick={() => setShowTranscript(false)} className="hover:text-white transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-4 bg-slate-800 text-slate-300 space-y-4 font-mono text-sm border-b border-slate-700">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-500 text-xs">ВХОД:</p>
                    <p className="font-bold text-indigo-400 truncate">{candidate.callTranscript.caller}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">ИСХОД:</p>
                    <p className="font-bold text-indigo-400 truncate">{candidate.callTranscript.receiver}</p>
                  </div>
                </div>
                <div>
                   <p className="text-slate-500 text-xs">ВРЕМЯ:</p>
                   <p>{candidate.callTranscript.duration}</p>
                </div>
              </div>
              <div className="p-4 bg-black font-mono text-xs max-h-60 overflow-y-auto space-y-3">
                {candidate.callTranscript.text.map((line, idx) => (
                  <p key={idx} className={line.includes(candidate.callTranscript!.caller) ? "text-slate-400" : "text-indigo-300"}>
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
