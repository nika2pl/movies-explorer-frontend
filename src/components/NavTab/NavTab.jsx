import React from 'react';
import "./NavTab.css";

const NavTab = () => {
  return (
    <div className="navtab">
      <ul className="navtab-links navtab-links_header">
        <li className="navtab-links__container">
          <a href="#about" className="navtab-link">О проекте</a>
        </li>
        <li className="navtab-links__container">
          <a href="#techs" className="navtab-link">Технологии</a></li>
        <li className="navtab-links__container">
          <a href="#student" className="navtab-link">Студент</a></li>
      </ul>
    </div>
  );
};

export default NavTab;