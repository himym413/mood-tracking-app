import type { ProcessedDataType } from "../../types/chart";
import {
  getIconColor,
  getMoodString,
  getSleepHoursRounded,
} from "../../utils/helpers";

type CustomTooltipProps = {
  active?: boolean;
  payload?: {
    payload: ProcessedDataType;
  }[];
};

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return;

  const { mood, sleepValue, journalEntry, feelings } = payload[0].payload;

  // Check for missing data to prevent rendering incomplete tooltips
  if (mood == null || !sleepValue || !feelings?.length) {
    return null;
  }

  const imageSource = getIconColor(mood);
  const moodText = getMoodString(mood);
  const sleepText = getSleepHoursRounded(sleepValue);

  if (active && payload && payload.length > 0) {
    return (
      <div className="w-[175px] bg-neutral-0 p-150 flex flex-col items-start gap-150 rounded-10 shadow-[0_4px_7px_rgba(33,33,77,0.16)]">
        <div>
          <h6 className="text-preset-8 text-neutral-600 mb-075">Mood</h6>
          <div className="flex items-center gap-075">
            <img src={imageSource} className="w-200 h-200" />
            <p className="text-preset-7 text-neutral-900">{moodText}</p>
          </div>
        </div>
        <div>
          <h6 className="text-preset-8 text-neutral-600 mb-075">Sleep</h6>
          <p className="text-preset-7 text-neutral-900">{sleepText}</p>
        </div>
        <div>
          <h6 className="text-preset-8 text-neutral-600 mb-075">Reflection</h6>
          <p className="text-preset-9 text-neutral-900">{journalEntry}</p>
        </div>
        <div>
          <h6 className="text-preset-8 text-neutral-600 mb-075">Tags</h6>
          {feelings.map((feeling, i, arr) => (
            <span key={feeling} className="text-preset-9 text-neutral-900">
              {feeling}
              {i !== arr.length - 1 && ", "}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export default CustomTooltip;
