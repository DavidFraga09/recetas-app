import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useFavoritos } from '../context/FavoritosContext';
import { Ionicons } from '@expo/vector-icons';

type MealDetail = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  [key: string]: any;
};

export default function DetalleReceta() {
  const { receta } = useLocalSearchParams();
  const [detalle, setDetalle] = useState<MealDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { favoritos, toggleFavorito } = useFavoritos();
  const router = useRouter();

  useEffect(() => {
    if (!receta) {
      setError('No se recibió información de la receta');
      setLoading(false);
      return;
    }

    let recetaObj: MealDetail;
    try {
      recetaObj = JSON.parse(receta as string);
    } catch (err) {
      setError('Error al procesar la información de la receta');
      setLoading(false);
      return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recetaObj.idMeal}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.meals && data.meals.length > 0) {
          setDetalle(data.meals[0]);
        } else {
          setDetalle(recetaObj);
        }
      })
      .catch((err) => {
        console.error('Error fetching details:', err);
        setDetalle(recetaObj);
      })
      .finally(() => setLoading(false));
  }, [receta]);

  const esFavorito = detalle ? favoritos.some((f) => f.idMeal === detalle.idMeal) : false;

  const getIngredientes = () => {
    if (!detalle) return [];
    
    const ingredientes: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingr = detalle[`strIngredient${i}`];
      const medida = detalle[`strMeasure${i}`];
      if (ingr && ingr.trim() !== '') {
        ingredientes.push(`${medida ?? ''} ${ingr}`.trim());
      }
    }
    return ingredientes;
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!detalle) {
    return (
      <View style={styles.center}>
        <Text>No se pudo cargar la receta.</Text>
      </View>
    );
  }

  const ingredientes = getIngredientes();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalle Receta</Text>
        <View style={styles.headerSpacer} />
      </View>
      
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>{detalle.strMeal}</Text>

        <Image source={{ uri: detalle.strMealThumb }} style={styles.imagen} />

        <TouchableOpacity
          style={[styles.botonFavorito, esFavorito ? styles.favActivo : styles.favInactivo]}
          onPress={() => detalle && toggleFavorito(detalle)}
        >
          <Text style={styles.textoBoton}>
            {esFavorito ? '❤️ Quitar Favorito' : '🤍 Agregar Favorito'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.subtitulo}>Ingredientes</Text>
        {ingredientes.map((item, idx) => (
          <Text key={idx} style={styles.ingrediente}>
            • {item}
          </Text>
        ))}

        <Text style={styles.subtitulo}>Instrucciones</Text>
        <Text style={styles.instrucciones}>{detalle.strInstructions}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
    width: 60,
  },
  container: {
    padding: 16,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  imagen: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 12,
  },
  botonFavorito: {
    alignSelf: 'center',
    marginBottom: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  favActivo: {
    backgroundColor: '#f00',
  },
  favInactivo: {
    backgroundColor: '#ccc',
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
  },
  instrucciones: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify',
  },
  ingrediente: {
    fontSize: 16,
    marginBottom: 4,
  },
});