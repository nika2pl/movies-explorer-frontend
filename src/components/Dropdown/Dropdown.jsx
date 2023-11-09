import React, { useState } from "react";
import "./Dropdown.css";
import { NavLink } from "react-router-dom";

const Dropdown = () => {
    const [isDropdownMenuOpened, setisDropdownMenuOpened] = useState(false);

    function handleClick() {
        setisDropdownMenuOpened(isDropdownMenuOpened => !isDropdownMenuOpened);
        console.log(isDropdownMenuOpened)
    }

    return (
        <>
            <div className="dropdown-button" onClick={handleClick}>
            </div>

            <div className={"dropdown-menu " + (isDropdownMenuOpened ? 'dropdown-menu__opened' : ' ')}>
                <button className="dropdown-menu__close-button" onClick={handleClick}/>

                <ul className="dropdown-menu__links">
                    <li>
                        <NavLink to="/" className={({ isActive }) => `dropdown-menu__link ${isActive ? 'dropdown-menu__link_active' : ''}`}>Главная</NavLink>
                    </li>
                    <li>
                        <NavLink to="/movies" className={({ isActive }) => `dropdown-menu__link ${isActive ? 'dropdown-menu__link_active' : ''}`}>Фильмы</NavLink>
                    </li>
                    <li>
                        <NavLink to="/saved-movies" className={({ isActive }) => `dropdown-menu__link ${isActive ? 'dropdown-menu__link_active' : ''}`}>Сохранённые фильмы</NavLink>
                    </li>
                </ul>

                <NavLink to="/profile" className="dropdown-menu__account-button">Аккаунт</NavLink>
            </div>
        </>
    );
};

export default Dropdown;