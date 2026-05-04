import useSWR from 'swr';
import { api, Comment, Notification } from './api';

export function useComments(hotelSlug: string) {
  const { data, error, mutate, isValidating } = useSWR<Comment[]>(
    hotelSlug ? `/api/comments/${hotelSlug}` : null,
    () => api.getComments(hotelSlug),
    {
      revalidateOnFocus: false, // Don't refetch on every window focus
      dedupingInterval: 5000,   // Don't refetch if the last fetch was within 5 seconds
    }
  );

  return {
    comments: data || [],
    isLoading: !error && data === undefined,
    isError: error,
    isValidating,
    mutate
  };
}

export function useNotifications(userId: string | undefined) {
  const { data, error, mutate, isValidating } = useSWR<Notification[]>(
    userId ? `/api/notifications/${userId}` : null,
    () => api.getNotifications(userId!),
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  return {
    notifications: data || [],
    isLoading: !error && data === undefined,
    isError: error,
    isValidating,
    mutate
  };
}
