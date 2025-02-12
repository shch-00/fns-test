import React, { FC } from "react";
import "./Button.css";

interface IButtonProps {
  value: string;
  onClick?: (() => {}) | (() => void);
  className: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children?: React.ReactElement;
}

export const Button: FC<IButtonProps> = ({
  value,
  onClick = () => {},
  className,
  type = "button",
  disabled = false,
  children = <></>,
  ...props
}) => {
  return (
    <button
      className={`${className} btn`}
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >{value}</button>
  );
};
