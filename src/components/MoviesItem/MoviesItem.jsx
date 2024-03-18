import styles from './MoviesItem.module.css';

const MoviesItem = ({ movie: { poster_path, title, vote_average, vote_count } }) =>{
    return(
        <div>
            <div className={styles.poster}>
                <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={`${title ? title: 'title not found'} poster`} />
            </div>
            <div className={styles.container}>
                <p className={styles.title}>{title ? title: 'title not found'}</p>
                <div className={styles.rating}>
                    <div className={styles.vote}>{vote_count}</div>
                </div>

            </div>
        </div>
    );
};

export default MoviesItem;