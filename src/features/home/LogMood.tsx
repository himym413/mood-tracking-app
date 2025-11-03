import { format } from "date-fns";

import { useAppSelector } from "../../hooks/typedHooks.ts";

import Button from "../../components/common/Button.tsx";
import Spinner from "../../components/common/Spinner.tsx";

type LogMoodProps = {
  onClick: () => void;
  moodLogged: boolean;
};

function LogMood({ onClick, moodLogged }: LogMoodProps) {
  const { name } = useAppSelector((state) => state.profile);
  const formattedDate = format(new Date(), "EEEE, MMMM do, yyyy");

  const { isLoading: isLoggingMood } = useAppSelector(
    (state) => state.logMoodDialog
  );

  return isLoggingMood ? (
    <div className="flex justify-center items-center my-1000 lg:my-1000">
      <div className="-translate-y-500">
        <Spinner size={20} color="#2a4cd5" />
      </div>
    </div>
  ) : (
    <section className="mt-600 lg:mt-0 mb-600 flex flex-col items-center text-center lg:mb-800">
      <div className={`${!moodLogged ? "mb-600 lg:mb-800" : ""}`}>
        <h3 className="text-preset-3-mobile text-blue-600 md:text-preset-3 mb-125 md:text-preset-3">
          {`Hello ${name}!`}
        </h3>
        <h1 className="md:text-preset-1 text-preset-1-mobile text-neutral-900 mb-125">
          {!moodLogged
            ? "How are you feeling today?"
            : "You logged your mood for today!"}
        </h1>
        <p className="text-preset-6 text-neutral-600">{formattedDate}</p>
      </div>
      {!moodLogged && (
        <Button
          text="Log today's mood"
          ariaLabel="Log your mood for today"
          variant="home"
          onClick={onClick}
        />
      )}
    </section>
  );
}

export default LogMood;
