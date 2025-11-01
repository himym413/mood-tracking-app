import { FaCircleInfo } from "react-icons/fa6";

function FormError({ message }: { message: string }) {
  return (
    <span
      className="text-preset-9 text-red-700 flex items-center gap-075"
      aria-live="polite"
    >
      <FaCircleInfo className="w-[12px] h-[12px]" />
      {message}
    </span>
  );
}

export default FormError;
