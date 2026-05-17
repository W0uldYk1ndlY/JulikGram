export type CandidateStatus = 'PENDING' | 'PASSED' | 'REJECTED' | 'ARRESTED';

export interface Comment {
  id: string;
  username: string;
  text: string;
}

export interface Post {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: Comment[];
}

export interface Candidate {
  id: string;
  username: string;
  fullName: string;
  bio: string;
  avatarUrl: string;
  posts: Post[];
  followers: number;
  following: number;
  status: CandidateStatus;
  appliedPosition: string;
  osintInfo: string[];
}

export interface FakeAd {
  id: string;
  sponsorInfo: string;
  text: string;
  imageUrl: string;
  actionText: string;
}

export const mockAds: FakeAd[] = [
  {
    id: 'ad1',
    sponsorInfo: 'Реклама от ИП "Схемотозов"',
    text: 'Обучаю обходить полиграф за 3 дня! Гарантия 100%. Если посадят - верну деньги.',
    imageUrl: 'https://images.unsplash.com/photo-1575505586569-646b2e11b823?auto=format&fit=crop&q=80&w=800',
    actionText: 'Записаться на курс'
  },
  {
    id: 'ad2',
    sponsorInfo: 'Даркнет-маркетплейс "Успех"',
    text: 'Стерли вашу кредитную историю? Снова наберем! Оптовые скидки на левые сим-карты.',
    actionText: 'Перейти в ТГ-бота',
    imageUrl: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=800'
  }
];

export const mockCandidates: Candidate[] = [
  {
    id: '1',
    username: 'mama_ya_hacker',
    fullName: 'Игорь Нагибаторов',
    bio: '👾 Взламываю пентагон до обеда. 👨‍💻 Кали линукс в крови. 🕶️ Анонимус.',
    appliedPosition: 'Специалист по инфобезу',
    avatarUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=200',
    followers: 1337,
    following: 4,
    status: 'PENDING',
    osintInfo: [
      "> Подключение к базе Яндекс.Еды... Успешно.",
      "Вчера заказал: 'Комбо Обеденный Студент' (с маминой карты).",
      "> Поиск по истории браузера...",
      "Найдены запросы: 'скачать читы на майнкрафт без смс', 'как удалить амиго браузер', 'статья УК РФ за оскорбление в доте'",
      "> Уровень реальной угрозы: Опасен только для маминых нервов."
    ],
    posts: [
      {
        id: 'p1_1',
        imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800',
        caption: 'Очередной успешный взлом базы данных корпорации 😈😎 #hacker #darknet',
        likes: 42,
        comments: [
          { id: 'c1', username: 'мамуля77', text: 'Игорек, ты почему суп не доел? И убери со стола свои бумажки с паролями от госуслуг!' },
          { id: 'c2', username: 'pro_hacker_2009', text: 'Чувак, у тебя на мониторе стикер "Пароль от админки: admin123" виден...' }
        ]
      },
      {
        id: 'p1_2',
        imageUrl: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800',
        caption: 'Анонимная сходка в даркнете. Сохраняю инкогнито. Никто не узнает, где я.',
        likes: 12,
        comments: [
          { id: 'c3', username: 'Sosedka_Zina', text: 'Игорь, я тебя из окна вижу, ты опять на детской площадке у 4-го подъезда на ул. Ленина 15 сидишь в капюшоне?' }
        ]
      }
    ]
  },
  {
    id: '2',
    username: 'zheka_bez_zabot',
    fullName: 'Евгений Решалов',
    bio: '💪 Решаю вопросики. 💸 Обнал, крипта, бизнес. 📵 На связи 24/7 (в телеге).',
    appliedPosition: 'Руководитель службы безопасности',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    followers: 9999,
    following: 1,
    status: 'PENDING',
    osintInfo: [
      "> Проверка по базе судебных приставов (ФССП)... Успешно.",
      "Найдено долгов на сумму: 4 532 100 руб.",
      "> Проверка штрафов ГИБДД...",
      "Неоплаченных штрафов: 142 шт. Из них 140 за тонировку лобового стекла.",
      "> Запросы в Google:",
      "'как переписать машину на кота', 'турция без загранпаспорта'",
      "> Статус: Классический мамин бизнесмен."
    ],
    posts: [
      {
        id: 'p2_1',
        imageUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=800',
        caption: 'Новая ласточка! Успешный бизнес приносит плоды. Без криминала, чисто на интеллекте 🧠💼',
        likes: 541,
        comments: [
          { id: 'c4', username: 'sledovatel_ivanov', text: 'Евгений, мы ждем вас на допрос к 10:00. И номера перебейте, мы же видим, что тачка в угоне числится.' },
          { id: 'c5', username: 'bratuxa', text: 'Жэка, братик, когда долг 500к отдашь? Ты же скрываешься.' }
        ]
      },
      {
        id: 'p2_2',
        imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800', // Money image
        caption: 'Легкие деньги! Поднял на крипте за вечер. Учу инвестировать, пиши в директ.',
        likes: 890,
        comments: [
          { id: 'c6', username: 'vkladchik_igor', text: 'МОШЕННИК!! ВЕРНИ МОИ ПЕНСИОННЫЕ!! Я НАПИСАЛ В ПРОКУРАТУРУ!!' }
        ]
      }
    ]
  },
  {
    id: '3',
    username: 'sveta_crypto_queen',
    fullName: 'Светлана Доверчивая',
    bio: '💅 Финансовая аналитика & Lifestyle. 💎 Учу девочек финансовой независимости.',
    appliedPosition: 'Главный бухгалтер / Риск-менеджер',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    followers: 45000,
    following: 500,
    status: 'PENDING',
    osintInfo: [
      "> Интеграция с базой НБКИ (Кредитные истории)...",
      "Одобрено кредитов: 5 (все на последние модели iPhone).",
      "> Анализ транзакций (Сбербанк Онлайн)...",
      "Траты за месяц:",
      "- Кофейня 'Смузичная': 45 000 руб.",
      "- Курсы 'Дыхание маткой для привлечения инвестиций': 150 000 руб.",
      "> Баланс криптокошелька: 0.000000041 BTC ($0.03)"
    ],
    posts: [
      {
        id: 'p3_1',
        imageUrl: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?auto=format&fit=crop&q=80&w=800',
        caption: 'Ура! Купила первый холодный кошелек! Теперь моя крипта в безопасности 🔒✨',
        likes: 1205,
        comments: [
          { id: 'c7', username: 'hacker_vanya', text: 'Свет, спасибо за фото! Особенно за то, где ты сид-фразу (12 слов) на заднем фоне на доске записала. Уже вывел 2 битка!' },
          { id: 'c8', username: 'sveta_crypto_queen', text: '@hacker_vanya Всмысле вывел?! Это была инвестиция в будущее!' }
        ]
      },
      {
        id: 'p3_2',
        imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800',
        caption: 'Наконец-то получила новую корпоративную карту! Так рада! 🥰💳',
        likes: 3400,
        comments: [
          { id: 'c9', username: 'darknet_seller', text: 'Отличное фото. И номер карты видно, и CVV-код в зеркале отразился. Заказал себе айфон с твоей карты.' }
        ]
      }
    ]
  },
  {
    id: '4',
    username: 'kiryak_biz_analytics',
    fullName: 'Кирилл Б.',
    bio: '💼 Оптимизирую издержки. 7 лет опыта. Помогу вашему бизнесу сэкономить (свой карман не забуду).',
    appliedPosition: 'Бизнес-аналитик',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
    followers: 1205,
    following: 800,
    status: 'PENDING',
    osintInfo: [
      "> Проверка справки 2-НДФЛ... Успешно.",
      "Официальный доход: 18 500 руб/мес.",
      "> Анализ имущества...",
      "Vehicle: Porsche Cayenne (2023 г.в.) — Записан на бабушку (89 лет).",
      "> Перехват поисковых запросов в рабочее время...",
      "'Офшоры на Кипре недорого', 'как незаметно подкрутить формулу в Excel', 'билеты в Дубай на сегодня'",
      "> Вердикт: Очень скользкий тип."
    ],
    posts: [
      {
        id: 'p4_1',
        imageUrl: 'https://media.giphy.com/media/67ThRZlYBzybLcNs21/giphy.gif',
        caption: 'Сэкономил компании 10 млн, выписал себе премию 9.9 млн. Бизнес-анализ - это искусство! 📈💼',
        likes: 85,
        comments: [
          { id: 'c10', username: 'nalogovaya_rf', text: 'Гражданин, зайдите в ФНС для дачи пояснений.' },
          { id: 'c11', username: 'ex_boss_angry', text: 'Кирилл, где отчет за квартал? Ты просто уволил уборщицу!' },
          { id: 'c12', username: 'bratuxa', text: 'Брат, займи до получки, а?' }
        ]
      },
      {
        id: 'p4_2',
        imageUrl: 'https://media.giphy.com/media/8fen5LSZcHQ5O/giphy.gif',
        caption: 'Нашел слепую зону в KPI отдела продаж. Теперь получаю % с их сделок, они даже не знают.🤫📊 #пассивныйдоход',
        likes: 142,
        comments: [
          { id: 'c13', username: 'kollega_anton', text: 'Ты там совсем обалдел? Я в СБ пожалуюсь!' },
          { id: 'c14', username: 'director_general', text: 'Кирилл Борисович, зайдите ко мне в кабинет. Срочно.' }
        ]
      }
    ]
  }
];
