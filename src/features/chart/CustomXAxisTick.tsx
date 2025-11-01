import { format, isValid, parse } from "date-fns";

type CustomXAxisTickProps = {
  x?: number;
  y?: number;
  payload?: { value: string };
};

const CustomXAxisTick: React.FC<CustomXAxisTickProps> = ({ x, y, payload }) => {
  if (!payload || !payload.value) return null;

  // Parse using custom format dd.MM.yyyy
  const date = parse(payload.value, "dd.MM.yyyy", new Date());

  // Check if the date is valid
  if (!isValid(date)) return null;

  const month = format(date, "MMMM");
  const day = format(date, "dd");

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        style={{
          fontSize: "12px",
          fontWeight: 400,
          lineHeight: "110%",
          fill: "#57577b",
        }}
        textAnchor="middle"
      >
        {month}
      </text>
      <text
        x={0}
        y={0}
        dy={38}
        style={{
          fontSize: "13px",
          fontWeight: 600,
          lineHeight: "100%",
          fill: "#21214d",
        }}
        textAnchor="middle"
      >
        {day}
      </text>
    </g>
  );
};

export default CustomXAxisTick;
