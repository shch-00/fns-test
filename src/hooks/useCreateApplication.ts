import Application from "../interfaces"; // Импортируйте свой интерфейс заявки
import { API_URL } from "../api";
import { useNavigate } from "react-router-dom";

export const useCreateApplication = () => {
  const navigate = useNavigate();

  const createApplication = async (application: Application): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(application),
      });

      if (!response.ok) {
        throw new Error(
          `Ошибка отправки. Статус: ${response.status} Попробуйте еще раз через несколько минут :)`
        );
      }

      // Если запрос успешен, перенаправляем пользователя
      navigate("/applications");
    } catch (error) {
      console.error(error);
    }
  };

  return createApplication;
};