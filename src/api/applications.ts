import Application from "../interfaces";

export const API_URL = "http://localhost:5000";

export async function getApplications(): Promise<Application[]> {
  const response = await fetch(`${API_URL}/applications`);

  if (!response.ok) {
    throw new Error(
      `Не удалось загрузить вакансии. Попробуйте позже :) Статус: ${response.status}`
    );
  }

  return response.json();
}

export async function getApplication(
  applicationId: string
): Promise<Application> {
  const response = await fetch(`${API_URL}/applications/${applicationId}`);

  if (!response.ok) {
    throw new Error(
      `Не удалось загрузить вакансию. Попробуйте позже :) Статус: ${response.status}`
    );
  }

  return response.json();
}

export async function updateApplication(
  updatedApplication: Application
): Promise<void> {
  await fetch(`${API_URL}/applications/${updatedApplication.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedApplication),
  });
}
