import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

const MoviesCardList = ({movies, isMoreActive, moreCardsHandler, handleSaveMovie, isSavedMovies}) => {
    let moviesArray;

    if (movies.length > 0) {
        moviesArray = movies.map((item, i) => {
            if(!isSavedMovies) item.movieId = item.id;

            return (
                <MoviesCard
                    country={item.country}
                    director={item.director}
                    movieId={item.movieId.toString()}
                    key={item.movieId}
                    year={item.year}
                    description={item.description}
                    nameEN={item.nameEN}
                    nameRU={item.nameRU}
                    thumbnail={item.thumbnail || "https://api.nomoreparties.co" + item.image.formats.thumbnail.url}
                    duration={item.duration}
                    image={item.image.url ? "https://api.nomoreparties.co" + item.image.url : item.image}
                    trailerLink={item.trailerLink}
                    isSaved={item.isSaved}
                    savedId={item.savedId || item._id}
                    isSavedMovies={isSavedMovies}
                    handleSaveMovie={handleSaveMovie}
                />
            );
        });
    }
    return (
        <>
            <div className="card-list">
                {moviesArray}
            </div>
            {isMoreActive && (
                <div className="card-more-button-container">
                    <button className="card-more-button" onClick={moreCardsHandler}>Ещё</button>
                </div>
            )}
        </>
    );
};

export default MoviesCardList;