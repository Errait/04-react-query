import axios from 'axios';
import { type Movie } from '../types/movie';

interface MoviesHttpResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const myKey = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (searchword: string, currentPage: number) => {
  const response = await axios.get<MoviesHttpResponse>(
    `${BASE_URL}/search/movie`,
    {
      params: {
        query: searchword,
        page: currentPage,
      },
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    }
  )

  return response.data
}
