import { hotels as initialHotels, Hotel } from './mock-data';
import { hotelDetailMockData as initialHotelDetails, HotelDetailData } from './hotel-mock-data';

// Ключи для localStorage
const STORAGE_KEYS = {
  HOTELS: 'prohotelclub_hotels',
  HOTEL_DETAILS: 'prohotelclub_hotel_details',
  COMMENTS: 'prohotelclub_comments',
  REVIEW_REQUESTS: 'prohotelclub_review_requests'
};

export interface Comment {
  id: string;
  hotelSlug: string;
  authorId: string;
  authorName: string;
  role: string;
  date: string;
  text: string;
  likesCount: number;
  likedBy: string[]; // массив ID пользователей, поставивших лайк
}

export interface ReviewRequest {
  id: string;
  hotelId: string;
  hotelName: string;
  userId: string;
  userName: string;
  date: string;
  status: 'pending' | 'reviewed' | 'rejected';
}

// Helper: Безопасное чтение из localStorage (только на клиенте)
const getStorageItem = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored) as T;
    } catch (e) {
      console.error(`Error parsing ${key} from localStorage`, e);
      return defaultValue;
    }
  }
  return defaultValue;
};

// Helper: Безопасная запись в localStorage (только на клиенте)
const setStorageItem = <T>(key: string, value: T): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// --- Отели ---

export const storage = {
  getHotels: (): Hotel[] => {
    const customHotels = getStorageItem<Hotel[]>(STORAGE_KEYS.HOTELS, []);
    
    // Объединяем дефолтные и кастомные отели. 
    // Кастомные (сохраненные) отели имеют приоритет при совпадении ID.
    const mergedHotels = [...initialHotels];
    
    customHotels.forEach(customHotel => {
      const index = mergedHotels.findIndex(h => h.id === customHotel.id);
      if (index !== -1) {
        mergedHotels[index] = customHotel;
      } else {
        mergedHotels.push(customHotel);
      }
    });

    return mergedHotels;
  },

  saveHotel: (hotel: Hotel): void => {
    const customHotels = getStorageItem<Hotel[]>(STORAGE_KEYS.HOTELS, []);
    const index = customHotels.findIndex(h => h.id === hotel.id);
    
    if (index !== -1) {
      customHotels[index] = hotel;
    } else {
      customHotels.push(hotel);
    }
    
    setStorageItem(STORAGE_KEYS.HOTELS, customHotels);
  },

  // --- Детали Отеля ---
  getHotelDetails: (): HotelDetailData[] => {
    const customDetails = getStorageItem<HotelDetailData[]>(STORAGE_KEYS.HOTEL_DETAILS, []);
    
    const mergedDetails = [...initialHotelDetails];
    
    customDetails.forEach(customDetail => {
      const index = mergedDetails.findIndex(d => d.slug === customDetail.slug);
      if (index !== -1) {
        mergedDetails[index] = customDetail;
      } else {
        mergedDetails.push(customDetail);
      }
    });

    return mergedDetails;
  },

  getHotelDetailBySlug: (slug: string): HotelDetailData | undefined => {
    return storage.getHotelDetails().find(d => d.slug === slug);
  },

  saveHotelDetail: (detail: HotelDetailData): void => {
    const customDetails = getStorageItem<HotelDetailData[]>(STORAGE_KEYS.HOTEL_DETAILS, []);
    const index = customDetails.findIndex(d => d.slug === detail.slug);
    
    if (index !== -1) {
      customDetails[index] = detail;
    } else {
      customDetails.push(detail);
    }
    
    setStorageItem(STORAGE_KEYS.HOTEL_DETAILS, customDetails);
  },

  // --- Комментарии ---
  getComments: (hotelSlug: string): Comment[] => {
    const allComments = getStorageItem<Comment[]>(STORAGE_KEYS.COMMENTS, []);
    
    // Если комментариев нет вообще, добавим пару моковых для текущего отеля
    if (allComments.length === 0) {
      return [
        {
          id: 'comment_1',
          hotelSlug,
          authorId: 'mock_1',
          authorName: 'Елена Смирнова',
          role: 'Турагент',
          date: '12 апреля 2024',
          text: 'Отличный отель для семейного отдыха. Пляж чистый, заход в воду пологий. Питание разнообразное, есть отдельный детский буфет. Рекомендую бронировать номера категории Family Room.',
          likesCount: 5,
          likedBy: ['mock_user_1', 'mock_user_2']
        },
        {
          id: 'comment_2',
          hotelSlug,
          authorId: 'mock_2',
          authorName: 'Михаил Иванов',
          role: 'Турагент',
          date: '5 мая 2024',
          text: 'Обратите внимание, что в высокий сезон рестораны a-la carte нужно бронировать заранее через приложение отеля, иначе мест не будет. В остальном сервис на уровне.',
          likesCount: 2,
          likedBy: ['mock_user_3']
        }
      ];
    }
    return allComments.filter(c => c.hotelSlug === hotelSlug);
  },

  addComment: (comment: Comment): void => {
    const allComments = getStorageItem<Comment[]>(STORAGE_KEYS.COMMENTS, []);
    allComments.push(comment);
    setStorageItem(STORAGE_KEYS.COMMENTS, allComments);
  },

  toggleLike: (commentId: string, userId: string): void => {
    const allComments = getStorageItem<Comment[]>(STORAGE_KEYS.COMMENTS, []);
    const index = allComments.findIndex(c => c.id === commentId);
    
    if (index !== -1) {
      const comment = allComments[index];
      const hasLiked = comment.likedBy.includes(userId);
      
      if (hasLiked) {
        comment.likedBy = comment.likedBy.filter(id => id !== userId);
        comment.likesCount = Math.max(0, comment.likesCount - 1);
      } else {
        comment.likedBy.push(userId);
        comment.likesCount += 1;
      }
      
      setStorageItem(STORAGE_KEYS.COMMENTS, allComments);
    }
  },

  // --- Запросы на обзор ---
  getReviewRequests: (): ReviewRequest[] => {
    return getStorageItem<ReviewRequest[]>(STORAGE_KEYS.REVIEW_REQUESTS, []);
  },

  addReviewRequest: (request: Omit<ReviewRequest, 'id' | 'date' | 'status'>): void => {
    const requests = storage.getReviewRequests();
    
    const newRequest: ReviewRequest = {
      ...request,
      id: `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      date: new Date().toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      status: 'pending'
    };
    
    requests.push(newRequest);
    setStorageItem(STORAGE_KEYS.REVIEW_REQUESTS, requests);
  },

  updateReviewRequestStatus: (requestId: string, status: ReviewRequest['status']): void => {
    const requests = storage.getReviewRequests();
    const index = requests.findIndex(r => r.id === requestId);
    
    if (index !== -1) {
      requests[index].status = status;
      setStorageItem(STORAGE_KEYS.REVIEW_REQUESTS, requests);
    }
  }
};
