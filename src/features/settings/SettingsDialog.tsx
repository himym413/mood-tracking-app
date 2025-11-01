import { createPortal } from "react-dom";
import type { RefObject } from "react";

import Form from "../../components/common/Form";
import Overlay from "../../components/common/Overlay";

type SettingsDialogProps = {
  dialogRef: RefObject<HTMLDialogElement | null>;
  onClose: () => void;
};

export function SettingsDialog({ dialogRef, onClose }: SettingsDialogProps) {
  return createPortal(
    <>
      <Overlay />
      <dialog
        ref={dialogRef}
        className="fixed top-1000 left-1/2 -translate-x-1/2 max-w-[600px] px-250 py-500 rounded-16 flex flex-col gap-300 md:gap-400 w-[calc(100%-40px)]"
      >
        <div>
          <h3 className="text-preset-3 text-neutral-900 mb-100">
            Update your profile
          </h3>
          <p className="text-preset-6-regular text-neutral-600">
            Personalize your account with your name and photo.
          </p>
        </div>
        <Form cardType="settings" />
        <button
          onClick={onClose}
          className="absolute top-200 right-150 font-bold text-neutral-300 px-075 cursor-pointer"
        >
          X
        </button>
      </dialog>
    </>,
    document.body
  );
}

export default SettingsDialog;
