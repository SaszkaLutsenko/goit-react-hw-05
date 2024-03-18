import { useEffect, useState } from 'react';
import SearchBox from '../../components/SearchBox/SearchBox';
import { fetchData } from '../../movies-api';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';
import { useSearchParams } from 'react-router-dom';
import style from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!query) return;
    const getData = async () => {
      try {
        setIsLoading(true);
        const { results } = await fetchData('search/movie', { query });
        if (results.length === 0 && query !== '') {
          toast("Sorry, we couldn't find anything", { id: 'notFound', duration: 2000 });
          return;
        }
        setMovies(results);
      } catch (error) {
        toast.error('Try reloading the page', { id: 'error' });
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query]);

  return (
    <div>
     <p className={style.text}>
We will help you find something interesting to watch. Enter a keyword to search for.
</p>
      <SearchBox />
      {movies.length > 0 && <MovieList movies={movies} />}
      {isLoading && <Loader />}
      <Toaster />
    </div>
  );
};

export default MoviesPage;

