import * as React from "react";

export interface IErrorTextProps {
  error: string;
}

const ErrorText: React.FC<IErrorTextProps> = (props) => {
  const { error } = props;

  if (error === "") return null;

  return <small className="text-error">{error}</small>;
};

export default ErrorText;
