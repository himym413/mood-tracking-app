import {
  getIconColor,
  getMoodQuote,
  getMoodString,
  getSleepString,
} from "../../utils/helpers";

import iconQuote from "../../assets/images/icon-quote.svg";
import iconSleep from "../../assets/images/icon-sleep.svg";
import iconReflection from "../../assets/images/icon-reflection.svg";

import { useAppSelector } from "../../hooks/typedHooks";
import Spinner from "../../components/common/Spinner";

function MoodLogged() {
  const { moodLogs, isLoading } = useAppSelector(
    (state) => state.logMoodDialog
  );

  if (isLoading) {
    return (
      <section className="flex justify-center py-400">
        <Spinner size={24} color="#2a4cd5" />
      </section>
    );
  }

  if (!moodLogs.length) {
    return (
      <section className="text-center text-neutral-600 py-400">
        You haven’t logged any moods yet.
      </section>
    );
  }

  const latestMoodLog = moodLogs[moodLogs.length - 1];
  const { mood, sleepHours, journalEntry, feelings } = latestMoodLog;

  const imageSource = getIconColor(mood);
  const moodString = getMoodString(mood);
  const moodQuote = getMoodQuote(mood);
  const sleepString = getSleepString(sleepHours);

  return (
    <section className="mb-400 flex flex-col items-center gap-200 text-center max-w-[1170px] mx-auto lg:flex-row lg:gap-400">
      <div className="flex flex-col items-center gap-400 rounded-16 px-200 py-400 bg-neutral-0 w-full md:items-start md:h-[340px] relative overflow-hidden md:p-400 lg:flex-7/12">
        <div className="md:text-left md:mb-auto">
          <p className="text-preset-3 text-neutral-600">I'm feeling</p>
          <h2 className="text-preset-2 text-neutral-900">{moodString}</h2>
        </div>
        <div className="md:absolute md:right-500 md:top-600">
          <img
            src={imageSource}
            className="w-[200px] h-[200px] md:w-[320px] md:h-[320px]"
            alt="Mood icon"
          />
        </div>
        <div className="flex flex-col items-center gap-200 md:items-start">
          <img src={iconQuote} className="w-300 h-300" alt="Quote icon" />
          <p className="text-preset-6-italic text-neutral-900 md:max-w-[55%] md:text-left">
            {moodQuote}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-200 w-full lg:flex-5/12 lg:gap-250">
        <div className="flex flex-col items-baseline justify-baseline gap-200 rounded-16 p-250 bg-neutral-0">
          <div className="flex items-center gap-150">
            <img
              src={iconSleep}
              alt="Icon sleep"
              className="w-[22px] h-[22px]"
            />
            <p className="text-preset-6 text-neutral-600">Sleep</p>
          </div>
          <h3 className="text-preset-3 text-neutral-900">{sleepString}</h3>
        </div>

        <div className="flex flex-col items-baseline justify-baseline gap-200 rounded-16 p-250 bg-neutral-0">
          <div className="flex items-center gap-150">
            <img
              src={iconReflection}
              alt="Icon reflection"
              className="w-[22px] h-[22px]"
            />
            <p className="text-preset-6 text-neutral-600">
              Reflection of the day
            </p>
          </div>
          <div className="h-1000 text-left max-h-1000 overflow-y-auto">
            <p className="text-preset-6 text-neutral-900">{journalEntry}</p>
          </div>
          {Array.isArray(feelings) && feelings.length > 0 ? (
            <div className="flex items-center gap-150 text-preset-6-italic text-neutral-600 flex-wrap">
              {feelings.map((feeling) => (
                <span key={feeling}>#{feeling}</span>
              ))}
            </div>
          ) : (
            <p className="text-preset-6-italic text-neutral-600">
              No feelings logged.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default MoodLogged;
