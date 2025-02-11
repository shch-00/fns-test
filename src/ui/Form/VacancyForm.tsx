import { Formik, Form } from "formik";
import { Input } from "../Input";
import { FC } from "react";
import { Button } from "../Button";
import { IFormProps, validationSchema } from "./types";
import { useNavigate } from "react-router-dom";
import "./VacancyForm.css";

export const VacancyForm: FC<IFormProps> = ({
  initialValues,
  onSubmit = () => Promise.resolve(),
  submitValue = "Отправить",
  discardValue = "Сбросить",
}) => {
  const navigate = useNavigate();
  const discardChanges = () => navigate("/applications");

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={true}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isValid, dirty }) => (
        <Form className="vacancy-form">
          <div className="vacancy-form__wrapper">
            <div className="vacancy-form__inner">
              <Input
                id="subtitle"
                name="subtitle"
                label="Наименование должности"
                isRequired={false}
              />
              <Input
                id="title"
                name="title"
                label="Наименование вакансии"
                isRequired={true}
              />
              <Input
                id="department"
                name="department"
                label="Отдел"
                isRequired={true}
              />
              <Input
                id="openDate"
                name="openDate"
                label="Дата открытия"
                isRequired={true}
                type="date"
                className="date"
              />
              <Input
                id="closeDate"
                name="closeDate"
                label="Плановая дата закрытия"
                isRequired={true}
                type="date"
                className="date"
              />
              <div className="vacancy-form__bottom">
                <div className="vacancy-form__radios">
                  <span className="vacancy-form__radio-title">
                    Пол <span>*</span>
                  </span>
                  <Input
                    id="maleSex"
                    name="sex"
                    label="Мужской"
                    isRequired={true}
                    type="radio"
                    className="radio"
                    value="male"
                  />
                  <Input
                    id="femaleSex"
                    name="sex"
                    label="Женский"
                    isRequired={true}
                    type="radio"
                    className="radio"
                    value="female"
                  />
                </div>
                <Input
                  id="education"
                  name="education"
                  label="Образование"
                  isRequired={true}
                  type="select"
                  className="select"
                  options={[
                    // { value: "", label: "Выберите" },
                    { value: "high", label: "Высшее" },
                    { value: "middle", label: "Среднее" },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="vacancy-form__wrapper">
            <div className="vacancy-form__inner">
              <div className="vacancy-form__salary-section">
                <span className="vacancy-form__radio-title">
                  Зарплата
                </span>
                <div className="vacancy-form__radios vacancy-form__radios--horizontal">
                  <Input
                    id="noTax"
                    name="salaryIsTaxed"
                    label="На руки"
                    isRequired={false}
                    type="radio"
                    className="radio"
                    value="noTax"
                  />
                  <Input
                    id="tax"
                    name="salaryIsTaxed"
                    label="До вычета налогов"
                    isRequired={false}
                    type="radio"
                    className="radio"
                    value="tax"
                  />
                </div>
                <div className="vacancy-form__salary-value">
                  <Input
                    id="salaryAmountFrom"
                    name="salaryAmountFrom"
                    label="от"
                    isRequired={false}
                    className="salary"
                  />
                  <Input
                    id="salaryAmountTo"
                    name="salaryAmountTo"
                    label="до"
                    isRequired={false}
                    className="salary"
                  />
                </div>
              </div>
              <Input
                id="region"
                name="region"
                label="Регион"
                isRequired={true}
              />
              <Input
                id="adress"
                name="adress"
                label="Адрес"
                isRequired={true}
                className="wide"
              />
              <Input
                id="subway"
                name="subway"
                label="Станция метро, МЦД"
                isRequired={false}
              />
              <Input
                id="experience"
                name="experience"
                label="Опыт работы"
                isRequired={true}
              />
              <Input
                id="schedule"
                name="schedule"
                label="График работы"
                isRequired={true}
                type="select"
                className="select"
                options={[
                  // { value: "", label: "Выберите" },
                  { value: "full", label: "Полный день" },
                  { value: "shift-5", label: "Сменная 5/2" },
                  { value: "shift-2", label: "Сменная 2/2" },
                ]}
              />
              <div className="vacancy-form__radios">
                <span className="vacancy-form__radio-title">
                  Тип занятости <span>*</span>
                </span>
                <Input
                  id="full-time"
                  name="workType"
                  label="Полная занятость"
                  isRequired={true}
                  type="radio"
                  className="radio"
                  value="full-time"
                />
                <Input
                  id="half-time"
                  name="workType"
                  label="Частичная занятость"
                  isRequired={true}
                  type="radio"
                  className="radio"
                  value="half-time"
                />
                <Input
                  id="internship"
                  name="workType"
                  label="Стажировка"
                  isRequired={true}
                  type="radio"
                  className="radio"
                  value="internship"
                />
              </div>
            </div>
          </div>
          <div className="vacancy-form__wrapper vacancy-form__wrapper--textareas">
            <div className="vacancy-form__inner">
              <Input
                id="responsibilities"
                name="responsibilities"
                label="Функциональные обязанности"
                isRequired={false}
                as="textarea"
                className="textarea"
                placeholder="Какую работу будет выполнять сотрудник"
              ></Input>
              <Input
                id="wishes"
                name="wishes"
                label="Пожелания к кандидату"
                isRequired={false}
                as="textarea"
                className="textarea"
                placeholder="Ключевые навыки, достижения"
              ></Input>
              <Input
                id="advantages"
                name="advantages"
                label="Преимуществом будет"
                isRequired={false}
                as="textarea"
                className="textarea"
                placeholder="Дополнительные специальные навыки"
              ></Input>
              <Input
                id="offer"
                name="offer"
                label="Мы предлагаем"
                isRequired={false}
                as="textarea"
                className="textarea"
                placeholder="Ваши условия оффера"
                // value={}
              ></Input>
            </div>
          </div>
          <div className="vacancy-form__controls">
            <Button
              className="vacancy-form__submit btn--submit"
              type="submit"
              disabled={!isValid || !dirty}
              value={submitValue}
            />
            <Button
              className="vacancy-form__discard btn--discard"
              value={discardValue}
              onClick={discardChanges}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};
