import type { FormInputProps } from "../../types/auth.ts";
import avatarPlaceholder from "../../assets/images/avatar-placeholder.svg";
import FormError from "./FormError.tsx";
import { useState, type ChangeEvent } from "react";

function FormInput({
  label,
  name,
  type,
  value,
  placeholder,
  bottomMargin,
  accept,
  register,
  registerOptions,
  errors,
  previewUrl,
  setPreviewUrl,
}: FormInputProps) {
  const [fileName, setFileName] = useState<string>(label);
  const showError = typeof errors?.[name]?.message === "string";

  // handle displaying image name after change on input element
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (type !== "file") return;

    const file = e.target.files?.[0];

    if (file && setPreviewUrl) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }

    if (file) {
      setFileName(file.name);
    }
  }

  return (
    <div
      className={`text-preset-6-regular flex flex-col gap-100 ${
        bottomMargin ? bottomMargin : ""
      } ${type === "file" ? "flex-row gap-250" : ""}`}
    >
      {type === "file" ? (
        <>
          <img
            src={previewUrl || value || avatarPlaceholder}
            alt="Avatar preview"
            className="w-800 h-800 rounded-full object-cover"
          />

          <div className="flex flex-col gap-075 items-start">
            <p>{fileName}</p>
            <p className="text-preset-7 text-neutral-600">
              Max 5MB, PNG or JPEG
            </p>
            <label
              htmlFor={name}
              className={`md:cursor-pointer text-preset-6-regular text-neutral-900 border ${
                showError ? "border-red-700" : "border-neutral-300"
              } rounded-8 px-200 py-100 mt-125 lg:hover:border-neutral-900`}
            >
              Upload
            </label>
            {showError && (
              <FormError message={errors?.[name]?.message as string} />
            )}
          </div>
        </>
      ) : (
        <>
          <label htmlFor={name} className="text-neutral-900">
            {label}
          </label>
          <input
            id={name}
            className={`text-neutral-600 rounded-10 border border-neutral-300 px-200 py-150 lg:hover:border-neutral-600 lg:hover:cursor-pointer lg:focus:outline-blue-700 lg:focus:outline-offset-3 ${
              errors?.[name] ? "border-red-700" : ""
            }`}
            type={type}
            value={value}
            accept={accept}
            placeholder={placeholder || ""}
            {...register!(name, registerOptions)}
          />
          {showError && (
            <FormError message={errors?.[name]?.message as string} />
          )}
        </>
      )}

      {/* Hidden input for file type */}
      {type === "file" && (
        <input
          id={name}
          type="file"
          className="opacity-0 w-[1px] h-[1px] inputTypeFile"
          accept={accept}
          {...register!(name, registerOptions)}
          onChange={handleChange}
        />
      )}
    </div>
  );
}

export default FormInput;
