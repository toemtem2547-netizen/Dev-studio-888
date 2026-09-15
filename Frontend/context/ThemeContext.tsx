'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    const saved = (localStorage.getItem('nexus_theme') as Theme) || 'dark';
    setThemeState(saved);
    document.documentElement.setAttribute('data-theme', saved);
    const meta = document.getElementById('themeColorMeta') as HTMLMetaElement | null;
    if (meta) meta.content = saved === 'dark' ? '#070B14' : '#F8FAFC';
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('nexus_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    const meta = document.getElementById('themeColorMeta') as HTMLMetaElement | null;
    if (meta) meta.content = newTheme === 'dark' ? '#070B14' : '#F8FAFC';
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
