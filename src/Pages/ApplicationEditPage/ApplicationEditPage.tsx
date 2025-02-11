import "./style.css";
import { VacancyForm, initialValues, Container } from "../../ui";
import { useParams } from "react-router-dom";
import { getApplication } from "../../api";
import { useState, useEffect } from "react";
import { useUpdateApplications } from "../../hooks";

export function ApplicationEditPage() {
  const { applicationId } = useParams();

  const { mutate: updateApplication } = useUpdateApplications();

  const [isApplied, setIsApplied] = useState(false); // Состояние для отслеживания загрузки
  const [appliedInitialValues, setAppliedInitialValues] =
    useState(initialValues);

  if (!applicationId) {
    return <div>Указан неверный ID</div>;
  }

  // Асинхронная загрузка данных
  useEffect(() => {
    getApplication(applicationId).then((res) => {
      setIsApplied(true); // Устанавливаем флаг, что данные загружены
      setAppliedInitialValues(res); // Обновляем начальные значения
    });
  });

  return (
    <div className="application-edit-page">
      <Container>
        <>
          <h1>
            Форма редактирования <span className="application-edit-page__link">заявки</span>
          </h1>
          <VacancyForm
            initialValues={appliedInitialValues}
            submitValue="Сохранить"
            discardValue="Отменить"
            onSubmit={async (application) => {
              await updateApplication({ updatedApplication: application });
            }}
          />
        </>
      </Container>
    </div>
  );
}
