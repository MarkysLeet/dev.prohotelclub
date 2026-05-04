export interface HotelSection {
  id: string;
  title: string;
  content: string;
  mediaCount: number; // For skeletons
  isPaywalled?: boolean;
  icon?: string;
}

export interface HotelDetailData {
  slug: string;
  name: string;
  location: string;
  shootingDate: string;
  heroImage?: string;
  stars: number;
  distanceToSea: string;
  distanceToCity: string;
  googleRating: number;
  buildYear: number;
  mealPlan: string;
  sections: HotelSection[];
}

export const hotelDetailMockData: HotelDetailData[] = [
  {
    slug: 'adalya-bliss',
    name: 'ADALYA BLISS',
    location: 'Сиде, Эвренсеки',
    shootingDate: '06.04.2026',
    heroImage: 'https://storage.yandexcloud.net/arina-reels-storage/ADALYA%20BLISS.jfif',
    stars: 5,
    distanceToSea: 'Первая линия, 50м',
    distanceToCity: '5 км до центра Сиде',
    googleRating: 4.8,
    buildYear: 2024,
    mealPlan: 'Ultra All Inclusive',
    sections: [
      {
        id: 'entrance',
        title: 'Входная группа',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        mediaCount: 3,
      },
      {
        id: 'rooms',
        title: 'Номера',
        content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        mediaCount: 6,
      },
      {
        id: 'dining',
        title: 'Питание',
        content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
        mediaCount: 4,
      },
      {
        id: 'bars',
        title: 'Бары',
        content: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.',
        mediaCount: 3,
      },
      {
        id: 'spa',
        title: 'SPA и спорт',
        content: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.',
        mediaCount: 4,
      },
      {
        id: 'pools',
        title: 'Бассейны и отдых',
        content: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa.',
        mediaCount: 5,
      },
      {
        id: 'beach',
        title: 'Пляжная линия',
        content: 'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.',
        mediaCount: 4,
      },
      {
        id: 'territory',
        title: 'Территория',
        content: 'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.',
        mediaCount: 5,
      },
      {
        id: 'entertainment',
        title: 'Развлечения',
        content: 'Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Sed in magna aliqua.',
        mediaCount: 3,
      },
      {
        id: 'reviews',
        title: 'Анализ отзывов',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae sem vel massa iaculis bibendum. Praesent accumsan lectus nec risus suscipit, in tincidunt diam eleifend.',
        mediaCount: 0,
        isPaywalled: true,
      },
      {
        id: 'pros-cons',
        title: 'Плюсы и минусы',
        content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.',
        mediaCount: 0,
        isPaywalled: true,
      },
      {
        id: 'resume',
        title: 'Моё резюме',
        content: 'Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.',
        mediaCount: 0,
        isPaywalled: true,
      }
    ]
  }
];

export function getHotelBySlug(slug: string) {
  return hotelDetailMockData.find(h => h.slug === slug);
}
