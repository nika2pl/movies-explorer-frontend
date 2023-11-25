import React from "react";
import "./MoviesCard.css";

const MoviesCard = ({
    isSavedMovies,
    savedId,
    isSaved,
    handleSaveMovie,
    country,
    director,
    movieId,
    year,
    description,
    nameEN,
    nameRU,
    thumbnail,
    duration,
    image,
    trailerLink,
}) => {
    let icon;

    const getTimeFromMins = (mins) => {
        let hours = Math.trunc(mins / 60);
        let minutes = mins % 60;
        return hours + 'ч ' + minutes + 'м';
    };

    const movieData = {
        country: country,
        director: director,
        movieId: movieId,
        year: year,
        description: description,
        nameEN: nameEN,
        nameRU: nameRU,
        thumbnail: thumbnail,
        duration: duration,
        image: image,
        trailerLink: trailerLink,
    };

    if (isSavedMovies) {
        icon = <span className="delete-button" data-issaved={1} data-savedid={savedId} onClick={handleSaveMovie}></span>
    } else {
        if (isSaved) {
            icon = <span className="saved-button" data-moviedata={JSON.stringify(movieData)} data-issaved={1} data-savedid={savedId} onClick={handleSaveMovie}></span>
        } else {
            icon = <span className="save-button" data-moviedata={JSON.stringify(movieData)} data-issaved={0} onClick={handleSaveMovie}>Сохранить</span>
        }
    }

    return (
        <React.Fragment key={movieId}>
            <div className="card" key={movieId}>
                <span className="card-container">
                    <a href={movieData.trailerLink} className="cord-info-trailer-link" target="_blank" rel="noreferrer">
                        <img src={movieData.image} alt={movieData.nameRU} />

                        <div className="card-info">
                            <span className="card-title">{movieData.nameRU}</span>
                            <span className="card-time">{getTimeFromMins(movieData.duration)}</span>
                        </div>
                    </a>
                    {icon}
                </span>
            </div>
        </React.Fragment>
    );
};

export default MoviesCard;