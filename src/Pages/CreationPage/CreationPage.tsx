import "./style.css";
import { VacancyForm, initialValues, Container } from "../../ui";
import { useCreateApplication } from "../../hooks";

export function CreationPage() {
  const createApplication = useCreateApplication();

  return (
    <div className="creation-page">
      <Container>
        <>
          <h1>
            Форма размещения <span className="creation-page__link">заявки</span>
          </h1>
          <VacancyForm
            onSubmit={createApplication}
            initialValues={initialValues}
          />
        </>
      </Container>
    </div>
  );
}
