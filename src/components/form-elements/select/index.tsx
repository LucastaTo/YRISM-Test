import { forwardRef, ReactNode } from "react";
import classnames from "classnames";
import Feedback from "../feedback";
import { IInputProps } from "../types";

interface IProps extends IInputProps {
  children: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, IProps>(
  (
    {
      className,
      disabled,
      state,
      feedbackText,
      id,
      name,
      value,
      onChange,
      onBlur,
      onClick,
      children,
      showState,
      showErrorOnly,
      width,
      height,
      placeholder,
      customStyle,
      ...restProps
    },
    ref
  ) => {
    return (
      <>
        <select
          className={classnames(
            className,
            "form-select rounded-lg appearance-none border text-sm py-2 px-3 leading-tight focus:outline-none focus:shadow-outline",
            {
              "border-gray-500": !state || (showState && !showErrorOnly),
              "border-green-500": state === "success" && showState && !showErrorOnly,
              "border-yellow-500": state === "warning" && showState && !showErrorOnly,
              "border-red-500": state === "error" && showState && showErrorOnly,
              "cursor-not-allowed opacity-50": disabled,
            }
          )}
          ref={ref}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onClick={onClick}
          onBlur={onBlur}
          disabled={disabled}
          {...restProps}
        >
            {children}
        </select>
        {feedbackText && showState && (
          <Feedback
            state={state}
            showState={showState}
            showErrorOnly={showErrorOnly}
          >
            {feedbackText}
          </Feedback>
        )}
      </>
    );
  }
);

Select.displayName = "Select";

Select.defaultProps = {
  showErrorOnly: true,
};
