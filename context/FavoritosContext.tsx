import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type ContextType = {
  favoritos: Meal[];
  toggleFavorito: (meal: Meal) => void;
};

const FavoritosContext = createContext<ContextType | undefined>(undefined);

const STORAGE_KEY = '@favoritos_meals';

export const FavoritosProvider = ({ children }: { children: ReactNode }) => {
  const [favoritos, setFavoritos] = useState<Meal[]>([]);

  // Cargar favoritos al iniciar la app
  useEffect(() => {
    (async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (jsonValue != null) {
          setFavoritos(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error('Error cargando favoritos', e);
      }
    })();
  }, []);

  // Guardar favoritos cuando cambian
  useEffect(() => {
    (async () => {
      try {
        const jsonValue = JSON.stringify(favoritos);
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      } catch (e) {
        console.error('Error guardando favoritos', e);
      }
    })();
  }, [favoritos]);

  const toggleFavorito = (meal: Meal) => {
    const existe = favoritos.find((f) => f.idMeal === meal.idMeal);
    setFavoritos(existe ? favoritos.filter((f) => f.idMeal !== meal.idMeal) : [...favoritos, meal]);
  };

  return (
    <FavoritosContext.Provider value={{ favoritos, toggleFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
};

export const useFavoritos = () => {
  const context = useContext(FavoritosContext);
  if (!context) throw new Error('useFavoritos debe usarse dentro de FavoritosProvider');
  return context;
};
