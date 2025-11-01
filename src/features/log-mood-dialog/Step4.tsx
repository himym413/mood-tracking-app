import { SLEEP } from "../../constants/constants";
import type { StepProps } from "../../types/logMoodDialog";

import Step1And4Input from "./Step1And4Input";

function Step4({ register }: StepProps) {
  return (
    <>
      <h2 className="text-preset-3-mobile text-neutral-900 md:text-preset-3">
        How many hours did you sleep last night?
      </h2>
      <fieldset className="flex flex-col gap-150 items-start">
        <legend className="sr-only">Select your sleep time</legend>
        {SLEEP.map((sleep) => (
          <Step1And4Input key={sleep} sleepHours={sleep} register={register} />
        ))}
      </fieldset>
    </>
  );
}

export default Step4;
