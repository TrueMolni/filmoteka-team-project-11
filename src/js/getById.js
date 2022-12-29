import axios from 'axios';
import {API_KEY} from './key'

export function getById(movieId) {
  return axios
    .get(`/${movieId}`, {
      baseURL: 'https://api.themoviedb.org/3/movie',
      params: { api_key: API_KEY },
    })
    .then(response => response.data);
}