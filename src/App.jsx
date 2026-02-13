// import React from 'react';
import { useState } from 'react';
import { useDebounce } from 'react-use';
import Search from './components/Search.jsx';
import Spinner from './components/Spinner.jsx';
import MovieCard from './components/MovieCard.jsx';
import { useMovies } from './hooks/useMovies.js';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm]);

  const {
    movies,
    trendingMovies,
    isLoading,
    error
  } = useMovies(debouncedSearchTerm);

  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>

        <header>
          <img src="./hero-img.png" alt="Hero banner" />
          <h1>
            Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className='trending'>
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => {
                return (
                  <li key={movie.$id}>
                    <p>{index + 1}</p>
                    <img src={movie.poster_url} alt={movie.title} />
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        <section className='all-movies'>
          <h2 className='mt-4'>All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : error ? (
            <p className='text-red-500'>{error}</p>
          ) : (
            <ul>
              {movies.map((movie) => (
                  <MovieCard movie={movie} key={movie.id}/>
              ))};
            </ul>
          )}
        </section>
      </div>
    </main>
  )
};

export default App;