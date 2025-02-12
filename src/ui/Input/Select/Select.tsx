import { useField, useFormikContext } from "formik";
import { FC, useState, useRef } from "react";
import Select, { StylesConfig, GroupBase, SingleValue } from "react-select";
import { ReactSVG } from "react-svg";
import "./Select.css";

interface ISelectFieldProps {
  id: string;
  name: string;
  className: string;
  label: string;
  options: { value: string; label: string }[];
  isRequired: boolean;
}

export const SelectField: FC<ISelectFieldProps> = ({
  id,
  name,
  className,
  label,
  options,
  isRequired,
}) => {
  const { setFieldValue, setTouched } = useFormikContext();
  const [field, meta] = useField(name);

  const [selectIconClassName, setSelectIconClassName] =
    useState("select-switch");

  type OptionType = { value: string; label: string };

  // Определяем стили с правильной типизацией
  const customStyles: StylesConfig<OptionType, false, GroupBase<OptionType>> = {
    control: (provided, state) => ({
      ...provided,
      pointerEvents: state.isFocused ? "none" : "all",
      backgroundColor: "white",
      borderColor: meta.touched && meta.error ? "#BF0003" : "#dee4f0",
      borderWidth: 1,
      outline: `2px solid ${state.isFocused ? "#4C73E3" : "transparent"}`,
      boxShadow: "0px 0px 0px 0px transparent",
      width: "275px",
      height: "44px",
      borderRadius: "16px",
      padding: "3px 10px",
      color: "#DCDCDC",
      fontWeight: "300",
      fontSize: "16px",
      transition:
        "border-color 0.2s ease, box-shadow 0.2s ease, outline 0.2s ease",
      "&:hover": {
        borderColor: meta.touched && meta.error ? "#BF0003" : "#dee4f0",
        boxShadow: `${
          state.isFocused
            ? "0px 0px 0px 0px transparent"
            : "0px 0px 3px 1px #35A500B2"
        }`,
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "16px",
      overflow: "hidden",
      borderColor: "transparent",
      boxShadow: "0px 0px 0px 0px transparent",
      padding: "0",
      margin: "0",
      top: "64px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#4C73E3" : "white",
      color: state.isSelected ? "white" : "black",
      borderBottom: "1px solid #F0F4FF",
      transition: "background-color 0.2s ease",
      "&:hover": {
        backgroundColor: state.isSelected ? "#4C73E3" : "lightblue",
      },
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      display: "none",
    }),
  };

  const selectRef = useRef<any>(null);

  const handleChange = (
    option: SingleValue<{
      value: string;
      label: string;
    }>
  ) => {
    setFieldValue(name, option ? option.value : "");

    if (selectRef.current) {
      selectRef.current.blur();
    }
  };

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
      <Select
        {...field}
        id={id}
        ref={selectRef}
        options={options}
        onChange={handleChange}
        onFocus={() =>
          setSelectIconClassName("select-switch select-switch--open")
        }
        onBlur={() => {
          setTouched({ [name]: true });
          setSelectIconClassName("select-switch");
        }}
        styles={customStyles}
        placeholder="Выберите"
        classNamePrefix="select"
        value={options.find((option) => option.value === field.value)}
      />
      <ReactSVG
        className={selectIconClassName}
        src="src/assets/icons/switch.svg"
      />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
  );
};
