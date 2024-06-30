import { forwardRef } from "react";
import classnames from "classnames";
import Feedback from "../feedback";
import { IInputProps } from "../types";

interface IProps extends IInputProps {
  rows?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, IProps>(
  (
    {
      className,
      rows,
      disabled,
      state,
      feedbackText,
      id,
      name,
      placeholder,
      value,
      showState,
      showErrorOnly,
      onChange,
      onClick,
      onBlur,
      width,
      height,
      customStyle,
      ...restProps
    },
    ref
  ) => {
    return (
      <>
        <textarea
          disabled={disabled}
          className={classnames(
            className,
            "form-control min-h-[100px] max-h-[100px] block p-2.5 w-full text-sm text-gray-900 bg-white dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
            {
              "bg-gray-200": disabled,
              "border-primary": state === "success" && showState && !showErrorOnly,
              "border-warning": state === "warning" && showState && !showErrorOnly,
              "border-danger": state === "error" && showState && showErrorOnly,
            }
          )}
          rows={rows}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          ref={ref}
          onChange={onChange}
          onClick={onClick}
          onBlur={onBlur}
          style={{ width, height }}
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

Textarea.displayName = "Textarea";

Textarea.defaultProps = {
  rows: 2,
  showErrorOnly: true,
};
