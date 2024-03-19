import axios from 'axios';


const TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmE5ZmVkMzMyNDcwNWI0NzI3MTAwZDVhNGU1MjZkYSIsInN1YiI6IjY1ZjE1NDY3NDcwZWFkMDE2MjliZjEzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-OPruoXAPAfqDe3zTWMoDqNHzREFdPQ9bfbyG0BfiTE';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.headers['Authorization'] = 'Bearer ' + TOKEN;

export const fetchData = async (path = '', newParams = {}) => {
  const { data } = await axios.get(path, {
    params: {
      language: 'en-US',
      ...newParams,
    },
  });
  return data;
};

export const imgBaseURL = 'https://image.tmdb.org/t/p/w500';

