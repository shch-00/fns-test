import * as Yup from "yup";
import Application from "../../interfaces";
import { v4 as uuidv4 } from "uuid";

export const validationSchema = Yup.object({
  title: Yup.string()
    .min(4, "Минимум 4 символа")
    .required("Укажите наименование"),
  department: Yup.string().required("Укажите отдел"),
  openDate: Yup.date().required("Выберите дату открытия"),
  closeDate: Yup.date().required("Выберите дату закрытия"),
  sex: Yup.string().required("Выберите пол"),
  education: Yup.string().required("Укажите образование"),
  region: Yup.string().required("Укажите регион"),
  adress: Yup.string().required(
    "Введите полный адрес. Например, Походный проезд, 3с1"
  ),
  experience: Yup.string().required("Укажите опыт работы"),
  schedule: Yup.string().required("Укажите график работы"),
  workType: Yup.string().required("Выберите тип занятости"),
});

export interface IFormProps {
  initialValues: Application;
  onSubmit?: (application: Application) => Promise<void>;
  submitValue?: string;
  discardValue?: string;
}

export const initialValues: Application = {
  id: uuidv4(),
  title: "",
  department: "",
  openDate: '',
  closeDate: '',
  currentDate: new Date().toLocaleDateString(),
  sex: "",
  education: "",
  region: "",
  adress: "",
  experience: "",
  schedule: "",
  workType: "",

  subtitle: "",
  salaryIsTaxed: false,
  salaryAmountFrom: 0,
  salaryAmountTo: 0,
  subway: "",
  responsibilities: "",
  wishes: "",
  advantages: "",
  offer: [
    "Дружный коллектив, интересные задачи и возможность быть услышанным;",
    "Приобретение навыков работы в большой, разветвлённой и сложноподчинённой структуре, задействованной в сфере ИТ;",
    "Оформление в соответствии с ТК РФ;",
    "Полностью официальная заработная плата",
  ].join("\n"),
};
