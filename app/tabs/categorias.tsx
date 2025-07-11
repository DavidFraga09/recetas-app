import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

type Categoria = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

export default function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then((res) => res.json())
      .then((data) => {
        setCategorias(data.categories || []);
      })
      .catch((error) => {
        console.error('Error cargando categorías:', error);
      });
  }, []);

  const renderItem = ({ item }: { item: Categoria }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        router.push({
          pathname: '/categoriaRecetas',
          params: { categoria: item.strCategory },
        })
      }
    >
      <Text style={styles.texto}>{item.strCategory}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Categorías disponibles</Text>
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.idCategory}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  item: {
    padding: 14,
    backgroundColor: '#eee',
    marginBottom: 8,
    borderRadius: 8,
  },
  texto: { fontSize: 18 },
});
