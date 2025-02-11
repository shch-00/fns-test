import DatePicker from "react-datepicker";
import { useField, useFormikContext } from "formik";
import { FC } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";

interface IDatePickerFieldProps {
  id: string;
  name: string;
  className: string;
  label: string;
  isRequired: boolean;
}

export const DatePickerField: FC<IDatePickerFieldProps> = ({
  id,
  name,
  className,
  label,
  isRequired,
  ...props
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {isRequired ? (
          <>
            {label} <span>*</span>
          </>
        ) : (
          label
        )}
      </label>
      <DatePicker
        {...field}
        id={id}
        selected={field.value}
        onChange={(val) => setFieldValue(name, val)}
        dateFormat="dd.MM.yyyy"
        className="field"
        autoComplete="off"
        placeholderText="дд.мм.гггг"
        enableTabLoop={true}
        disabledKeyboardNavigation={false}
        {...props}
      />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
  );
};
