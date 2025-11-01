import type { FieldValues, UseFormRegister } from "react-hook-form";

import {
  getIconColor,
  getMoodString,
  getSleepString,
} from "../../utils/helpers";

import type { MoodType, SleepType } from "../../types/logMoodDialog";

type Step1And4InputProps =
  | {
      mood: MoodType;
      sleepHours?: never;
      register?: UseFormRegister<FieldValues>;
    }
  | {
      sleepHours: SleepType;
      mood?: never;
      register?: UseFormRegister<FieldValues>;
    };

function Step1And4Input({ mood, sleepHours, register }: Step1And4InputProps) {
  const isMoodInput = mood !== undefined;

  const moodString = isMoodInput ? getMoodString(mood) : undefined;
  const sleepString = !isMoodInput ? getSleepString(sleepHours) : undefined;
  const imageSource = isMoodInput ? getIconColor(mood) : undefined;
  const inputId = moodString || sleepString;
  const inputName = isMoodInput ? "mood" : "sleepHours";
  const inputValue = mood ?? sleepHours;
  const isDefaultChecked = mood === 2 || sleepHours === 9;

  return (
    <label
      htmlFor={inputId}
      className="flex items-center justify-between w-full px-250 py-150 bg-neutral-0 rounded-16 border-2 border-transparent cursor-pointer"
    >
      <div className="flex items-center gap-150">
        <input
          id={inputId}
          type="radio"
          className="appearance-none w-250 h-250 border border-blue-200 rounded-full relative"
          value={String(inputValue ?? "")}
          defaultChecked={isDefaultChecked}
          aria-labelledby={`${inputId}-label`}
          {...(register && { ...register(`${inputName}`) })}
        />
        <p className="text-preset-5 text-neutral-900">
          {isMoodInput ? moodString : sleepString}
        </p>
      </div>
      {isMoodInput && imageSource && (
        <img
          src={imageSource}
          alt={`${moodString} mood icon`}
          className="w-[38px] h-[38px]"
          aria-hidden="true"
        />
      )}
    </label>
  );
}

export default Step1And4Input;
