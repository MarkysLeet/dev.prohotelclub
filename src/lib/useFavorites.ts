import { useState, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';

export function useFavorites() {
  const { isAuth } = useAuth();

  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Читаем из localStorage после монтирования компонента
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (typeof window !== 'undefined' && isAuth) {
      const stored = localStorage.getItem('prohotelclub_favorites');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          timeoutId = setTimeout(() => {
            setFavorites(new Set(parsed));
          }, 0);
        } catch (error) {
          console.error('Failed to parse favorites', error);
        }
      }
    } else if (!isAuth) {
      timeoutId = setTimeout(() => {
        setFavorites(new Set());
      }, 0);
    }

    return () => clearTimeout(timeoutId);
  }, [isAuth]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => {
      const newFavs = new Set(prev);
      if (newFavs.has(id)) {
        newFavs.delete(id);
      } else {
        newFavs.add(id);
      }

      if (isAuth && typeof window !== 'undefined') {
        localStorage.setItem('prohotelclub_favorites', JSON.stringify(Array.from(newFavs)));
      }

      return newFavs;
    });
  }, [isAuth]);

  return { favorites, toggleFavorite };
}
