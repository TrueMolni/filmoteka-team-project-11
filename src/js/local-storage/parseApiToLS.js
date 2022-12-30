const trimYear = (fullDate) => {
    if (!fullDate) return ''
    return fullDate.slice(0, 4);
}

const getGenres = (genres) => {
    let genresArr = genres.map(genres => genres.name);
    if(genresArr.length > 2) {
        console.log(genresArr.slice(0,3))

        return genresArr.slice(0,3);
    }
    return genresArr;
}


// Функція для парсингу карточки одного фільму для збереження в Local Storage
export const parseOneFilm = (film) => {
    return {
        id: film.id,
        poster_path: film.poster_path,
        title: film.title,
        original_title: film.original_title,
        vote_average: film.vote_average,
        genres: getGenres(film.genres),
        year: trimYear(film.release_date),
    };
}