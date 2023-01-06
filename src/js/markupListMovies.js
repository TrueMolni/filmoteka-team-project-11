
const srcImgBase = 'https://image.tmdb.org/t/p/w500';


function getGenres() {
    const { genres } = {
  "genres": [
    { "id": 28, "name": "Action" },
    { "id": 12, "name": "Adventure" },
    { "id": 16, "name": "Animation" },
    { "id": 35, "name": "Comedy" },
    { "id": 80, "name": "Crime" },
    { "id": 99, "name": "Documentary" },
    { "id": 18, "name": "Drama" },
    { "id": 10751, "name": "Family" },
    { "id": 14, "name": "Fantasy" },
    { "id": 36, "name": "History" },
    { "id": 27, "name": "Horror" },
    { "id": 10402, "name": "Music" },
    { "id": 9648, "name": "Mystery" },
    { "id": 10749, "name": "Romance" },
    { "id": 878, "name": "Science Fiction" },
    { "id": 10770, "name": "TV Movie" },
    { "id": 53, "name": "Thriller" },
    { "id": 10752, "name": "War" },
    { "id": 37, "name": "Western" }
  ]
};
    return genres;
}




const genresConverting = (genresIds) => {
  const genresList = getGenres()
  const genreArray = []
  genresIds.map(genreId => {
    genresList.map(genre => {
      if (genreId === genre.id) {genreArray.push(genre.name)}
    })
  })
  return(genreArray.join(', '));
}



function createMarkup(res) {

  if (res.results.length >= 1) {
    const markup = res.results
      .map(
        ({ id, title, poster_path, genre_ids, release_date, vote_average }) => {
          
          // check for poster
          let poster = '';
          poster_path === null
            ? (poster = '/uc4RAVW1T3T29h6OQdr7zu4Blui.jpg')
            : (poster = poster_path);


          // check  a date

          let relDate = '';
          release_date === '' || release_date === undefined
            ? (relDate = 'No date')
            : (relDate = release_date.slice(0, 4));

          //fix rating

          let voteAverage = vote_average.toFixed(1);

          let genres = new Array(genresConverting(genre_ids));

          let genresMarkup = '';
          if (genres.length === 0) {
            genresMarkup = 'No genres';
          } else if (genres.length < 3) {
            genresMarkup = genres.join(',&nbsp;');
          } else {
            genresMarkup = `${genres[0]}, ${genres[1]}, Others`;
          }

          return `<li class="gallery__item film-card" data-modal-open data-id="${id}">
            <img src="${srcImgBase}${poster}" alt="${title}" class="img" id="${id}" />
            <div class="item__text">
              <h2 class="item__capt">${title}</h2>
              <div class="item__wrap">
                <p class="item__genre">${genresMarkup}|</p>
                <p class="item__rating">${voteAverage}</p>
                <p class="item__genre">${relDate}</p>
              </div>
            </div>
          </li>`;
        }
      )
      .join('');
    return markup;
  }
}
export { createMarkup };
