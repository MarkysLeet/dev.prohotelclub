import { useState, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { createClient } from './supabase-browser';

export function useFavorites() {
  const { isAuth, user } = useAuth();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const supabase = createClient();

  useEffect(() => {
    let mounted = true;

    async function fetchFavorites() {
      if (!isAuth || !user) {
        if (mounted) setFavorites(new Set());
        return;
      }

      const { data, error } = await supabase
        .from('favorites')
        .select('hotel_id')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching favorites:', error);
        return;
      }

      if (mounted) {
        setFavorites(new Set(data.map(f => f.hotel_id)));
      }
    }

    fetchFavorites();

    return () => {
      mounted = false;
    };
  }, [isAuth, user, supabase]);

  const toggleFavorite = useCallback(async (hotelId: string) => {
    if (!isAuth || !user) {
      // Можно показать тост, что нужно войти
      return;
    }

    // Optimistic update
    setFavorites(prev => {
      const newFavs = new Set(prev);
      if (newFavs.has(hotelId)) {
        newFavs.delete(hotelId);
      } else {
        newFavs.add(hotelId);
      }
      return newFavs;
    });

    // Server update
    const isCurrentlyFavorite = favorites.has(hotelId);

    if (isCurrentlyFavorite) {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('hotel_id', hotelId);

      if (error) {
        console.error('Error removing favorite:', error);
        // Revert on error
        setFavorites(prev => {
          const newFavs = new Set(prev);
          newFavs.add(hotelId);
          return newFavs;
        });
      }
    } else {
      const { error } = await supabase
        .from('favorites')
        .insert({ user_id: user.id, hotel_id: hotelId });

      if (error) {
        console.error('Error adding favorite:', error);
        // Revert on error
        setFavorites(prev => {
          const newFavs = new Set(prev);
          newFavs.delete(hotelId);
          return newFavs;
        });
      }
    }
  }, [isAuth, user, favorites, supabase]);

  return { favorites, toggleFavorite };
}
