import React from 'react';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { FavoritosProvider } from '../context/FavoritosContext';
import { ThemeProvider, useThemeToggle } from '../hooks/useThemeToggle';


function ThemedLayout() {
  const { theme } = useThemeToggle();

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <FavoritosProvider>
        <ThemedLayout />
      </FavoritosProvider>
    </ThemeProvider>
  );
}
