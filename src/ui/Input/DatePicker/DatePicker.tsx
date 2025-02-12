import DatePicker from "react-datepicker";
import { useField, useFormikContext } from "formik";
import { FC } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";
import { ReactSVG } from "react-svg";
import { ru } from "date-fns/locale";

interface IDatePickerFieldProps {
  id: string;
  name: string;
  className: string;
  label: string;
  isRequired: boolean;
  selectedDate: Date | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
  setSelectedDate: (date: Date) => void;
}

export const DatePickerField: FC<IDatePickerFieldProps> = ({
  id,
  name,
  className,
  label,
  isRequired,
  selectedDate,
  startDate,
  endDate,
  setSelectedDate,
  ...props
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  // const header = <></>;

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
        showIcon={true}
        calendarIconClassName="date-icon"
        calendarClassName="date-calendar"
        dayClassName={() => "date-day"}
        id={id}
        startDate={startDate}
        endDate={endDate}
        selected={selectedDate}
        onChange={(val) => {
          setFieldValue(name, val);
          if (val !== null) {
            setSelectedDate(val);
          }
        }}
        minDate={id === "closeDate" ? startDate! : undefined}
        dateFormat="dd.MM.yyyy"
        className="field"
        autoComplete="off"
        placeholderText="дд.мм.гггг"
        enableTabLoop={true}
        disabledKeyboardNavigation={false}
        icon={<ReactSVG src="assets/icons/calendar.svg" />}
        locale={ru}
        {...props}
      />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
  );
};
