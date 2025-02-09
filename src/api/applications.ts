import Application from "../interfaces";

const API_URL = "http://localhost:5000";

export async function getApplications(): Promise<Application[]> {
  const response = await fetch(`${API_URL}/applications`);

  if (!response.ok) {
    throw new Error(
      `Не удалось загрузить вакансии. Попробуйте позже :) Статус: ${response.status}`
    );
  }

  return response.json();
}

export async function getApplication(applicationId: string) {
  const response = await fetch(`${API_URL}/applicatons/${applicationId}`);

  if (!response.ok) {
    throw new Error(
      `Не удалось загрузить вакансию. Попробуйте позже :) Статус: ${response.status}`
    );
  }

  return response.json();
}

export function createApplication(application: Application) {
  return fetch(`${API_URL}/applicatons`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(application),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Ошибка отправки. Статус: ${response.status} Попробуйте еще раз через несколько минут :)`
        );
      }
    })
    .catch((error) => console.error(error));
}
