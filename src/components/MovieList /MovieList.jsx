import styles from './MovieList.module.css';
import MoviesItem from '../MoviesItem/MoviesItem';
import { Link, useLocation } from 'react-router-dom';

const MovieList = ({ movies }) => {
    const location = useLocation();

    return(
        <ul className={styles.list}>
            {movies.map(movie => (
                <li key={movie.id}>
                    <Link to={`/movies/${movie.id}`} state={location}>
                        <MoviesItem movie={movie} />
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default MovieList