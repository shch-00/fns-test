import { FC } from "react";
import { Link } from "react-router-dom";
import { getRelevantExperience } from "../../utils/getRelevantExperience";
import Application from '../../interfaces'

type TVacancyItemProps = {
  vacancy: Application
};

export const VacancyItem: FC<TVacancyItemProps> = ({
  vacancy
}) => {
  const formattedDate = new Date(vacancy.date).toLocaleDateString("ru-RU");
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
    vacancy.salaryAmountTo !== undefined && vacancy.salaryAmountFrom !== undefined ? (
      vacancy.salaryAmountTo > vacancy.salaryAmountFrom ? (
        <span className="card__salary">
          <span>От {vacancy.salaryAmountTo}</span> {salaryType}
        </span>
      ) : (
        <span className="card__salary">
          <span>{vacancy.salaryAmountTo}</span> {salaryType}
        </span>
      )
    ) : (
      <span className="card__salary">Зарплата не указана</span>
    );

  const relevantExperience = vacancy.experience && getRelevantExperience(vacancy.experience);

  let experienceString;

  if (relevantExperience === "" || relevantExperience < 1) {
    experienceString = (
      <span className="card__experience">Опыт не требуется</span>
    );
  } else if (relevantExperience < 3) {
    experienceString = (
      <span className="card__experience">
        Требуемый опыт: <span>от 1 до 3 лет</span>
      </span>
    );
  } else if (relevantExperience < 6) {
    experienceString = (
      <span className="card__experience">
        Требуемый опыт: <span>от 3 до 6 лет</span>
      </span>
    );
  } else {
    experienceString = (
      <span className="card__experience">
        Требуемый опыт: <span>от 6 лет и выше</span>
      </span>
    );
  }

  return (
    <div className="card">
      <div className="card__right">
        <span className="card__date">Дата публикации: {formattedDate}</span>
        <h3 className="card__title">{vacancy.title}</h3>
        <div className="card__location">
          <svg width={20} height={20} /> {location}
        </div>
      </div>
      <div className="card__left">
        <Link to={`applications/${vacancy.id}`}>
          <svg />
        </Link>
        <div className="card__left-inner">
          {salary}
          {experienceString}
          <div className="card__subway">
            <svg />
            <span>{vacancy.subway}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
