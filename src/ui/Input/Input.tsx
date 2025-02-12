import { useField } from "formik";
import { FC, useState } from "react";
import { DatePickerField } from "./DatePicker/DatePicker";
import { SelectField } from "./Select/Select";
import { Textarea } from "./Textarea/Textarea";
import "./Input.css";
import { ReactSVG } from "react-svg";

interface IInputProps {
  id: string;
  name: string;
  label: string;
  isRequired: boolean;
  type?: string;
  placeholder?: string;
  as?: "input" | "textarea";
  className?: string;
  radioAmount?: number;
  options?: { value: string; label: string }[];
  value?: string;
  startDate?: Date;
  setStartDate?: (date: Date) => void;
  endDate?: Date;
  setEndDate?: (date: Date) => void;
}

export const Input: FC<IInputProps> = ({
  id,
  name,
  label,
  isRequired,
  className = "",
  type = "text",
  as = "input",
  options = [],
  placeholder = "",
  value = "",
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  ...props
}) => {
  const [field, meta] = useField(name);

  const [textareaList, setTextareaList] = useState(field.value);

  if (type === "radio") {
    return (
      <div
        className={`custom-input ${
          className
            ? meta.touched && meta.error
              ? `custom-input--${className} custom-input--${className}-error`
              : `custom-input--${className}`
            : meta.touched && meta.error
            ? "custom-input--error"
            : ""
        } `}
      >
        <input
          {...field}
          id={id}
          type={type}
          value={value}
          checked={field.value === value}
          className="radio-field"
          {...props}
        />
        <label htmlFor={id} className="label">
          {label}
          <ReactSVG
            className="radio-checked"
            src="fns-test/icons/checked.svg"
          />
        </label>
      </div>
    );
  }

  if (type === "select") {
    return (
      <SelectField
        id={id}
        label={label}
        className={`custom-input${
          className
            ? meta.touched && meta.error
              ? ` custom-input--${className} custom-input--${className}-error`
              : ` custom-input--${className}`
            : meta.touched && meta.error
            ? " custom-input--error"
            : ""
        } `}
        name={name}
        isRequired={isRequired}
        options={options}
        {...props}
      />
    );
  }

  if (type === "date") {
    return (
      <DatePickerField
        id={id}
        label={label}
        className={`custom-input${
          className
            ? meta.touched && meta.error
              ? ` custom-input--${className} custom-input--${className}-error`
              : ` custom-input--${className}`
            : meta.touched && meta.error
            ? " custom-input--error"
            : ""
        } `}
        name={name}
        isRequired={isRequired}
        selectedDate={id === "openDate" ? startDate : endDate}
        startDate={startDate}
        endDate={endDate}
        setSelectedDate={id === "openDate" ? setStartDate! : setEndDate!}
        {...props}
      />
    );
  }

  if (as === "textarea") {
    return (
      <Textarea
        id={id}
        label={label}
        className={`custom-input${
          className
            ? meta.touched && meta.error
              ? ` custom-input--${className} custom-input--${className}-error`
              : ` custom-input--${className}`
            : meta.touched && meta.error
            ? " custom-input--error"
            : ""
        } `}
        name={name}
        textareaList={textareaList}
        onChange={setTextareaList}
        isRequired={isRequired}
        placeholder={placeholder}
        {...props}
      />
    );
  }

  return (
    <div
      className={`custom-input${
        className ? ` custom-input--${className}` : ""
      } ${meta.touched && meta.error ? ` custom-input--error` : ""}`}
    >
      <label htmlFor={id} className="label">
        {isRequired ? (
          <>
            {label} <span>*</span>
          </>
        ) : (
          label
        )}
      </label>
      <input {...field} id={id} {...props} className="field" />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
  );
};
