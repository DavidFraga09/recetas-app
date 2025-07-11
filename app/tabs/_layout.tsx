import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { PaperProvider, useTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Recetas from './recetas';
import Buscar from './buscar';
import Favoritos from './favoritos';
import Settings from './settings';
import DetalleReceta from '../detalleReceta';
import Categorias from './categorias'; 
import About from '../about';

import { FavoritosProvider } from '../../context/FavoritosContext';
import { ThemeProvider, useThemeToggle } from '../../hooks/useThemeToggle';
import { useNavigationContainerRef } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function RecetasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListaRecetas"
        component={Recetas}
        options={({ navigation }) => ({
          title: 'Recetas',
          headerRight: () => <MenuOpciones navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="DetalleReceta"
        component={DetalleReceta}
        options={{ title: 'Detalle de receta' }}
      />
      <Stack.Screen
        name="Categorias"
        component={Categorias}
        options={{ title: 'Categorías' }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{ title: 'Acerca de' }}
      />
    </Stack.Navigator>
  );
}

function MyTabs() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
        },
      }}
    >
      <Tab.Screen
        name="Recetas"
        component={RecetasStack}
        options={{
          title: 'Recetas',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="cutlery" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Buscar"
        component={Buscar}
        options={{
          title: 'Buscar',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={Favoritos}
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="gear" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Componente del menu 
function MenuOpciones({ navigation }: { navigation: any }) {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setVisible(true)} style={{ paddingHorizontal: 15 }}>
        <Text style={{ fontSize: 24 }}>☰</Text>
      </TouchableOpacity>

      <Modal transparent visible={visible} animationType="fade">
        <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.menu}>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
                navigation.navigate('Categorias');
              }}
            >
              <Text style={styles.item}>Categorías</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
                navigation.navigate('About');
              }}
            >
              <Text style={styles.item}>Acerca de</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
                navigation.navigate('Settings');
              }}
            >
              <Text style={styles.item}>Configuración</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

function InnerLayout() {
  const { theme } = useThemeToggle();

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <MyTabs />
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default function TabsLayout() {
  return (
    <ThemeProvider>
      <FavoritosProvider>
        <InnerLayout />
      </FavoritosProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 30 : 50,
    paddingLeft: 16,
  },
  menu: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    elevation: 5,
    width: 180,
  },
  item: {
    paddingVertical: 10,
    fontSize: 16,
  },
});
