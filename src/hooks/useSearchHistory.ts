"use client";
import { useState, useEffect } from 'react';

const SEARCH_HISTORY_KEY = 'prohotelclub_search_history';
const MAX_HISTORY = 5;

export function useSearchHistory() {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
      if (stored) {
        setTimeout(() => setHistory(JSON.parse(stored)), 0);
      }
    } catch (e) {
      console.error('Failed to load search history', e);
    }
  }, []);

  const addSearch = (query: string) => {
    const q = query.trim();
    if (!q) return;

    setHistory((prev) => {
      const newHistory = [q, ...prev.filter((h) => h !== q)].slice(0, MAX_HISTORY);
      try {
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
      } catch (e) {
        console.error('Failed to save search history', e);
      }
      return newHistory;
    });
  };

  const removeSearch = (query: string) => {
    setHistory((prev) => {
      const newHistory = prev.filter((h) => h !== query);
      try {
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
      } catch (e) {
        console.error('Failed to save search history', e);
      }
      return newHistory;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(SEARCH_HISTORY_KEY);
    } catch (e) {
      console.error('Failed to clear search history', e);
    }
  };

  return { history, addSearch, removeSearch, clearHistory };
}
