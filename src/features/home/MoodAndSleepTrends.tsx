import Chart from "../chart/Chart";

function MoodAndSleepTrends() {
  return (
    <section
      className="bg-neutral-0 rounded-16 py-200 md:px-250 lg:p-400 lg:w-[768px] lg:overflow-x-hidden pr-0 pl-100"
      aria-label="Mood and sleep trends chart"
    >
      <h2 className="text-preset-3-mobile md:text-preset-3 text-neutral-900 mb-400">
        Mood and sleep trends
      </h2>

      <Chart />
    </section>
  );
}

export default MoodAndSleepTrends;
