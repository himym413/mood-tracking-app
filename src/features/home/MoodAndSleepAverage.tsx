import MoodAndSleepCard from "../../components/common/MoodAndSleepCard.tsx";
import { useAppSelector } from "../../hooks/typedHooks.ts";
import { getAverageMood, getAverageSleep } from "../../utils/helpers.ts";

function MoodAndSleepAverage() {
  const { moodLogs } = useAppSelector((state) => state.logMoodDialog);
  let averageMood: number | null = null;
  let averageSleep: number | null = null;

  if (moodLogs.length >= 5) {
    averageMood = getAverageMood(moodLogs);
    averageSleep = getAverageSleep(moodLogs);
  }

  return (
    <section className="bg-neutral-0 rounded-16 px-200 py-250 flex flex-col gap-300 lg:p-300 lg:w-[370px] lg:shrink-0">
      <MoodAndSleepCard cardType="mood" averageMood={averageMood} />
      <MoodAndSleepCard cardType="sleep" averageSleep={averageSleep} />
    </section>
  );
}

export default MoodAndSleepAverage;
