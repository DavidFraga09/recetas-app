import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useFavoritos } from '../../context/FavoritosContext';

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export default function Buscar() {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { favoritos, toggleFavorito } = useFavoritos();

  const buscarAPI = async (texto: string) => {
    setBusqueda(texto);
    setError(null);
    
    if (texto.trim() === '') {
      setResultados([]);
      return;
    }
    setLoading(true);
    
    try {
      const resp = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(texto)}`
      );
      
      if (!resp.ok) throw new Error('Error al buscar recetas');
      
      const data = await resp.json();
      setResultados(data.meals || []);
      
      if (!data.meals) {
        setError('No se encontraron recetas');
      }
    } catch (error) {
      console.error('Error en búsqueda:', error);
      setError('Error al conectar con el servidor');
      setResultados([]);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Meal }) => {
    const esFavorito = favoritos.some((f) => f.idMeal === item.idMeal);
    
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => router.push({
          pathname: '/detalleReceta',
          params: { receta: JSON.stringify(item) }
        })}
      >
        <Image 
          source={{ uri: item.strMealThumb }} 
          style={styles.itemImage} 
          resizeMode="cover"
        />
        
        <View style={styles.itemContent}>
          <Text style={styles.itemNombre} numberOfLines={1}>{item.strMeal}</Text>
          
          <TouchableOpacity 
            onPress={() => {
              toggleFavorito(item);
              Alert.alert(
                esFavorito ? 'Receta eliminada' : 'Receta guardada',
                esFavorito ? 'Se quitó de favoritos' : 'Se agregó a favoritos'
              );
            }}
            style={styles.favButton}
          >
            <Text style={[styles.favIcon, esFavorito && styles.favIconActive]}>
              {esFavorito ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Buscar</Text>
      </View>
      
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <TextInput
          placeholder="Buscar receta..."
          placeholderTextColor="#888"
          value={busqueda}
          onChangeText={buscarAPI}
          style={styles.input}
          clearButtonMode="while-editing"
          returnKeyType="search"
        />
        
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF6D6D" />
          </View>
        )}
        
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        
        {!loading && !error && resultados.length === 0 && busqueda.trim() !== '' && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay resultados para "{busqueda}"</Text>
          </View>
        )}
        
        <FlatList
          data={resultados}
          keyExtractor={(item) => item.idMeal}
          renderItem={renderItem}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            !loading && busqueda.trim() === '' ? (
              <View style={styles.initialContainer}>
                <Text style={styles.initialText}>
                  Busca recetas por nombre...
                </Text>
              </View>
            ) : null
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    backgroundColor: '#FFF',
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
    color: '#333',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  itemNombre: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  favButton: {
    padding: 8,
  },
  favIcon: {
    fontSize: 20,
  },
  favIconActive: {
    color: '#FF6D6D',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorContainer: {
    padding: 20,
    backgroundColor: '#FFEBEE',
    borderRadius: 10,
    marginTop: 10,
  },
  errorText: {
    color: '#D32F2F',
    textAlign: 'center',
  },
  emptyContainer: {
    padding: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },
  initialContainer: {
    padding: 40,
    alignItems: 'center',
  },
  initialText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
  },
});