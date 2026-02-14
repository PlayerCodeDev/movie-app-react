import { useState, useEffect } from "react";
import { getTrendingMovie, updateSearchCount } from "../appwrite";
import { searchMovies, getPopularMovies } from "../services/tmdb";

export const useMovies = ( query ) => {
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const loadTrendingMovies = async () => {
    try{
      const movies = await getTrendingMovie();
      setTrendingMovies(movies);
    } catch (err) {
      console.error('Error fetching trending movies:', err);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    const loadMovies = async () => {
      setIsLoading(true);
      setError('');

      try {
        const results = query
          ? await searchMovies(query, controller.signal)
          : await getPopularMovies(controller.signal);

        setMovies(results);

        if (query && results.length > 0) {
          await updateSearchCount(query, results[0]);
        }

      } catch (err) {
        if (err.name === 'AbortError') {
          return;
        }

        console.error('Error fetching movies:', err);
        setError('Error fetching movies. Please try again later.');
        setMovies([]); 
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();

    return () => {
      controller.abort();
    }
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