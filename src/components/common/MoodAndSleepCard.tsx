import type { MoodAndSleepCardProps } from "../../types/home.ts";
import iconSleep from "../../assets/images/icon-sleep.svg";
import {
  getBgColorHexMood,
  getIconWhite,
  getMoodString,
  getSleepString,
  getSubheading,
} from "../../utils/helpers.ts";
import { format } from "date-fns";
import { useAppSelector } from "../../hooks/typedHooks.ts";
import Spinner from "./Spinner.tsx";

function MoodAndSleepCard({
  cardType,
  averageMood,
  averageSleep,
}: MoodAndSleepCardProps) {
  const { moodLogs, isLoading } = useAppSelector(
    (state) => state.logMoodDialog
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-400">
        <Spinner size={20} color="#2a4cd5" />
      </div>
    );
  }

  const latestMood = moodLogs[moodLogs.length - 1];
  const loggedMoodToday =
    latestMood?.createdAt === format(new Date(), "dd.MM.yyyy");

  const heading = cardType === "mood" ? "Average Mood" : "Average Sleep";
  let subHeading = getSubheading(
    cardType,
    loggedMoodToday,
    moodLogs.length,
    latestMood?.mood ?? null,
    latestMood?.sleepHours ?? null,
    averageMood,
    averageSleep
  );

  let sleepText = cardType === "sleep" ? "Not enough data yet!" : "";
  let moodText = cardType === "mood" ? "Keep tracking!" : "";
  let imageSource = "";
  let bgColor = "#c7d3f7";

  if (cardType === "sleep" && averageSleep != null) {
    sleepText = getSleepString(averageSleep);
    imageSource = iconSleep;
    bgColor = "#4865db";
    subHeading = getSubheading(
      cardType,
      loggedMoodToday,
      moodLogs.length,
      latestMood?.mood ?? null,
      latestMood?.sleepHours ?? null,
      averageMood,
      averageSleep
    );
  }

  if (cardType === "mood" && averageMood != null) {
    moodText = getMoodString(averageMood);
    imageSource = getIconWhite(averageMood);
    bgColor = getBgColorHexMood(averageMood);
    subHeading = getSubheading(
      cardType,
      loggedMoodToday,
      moodLogs.length,
      latestMood?.mood ?? null,
      latestMood?.sleepHours ?? null,
      averageMood,
      averageSleep
    );
  }

  return (
    <div>
      <h2 className="text-preset-5 text-neutral-900 mb-150">
        {heading}{" "}
        <span className="text-preset-7 text-neutral-600">
          (Last 5 check-ins)
        </span>
      </h2>

      <div
        className="text-neutral-900 rounded-20 px-200 py-500"
        style={{ backgroundColor: bgColor }}
      >
        <div className="flex items-center gap-150 mb-150">
          {imageSource && (
            <img
              src={imageSource}
              alt={moodText ? `Icon ${moodText}` : "Icon sleep"}
            />
          )}
          <h4 className="text-preset-4">{sleepText || moodText}</h4>
        </div>

        <div className="flex items-center gap-100">
          {/* <LuArrowRight /> */}
          <p className="text-preset-7">{subHeading}</p>
        </div>
      </div>
    </div>
  );
}

export default MoodAndSleepCard;
