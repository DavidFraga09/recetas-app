import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acerca de esta App de Recetas</Text>
      <Text style={styles.paragraph}>
        Esta aplicación fue desarrollada por <Text style={styles.bold}>David Domínguez Fraga</Text> para el remedial.
      </Text>
      <Text style={styles.paragraph}>
        El propósito de esta app es brindar una herramienta práctica y accesible para descubrir, buscar y guardar recetas de cocina de todo el mundo, fomentando el gusto por preparar platillos deliciosos.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'justify',
    lineHeight: 22,
  },
  bold: {
    fontWeight: 'bold',
  },
});
