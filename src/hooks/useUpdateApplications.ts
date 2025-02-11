import Application from "../interfaces";
import { queryClient, updateApplication } from "../api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useUpdateApplications = () => {
  const navigate = useNavigate();
  return useMutation(
    {
      mutationFn: ({
        updatedApplication,
      }: {
        updatedApplication: Application;
      }) => updateApplication(updatedApplication),
      onSuccess: () => {
        navigate("/applications");
      },
      onError: (error) => {
        console.error("Ошибка при обновлении вакансии:", error.message);
      },
    },
    queryClient
  );
};
