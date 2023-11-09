import React from 'react';

import "./MoviesCard.css";

const MoviesCard = (props) => {
    let save_icon;

    if (props.isSavedMovies) {
        save_icon = <span className="delete-button" ></span>
    } else {
        if(props.isSaved){
            save_icon = <span className="saved-button"></span>
        }else{
            save_icon = <span className="save-button">Сохранить</span>
        }
    }

    return (
        <div className="card">
            <div className="card-container">
                <img src={props.picture} alt={props.title} />
                {save_icon}
                <div className="card-info">
                    <span className="card-title">{props.title}</span>
                    <span className="card-time">{props.time}</span>
                </div>
            </div>
        </div>
    );
};

export default MoviesCard;