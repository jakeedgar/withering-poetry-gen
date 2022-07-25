import * as React from "react";

export interface ISuccessTextProps {
  success: string;
}

const SuccessText: React.FC<ISuccessTextProps> = (props) => {
  const { success } = props;

  if (success === "") return null;

  return <small className="text-success">{success}</small>;
};

export default SuccessText;
