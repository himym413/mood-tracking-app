import { useRef, useState, type RefObject } from "react";

import { useOutsideClick } from "../../hooks/useOutsideClick.ts";
import { useAppSelector } from "../../hooks/typedHooks.ts";

import avatarPlaceholder from "../../assets/images/avatar-placeholder.svg";
import dropdownArrow from "../../assets/images/icon-dropdown-arrow.svg";

import ProfileDropdown from "../../features/home/ProfileDropdown.tsx";
import SettingsDialog from "../../features/settings/SettingsDialog.tsx";
import Logo from "./Logo.tsx";

function Navigation() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  // element to ignore in useOutsideClick
  const ignoreRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useOutsideClick(() => setShowDropdown(false), ignoreRef);
  const dialogRef = useOutsideClick(() => setShowSettingsDialog(false));

  const { avatar_url } = useAppSelector((state) => state.profile);

  function handleClick() {
    setShowDropdown((show) => !show);
  }

  return (
    <nav className="flex items-center justify-between max-w-[1170px] w-full mx-auto lg:mb-800 relative">
      <Logo />
      <button
        ref={ignoreRef}
        onClick={handleClick}
        // onClick={handleClick}
        className="flex items-center gap-125 md:cursor-pointer lg:focus:outline-blue-600 outline-offset-3"
        aria-haspopup={true}
        aria-expanded={showDropdown}
      >
        <img
          className="w-500 h-500 rounded-full object-cover"
          src={avatar_url || avatarPlaceholder}
          alt="Avatar"
        />
        <img src={dropdownArrow} alt="Dropdown arrow" />
      </button>

      {showDropdown && (
        <ProfileDropdown
          ref={dropdownRef as RefObject<HTMLDivElement>}
          onSettingsClick={() => {
            setShowDropdown(false);
            setShowSettingsDialog(true);
          }}
        />
      )}

      {showSettingsDialog && (
        <SettingsDialog
          dialogRef={dialogRef as RefObject<HTMLDialogElement>}
          onClose={() => setShowSettingsDialog(false)}
          isOpen={showSettingsDialog}
        />
      )}
    </nav>
  );
}

export default Navigation;
