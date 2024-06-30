import  { forwardRef } from "react";
import classnames from "classnames";
import Feedback from "../feedback";
import { IInputProps } from "../types";

interface IProps extends IInputProps {
  checked?: boolean;
  label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, IProps>(
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
    },
    ref
  ) => {
    return (
      <div className={classnames(className, "inline-block relative align-top")}>
        <input
          className="absolute left-0 z-0 w-4 h-4 opacity-0 cursor-pointer"
          type="checkbox"
          disabled={disabled}
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          onClick={onClick}
          onBlur={onBlur}
          value={value}
          ref={ref}
        />
        <label
          htmlFor={id}
          className={classnames("inline-block align-middle cursor-pointer pl-5", {
            "text-gray-600": disabled,
          })}
        >
          {label}
        </label>
        <div className="absolute top-1/2 transform -translate-y-1/2 left-0 w-4 h-4">
          <svg
            className="absolute w-full h-full pointer-events-none"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M1 6l2 2 4-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={classnames({
                "opacity-0": !checked,
                "opacity-100": checked,
              })}
            />
          </svg>
        </div>
        {feedbackText && <Feedback state={state}>{feedbackText}</Feedback>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
