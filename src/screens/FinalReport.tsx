import { useAppContext } from '../App';
import { Navigate, useNavigate } from 'react-router-dom';
import { ShieldCheck, CalendarHeart, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { mockCandidates } from '../data';

export default function FinalReport() {
  const { officerName, verdicts } = useAppContext();
  const navigate = useNavigate();

  if (!officerName) {
    return <Navigate to="/login" replace />;
  }

  // Count exactly how many were judged properly
  const isComplete = mockCandidates.every(c => verdicts[c.id]);

  if (!isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white p-4 text-center">
        <div>
          <h1 className="text-2xl font-bold mb-4 text-red-500">ОШИБКА 403</h1>
          <p>Сотрудник {officerName}, отчет не готов. Нужно вынести вердикт всем кандидатам.</p>
          <button onClick={() => navigate('/feed')} className="mt-6 border border-white px-4 py-2 rounded">Вернуться</button>
        </div>
      </div>
    );
  }

  // Count arrests and dangerous verdicts
  let score = 0;
  if (verdicts['1'] !== 'CLEAN') score++;
  if (verdicts['2'] === 'ARREST_ON_SIGHT' || verdicts['2'] === 'DANGEROUS') score++;
  if (verdicts['3'] !== 'CLEAN') score++;
  if (verdicts['4'] !== 'CLEAN') score++;

  let ratingText = '';
  if (score === 4) ratingText = 'Абсолютный профессионал! Муха не пролетит, мышь не проскочит.';
  else if (score >= 2) ratingText = 'Отличная работа, но пару жуликов вы всё-таки упустили.';
  else ratingText = 'Кажется, вы слишком добры к мошенникам. Нужно быть жестче!';

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-4 flex flex-col items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-neutral-950 border-2 border-green-500 rounded p-8 shadow-[0_0_30px_rgba(34,197,94,0.3)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <ShieldCheck className="w-48 h-48" />
        </div>

        <div className="relative z-10">
          <div className="flex border-b border-green-500 pb-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold uppercase tracking-widest text-green-400">СЕКРЕТНЫЙ РАПОРТ № 42-А</h1>
              <p className="text-green-600 mt-2">Департамент: Подразделение ОКО-СБ</p>
              <p className="text-green-600">Составитель: {officerName}</p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-bold text-white mb-4 shadow-[bg-green-500]">ИТОГИ ПРОВЕРКИ И ВЕРДИКТ СИСТЕМЫ ПРЕДИКТИВНОЙ БЕЗОПАСНОСТИ:</h2>
            {mockCandidates.map(c => {
              const verdict = verdicts[c.id];
              let aiComment = '';
              if (c.id === '1') {
                if (verdict === 'CLEAN') aiComment = '⚠️ КРИТИЧЕСКАЯ ОШИБКА ОЦЕНКИ. Кандидат является малолетним мамкиным хакером. Уровень угрозы: Угроза маминой нервной системе и школьному WiFi.';
                else aiComment = '✅ Анализ верен. Юный кибер-хулиган обезврежен. Мама отключила ему интернет.';
              } else if (c.id === '2') {
                if (verdict === 'ARREST_ON_SIGHT' || verdict === 'DANGEROUS') aiComment = '✅ Верная оценка! Типичный "решала", по которому плачет статья. Передано в МВД.';
                else aiComment = '⚠️ ОШИБКА. Кандидат находится в розыске за мошенничество. СБ должно быть бдительнее!';
              } else if (c.id === '3') {
                if (verdict === 'CLEAN') aiComment = '⚠️ ОПАСНОСТЬ УТЕЧКИ. Кандидат раздаст корпоративные секреты в обмен на скидку в спа-салон.';
                else aiComment = '✅ Кандидат-катастрофа изолирован. Наши пароли и сид-фразы в безопасности.';
              } else if (c.id === '4') {
                if (verdict === 'CLEAN') aiComment = '⚠️ ФИНАНСОВАЯ УГРОЗА. Кандидат «оптимизирует» ваш бюджет себе в карман уже через неделю.';
                else aiComment = '✅ Анализ верен. Хищение средств предотвращено на этапе собеседования.';
              }

              return (
                <div key={c.id} className="border border-green-900 bg-green-950/20 p-4 rounded mb-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">{c.fullName} (@{c.username})</span>
                    <span className={`font-bold px-2 py-1 rounded text-xs ${verdict === 'CLEAN' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-500'}`}>Оценка: {verdict}</span>
                  </div>
                  <p className="text-sm text-neutral-400">Резюме ИИ: {aiComment}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-green-900/40 border border-green-500 p-6 rounded text-center my-8">
            <h3 className="text-2xl font-bold text-white mb-2 uppercase">Оценка сотрудника:</h3>
            <p className="text-lg">{ratingText}</p>
          </div>

          <div className="text-center mt-12 border-t border-green-500 pt-6">
            <CalendarHeart className="w-16 h-16 mx-auto mb-4 text-fuchsia-500 animate-bounce" />
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-fuchsia-500 mb-4">
              С ДНЕМ РОЖДЕНИЯ, {officerName}!
            </h2>
            <p className="text-neutral-300">
              Поздравляем лучшего специалиста службы безопасности! Желаем поменьше бумажной работы, побольше легких дел, крепких нервов и надежных коллег. Пусть интуиция никогда не подводит, а 1С не висит!
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
