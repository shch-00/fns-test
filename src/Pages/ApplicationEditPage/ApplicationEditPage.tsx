import "./style.css";
import { VacancyForm, initialValues, Container, Loader } from "../../ui";
import { useParams } from "react-router-dom";
import { getApplication } from "../../api";
import { useUpdateApplications } from "../../hooks";
import { useQuery } from "@tanstack/react-query";

export function ApplicationEditPage() {
  const { applicationId } = useParams();

  const { mutate: updateApplication } = useUpdateApplications();

  // Используем useQuery для загрузки данных
  const {
    data: appliedInitialValues,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["application", applicationId], // Уникальный ключ для кеширования
    queryFn: () => getApplication(applicationId!), // Функция для загрузки данных
    enabled: !!applicationId, // Запрос выполняется только если applicationId существует
  });

  if (!applicationId) {
    return <div>Указан неверный ID</div>;
  }

  if (isLoading) {
    return (
      <div className="loading">
        <Loader />
      </div>
    ); // Индикатор загрузки
  }

  if (isError) {
    return <div>Ошибка: {error.message}</div>; // Обработка ошибки
  }

  return (
    <div className="application-edit-page">
      <Container>
        <>
          <h1>
            Форма редактирования{" "}
            <span className="application-edit-page__link">заявки</span>
          </h1>
          <VacancyForm
            initialValues={appliedInitialValues || initialValues}
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
