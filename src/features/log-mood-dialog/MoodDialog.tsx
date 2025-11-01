import type { RefObject } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaCircleInfo } from "react-icons/fa6";

import {
  updateStep,
  setError,
  submitMood,
  getMoodLogs,
} from "./logMoodDialogSlice";

import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useAppDispatch, useAppSelector } from "../../hooks/typedHooks";

import type { MoodType, SleepType } from "../../types/logMoodDialog";
import type { DataType } from "../../types/chart";

import Overlay from "../../components/common/Overlay";
import ProgressBar from "./ProgressBar";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Button from "../../components/common/Button";

type MoodDialogProps = {
  onClose: () => void;
};

type MoodFormData = {
  mood?: MoodType;
  feelings?: string[];
  journalEntry?: string;
  sleepHours?: SleepType;
};

function MoodDialog({ onClose }: MoodDialogProps) {
  const { register, handleSubmit } = useForm<MoodFormData>();

  const dispatch = useAppDispatch();
  const { step, feelings, journalEntry, error } = useAppSelector(
    (state) => state.logMoodDialog
  );

  const ref = useOutsideClick(onClose);

  function onSubmit(data: MoodFormData) {
    // checking for error on step 2 - no tags selected
    if (step === 2 && feelings.length === 0) {
      dispatch(setError("Select at least one tag."));
      return;
    }

    // checking for error on step 3 - minimum 10 characters
    if (step === 3 && journalEntry.length < 10) {
      dispatch(
        setError("Please write a few words about your day before continuing.")
      );
      return;
    }

    if (step < 4) {
      dispatch(updateStep());
    }

    // final submit
    if (step >= 4) {
      // here im manually assigning feelings from lodMoodDialogSlice state
      // because inside step2input im overwriting onChange event
      // that results in not updating react hook form data
      // and only updates state from logMoodDialogSlice
      data.feelings = feelings;
      dispatch(submitMood({ formData: data as DataType })).then((action) => {
        if (submitMood.fulfilled.match(action)) dispatch(getMoodLogs());

        if (submitMood.rejected.match(action))
          toast.error(action.payload as string);
      });
      onClose();
    }
  }

  return createPortal(
    <>
      <Overlay />
      <dialog
        ref={ref as RefObject<HTMLDialogElement | null>}
        className="fixed top-1000 left-1/2 -translate-x-1/2 max-w-[600px] px-250 py-500 rounded-16 flex flex-col gap-300 md:gap-400 w-[calc(100%-40px)] linear-gradient-background [@media(max-height:900px)]:h-[500px] overflow-y-auto"
        aria-labelledby="mood-dialog-title"
        aria-modal="true"
      >
        <h1 id="mood-dialog-title" className="text-preset-3 text-neutral-900">
          Log your mood
        </h1>
        <ProgressBar />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-300"
        >
          {step === 1 && <Step1 register={register} />}
          {step === 2 && <Step2 register={register} />}
          {step === 3 && <Step3 register={register} />}
          {step === 4 && <Step4 register={register} />}

          {error.length !== 0 && (
            <p className="text-red-700 text-preset-7 flex items-center gap-075">
              <FaCircleInfo />
              <span>{error}</span>
            </p>
          )}
          <Button
            text={step !== 4 ? "Continue" : "Submit"}
            variant="home"
            type="submit"
          />
        </form>
      </dialog>
    </>,
    document.getElementById("mood-form")!
  );
}

export default MoodDialog;
