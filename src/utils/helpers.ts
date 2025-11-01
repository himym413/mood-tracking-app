import iconHappyWhite from "../assets/images/icon-happy-white.svg";
import iconNeutralWhite from "../assets/images/icon-neutral-white.svg";
import iconSadWhite from "../assets/images/icon-sad-white.svg";
import iconVeryHappyWhite from "../assets/images/icon-very-happy-white.svg";
import iconVerySadWhite from "../assets/images/icon-very-sad-white.svg";

import iconHappyColor from "../assets/images/icon-happy-color.svg";
import iconNeutralColor from "../assets/images/icon-neutral-color.svg";
import iconSadColor from "../assets/images/icon-sad-color.svg";
import iconVeryHappyColor from "../assets/images/icon-very-happy-color.svg";
import iconVerySadColor from "../assets/images/icon-very-sad-color.svg";

// import { LuArrowUpRight } from "react-icons/lu";
// import { LuArrowDownRight } from "react-icons/lu";
// import { LuArrowRight } from "react-icons/lu";

import { moodQuotes } from "../constants/constants";
import type { DataType } from "../types/chart";
import type { MoodType, SleepType } from "../types/logMoodDialog";

export const convertSleepToTickValue = (hours: number | null) => {
  if (!hours) return null;
  const rounded = Math.floor(hours);
  if (rounded <= 2) return 1.8;
  if (rounded <= 4) return 3.6;
  if (rounded <= 6) return 5.4;
  if (rounded <= 8) return 7.2;
  return 9;
};

export const getSleepString = (value: SleepType | number): string => {
  if (!value) return "";

  if (value < 2.5) return "0-2 hours";
  if (value >= 2.5 && value < 4.5) return "3-4 hours";
  if (value >= 4.5 && value < 6.5) return "5-6 hours";
  if (value >= 6.5 && value < 8.5) return "7-8 hours";
  if (value >= 8.5) return "9+ hours";
  return "";
};

export const getSleepHoursRounded = (value: number): string => {
  switch (value) {
    case 1.8:
      return "0-2 hours";
    case 3.6:
      return "3-4 hours";
    case 5.4:
      return "5-6 hours";
    case 7.2:
      return "7-8 hours";
    case 9:
      return "9+ hours";
    default:
      return "";
  }
};

export const getMoodString = (value: MoodType | number): string => {
  if (value === null) return "";

  if (value < -1.5) return "Very sad";
  if (value >= -1.5 && value < -0.5) return "Sad";
  if (value >= -0.5 && value < 0.5) return "Neutral";
  if (value >= 0.5 && value < 1.5) return "Happy";
  if (value >= 1.5) return "Very happy";
  return "";
};

export const getIconWhite = (value: MoodType | number): string => {
  if (value === null) return "";

  if (value < -1.5) return iconVerySadWhite;
  if (value >= -1.5 && value < -0.5) return iconSadWhite;
  if (value >= -0.5 && value < 0.5) return iconNeutralWhite;
  if (value >= 0.5 && value < 1.5) return iconHappyWhite;
  if (value >= 1.5) return iconVeryHappyWhite;
  return "";
};

export const getIconColor = (value: MoodType | number): string => {
  if (value === null) return "";

  if (value < -1.5) return iconVerySadColor;
  if (value >= -1.5 && value < -0.5) return iconSadColor;
  if (value >= -0.5 && value < 0.5) return iconNeutralColor;
  if (value >= 0.5 && value < 1.5) return iconHappyColor;
  if (value >= 1.5) return iconVeryHappyColor;
  return "";
};

export const getBgColorHexMood = (
  value: MoodType | SleepType | number
): string => {
  if (value === null) return "";

  if (value < -1.5) return "#ff9b99";
  if (value >= -1.5 && value < -0.5) return "#b8b1ff";
  if (value >= -0.5 && value < 0.5) return "#89caff";
  if (value >= 0.5 && value < 1.5) return "#89e780";
  if (value >= 1.5) return "#ffc97c";
  return "#4865db";
};

export const getBgColorHexSleep = (
  value: MoodType | SleepType | number
): string => {
  if (value === null) return "";

  if (value < 2.5) return "#ff9b99";
  if (value >= 2.5 && value < 4.5) return "#b8b1ff";
  if (value >= 4.5 && value < 6.5) return "#89caff";
  if (value >= 6.5 && value < 8.5) return "#89e780";
  if (value >= 8.5) return "#ffc97c";
  return "#4865db";
};

export const getMoodQuote = (value: MoodType): string => {
  if (value === null) return "";

  const random = Math.floor(Math.random() * 5);

  if (value < -1.5) return moodQuotes["-2"][random];
  if (value >= -1.5 && value < -0.5) return moodQuotes["-1"][random];
  if (value >= -0.5 && value < 0.5) return moodQuotes["0"][random];
  if (value >= 0.5 && value < 1.5) return moodQuotes["1"][random];
  if (value >= 1.5) return moodQuotes["2"][random];
  return "";
};

export const getSubheading = (
  cardType: "mood" | "sleep",
  loggedMoodToday: boolean,
  moodLogsTotal: number,
  todaysMood?: MoodType,
  todaysSleep?: SleepType,
  averageMood?: MoodType | number | null,
  averageSleep?: SleepType | number | null
): string => {
  if (cardType === "mood" && moodLogsTotal < 5)
    return "Log 5 check-ins to see your average mood.";
  if (cardType === "mood" && moodLogsTotal < 5)
    return "Log 5 check-ins to see your average mood.";
  if (cardType === "mood" && !loggedMoodToday && moodLogsTotal >= 5)
    return "Log today's mood to see your progress.";
  if (cardType === "mood" && loggedMoodToday && moodLogsTotal >= 5) {
    if (todaysMood! > averageMood!)
      return "Increase from previous 5 check-ins.";
    if (todaysMood! < averageMood!)
      return "Decrease from previous 5 check-ins.";
    if (todaysMood! === averageMood!) return "Same as previous 5 check-ins.";
  }

  if (cardType === "sleep" && moodLogsTotal < 5)
    return "Track 5 nights to view average sleep.";
  if (cardType === "sleep" && moodLogsTotal < 5)
    return "Track 5 nights to view average sleep.";
  if (cardType === "sleep" && !loggedMoodToday && moodLogsTotal >= 5)
    return "Log today's mood to see your progress.";
  if (cardType === "sleep" && loggedMoodToday && moodLogsTotal >= 5) {
    if (todaysSleep! > averageSleep!)
      return "Increase from previous 5 check-ins.";
    if (todaysSleep! < averageSleep!)
      return "Decrease from previous 5 check-ins.";
    if (todaysSleep! === averageSleep!) return "Same as previous 5 check-ins.";
  }

  return "";
};

export const getAverageMood = (data: DataType[]) => {
  const averageMood =
    data.slice(-5).reduce((prev, cur) => prev + cur.mood!, 0) / 5;
  return averageMood;
};

export const getAverageSleep = (data: DataType[]) => {
  const averageMood =
    data.slice(-5).reduce((prev, cur) => prev + cur.sleepHours!, 0) / 5;
  return averageMood;
};
