import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  StyleSheet,
  SafeAreaView,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { useFavoritos } from '../../context/FavoritosContext';

export default function Favoritos() {
  const { favoritos, toggleFavorito } = useFavoritos();
  const router = useRouter();

  const handleEliminarFavorito = (item: any) => {
    Alert.alert(
      'Eliminar favorito',
      `¿Estás seguro de que quieres eliminar "${item.strMeal}" de tus favoritos?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            toggleFavorito(item);
            Alert.alert('Receta eliminada', 'Se quitó de favoritos');
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: any }) => (
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
        <Text style={styles.itemNombre} numberOfLines={2}>{item.strMeal}</Text>
        
        <TouchableOpacity 
          onPress={() => handleEliminarFavorito(item)}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favoritos</Text>
      </View>
      
      {favoritos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>💔</Text>
          <Text style={styles.emptyTitle}>No tienes favoritos</Text>
          <Text style={styles.emptyText}>
            Agrega recetas a tus favoritos para verlas aquí
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item) => item.idMeal}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  itemContent: {
    flex: 1,
    marginLeft: 12,
  },
  itemNombre: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: '#FF6D6D',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});