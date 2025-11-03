import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useAppDispatch, useAppSelector } from "../../hooks/typedHooks.ts";
import { login, signup } from "../auth/authSlice.ts";
import { createOrUpdateProfile } from "../onboarding/profileSlice.ts";
import {
  reset as resetMoodDialogState,
  getMoodLogs,
} from "../../features/log-mood-dialog/logMoodDialogSlice.ts";

import type { RootState } from "../../app/store.ts";
import type { FormProps } from "../../types/auth.ts";

import FormInput from "./FormInput.tsx";
import Button from "./Button.tsx";

type FormData = {
  name?: string;
  avatar?: FileList;
  email?: string;
  password?: string;
};

function Form({ cardType }: FormProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    register,
    getValues,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<FormData>();

  const { name, avatar_url } = useAppSelector((state) => state.profile);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const dispatch = useAppDispatch();
  const { isLoading: isLoadingAuth } = useAppSelector(
    (state: RootState) => state.auth
  );
  const { isLoading: isLoadingProfile } = useAppSelector(
    (state: RootState) => state.profile
  );

  function onSubmit(data: FormData) {
    const { email, password, name, avatar } = data;
    const avatarFile = avatar?.[0] ?? undefined;

    if (cardType === "signup" && email && password) {
      dispatch(signup({ email, password })).then((action) => {
        if (signup.fulfilled.match(action)) {
          dispatch(resetMoodDialogState());
          dispatch(
            createOrUpdateProfile({ name: "", avatar: avatarFile, cardType })
          ).then((action) => {
            if (createOrUpdateProfile.fulfilled.match(action))
              navigate("/onboarding");

            if (createOrUpdateProfile.rejected.match(action))
              toast.error(action.payload as string);
          });
        }

        if (signup.rejected.match(action))
          toast.error(action.payload as string);
      });
    }

    if (cardType === "login" && email && password) {
      dispatch(login({ email, password })).then((action) => {
        if (login.fulfilled.match(action)) {
          dispatch(resetMoodDialogState());
          dispatch(getMoodLogs());
          navigate("/");
          window.scrollTo({ top: 0, behavior: "instant" });
        }

        if (login.rejected.match(action)) {
          toast.error(action.payload as string);
          reset({ email: "", password: "" });
          setFocus("email");
        }
      });
    }

    if (cardType === "onboarding" && name && avatar) {
      dispatch(createOrUpdateProfile({ name, avatar: avatarFile })).then(
        (action) => {
          if (createOrUpdateProfile.fulfilled.match(action)) {
            navigate("/");
            window.scrollTo({ top: 0, behavior: "instant" });
          }

          if (createOrUpdateProfile.rejected.match(action)) {
            toast.error(action.payload as string);
          }
        }
      );
    }

    if (cardType === "settings") {
      dispatch(
        createOrUpdateProfile({ name, avatar: avatarFile, cardType })
      ).then((action) => {
        if (createOrUpdateProfile.fulfilled.match(action)) navigate("/");

        if (createOrUpdateProfile.rejected.match(action)) {
          toast.error(action.payload as string);
        }
      });
    }
  }
  // creating inputs based on cardType
  // if cardType is login or signup, we only need email and password
  // if its onboarding, then name and file upload
  const jsx =
    cardType === "onboarding" ? (
      <>
        <FormInput
          label="Name"
          name="name"
          type="text"
          placeholder={name || "Jane Appleseed"}
          register={register}
          registerOptions={{
            required: "Name is required.",
            minLength: {
              value: 4,
              message: "Minimum 4 characters.",
            },
            maxLength: {
              value: 20,
              message: "Maximum 20 characters.",
            },
          }}
          errors={errors}
        />
        <FormInput
          label="Upload Image"
          name="avatar"
          type="file"
          value={avatar_url}
          accept="image/png, image/jpeg"
          register={register}
          registerOptions={{
            validate: {
              fileSize: (fileList: FileList) => {
                const file = fileList?.[0];
                let size;
                if (file) size = file.size / 1024;

                if (size) return size <= 5000 || "File must be less than 5MB.";
              },
            },
          }}
          errors={errors}
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
        />
      </>
    ) : cardType === "settings" ? (
      <>
        <FormInput
          label="Name"
          name="name"
          type="text"
          placeholder={name || "Jane Appleseed"}
          register={register}
          registerOptions={{
            minLength: {
              value: 4,
              message: "Minimum 4 characters.",
            },
            maxLength: {
              value: 20,
              message: "Maximum 20 characters.",
            },
          }}
          errors={errors}
        />
        <FormInput
          label="Upload Image"
          name="avatar"
          type="file"
          value={avatar_url}
          accept="image/png, image/jpeg"
          register={register}
          registerOptions={{
            validate: {
              fileSize: (fileList: FileList) => {
                const file = fileList?.[0];
                let size;
                if (file) size = file.size / 1024;

                if (size) return size <= 5000 || "File must be less than 5MB.";
              },
            },
          }}
          errors={errors}
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
        />
      </>
    ) : cardType === "login" ? (
      <>
        <FormInput
          label="Email address"
          name="email"
          type="email"
          placeholder="name@mail.com"
          register={register}
          registerOptions={{
            required: "Email is required.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Simple email regex
              message: "Invalid email format.",
            },
          }}
          errors={errors}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          bottomMargin="mb-400"
          register={register}
          registerOptions={{
            required: "Password is required.",
            minLength: {
              value: 8,
              message: "Minimum 8 characters.",
            },
          }}
          errors={errors}
        />
      </>
    ) : (
      <>
        <FormInput
          label="Email address"
          name="email"
          type="email"
          placeholder="name@mail.com"
          register={register}
          registerOptions={{
            required: "Email is required.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Simple email regex
              message: "Invalid email format.",
            },
          }}
          errors={errors}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          register={register}
          registerOptions={{
            required: "Password is required.",
            minLength: {
              value: 8,
              message: "Minimum 8 characters.",
            },
          }}
          errors={errors}
        />
        <FormInput
          label="Confirm password"
          name="confirmPassword"
          type="password"
          bottomMargin="mb-400"
          register={register}
          registerOptions={{
            required: "Password is required.",
            minLength: {
              value: 8,
              message: "Minimum 8 characters.",
            },
            validate: (value) =>
              value === getValues().password || "Passwords must match.",
          }}
          errors={errors}
        />
      </>
    );

  return (
    <form className="flex flex-col gap-250" onSubmit={handleSubmit(onSubmit)}>
      {jsx}
      {/* button stays the same through all cards, with different text */}
      <Button
        text={
          cardType === "login"
            ? "Log in"
            : cardType === "signup"
            ? "Sign Up"
            : cardType === "onboarding"
            ? "Start Tracking"
            : "Save changes"
        }
        variant="auth"
        type="submit"
        disabled={isLoadingAuth || isLoadingProfile}
      />
    </form>
  );
}

export default Form;
