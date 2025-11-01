import iconSettings from "../../assets/images/icon-settings.svg";
import iconLogout from "../../assets/images/icon-logout.svg";

import type { ButtonDropdownProps } from "../../types/home";
import { useAppDispatch } from "../../hooks/typedHooks";
import { logout } from "../auth/authSlice";

function ButtonDropdown({ type, onClick }: ButtonDropdownProps) {
  const dispatch = useAppDispatch();
  const imageSrc = type === "settings" ? iconSettings : iconLogout;

  function handleLogoutClick() {
    dispatch(logout());
  }

  return (
    <>
      <button
        onClick={onClick || handleLogoutClick}
        aria-label={type}
        className="text-preset-7 text-neutral-900 flex items-center gap-125 cursor-pointer"
      >
        <img src={imageSrc} alt={`Icon ${type}`} className="w-200 h-200" />
        <p>{type.charAt(0).toUpperCase() + type.slice(1)}</p>
      </button>
    </>
  );
}

export default ButtonDropdown;
