import type {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type CardType = "login" | "signup" | "onboarding" | "settings";

export type FormProps = {
  cardType: CardType;
};

export type AuthAndOnboardingCardProps = {
  heading: string;
  topText: string;
  bottomText?: string;
  cardType: CardType;
};

export type FormInputProps = {
  label: string;
  name: string;
  type: "text" | "email" | "password" | "file" | string;
  value?: string;
  placeholder?: string;
  bottomMargin?: string;
  accept?: string;
  register?: UseFormRegister<FieldValues>;
  registerOptions?: RegisterOptions;
  errors?: FieldErrors;
  previewUrl?: string | null;
  setPreviewUrl?: (url: string | null) => void;
};

export type ButtonProps = {
  text: string;
  ariaLabel?: string;
  variant?: "home" | "auth";
  onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void);
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};
