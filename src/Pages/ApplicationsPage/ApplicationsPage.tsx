import "./style.css";
import { VacancyItem, Loader, Container } from "../../ui";
import { useApplications } from "../../hooks";

export function ApplicationsPage() {
  const { data, isLoading, isError } = useApplications();

  if (isLoading) {
    return (
      <div className="loading">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <div>Произошла ошибка, попробуйте снова</div>;
  }

  return (
    <div className="applications-page">
      <Container>
        <>
          <h1>Заявки на размещение вакансий</h1>
          <ul className="vacancies">
            {data?.map((item) => (
              <li className="vacancies__item" key={item.id}>
                <VacancyItem vacancy={item} />
              </li>
            ))}
          </ul>
        </>
      </Container>
    </div>
  );
}
