import { useField } from "formik";
import { FC } from "react";
import { DatePickerField } from "./DatePicker";
import { SelectField } from "./Select";

interface IInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  as?: "input" | "textarea";
  className?: string;
  radioAmount?: number;
}

export const Input: FC<IInputProps> = ({
  name,
  className,
  type = "text",
  as = "input",
  ...props
}) => {
  const [field, meta] = useField(name);

  if (type === "radio") {
    return (
        <div className={className}>
          <label htmlFor=""></label>
          <input {...field} {...props} />
          {meta.touched && meta.error && <div className="error">{meta.error}</div>}
        </div>
      );
  }

  if (type === "select") {
    return <SelectField />;
  }

  if (type === "date") {
    return <DatePickerField />;
  }

  return (
    <div className={className}>
      <label htmlFor=""></label>
      {as === "textarea" ? (
        <textarea {...field} {...props} />
      ) : (
        <input {...field} {...props} type={type} />
      )}
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
  );
};
