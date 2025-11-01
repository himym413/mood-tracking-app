import iconSleep from "../../assets/images/icon-sleep.svg";
import { getSleepHoursRounded } from "../../utils/helpers";

type CustomYAxisTickProps = {
  x?: number;
  y?: number;
  payload?: { value: 0 | 1.8 | 3.6 | 5.4 | 7.2 | 9 };
};

const CustomYAxisTick: React.FC<CustomYAxisTickProps> = ({
  x = 0,
  y = 0,
  payload,
}) => {
  if (!payload) return;

  const label = getSleepHoursRounded(payload.value);

  return (
    <g transform={`translate(${x},${y})`}>
      {payload.value !== 0 && (
        <image href={iconSleep} width={10} height={10} x={-65} y={-3} />
      )}
      <text
        x={-50}
        y={0}
        dy={6}
        style={{
          fontSize: "12px",
          fontWeight: 400,
          lineHeight: "110%",
          fill: "#57577b",
        }}
        textAnchor="start"
      >
        {label}
      </text>
    </g>
  );
};

export default CustomYAxisTick;
