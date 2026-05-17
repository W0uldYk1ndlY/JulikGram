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

export interface DmMessage {
  id: string;
  text: string;
  isOutgoing: boolean;
  time: string;
}

export interface DmChat {
  contactName: string;
  messages: DmMessage[];
}

export interface DatingProfile {
  appName: string;
  name: string;
  age: number;
  bio: string;
}

export interface PurchaseHistory {
  store: string;
  items: string[];
}

export interface SmartHomeRecord {
  device: string;
  command: string;
  time: string;
}

export interface Geolocation {
  lat: number;
  lng: number;
  placeName: string;
  mapImageUrl: string;
}

export interface CallTranscript {
  caller: string;
  receiver: string;
  duration: string;
  text: string[];
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
  dms: DmChat;
  datingProfile?: DatingProfile;
  purchases?: PurchaseHistory;
  smartHomeRecords?: SmartHomeRecord[];
  searchHistory?: string[];
  geolocation?: Geolocation;
  callTranscript?: CallTranscript;
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
    avatarUrl: 'https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?auto=format&fit=crop&q=80&w=200',
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
    dms: {
      contactName: 'Dark_Killah_99',
      messages: [
        { id: 'm1_1', text: 'Бро, когда пентагон ломаем?', isOutgoing: false, time: '14:20' },
        { id: 'm1_2', text: 'Завтра после 4. У меня до 3 уроки, потом мама суп заставляет есть.', isOutgoing: true, time: '14:25' },
        { id: 'm1_3', text: 'Понял, я тогда пока вирусы на флешку скачаю.', isOutgoing: false, time: '14:26' },
        { id: 'm1_4', text: 'Только аккуратно, в архиве скидывай, а то у меня Касперский ругается сразу.', isOutgoing: true, time: '14:28' }
      ]
    },
    datingProfile: {
      appName: 'Tinder',
      name: 'CyberLord',
      age: 19,
      bio: 'Ищу ту, кто взломает мое сердце. Девушки младше 70 лвла в WoW не пишите.'
    },
    purchases: {
      store: 'Ozon',
      items: ['Энергетик Tornado 24 шт', 'Маска Гая Фокса', 'Мазь от прыщей', 'Клавиатура с подсветкой']
    },
    smartHomeRecords: [
      { device: 'Умная колонка Алиса', command: 'Алиса, как незаметно взять деньги из маминой сумки?', time: '12:00' },
      { device: 'Умная колонка Алиса', command: 'Алиса, какие статьи за взлом странички ВК бывшей?', time: '14:30' }
    ],
    searchHistory: [
      'скачать читы на майнкрафт без смс',
      'как удалить амиго браузер',
      'статья УК РФ за оскорбление в доте'
    ],
    geolocation: {
      lat: 55.751244,
      lng: 37.618423,
      placeName: "Компьютерный клуб 'Матрица', Подвал",
      mapImageUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400",
    },
    callTranscript: {
      caller: "Неизвестный",
      receiver: "Кандидат",
      duration: "00:01:15",
      text: [
        "[Неизвестный]: Алло, это штаб хакеров?",
        "[Кандидат]: Да, мы слушаем. Пароль?",
        "[Неизвестный]: Сын, кончай ерундой страдать, иди суп ешь!",
        "[Кандидат]: МАМА! Я на спецоперации в Даркнете, ну мам!"
      ]
    },
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
    dms: {
      contactName: 'Братуха (не брать!)',
      messages: [
        { id: 'm2_1', text: 'Жека, ты где? Трубку возьми, люди подъехали.', isOutgoing: false, time: '21:05' },
        { id: 'm2_2', text: 'Брат, связь плохая, я в тоннеле.', isOutgoing: true, time: '21:15' },
        { id: 'm2_3', text: 'Ты в телеге онлайн, какой еще тоннель? Верни 500 тысяч!', isOutgoing: false, time: '21:16' },
        { id: 'm2_4', text: 'Автоответчик: Абонент временно покинул страну и в данный момент медитирует на Бали.', isOutgoing: true, time: '21:18' }
      ]
    },
    datingProfile: {
      appName: 'ДайВинчик',
      name: 'Евгений',
      age: 35,
      bio: 'Решаю вопросики. На гелике. Сплю с пушкой. Если ты меркантильная - мимо.'
    },
    purchases: {
      store: 'Wildberries',
      items: ['Барсетка Gucci (реплика AAAA+)', 'Четки перекидные', 'Фальшивые купюры 5000 руб (для пранков)']
    },
    smartHomeRecords: [
      { device: 'Умная колонка Маруся', command: 'Маруся, где спрятаться в лесу от кредиторов?', time: '03:00' },
      { device: 'Робот-пылесос', command: '*ЗВУКИ УБЕГАЮЩЕГО ЧЕЛОВЕКА ПРИ ВИДЕ ПОЛИЦЕЙСКОЙ СИРЕНЫ*', time: '05:00' }
    ],
    searchHistory: [
      'как переписать машину на кота',
      'турция без загранпаспорта'
    ],
    geolocation: {
      lat: 51.660781,
      lng: 39.200296,
      placeName: "Трасса М4 'Дон', лесополоса",
      mapImageUrl: "https://images.unsplash.com/photo-1440613905118-99b921706b5c?auto=format&fit=crop&q=80&w=400",
    },
    callTranscript: {
      caller: "Кандидат",
      receiver: "Санёк",
      duration: "00:02:40",
      text: [
        "[Кандидат]: Санёк, ты лопату взял?",
        "[Санёк]: Взял. А что закапывать будем? Отчетность за квартал?",
        "[Кандидат]: Концы в воду будем закапывать, Санёк. И флешку бухгалтера.",
        "[Санёк]: А ящик виски тоже закапывать?",
        "[Кандидат]: Нет, это вещдок, заберем в офис."
      ]
    },
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
    dms: {
      contactName: 'Микрозайм "БыстроДеньги"',
      messages: [
        { id: 'm3_1', text: 'Светлана Эдуардовна, вы просрочили платеж. Долг 14 500 рублей.', isOutgoing: false, time: '10:00' },
        { id: 'm3_2', text: 'Ой, а можно я вам биткоинами заплачу? У меня там перспективный токен DOGE-SUPER-MOON 🚀', isOutgoing: true, time: '10:05' },
        { id: 'm3_3', text: 'Мы принимаем только рубли. Завтра ваше дело передается коллекторам.', isOutgoing: false, time: '10:08' },
        { id: 'm3_4', text: 'Вы просто не мыслите масштабно! Финансовая грамотность на нуле 💅 Отправляйте коллекторов, я им тоже курс продам.', isOutgoing: true, time: '10:12' }
      ]
    },
    datingProfile: {
      appName: 'Tinder',
      name: 'Светлана',
      age: 25,
      bio: 'Миллионерша. Зарабатываю сама. Ищу папика, который оплатит мои бизнес-курсы.'
    },
    purchases: {
      store: 'ЦУМ (Отмененные заказы)',
      items: ['Сумка Birkin (Отклонено банком)', 'Туфли Louboutin (Недостаточно средств)']
    },
    smartHomeRecords: [
      { device: 'Умная колонка Алиса', command: 'Алиса, включи медитацию на привлечение денег', time: '09:00' },
      { device: 'Умная колонка Алиса', command: 'Алиса, как быстро продать почку?', time: '23:00' }
    ],
    searchHistory: [
      'что делать если приставы уже стучат',
      'как незаметно взять кредит на подругу'
    ],
    geolocation: {
      lat: 55.748530,
      lng: 37.538528,
      placeName: "Москва-Сити (Фейк-локация), Распознана реальная: гаражный кооператив 'Ласточка'",
      mapImageUrl: "https://images.unsplash.com/photo-1627883267798-25fc250e7042?auto=format&fit=crop&q=80&w=400",
    },
    callTranscript: {
      caller: "«Служба безопасности банка» (Мошенник)",
      receiver: "Кандидат",
      duration: "00:15:22",
      text: [
        "[Мошенник]: Здравствуйте, кто-то пытается перевести ваши средства. Продиктуйте код из СМС.",
        "[Кандидат]: Ой, какой ужас! 4452.",
        "[Мошенник]: Отлично, теперь возьмите кредит на 2 миллиона, чтобы запутать следы.",
        "[Кандидат]: А это точно безопасно? Хорошо, беру. А я так смогу стать крипто-инвестором?",
        "[Мошенник]: Безусловно, Светлана. Вы теперь наш главный крипто-партнер."
      ]
    },
    posts: [
      {
        id: 'p3_1',
        imageUrl: 'https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?auto=format&fit=crop&q=80&w=800',
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
    dms: {
      contactName: 'Бухгалтер Людмила',
      messages: [
        { id: 'm4_1', text: 'Кирилл Борисович, мы нашли несостыковки в 300 тысяч по вашему проекту "канцтовары".', isOutgoing: false, time: '16:30' },
        { id: 'm4_2', text: 'Людмила Ивановна, ну зачем же так официально. Давайте я вам коробку хороших конфет куплю и мы это забудем? 😉', isOutgoing: true, time: '16:35' },
        { id: 'm4_3', text: 'Вы вчера грузили 15 коробок бумаги А4 в свой багажник. У нас есть камеры.', isOutgoing: false, time: '16:38' },
        { id: 'm4_4', text: 'Это... эээ... процесс безопасной утилизации! Конфиденциальные данные! Завтра все объясню.', isOutgoing: true, time: '16:40' }
      ]
    },
    datingProfile: {
      appName: 'Tinder',
      name: 'Кирилл',
      age: 32,
      bio: 'Топ-менеджер. Отдыхаю на Мальдивах. Счет разделим пополам. Чаевые не оставляю принципиально.'
    },
    purchases: {
      store: 'АлиЭкспресс',
      items: ['Часы Rolex (подделка $15)', 'Галстук шелковый (1 шт)', 'Программа для накрутки KPI']
    },
    smartHomeRecords: [
      { device: 'Умная колонка Алиса', command: 'Алиса, что делать если налоговая у дверей?', time: '10:00' },
      { device: 'Умный чайник', command: '*Шепотом* Как подделать подпись гендира?', time: '16:00' }
    ],
    searchHistory: [
      'Офшоры на Кипре недорого',
      'как незаметно подкрутить формулу в Excel',
      'билеты в Дубай на сегодня'
    ],
    geolocation: {
      lat: 55.972620,
      lng: 37.414594,
      placeName: "Аэропорт Шереметьево, Зона вылета (Пытается покинуть РФ)",
      mapImageUrl: "https://images.unsplash.com/photo-1436491865332-7a61e109cc05?auto=format&fit=crop&q=80&w=400",
    },
    callTranscript: {
      caller: "Генеральный директор",
      receiver: "Кандидат",
      duration: "00:00:45",
      text: [
        "[Директор]: Кирилл Борисович, вы где? Нам нужно обсудить пропажу 10 миллионов из бюджета.",
        "[Кандидат]: Иван Иванович, я на срочном тимбилдинге! В... эээ... Саратове. Связь плохая!",
        "[Директор]: У вас на фоне объявляют рейс на Дубай.",
        "[Кандидат]: Это... аудио-погружение для лучшей концентрации! *пищит терминал, связь обрывается*"
      ]
    },
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
