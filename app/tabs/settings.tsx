import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { Switch, Text, useTheme } from "react-native-paper";
import { useThemeToggle } from "../../hooks/useThemeToggle";

export default function Settings() {
  const { isDarkTheme, toggleTheme } = useThemeToggle();
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.headerTitle, { color: theme.colors.onSurface }]}>
          Configuración
        </Text>
      </View>
      
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={[styles.settingItem, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.settingContent}>
            <Text style={[styles.settingTitle, { color: theme.colors.onSurface }]}>
              Tema oscuro
            </Text>
            <Text style={[styles.settingDescription, { color: theme.colors.onSurfaceVariant }]}>
              Cambia entre tema claro y oscuro
            </Text>
          </View>
          <Switch 
            value={isDarkTheme} 
            onValueChange={toggleTheme}
            color={theme.colors.primary}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
});