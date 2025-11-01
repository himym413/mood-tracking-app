import type { FieldValues, UseFormRegister } from "react-hook-form";

export type StepType = 1 | 2 | 3 | 4;
export type MoodType = 2 | 1 | 0 | -1 | -2 | null;
export type SleepType = 1 | 3.5 | 5.5 | 7.5 | 9 | null;
export type StepProps = {
  register: UseFormRegister<FieldValues>;
};
