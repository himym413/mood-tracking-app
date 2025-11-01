import type { ProfileDropdownProps } from "../../types/home";

import ButtonDropdown from "../../components/common/ButtonDropdown";
import { useAppSelector } from "../../hooks/typedHooks";

function ProfileDropdown({ ref, onSettingsClick }: ProfileDropdownProps) {
  const { name } = useAppSelector((state) => state.profile);
  const { user } = useAppSelector((state) => state.auth);

  const email = user?.email;

  return (
    <div
      ref={ref}
      role="menu"
      className="absolute top-800 w-full bg-neutral-0 right-0 px-200 py-150 rounded-8 shadow-[0_5px_8px_rgba(33,33,77,0.16)] flex flex-col gap-150 items-start md:w-[200px] md:top-600"
    >
      <div>
        <h3 className="text-preset-6 text-neutral-900 ">{name}</h3>
        <p className="text-preset-7 text-neutral-300">{email}</p>
      </div>
      <div className="h-[1px] w-full bg-blue-100"></div>
      <ButtonDropdown type="settings" onClick={onSettingsClick} />
      <ButtonDropdown type="logout" />
    </div>
  );
}

export default ProfileDropdown;
