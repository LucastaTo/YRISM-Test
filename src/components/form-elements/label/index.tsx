import React, { FC } from "react";
import classnames from "classnames";

interface IProps {
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}

export const Label: FC<IProps> = ({
  children,
  htmlFor,
  className,
  ...rest
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={classnames(className, "label mb-0 inline-block")}
      {...rest}
    >
      {children}
    </label>
  );
};
