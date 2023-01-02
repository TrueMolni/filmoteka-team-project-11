const trimYear = (fullDate) => {
    if (!fullDate) return ''
    return fullDate.slice(0, 4);
}

const roundedVoteAverage = function(voteAverage){
    return voteAverage.toFixed(1)
    // return Math.round(parseFloat(voteAverage) * 100) / 100;
}

const getGenres = (genres) => {
    let genresArr = genres.map(genres => genres.name);
    if(genresArr.length > 3) {
        array = genresArr.slice(0,2);
        array[array.length] = 'Other';
        return array.join(', ');
    }
    return genresArr.join(', ');
}



export const parseOneFilm = (film) => {
    return {
        id: film.id,
        poster_path: film.poster_path,
        title: film.title,
        original_title: film.original_title,
        vote_average: roundedVoteAverage(film.vote_average),
        genres: getGenres(film.genres),
        year: trimYear(film.release_date),
    };
}