export interface Hotel {
  id: string;
  name: string;
  location: string;
  tags: string[];
  description: string;
  imageUrl: string;
  link: string;
}

export const hotels: Hotel[] = [
  {
    id: 'adalya-bliss',
    name: 'ADALYA BLISS',
    location: 'Анталья',
    tags: ['Ultra All Inclusive', 'Новый отель', 'Для семьи'],
    description: 'Новый уровень роскоши на побережье Средиземного моря. Элегантный дизайн, безупречный сервис и гастрономические изыски.',
    imageUrl: 'https://storage.yandexcloud.net/arina-reels-storage/ADALYA%20BLISS.jfif',
    link: '/hotels/adalya-bliss',
  },
  {
    id: 'doubletree-by-hilton-kemer',
    name: 'DoubleTree by Hilton Kemer',
    location: 'Кемер',
    tags: ['Premium', 'Стильный', 'Первая линия'],
    description: 'Отель со стильным дизайном и концепцией комфорта, расположенный прямо на берегу моря в Кемере.',
    imageUrl: 'https://storage.yandexcloud.net/arina-reels-storage/Double%20Tree%20Kemer.jfif',
    link: '/hotels/doubletree-by-hilton-kemer',
  },
  {
    id: 'hero-3',
    name: 'Greenwood Suites Resort',
    location: 'Анталья',
    tags: ['Suites', 'Для семьи', 'Бассейны'],
    description: 'Курортный отель, предлагающий просторные сьюты и отличную инфраструктуру для семейного отдыха с детьми.',
    imageUrl: 'https://storage.yandexcloud.net/arina-reels-storage/Greenwood%20Suites%20Resort.jfif',
    link: '/hotels/greenwood-suites-resort',
  },
  {
    id: 'hero-4',
    name: 'Adalya ArtSide Hotel',
    location: 'Сиде',
    tags: ['All Inclusive', 'Пляж', 'Архитектура'],
    description: 'Отель с уникальной архитектурой, расположенный рядом с песчаным пляжем. Отличный выбор для комфортного отпуска.',
    imageUrl: 'https://storage.yandexcloud.net/arina-reels-storage/Adalya%20ArtSide%20Hotel.jfif',
    link: '/hotels/adalya-artside-hotel',
  },

  {
    id: '1',
    name: 'Maxx Royal Belek Golf Resort',
    location: 'Белек',
    tags: ['Ultra All Inclusive', 'Для семьи', 'Первая линия', 'Гольф'],
    description: 'Роскошный курорт с первоклассным сервисом, предлагающий эксклюзивные сьюты и виллы. Идеальное место для семейного отдыха и любителей гольфа.',
    imageUrl: 'https://placehold.co/800x600/F6EEE1/5A6B5D?text=Maxx+Royal',
    link: '/hotels/maxx-royal-belek-golf-resort',
  },
  {
    id: '2',
    name: 'Regnum Carya',
    location: 'Белек',
    tags: ['Ultra All Inclusive', 'Для семьи', 'Премиум', 'Первая линия'],
    description: 'Один из самых престижных отелей региона с великолепным белым песчаным пляжем, роскошными номерами и высочайшим уровнем обслуживания.',
    imageUrl: 'https://placehold.co/800x600/F6EEE1/5A6B5D?text=Regnum+Carya',
    link: '/hotels/regnum-carya',
  },
  {
    id: '3',
    name: 'Nirvana Mediterranean Excellence',
    location: 'Кемер',
    tags: ['С животными', 'Для семьи', 'Wellness', 'Природа'],
    description: 'Уникальный концепт, объединяющий роскошь и природу. Отель расположен в сосновом лесу на берегу кристально чистого моря.',
    imageUrl: 'https://placehold.co/800x600/F6EEE1/5A6B5D?text=Nirvana+ME',
    link: '/hotels/nirvana-mediterranean-excellence',
  },
  {
    id: '4',
    name: 'Cullinan Belek',
    location: 'Белек',
    tags: ['Премиум', 'Новый отель', 'Golf', 'Ultra All Inclusive'],
    description: 'Новый уровень роскоши на побережье Средиземного моря. Элегантный дизайн, безупречный сервис и гастрономические изыски.',
    imageUrl: 'https://placehold.co/800x600/F6EEE1/5A6B5D?text=Cullinan',
    link: '/hotels/cullinan-belek',
  },
  {
    id: '5',
    name: 'NG Phaselis Bay',
    location: 'Кемер',
    tags: ['Wellness', 'Для семьи', 'Первая линия', 'Премиум'],
    description: 'Идеальное сочетание комфорта и уединения в живописной бухте. Панорамные виды на море и горы Торос.',
    imageUrl: 'https://placehold.co/800x600/F6EEE1/5A6B5D?text=NG+Phaselis',
    link: '/hotels/ng-phaselis-bay',
  },
  {
    id: '6',
    name: 'Barut Hemera',
    location: 'Сиде',
    tags: ['Для семьи', 'Уютный', 'Исторический центр'],
    description: 'Легендарное качество сервиса сети Barut. Отель с зеленой территорией и отличным пляжем, расположенный недалеко от античного города Сиде.',
    imageUrl: 'https://placehold.co/800x600/F6EEE1/5A6B5D?text=Barut+Hemera',
    link: '/hotels/barut-hemera',
  },
  {
    id: '7',
    name: 'Rixos Premium Tekirova',
    location: 'Кемер',
    tags: ['Для семьи', 'Аквапарк', 'Активный отдых'],
    description: 'Огромная зеленая территория у подножия гор. Отель славится масштабными шоу-программами и одним из лучших детских клубов.',
    imageUrl: 'https://placehold.co/800x600/F6EEE1/5A6B5D?text=Rixos+Tekirova',
    link: '/hotels/rixos-premium-tekirova',
  },
  {
    id: '8',
    name: 'Kempinski Hotel The Dome',
    location: 'Белек',
    tags: ['Тихий отдых', 'Только для взрослых', 'Гольф', 'SPA'],
    description: 'Бутик-отель в сельджукском стиле. Предлагает спокойный отдых, великолепный SPA-центр и доступ к лучшим гольф-полям.',
    imageUrl: 'https://placehold.co/800x600/F6EEE1/5A6B5D?text=Kempinski',
    link: '/hotels/kempinski-hotel-the-dome',
  },
  {
    id: '9',
    name: 'Lujo Hotel',
    location: 'Бодрум',
    tags: ['Арт-отель', 'Премиум', 'Гастрономия', 'Белоснежный песок'],
    description: 'Концепция Art & Joy. Уникальная архитектура, три роскошных пляжа с белым песком и рестораны a la carte мирового уровня.',
    imageUrl: 'https://placehold.co/800x600/F6EEE1/5A6B5D?text=Lujo+Hotel',
    link: '/hotels/lujo-hotel',
  },
];

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
}

export const transactions: Transaction[] = [
  { id: 'TRX-1092', date: '2026-04-10', description: 'Professional Plan (Monthly)', amount: 99, status: 'completed' },
  { id: 'TRX-1091', date: '2026-04-05', description: 'Premium Media Pack: Aman Tokyo', amount: 49, status: 'completed' },
  { id: 'TRX-1090', date: '2026-03-10', description: 'Professional Plan (Monthly)', amount: 99, status: 'completed' },
  { id: 'TRX-1089', date: '2026-02-10', description: 'Professional Plan (Monthly)', amount: 99, status: 'completed' },
];

export const userProfile = {
  name: 'Виктор Грозан',
  email: 'viktor@grozan.studio',
  company: 'Grozan Studio',
  plan: 'Professional',
  memberSince: '2025-11',
};
