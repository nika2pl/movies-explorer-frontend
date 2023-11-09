import React from 'react';
import "./AboutProject.css";
import "../Title/Title.css";

const AboutProject = () => {
  return (
    <>
      <div className="about-project" id="about">
        <div className="about-project__container">
          <h2 className="title">О проекте</h2>

          <div className="about-project-info-container">
            <div className="about-project-info">
              <h2 className="about-project-info__title">Дипломный проект включал 5 этапов</h2>
              <div className="about-project-info__content">
                Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
              </div>
            </div>
            <div className="about-project-info about-project-info-pull-right">
              <h2 className="about-project-info__title">На выполнение диплома ушло 5 недель</h2>
              <div className="about-project-info__content">
                У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
              </div>
            </div>
          </div>

          <div className="timeline">
            <div className="timeline__container">
              <div className="timeline__content timeline__220 timeline__filled">
                1 неделя
              </div>
              <div className="timeline__content timeline__912 timeline__unfilled">
                4 недели
              </div>
            </div>

            <div className="timeline__container timeline__blank">
              <div className="timeline__content timeline__220">
                Back-end
              </div>
              <div className="timeline__content timeline__912">
                Front-end
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutProject;