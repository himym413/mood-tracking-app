import { getBgColorHexMood, getIconWhite } from "../../utils/helpers";

import type { MoodType } from "../../types/logMoodDialog";

type CustomBarProps = {
  x?: number;
  y?: number;
  payload?: {
    mood: MoodType | null;
    sleepValue: number;
  };
};

const CustomBar = ({ x = 0, y = 0, payload }: CustomBarProps) => {
  if (payload && payload.mood === null) return null;
  const { mood, sleepValue } = payload || {};

  let imageSource;
  let backgroundColor;

  if (mood !== null) {
    imageSource = getIconWhite(mood as MoodType);
    backgroundColor = getBgColorHexMood(mood as MoodType);
  }

  const rectHeight =
    sleepValue === 1.8
      ? "16.5%"
      : sleepValue === 3.6
      ? "33%"
      : sleepValue === 5.4
      ? "49.5%"
      : sleepValue === 7.2
      ? "66%"
      : "82.5%";

  return (
    <g transform={`translate(${x},${y})`} className="hover:cursor-pointer">
      <rect
        x={0}
        y={0}
        width={40}
        height={rectHeight}
        fill={backgroundColor}
        rx={20}
      />
      <image href={imageSource} x={5.15} y={5} width={30} height={30} />
    </g>
  );
};

export default CustomBar;
