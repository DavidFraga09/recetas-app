import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export default function CategoriaRecetas() {
  const { categoria } = useLocalSearchParams();
  const [recetas, setRecetas] = useState<Meal[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!categoria) return;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`)
      .then((res) => res.json())
      .then((data) => setRecetas(data.meals || []))
      .catch((err) => console.error('Error cargando recetas:', err));
  }, [categoria]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recetas de {categoria}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.container}>
        <FlatList
          data={recetas}
          keyExtractor={(item) => item.idMeal}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                router.push({
                  pathname: '/detalleReceta',
                  params: { receta: JSON.stringify(item) },
                })
              }
            >
              <Image source={{ uri: item.strMealThumb }} style={styles.img} />
              <Text style={styles.nombre}>{item.strMeal}</Text>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  backButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40, 
  },
  container: { 
    flex: 1, 
    backgroundColor: '#F8F8F8',
  },
  listContainer: {
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  img: { 
    width: 60, 
    height: 60, 
    borderRadius: 10, 
    marginRight: 12 
  },
  nombre: { 
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
});