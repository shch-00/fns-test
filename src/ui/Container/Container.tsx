import React from "react";
import "./Container.css";

export const Container = ({ children }: { children: React.ReactElement }) => {
  return <div className="container">{children}</div>;
};
