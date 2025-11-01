import type { RefObject } from "react";
import type { MoodType, SleepType } from "./logMoodDialog";

export type MoodAndSleepCardProps = {
  cardType: "mood" | "sleep";
  averageMood?: MoodType | number | null;
  averageSleep?: SleepType | number | null;
};

export type ProfileDropdownProps = {
  ref: RefObject<HTMLDivElement | null>;
  onSettingsClick?: () => void;
};

export type ButtonDropdownProps = {
  type: "settings" | "logout";
  onClick?: () => void;
};
