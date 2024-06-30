import  { forwardRef, KeyboardEvent } from "react";
import classnames from "classnames";
import Feedback from "../feedback";
import { IInputProps } from "../types";

interface IProps extends IInputProps {
  type?: string;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, IProps>(
  (
    {
      className,
      type,
      disabled,
      state,
      feedbackText,
      id,
      name,
      onChange,
      onClick,
      onBlur,
      value,
      readonly,
      showState,
      showErrorOnly,
      width,
      height,
      customStyle,
      onKeyDown,
      ...restProps
    },
    ref
  ) => {
    return (
      <>
        <input
          type={type}
          disabled={disabled}
          ref={ref}
          className={classnames(className, "form-control bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", {
            "border-gray-500": !state || (showState && !showErrorOnly),
            "border-green-500": state === "success" && showState && !showErrorOnly,
            "border-yellow-500": state === "warning" && showState && !showErrorOnly,
            "border-red-500": state === "error" && showState && showErrorOnly,
          })}
          id={id}
          name={name}
          onChange={onChange}
          onClick={onClick}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          value={value}
          readOnly={readonly}
          {...restProps}
        />
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

Input.displayName = "Input";

Input.defaultProps = {
  type: "text",
  showErrorOnly: true,
};
