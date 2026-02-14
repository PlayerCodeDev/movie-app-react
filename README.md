# 🎬 Movie App React

Demo: [https://movie-app-react-beta-nine.vercel.app](https://movie-app-react-beta-nine.vercel.app)

![imagen de precisualización](./public/preview-img.png)

Aplicación web desarrollada con React que permite buscar películas utilizando la API de The Movie Database (TMDB), visualizar películas populares y mostrar tendencias basadas en busquedas.

## 🚀 Características
* Búsqueda de películas en tiempo real
* Visualización de películas populares
* Sección de películas en tendencia
* cancelación de solicitudes con `AbortController` para evitar *Race Conditions*
* Registro de búsquedas utilizando Appwrite

## 🛠️ Tecnologías utilizadas
* React (Hooks: `useState`, `useEffect)
* JavaScript (ES6+)
* API de TMDB
* Appwrite (para el almacenamiento de búsquedas)
* Vite

## 🧠 Conceptos aplicados
Este proyecto fue desarrollado para mejorar comprención y habilidades con React aplicando conceptos como:
* Creación de *Custom Hooks* (`useMovies`)
* Manejo de asincronía con `async/await`
* Manejo de estado global de componentes
* Cancelación de peticiones HTTP con `AbortController`
* Prevención de *Race Conditions* en llamadas concurrentes.
* Separación de responsabilidades (servicion API, lógica de negocio y UI)

## 📦 Instalación
```bash
git clone https://github.com/PlayerCodeDev/movie-app-react.git
cd movie-app-react
pnpm install
pnpm run dev
```
>[!NOTE]
> Asegúrese de tener Node.js (v18 o superior), pnpm y Git instalados antes de ejecutar el proyecto.

## 🔐 Variables de entorno
Debes crear un archivo `.env` con las siguientes variables de entorno:
```bash
VITE_TMDB_API_KEY=your_api_key
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_TABLE_ID=your_table_id
VITE_APPWRITE_ENDPOINT=endpoint_to_appwrite
```

## 📌 Posibles mejoras
* Paginación de resultados
* Tests unitarios
* Mejoras en diseño UI/UX

## 🎯 Objetivo del proyecto
Este proyecto fue creado con fines educativos para consolidar conocimientos en React y consumo de APIs externas, aplicando buenas pácticas en manejo de asincronía.
