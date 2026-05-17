import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { ShieldAlert, Terminal, Fingerprint } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const [name, setName] = useState('');
  const { setOfficerName } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setOfficerName(name.trim());
      navigate('/feed');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 text-green-500 font-mono">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-black border border-green-500/30 p-8 rounded-lg shadow-[0_0_50px_rgba(34,197,94,0.1)] relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-green-500/20 shadow-[0_0_10px_#22c55e]"></div>
        
        <div className="flex flex-col items-center justify-center mb-8 gap-4">
          <ShieldAlert className="w-16 h-16 text-green-500 mb-2" />
          <h1 className="text-2xl text-center font-bold tracking-widest uppercase">Система ОКО-СБ</h1>
          <p className="text-center text-green-500/60 text-sm mt-2">
            Доступ только для авторизованных сотрудников управления собственной безопасности.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-green-500/80 flex items-center gap-2">
              <Terminal className="w-4 h-4" /> Идентификатор сотрудника
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите позывной (имя)..."
              className="w-full bg-neutral-900 border border-green-500/50 p-3 rounded text-green-400 placeholder:text-green-800 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all font-mono"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-green-500/10 border border-green-500 text-green-500 p-4 rounded uppercase tracking-widest font-bold hover:bg-green-500 hover:text-black transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:bg-green-500/10 disabled:hover:text-green-500 disabled:cursor-not-allowed group"
          >
            <Fingerprint className="w-6 h-6 group-hover:scale-110 transition-transform" />
            Авторизация
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-green-500/20 text-center text-xs text-green-800">
          С днем рождения! Надеемся, сегодня обойдется без нарушителей.
        </div>
      </motion.div>
    </div>
  );
}
