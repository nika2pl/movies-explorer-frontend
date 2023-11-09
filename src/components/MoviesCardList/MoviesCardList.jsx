import React from 'react';
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = (props) => {
    const movies = props.movies.map((item, i) => {
        return (
            <MoviesCard title={item.title} time={item.time} picture={item.picture} isSaved={item.isSaved} isSavedMovies={props.isSavedMovies} />
        );
    });

    return (
        <>
            <div className="card-list">
                {movies}
            </div>
            {movies.length > 6 && (
                <div class="card-more-button-container">
                    <div class="card-more-button">Ещё</div>
                </div>
            )}
        </>
    );
};

export default MoviesCardList;