import { useState, useEffect } from "react";
import { getTrendingMovie, updateSearchCount } from "../appwrite";

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const API_OPTION = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  }
};

export const useMovies = ( query ) => {
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMovies = async ( query ) => {
    setIsLoading(true);
    setError('');

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      
      const response = await fetch(endpoint, API_OPTION);

      if (!response.ok) {
        throw new Error('Failed to fetch movies.');
      }

      const data = await response.json();

      setMovies(data.results || []);

      if (query && data.results?.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }

    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('Error fetching movies. Please try again later.');
      setMovies([]); 
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try{
      const movies = await getTrendingMovie();
      setTrendingMovies(movies);
    } catch (err) {
      console.error('Error fetching trending movies:', err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [query]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return {
    movies,
    trendingMovies,
    isLoading,
    error,
  };

};