import React, { FC } from "react";

export interface IFeedback {
  state?: "success" | "warning" | "error";
  showState?: boolean;
  showErrorOnly?: boolean;
  children: React.ReactNode;
}

const Feedback: FC<IFeedback> = ({
  state,
  showState,
  showErrorOnly,
  children,
}) => {
  let textColorClass = "";
  if (state === "success" && showState && !showErrorOnly) {
    textColorClass = "text-green-500"; // Adjust color as per Tailwind CSS class
  } else if (state === "warning" && showState && !showErrorOnly) {
    textColorClass = "text-yellow-500"; // Adjust color as per Tailwind CSS class
  } else if (state === "error" && showState && showErrorOnly) {
    textColorClass = "text-red-500"; // Adjust color as per Tailwind CSS class
  }

  return (
    <div className={`w-full mt-1 text-sm ${textColorClass}`}>
      {children}
    </div>
  );
};

export default Feedback;
