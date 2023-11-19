import React, { useState, useEffect } from "react";

import "./MoviesCard.css";
import Api from '../../utils/MainApi'

const MoviesCard = (props) => {
    const api = new Api({
        baseUrl: 'http://localhost:3000',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const getTimeFromMins = (mins) => {
        let hours = Math.trunc(mins / 60);
        let minutes = mins % 60;
        return hours + 'ч ' + minutes + 'м';
    };

    let save_icon;
    const [isSaved, setIsSaved] = useState(false);
    const [savedId, setSavedId] = useState('');

    const movieData = {
        country: props.country,
        director: props.director,
        movieId: props.movieId,
        year: props.year,
        description: props.description,
        nameEN: props.nameEN,
        nameRU: props.nameRU,
        thumbnail: props.thumbnail,
        duration: props.duration,
        image: props.image,
        trailerLink: props.trailerLink,
    };

    const {
        isSavedMovies,
        isSavedId
    } = props;

    useEffect(() => {
        setIsSaved(props.isSaved);
        setSavedId(isSavedId)
    }, [props.isSaved]);

    const handleSaveMovie = (event) => {
        if (!isSaved) {
            api.saveMovie(movieData).then((data) => {
                setSavedId(data._id);
                setIsSaved(true);
            }).catch((err) => {
                console.log(err)
            })
        } else {
            api.deleteMovie(savedId).then((data) => {
                save_icon = <span className="saved-button" onClick={handleSaveMovie}></span>
                setIsSaved(false);
                if (isSavedMovies) {
                    let card = event.target.parentNode.parentNode;
                    card.remove();
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    }
    let saved_icon;

    saved_icon = <span className="saved-button" onClick={handleSaveMovie}></span>
    save_icon = <span className="save-button" onClick={handleSaveMovie}>Сохранить</span>

    if (isSavedMovies) {
        saved_icon = <span className="delete-button" onClick={handleSaveMovie}></span>
    }

    return (
        <div className="card">
            <span className="card-container">
                <a href={movieData.trailerLink} className="cord-info-trailer-link" target="_blank" rel="noreferrer">
                    <img src={movieData.image} alt={movieData.nameRU} />

                    <div className="card-info">
                        <span className="card-title">{movieData.nameRU}</span>
                        <span className="card-time">{getTimeFromMins(movieData.duration)}</span>
                    </div>
                </a>
                {isSaved ? saved_icon : save_icon}
            </span>
        </div>
    );
};

export default MoviesCard;