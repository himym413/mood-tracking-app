import { useAppSelector } from "../../hooks/typedHooks";

function ProgressBar() {
  const step = useAppSelector((state) => state.logMoodDialog.step);

  return (
    <div
      className="flex items-center gap-200"
      role="progressbar"
      aria-valuenow={step}
      aria-valuemin={1}
      aria-valuemax={4}
    >
      {[1, 2, 3, 4].map((stepNumber) => (
        <span
          key={stepNumber}
          className={`w-full h-075 ${
            step >= stepNumber ? "bg-blue-600" : "bg-blue-200"
          } rounded-full`}
        ></span>
      ))}
    </div>
  );
}

export default ProgressBar;
