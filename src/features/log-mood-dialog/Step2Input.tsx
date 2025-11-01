import type { FieldValues, UseFormRegister } from "react-hook-form";
import { updateFeelings } from "./logMoodDialogSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/typedHooks";

type Step2InputProps = {
  feeling: string;
  register?: UseFormRegister<FieldValues>;
};

function Step2Input({ feeling, register }: Step2InputProps) {
  const dispatch = useAppDispatch();
  const feelings = useAppSelector((state) => state.logMoodDialog.feelings);
  const isDisabled = feelings.length >= 3 && !feelings.includes(feeling);

  return (
    <label
      htmlFor={feeling}
      className="flex items-center justify-between w-fit px-200 py-150 bg-neutral-0 rounded-10 border-2 border-blue-100 cursor-pointer"
    >
      <div className="flex items-center gap-100">
        <input
          id={feeling}
          type="checkbox"
          className="appearance-none w-200 h-200 border border-blue-200 relative"
          value={feeling}
          aria-label={feeling}
          {...(register && {
            ...register("feelings", {
              onChange: (e) => dispatch(updateFeelings(e.target.value)),
              disabled: isDisabled,
            }),
          })}
        />
        <p className="text-preset-6-regular text-neutral-900">{feeling}</p>
      </div>
    </label>
  );
}

export default Step2Input;
