import { useField } from "formik";
import { FC, useState } from "react";
import { DatePickerField } from "./DatePicker/DatePicker";
import { SelectField } from "./Select/Select";
import { Textarea } from "./Textarea/Textarea";
import './Input.css'

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
  ...props
}) => {
  const [field, meta] = useField(name);

  const [textareaList, setTextareaList] = useState(field.value);

  if (type === "radio") {
    return (
      <div
        className={`custom-input ${
          className
            ? meta.error
              ? `custom-input--${className} custom-input--${className}-error`
              : `custom-input--${className}`
            : meta.error
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
        <label htmlFor={id} className="label">{label}</label>
      </div>
    );
  }

  if (type === "select") {
    return (
      <SelectField
        id={id}
        label={label}
        className={`custom-input ${
          className
            ? meta.error
              ? `custom-input--${className} custom-input--${className}-error`
              : `custom-input--${className}`
            : meta.error
            ? "custom-input--error"
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
        className={`custom-input ${
          className
            ? meta.error
              ? `custom-input--${className} custom-input--${className}-error`
              : `custom-input--${className}`
            : meta.error
            ? "custom-input--error"
            : ""
        } `}
        name={name}
        isRequired={isRequired}
        {...props}
      />
    );
  }

  if (as === "textarea") {
    return (
      <Textarea
        id={id}
        label={label}
        className={`custom-input ${
          className
            ? meta.error
              ? `custom-input--${className} custom-input--${className}-error`
              : `custom-input--${className}`
            : meta.error
            ? "custom-input--error"
            : ""
        } `}
        name={name}
        onChange={setTextareaList}
        isRequired={isRequired}
        placeholder={placeholder}
        {...props}
      />
    );
  }

  return (
    <div
      className={`custom-input ${
        className ? `custom-input--${className}` : ""
      } ${meta.error ? `custom-input--error` : ""}`}
    >
      <label htmlFor={id} className="label">
        {isRequired ? (
          <>
            {label}{" "}
            <span>*</span>
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
