import style from './MovieDetailsPage.module.css'; 
import { Suspense, useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { fetchData } from '../../movies-api';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';
import BackLink from '../../components/BackLink/BackLink';
import clsx from 'clsx';

const buildLinkClass = ({ isActive }) => {
  return clsx(style.link, isActive && style.isActive); 
};

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/');
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMovieById = async () => {
      try {
        setIsLoading(true);
        const data = await fetchData(`movie/${movieId}`);
        setMovie(data);
      } catch (error) {
        toast.error('Please try to refresh the page.', { id: 'error' });
      } finally {
        setIsLoading(false);
      }
    };
    getMovieById();
  }, [movieId]);

  if (!movie) {
    return null; 
  }

  return (
    <div>
      <BackLink to={backLinkRef.current} />
      <div className={style.movieInfoContainer}> 
        <div className={style.poster}>
          <img src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`} alt={`${movie?.title} poster`} />
        </div>
        <div className={style.movieDesc}>
          <p className={style.title}>{movie?.title}</p>
          <p className={style.overview}>{movie?.overview}</p>
          <div className={style.genres}>
            <span className={style.bold}>Genres: </span>
            {movie?.genres.map(({ name }) => name).join(', ')}
          </div>
          <div className={style.extraInfo}>
            <div className={style.date}>
              <span className={style.bold}>Release date: </span> {movie?.release_date}
            </div>
          </div>
        </div>
      </div>

      <nav className={style.navigation}> 
        <NavLink to="cast" className={buildLinkClass}>
          Cast
        </NavLink>
        <NavLink to="reviews" className={buildLinkClass}>
          Reviews
        </NavLink>
      </nav>

      <div>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>

      {isLoading && <Loader />}
      <Toaster />
    </div>
  );
};

export default MovieDetailsPage;