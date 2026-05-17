import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { ShieldAlert, Terminal, Fingerprint, CheckSquare, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CAPTCHA_QUESTIONS = [
  {
    q: 'Если коллега принес "в знак благодарности" бутылку коньяка за 150 000 руб, это:',
    options: ['Подарок', 'Удачный день', 'Взятка (Срочно изъять)', 'Повод выпить'],
    correct: 2
  },
  {
    q: 'Подрядчик предлагает "обсудить смету в сауне". Ваши действия?',
    options: ['Взять веник', 'Сказать, что у меня аллергия', 'Вызвать ОМОН в сауну', 'Попросить скидку 50%'],
    correct: 2
  },
  {
    q: 'Как надежно удалить файл с сервера?',
    options: ['В корзину', 'Shift + Delete', 'Удалить жесткий диск молотком', 'Форматировать'],
    correct: 2
  }
];

export default function Login() {
  const [name, setName] = useState('');
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaStep, setCaptchaStep] = useState(0);
  const [captchaError, setCaptchaError] = useState(false);
  
  const { setOfficerName } = useAppContext();
  const navigate = useNavigate();

  const handleInitialFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setShowCaptcha(true);
      setCaptchaStep(0);
      setCaptchaError(false);
    }
  };

  const handleCaptchaClick = (ansIdx: number) => {
    if (ansIdx === CAPTCHA_QUESTIONS[captchaStep].correct) {
      if (captchaStep < CAPTCHA_QUESTIONS.length - 1) {
        setCaptchaStep(prev => prev + 1);
        setCaptchaError(false);
      } else {
        // Passed!
        setOfficerName(name.trim());
        navigate('/feed');
      }
    } else {
      setCaptchaError(true);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 text-green-500 font-mono relative overflow-hidden">
      {/* Background Matrix-like effect could go here */}
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-black border border-green-500/30 p-8 rounded-lg shadow-[0_0_50px_rgba(34,197,94,0.1)] relative overflow-hidden z-10"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-green-500/20 shadow-[0_0_10px_#22c55e]"></div>
        
        <div className="flex flex-col items-center justify-center mb-8 gap-4">
          <ShieldAlert className="w-16 h-16 text-green-500 mb-2" />
          <h1 className="text-2xl text-center font-bold tracking-widest uppercase">Система ОКО-СБ</h1>
          <p className="text-center text-green-500/60 text-sm mt-2">
            Доступ только для авторизованных сотрудников управления собственной безопасности.
          </p>
        </div>

        {!showCaptcha ? (
          <form onSubmit={handleInitialFormSubmit} className="space-y-6">
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
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h2 className="text-lg font-bold text-white mb-2">КАПЧА ДЛЯ СБ</h2>
              <p className="text-xs text-green-400">Докажите, что вы настоящий безопасник, а не шпион.</p>
            </div>
            
            <div className="bg-neutral-900 p-4 rounded border border-green-500/30">
              <p className="text-sm text-white mb-4">Вопрос {captchaStep + 1} / {CAPTCHA_QUESTIONS.length}:</p>
              <p className="text-md font-bold mb-6 text-green-300">{CAPTCHA_QUESTIONS[captchaStep].q}</p>
              
              <div className="space-y-2">
                {CAPTCHA_QUESTIONS[captchaStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCaptchaClick(idx)}
                    className="w-full text-left p-3 text-sm bg-black border border-green-500/20 rounded hover:bg-green-900/40 hover:border-green-500 transition-colors flex items-center gap-2"
                  >
                    <Square className="w-4 h-4 text-green-700" />
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            </div>

            {captchaError && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs text-center font-bold">
                НЕВЕРНО! Попахивает соучастием. Попробуйте еще раз!
              </motion.p>
            )}
            
            <button
              onClick={() => setShowCaptcha(false)}
              className="w-full text-xs text-green-600 hover:text-green-400 mt-4 text-center"
            >
              Отмена авторизации
            </button>
          </motion.div>
        )}

        <div className="mt-8 pt-4 border-t border-green-500/20 text-center text-xs text-green-800">
          С днем рождения! Надеемся, сегодня обойдется без нарушителей.
        </div>
      </motion.div>
    </div>
  );
}
