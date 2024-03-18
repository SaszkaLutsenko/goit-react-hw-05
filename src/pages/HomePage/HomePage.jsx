import style from './HomePage.module.css';
import { useEffect, useState } from 'react';
import { fetchData } from '../../movies-api';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const { results } = await fetchData('trending/movie/day');
                setMovies(results); 
            } catch (error) {
                toast.error('Please try to refresh the page.', { id: 'error' });
            } finally {
                setIsLoading(false);
            }
        };
        getData();
    }, []);

    return (
        <div>
            <h1 className={style.title}>Discover today's hottest hits</h1> 
            <MovieList movies={movies} />
            {isLoading && <Loader />}
            <Toaster /> 
        </div>
    );
};

export default HomePage;