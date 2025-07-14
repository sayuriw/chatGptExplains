import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type HistoryItem = {
  code: string;
  personaId: number;
  explanation: string;
};

type HistoryContextType = {
  history: HistoryItem[];
  addToHistory: (item: HistoryItem) => void;
  clearHistory: () => void;
};

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
  // Load from localStorage, fallback to []
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const stored = localStorage.getItem('history');
    return stored ? JSON.parse(stored) as HistoryItem[] : [];
  });

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  const addToHistory = (item: HistoryItem) => {
    setHistory(prev => [...prev, item]);
  };

  // Clear history from state and localStorage
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('history');
  };

  return (
    <HistoryContext.Provider value={{ history, addToHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};
