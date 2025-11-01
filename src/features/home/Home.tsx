import { useState } from "react";
import { format } from "date-fns";

import { useAppDispatch, useAppSelector } from "../../hooks/typedHooks.ts";
import { reset } from "../../features/log-mood-dialog/logMoodDialogSlice.ts";

import LogMood from "./LogMood.tsx";
import MoodAndSleepAverage from "./MoodAndSleepAverage.tsx";
import MoodAndSleepTrends from "./MoodAndSleepTrends.tsx";
import MoodDialog from "../log-mood-dialog/MoodDialog.tsx";
import MoodLogged from "./MoodLogged.tsx";

function Home() {
  const [showMoodDialog, setShowMoodDialog] = useState(false);

  const dispatch = useAppDispatch();
  const { moodLogs } = useAppSelector((state) => state.logMoodDialog);

  const latestMood = moodLogs[moodLogs.length - 1];
  const loggedMoodToday = latestMood
    ? latestMood.createdAt === format(new Date(), "dd.MM.yyyy")
    : false;

  return (
    <>
      <LogMood
        onClick={() => {
          setShowMoodDialog(true);
          dispatch(reset());
        }}
        moodLogged={loggedMoodToday}
      />
      {loggedMoodToday && <MoodLogged />}
      <div className="lg:flex-row flex flex-col max-w-[1170px] w-full lg:mx-auto gap-400">
        <MoodAndSleepAverage />
        <MoodAndSleepTrends />
      </div>
      {showMoodDialog && (
        <MoodDialog onClose={() => setShowMoodDialog(false)} />
      )}
    </>
  );
}

export default Home;
