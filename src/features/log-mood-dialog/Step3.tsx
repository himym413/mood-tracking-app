import { updateJournalEntry } from "./logMoodDialogSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/typedHooks";

import type { StepProps } from "../../types/logMoodDialog";

function Step3({ register }: StepProps) {
  const dispatch = useAppDispatch();
  const journalEntry = useAppSelector(
    (state) => state.logMoodDialog.journalEntry
  );

  return (
    <>
      <h2
        className="text-preset-3-mobile text-neutral-900 md:text-preset-3"
        id="day-entry-heading"
      >
        Write about your day...
      </h2>
      <div className="flex flex-col gap-100">
        <label htmlFor="journalEntry" className="sr-only">
          Daily journal input
        </label>
        <textarea
          id="journalEntry"
          aria-labelledby="day-entry-heading"
          rows={5}
          cols={33}
          maxLength={150}
          className="rounded-10 border border-neutral-300 bg-neutral-0 px-200 py-150 text-preset-6-italic text-neutral-600 h-[150px]"
          placeholder="Today, I felt..."
          {...(register && {
            ...register("journalEntry", {
              onChange: (e) => dispatch(updateJournalEntry(e.target.value)),
            }),
          })}
        ></textarea>
        <p
          className="text-preset-8 text-neutral-600 text-right"
          aria-live="polite"
        >
          {journalEntry.length}/150
        </p>
      </div>
    </>
  );
}

export default Step3;
