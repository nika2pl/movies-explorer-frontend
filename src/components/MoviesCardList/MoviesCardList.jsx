import React, { useEffect, useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Api from '../../utils/MainApi'

const MoviesCardList = (props) => {
    const [moviesData, setMoviesData] = useState([]);

    const api = new Api();

    useEffect(() => {
        api.savedMovies().then((data) => {
            setMoviesData(data)
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const movies = props.movies.map((item, i) => {
        let isSavedId, isSaved;

        if (props.isSavedMovies) {
            isSaved = true;
            isSavedId = item._id;
        } else {
            isSaved = moviesData.some((movie) => movie.movieId === item.id);

            if (isSaved) {
                isSavedId = moviesData.filter((movie) => movie.movieId === item.id)[0]._id;
            }
        }

        return (
            <MoviesCard
                country={item.country}
                director={item.director}
                movieId={item.movieId ? item.movieId.toString() : item.id.toString()}
                year={item.year}
                description={item.description}
                nameEN={item.nameEN}
                nameRU={item.nameRU}
                thumbnail={item.thumbnail || "https://api.nomoreparties.co" + item.image.formats.thumbnail.url}
                duration={item.duration}
                image={item.image.url ? "https://api.nomoreparties.co" + item.image.url : item.image}
                trailerLink={item.trailerLink}
                isSaved={isSaved}
                isSavedId={isSavedId}
                isSavedMovies={props.isSavedMovies}
                key={i}
            />
        );
    });

    return (
        <>
            <div className="card-list">
                {movies}
            </div>
            {props.isMoreActive && (
                <div className="card-more-button-container">
                    <button className="card-more-button" onClick={props.moreCardsHandler}>Ещё</button>
                </div>
            )}
        </>
    );
};

export default MoviesCardList;