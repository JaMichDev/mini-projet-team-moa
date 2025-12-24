import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { lightTheme, darkTheme } from '../theme/muiTheme';

const ThemeContext = createContext();
const STORAGE_KEY = 'sms-theme-mode';

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState(getInitialTheme);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, themeMode);
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  const toggleTheme = () => setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const muiTheme = themeMode === 'dark' ? darkTheme : lightTheme;

  const value = useMemo(() => ({
    themeMode,
    isDark: themeMode === 'dark',
    toggleTheme,
    muiTheme,
  }), [themeMode, muiTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}
