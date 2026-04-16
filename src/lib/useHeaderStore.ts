import { useSyncExternalStore } from 'react';

interface HeaderState {
  title: string | null;
  showBack: boolean;
}

let state: HeaderState = {
  title: null,
  showBack: false,
};

const listeners = new Set<() => void>();

export const headerStore = {
  setState: (newState: Partial<HeaderState>) => {
    state = { ...state, ...newState };
    listeners.forEach((listener) => listener());
  },
  reset: () => {
    state = { title: null, showBack: false };
    listeners.forEach((listener) => listener());
  },
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot: () => state,
};

export function useHeaderStore() {
  return useSyncExternalStore(headerStore.subscribe, headerStore.getSnapshot, headerStore.getSnapshot);
}
