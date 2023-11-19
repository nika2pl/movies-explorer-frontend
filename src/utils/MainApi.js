export default class Api {
    constructor(options) {
        this._url = options.baseUrl
        this._headers = options.headers
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }

        // если ошибка, отклоняем промис
        return res.json().then(r => {
            return Promise.reject(r);
        })
    }

    signup(data) {
        return fetch(this._url + '/signup', {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify(data)
        }).then(this._checkResponse)
    }

    signin(data) {
        return fetch(this._url + '/signin', {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify(data)
        }).then(this._checkResponse)
    }

    checkToken() {
        return fetch(this._url + `/users/me`, {
            method: 'GET',
            credentials: "include",
            headers: this._headers
        }).then(this._checkResponse)
    }

    getMovies() {
        return fetch(this._url + `/movies`, {
            method: 'GET',
            credentials: "include",
            headers: this._headers
        }).then(this._checkResponse)
    }

    editProfile(data) {
        return fetch(this._url + `/users/me`, {
            method: 'PATCH',
            credentials: "include",
            headers: this._headers,
            body: JSON.stringify(data)      
        }).then(this._checkResponse)
    }

    saveMovie(data) {
        return fetch(this._url + `/movies`, {
            method: 'POST',
            credentials: "include",
            headers: this._headers,
            body: JSON.stringify(data)      
        }).then(this._checkResponse)
    }

    deleteMovie(movieId) {
        return fetch(this._url + `/movies/` + movieId, {
            method: 'DELETE',
            credentials: "include",
            headers: this._headers
        }).then(this._checkResponse)
    }

    savedMovies() {
        return fetch(this._url + `/movies`, {
            method: 'GET',
            credentials: "include",
            headers: this._headers
        }).then(this._checkResponse)
    }
}  