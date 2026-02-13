import { useState, useEffect } from "react";
import { getTrendingMovie, updateSearchCount } from "../appwrite";
import { searchMovies, getPopulaMovies } from "../services/tmdb";

export const useMovies = ( query ) => {
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMovies = async ( query ) => {
    setIsLoading(true);
    setError('');

    try {
      const results = query
        ? await searchMovies(query)
        : await getPopulaMovies();

      setMovies(results);

      if (query && results.length > 0) {
        await updateSearchCount(query, results[0]);
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