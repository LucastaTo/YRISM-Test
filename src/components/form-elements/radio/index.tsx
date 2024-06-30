import { forwardRef } from "react";
import classnames from "classnames";
import Feedback from "../feedback";
import { IInputProps } from "../types";

interface IProps extends IInputProps {
  checked?: boolean;
  label: string;
}

export const Radio = forwardRef<HTMLInputElement, IProps>(
  (
    {
      className,
      disabled,
      feedbackText,
      id,
      name,
      label,
      state,
      checked,
      onChange,
      onClick,
      onBlur,
      value,
      ...restProps
    },
    ref
  ) => {
    return (
      <div className={classnames(className, "custom-radio")}>
        <input
          type="radio"
          disabled={disabled}
          id={id}
          name={name}
          checked={checked}
          value={value}
          onChange={onChange}
          onClick={onClick}
          onBlur={onBlur}
          ref={ref}
          className={classnames(
            "sr-only", // Hide the default radio button
            {
              "cursor-not-allowed opacity-50": disabled,
            }
          )}
          {...restProps}
        />
        <label
          htmlFor={id}
          className={classnames(
            "relative inline-block h-5 w-5 rounded-full border border-gray-500",
            {
              "bg-primary border-primary": checked,
              "cursor-not-allowed opacity-50": disabled,
            }
          )}
        >
          {checked && (
            <div
              className="absolute inset-0 rounded-full bg-white"
              style={{ backgroundSize: "50%" }}
            />
          )}
        </label>
        <span className="ml-2">{label}</span>
        {feedbackText && <Feedback state={state}>{feedbackText}</Feedback>}
      </div>
    );
  }
);

Radio.displayName = "Radio";
