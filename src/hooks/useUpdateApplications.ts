import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateApplication } from "../api";
import Application from "../interfaces";

export const useUpdateApplications = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ updatedApplication }: { updatedApplication: Application }) =>
      updateApplication(updatedApplication),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] }); // Инвалидируем кеш
      navigate("/applications");
    },
    onError: (error) => {
      console.error("Ошибка при обновлении вакансии:", error.message);
    },
  });
};