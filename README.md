# Recetas App

Aplicación móvil para buscar, explorar y guardar recetas de cocina.


## API utilizada

Esta app consume la API pública de [TheMealDB](https://www.themealdb.com/api.php), que ofrece información sobre recetas, ingredientes, categorías y detalles de platillos de todo el mundo.

Endpoints principales usados:

- `/search.php?s=` — Buscar recetas por nombre.
- `/filter.php?c=` — Filtrar recetas por categoría.
- `/categories.php` — Listado de categorías de recetas.
- `/lookup.php?i=` — Detalles extendidos de una receta por su ID.

---

## Estructura básica del proyecto

- `/app` — Carpeta principal con las pantallas y componentes.
  - `(tabs)/_layout.tsx` — Layout principal con navegación Bottom Tabs y Stack Navigation.
  - `recetas.tsx` — Pantalla de lista de recetas.
  - `buscar.tsx` — Pantalla para buscar recetas por nombre.
  - `favoritos.tsx` — Pantalla con recetas guardadas como favoritas.
  - `settings.tsx` — Pantalla de ajustes (tema claro/oscuro).
  - `categorias.tsx` — Pantalla para ver las categorías disponibles.
  - `about.tsx` — Pantalla con información del desarrollador y propósito del proyecto.
  - `detalleReceta.tsx` — Pantalla con detalles completos y pasos de la receta seleccionada.

- `/context` — Contextos React para estado global.
  - `FavoritosContext.tsx` — Manejo de recetas favoritas con persistencia local.

- `/hooks`
  - `useThemeToggle.tsx` — Contexto y lógica para cambiar entre tema claro y oscuro usando react-native-paper.


## Tecnologías usadas

- React Native + Expo Router
- React Native Paper para UI y temas
- React Navigation para navegación Stack y Tabs
- API pública TheMealDB

## Autor

David Domínguez Fraga

## Propósito

Este proyecto fue desarrollado como parte de un trabajo, con el fin de aprender consumo de APIs, navegación avanzada en React Native y manejo de estado global con context.

