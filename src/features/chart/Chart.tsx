import { useEffect, useRef } from "react";

import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

import { useAppSelector } from "../../hooks/typedHooks";

import { processChartData } from "../../utils/chartUtils";

import CustomBar from "./CustomBar";
import CustomXAxisTick from "./CustomXAxisTick";
import CustomYAxisTick from "./CustomYAxisTick";
import CustomTooltip from "./CustomTooltip";

function Chart() {
  const { moodLogs } = useAppSelector((state) => state.logMoodDialog);
  const processedData = processChartData(moodLogs);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollToRight = () => {
      const container = scrollContainerRef.current;
      if (!container) return;
      container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
    };

    scrollToRight();
    window.addEventListener("resize", scrollToRight);
    return () => {
      window.removeEventListener("resize", scrollToRight);
    };
  }, [processedData]);

  return (
    <div
      ref={scrollContainerRef}
      className="w-full overflow-x-auto overflow-y-hidden md:max-w-[800px] md:mx-auto"
      onScroll={(e) => {
        // making yAxis appear not to move during scroll
        const yAxis = document.querySelector(
          ".recharts-cartesian-axis.recharts-yAxis.yAxis"
        ) as HTMLElement;
        if (yAxis) {
          yAxis.style.transform = `translateX(${e.currentTarget.scrollLeft}px)`;
        }

        // adding rect, so that yAxis is opaque
        const hasRect = yAxis.querySelectorAll(".y-axis-rect").length > 0;

        if (!hasRect) {
          // add the rec
          const rect = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "rect"
          );
          const yAxisWidth = yAxis.getBoundingClientRect().width.toString();

          rect.setAttribute("x", "0");
          rect.setAttribute("y", "0");
          rect.setAttribute("width", yAxisWidth);
          rect.setAttribute("height", "312");
          rect.setAttribute("fill", "white");
          rect.setAttribute("class", "y-axis-rect");

          yAxis.insertBefore(rect, yAxis.firstChild);
        }
      }}
    >
      <BarChart data={processedData} width={704} height={312}>
        <Bar
          dataKey="sleepValue"
          stroke="red"
          legendType="none"
          barSize={40}
          shape={<CustomBar />}
        />
        <CartesianGrid stroke="#ccc" vertical={false} />
        <XAxis
          dataKey="createdAt"
          padding={{ left: -10, right: -10 }}
          axisLine={false}
          tickLine={false}
          height={48}
          interval={0}
          tick={<CustomXAxisTick />}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          width={68}
          domain={[0, 9]}
          interval={0}
          tick={<CustomYAxisTick />}
          ticks={[0, 1.8, 3.6, 5.4, 7.2, 9]} // 6 ticks total
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={false}
          offset={30}
          coordinate={{ x: 100, y: 140 }}
        />
      </BarChart>
    </div>
  );
}

export default Chart;
