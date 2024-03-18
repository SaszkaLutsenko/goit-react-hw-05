import styles from './MovieCast.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../Loader/Loader';
import { fetchData } from '../../movies-api';

const MovieCast = () => {
    const [credits, setCredits] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { movieId } = useParams();

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const { cast } = await fetchData(`movie/${movieId}/credits`);
                const castArray = Object.entries(cast).map(([id, details]) => ({ id, ...details }));
                setCredits(castArray);
            } catch (error) {
                toast.error('Please try to refresh the page.', { id: 'error' });
            } finally {
                setIsLoading(false);
            }
        };
        getData();
    }, [movieId]);

    return (
        <div>
            <ul className={styles.list}>
                {credits.map(({ id, name, character, profile_path }) => (
                    <li key={id}>
                        <div className={styles.img}>
                            <img src={`https://image.tmdb.org/t/p/w500/${profile_path}`} alt={name ? name : 'no information'} />
                        </div>
                        <div className={styles.actor}>
                            <span className={styles.name}>{name ? name : 'no information'}</span>
                            <span className={styles.character}>{character ? character : 'no information'}</span>
                        </div>
                    </li>
                ))}
            </ul>
            {isLoading && <Loader />}
            <Toaster />
        </div>
    );
};

export default MovieCast;