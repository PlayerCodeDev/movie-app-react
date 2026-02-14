const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const API_OPTION = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  }
};

const fetchFromTMDB = async ( endpoint, signal ) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...API_OPTION,
    signal
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data from TMDB.');
  }

  return response.json();
};

export const searchMovies = async ( query, signal ) => {
  const data = await fetchFromTMDB(
    `/search/movie?query=${encodeURIComponent(query)}`,
    signal
  );

  return data.results || [];
};

export const getPopularMovies = async ( signal ) => {
  const data = await fetchFromTMDB(
    `/discover/movie?sort_by=popularity.desc`,
    signal
  );

  return data.results || [];
};