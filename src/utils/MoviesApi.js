export default class MoviesApi {
    constructor(options) {
        this._headers = {
            "Content-Type": "application/json",
        }
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getMovies() {
        return fetch('https://api.nomoreparties.co/beatfilm-movies', {
            method: 'GET',
            headers: this._headers
        }).then(this._checkResponse)
    }
}  