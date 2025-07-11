import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Card, Text, ActivityIndicator, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default function RecetasScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.meals || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching recipes:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator animating color={theme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={recipes}
      keyExtractor={(item) => item.idMeal}
      contentContainerStyle={{ padding: 10 }}
      renderItem={({ item }) => (
        <Card
          style={{ marginBottom: 10 }}
          onPress={() =>
            router.push({ pathname: '/detalleReceta', params: { receta: JSON.stringify(item) } })
          }
        >
          <Card.Cover source={{ uri: item.strMealThumb }} />
          <Card.Content>
            <Text variant="titleMedium">{item.strMeal}</Text>
          </Card.Content>
        </Card>
      )}
    />
  );
}
