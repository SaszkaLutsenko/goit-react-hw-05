import styles from './MovieReviews.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../Loader/Loader';
import { fetchData } from '../../movies-api';

// Окремий компонент для відображення інформації про рецензії
const ReviewItem = ({ id, content, authorDetails }) => {
    const { name, username, avatar_path } = authorDetails || {};
    return (
        <li key={id}>
            <div className={styles.container}>
                <div className={styles.user}>
                    {typeof avatar_path === 'string' && (
                        <img
                            className={styles.avatar}
                            src={`https://image.tmdb.org/t/p/w500/${avatar_path}`}
                            alt={`${name ? name : 'no information'} avatar`}
                        />
                    )}
                    <div>
                        <span className={styles.username}>@{username ? username : 'no information'}</span>
                    </div>
                </div>
            </div>
            <div className={styles.containerContent}>
                <p className={styles.comment}>{content}</p>
            </div>
        </li>
    );
};

const MovieReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { movieId } = useParams();

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const { results } = await fetchData(`movie/${movieId}/reviews`);
                setReviews(results);
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
            {isLoading && <Loader />}
            <ul className={styles.list}>
                {reviews.length > 0 ? (
                    reviews.map(({ id, content, author_details }) => (
                        <ReviewItem key={id} content={content} authorDetails={author_details} />
                    ))
                ) : (
                    <div>There are no reviews of it.</div>
                )}
            </ul>
            <Toaster />
        </div>
    );
};

export default MovieReviews;