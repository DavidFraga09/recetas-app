import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MD3LightTheme, MD3DarkTheme, MD3Theme } from 'react-native-paper';

interface ThemeContextType {
  theme: MD3Theme;
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => setIsDarkTheme((prev) => !prev);
  const theme = isDarkTheme ? MD3DarkTheme : MD3LightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeToggle = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useThemeToggle debe usarse dentro de ThemeProvider');
  return context;
};
