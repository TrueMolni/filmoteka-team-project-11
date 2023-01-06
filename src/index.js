import axios from 'axios';
import Notiflix from 'notiflix';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/movie';
export const API_KEY = 'b77b3068ddcc2ce3ea23003328032394';
import './js/api';
import './js/pagination';
import { getTrending } from './js/api';
//import { getById } from './js/getById';
import { getById } from './js/api';
import { createMarkup } from './js/markupListMovies.js';
import './js/localStorage';
import './js/themes';
import './js/searchByKeyWord';
import './js/modalOurTeam';
import './js/modal';
import './js/trailer';

import Spinner from './js/loader';
import './js/scroll';
