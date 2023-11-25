import React from 'react';
import "./NavTab.css";

const NavTab = () => {
  return (
    <div className="navtab">
      <ul className="navtab-links navtab-links_header">
        <a href="#about" className="navtab-links__container navtab-link">
          О проекте
        </a>
        <a href="#techs" className="navtab-links__container navtab-link">
          Технологии
        </a>
        <a href="#student" className="navtab-links__container navtab-link">
          Студент
        </a>
      </ul>
    </div>
  );
};

export default NavTab;