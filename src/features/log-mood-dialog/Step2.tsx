import { FEELINGS } from "../../constants/constants";
import type { StepProps } from "../../types/logMoodDialog";

import Step2Input from "./Step2Input";

function Step2({ register }: StepProps) {
  return (
    <>
      <div>
        <h2 className="text-preset-3-mobile text-neutral-900 mb-075 md:text-preset-3">
          How did you feel?
        </h2>
        <p className="text-preset-6 text-neutral-600 mb-300">
          Select up to three tags:
        </p>

        <fieldset
          className="flex flex-wrap gap-x-200 gap-y-150"
          aria-describedby="feelings-description"
        >
          <legend className="sr-only">Select your feelings</legend>
          {FEELINGS.map((feeling) => (
            <Step2Input key={feeling} feeling={feeling} register={register} />
          ))}
        </fieldset>
      </div>
    </>
  );
}

export default Step2;
