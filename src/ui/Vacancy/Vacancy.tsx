import { FC } from "react";
import { Link } from "react-router-dom";
import { getRelevantExperience } from "../../utils/getRelevantExperience";
import Application from "../../interfaces";
import "./Vacancy.css";
import { ReactSVG } from "react-svg";

type TVacancyItemProps = {
  vacancy: Application;
};

export const VacancyItem: FC<TVacancyItemProps> = ({ vacancy }) => {
  const formattedDate = new Date(vacancy.currentDate).toLocaleDateString(
    "ru-RU"
  );
  const location = `${vacancy.region}, ${vacancy.adress}`;

  let salaryType;
  if (vacancy.salaryIsTaxed !== undefined && vacancy.salaryIsTaxed) {
    salaryType = "до вычета налогов";
  } else if (vacancy.salaryIsTaxed !== undefined && !vacancy.salaryIsTaxed) {
    salaryType = "на руки";
  } else {
    salaryType = "";
  }

  const salary =
    vacancy.salaryAmountFrom !== undefined ? (
      vacancy.salaryAmountTo !== undefined ? (
        <div className="card__salary">
          <span className="salary salary--highlight">
            От {vacancy.salaryAmountFrom}
          </span>{" "}
          <span className="salary">{salaryType}</span>
        </div>
      ) : (
        <div className="card__salary">
          <span className="salary salary--highlight">
            {vacancy.salaryAmountFrom}
          </span>{" "}
          <span className="salary">{salaryType}</span>
        </div>
      )
    ) : (
      <div className="card__salary">
        <span className="salary">Зарплата не указана</span>
      </div>
    );

  const relevantExperience =
    vacancy.experience && getRelevantExperience(vacancy.experience);

  let experienceString;

  if (relevantExperience === "" || relevantExperience < 1) {
    experienceString = (
      <div className="card__experience">
        <span className="experience">Опыт не требуется</span>
      </div>
    );
  } else if (relevantExperience < 3) {
    experienceString = (
      <div className="card__experience">
        <span className="experience">Требуемый опыт:</span>{" "}
        <span className="experience experience--highlight">от 1 до 3 лет</span>
      </div>
    );
  } else if (relevantExperience < 6) {
    experienceString = (
      <div className="card__experience">
        <span className="experience">Требуемый опыт:</span>{" "}
        <span className="experience experience--highlight">от 3 до 6 лет</span>
      </div>
    );
  } else {
    experienceString = (
      <div className="card__experience">
        <span className="experience">Требуемый опыт:</span>{" "}
        <span className="experience experience--highlight">
          от 6 лет и выше
        </span>
      </div>
    );
  }

  const subway =
    vacancy.subway !== "" ? (
      <div className="card__subway">
        <ReactSVG
          className="card__metro-icon"
          src="src/assets/icons/metro.svg"
        />
        <span className="subway">{vacancy.subway}</span>
      </div>
    ) : (
      <></>
    );

  return (
    <div className="card">
      <div className="card__left">
        <span className="card__date">Дата публикации: {formattedDate}</span>
        <h3 className="card__title">{vacancy.title}</h3>
        <div className="card__location">
          <ReactSVG className="card__map-icon" src="src/assets/icons/map.svg" />{" "}
          {location}
        </div>
      </div>
      <div className="card__right">
        <Link to={`/applications/${vacancy.id}`} className="card__link">
          <ReactSVG
            className="card__edit-icon"
            src="src/assets/icons/edit.svg"
          />
        </Link>
        <div className="card__right-inner">
          {salary}
          {experienceString}
          {subway}
        </div>
      </div>
    </div>
  );
};
