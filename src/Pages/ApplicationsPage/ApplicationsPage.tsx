import "./style.css";
import { VacancyItem } from "../../ui/Vacancy";
import { useApplications } from "../../hooks/useApplications";
import { Loader } from "../../ui/Loader";

export function ApplicationsPage() {
  const { data, isLoading, isError } = useApplications();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Произошла ошибка, попробуйте снова</div>;
  }

  return (
    <div className="applications-page">
      <h1>Заявки на размещение вакансий</h1>
      <ul className="vacancies">
        {data?.map(item => (
            <li className="vacancies__item" key={item.id}>
                <VacancyItem vacancy={item} />
            </li>
        ))}
        
      </ul>
    </div>
  );
}
