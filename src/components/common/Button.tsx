import type { ButtonProps } from "../../types/auth.ts";
import Spinner from "./Spinner.tsx";

function Button({
  text,
  ariaLabel,
  variant,
  onClick,
  type,
  disabled,
}: ButtonProps) {
  const baseStyle =
    "text-preset-5 text-neutral-0 bg-blue-600 rounded-10 hover:bg-blue-700 hover:cursor-pointer md:focus:border-blue-700 outline-offset-3";
  const variantStyle = variant === "home" ? "px-400 py-200" : "py-150";

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variantStyle}`}
      aria-label={ariaLabel}
      type={type}
      disabled={disabled}
    >
      {disabled ? <Spinner size={10} color="#fff" /> : text}
    </button>
  );
}

export default Button;
