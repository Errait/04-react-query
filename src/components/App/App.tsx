import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import './App.module.css';
import css from '../ErrorMessage/ErrorMessage.module.css';

import SearchBar from '../SearchBar/SearchBar';
import { fetchMovies } from '../../services/movieService';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import Pagination from '../Pagination/Pagination';

import { type Movie } from '../../types/movie';

export default function App() {
  const [searchWord, setSearchWord] = useState<string>('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ['movies', searchWord, currentPage],
    queryFn: () => fetchMovies(searchWord, currentPage),
    enabled: searchWord.trim() !== '',
    placeholderData: keepPreviousData,
  });

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <SearchBar onSubmit={setSearchWord} />

      {isSuccess && totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}

      {error && <ErrorMessage />}

      {!isLoading && movies.length > 0 && (
        <MovieGrid onSelect={handleSelectMovie} movies={movies} />
      )}

      {!isLoading && !error && searchWord && movies.length === 0 && (
        <p className={css.text}>No movies found for your request.</p>
      )}

      {isLoading && <Loader />}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </>
  );
}
