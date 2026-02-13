const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const API_OPTION = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  }
};

const fetchFromTMDB = async ( endpoint ) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, API_OPTION);

  if (!response.ok) {
    throw new Error('Failed to fetch data from TMDB.');
  }

  return response.json();
};

export const searchMovies = async ( query ) => {
  const data = await fetchFromTMDB(
    `/search/movie?query=${encodeURIComponent(query)}`
  );

  return data.results || [];
};

export const getPopulaMovies = async () => {
  const data = await fetchFromTMDB(
    `/discover/movie?sort_by=popularity.desc`
  );

  return data.results || [];
};