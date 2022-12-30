import axios from 'axios';
import { API_KEY } from './key.js';
let currentPage = 1;

export async function getTrending(currentPage) {
  try {
    const resTrending = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${currentPage}`
    );
    return await resTrending.data;
  } catch (error) {
    console.log(error);
  }
}
