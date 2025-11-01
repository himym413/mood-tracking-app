import { MOODS } from "../../constants/constants";
import type { StepProps } from "../../types/logMoodDialog";

import Step1And4Input from "./Step1And4Input";

function Step1({ register }: StepProps) {
  return (
    <>
      <h2 className="text-preset-3-mobile text-neutral-900 mb-300 md:text-preset-3">
        How was your mood today?
      </h2>
      <fieldset className="flex flex-col gap-150 items-start">
        <legend className="sr-only">Select your mood</legend>
        {MOODS.map((mood) => (
          <Step1And4Input key={mood} mood={mood} register={register} />
        ))}
      </fieldset>
    </>
  );
}

export default Step1;
