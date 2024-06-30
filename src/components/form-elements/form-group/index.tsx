import React, { FC } from "react";
import classnames from "classnames";

interface IProps {
  className?: string;
  children: React.ReactNode;
}

export const FormGroup: FC<IProps> = ({ children, className, ...rest }) => {
  return (
    <div className={classnames(className, "form-group")} {...rest}>
      {children}
    </div>
  );
};

