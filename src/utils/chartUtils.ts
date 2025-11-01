// utils/chartUtils.ts
import { eachDayOfInterval, format, parse, subDays } from "date-fns";
import { convertSleepToTickValue } from "./helpers";
import type { DataType, ProcessedDataType } from "../types/chart";

export const processChartData = (data: DataType[]): ProcessedDataType[] => {
  // if there is some data, fill in empty dates, wher user didn't enter his mood
  if (data.length > 0) {
    const result: DataType[] = fillInMissingDates(data);
    return result.map((entry) => ({
      ...entry,
      sleepValue:
        entry.sleepHours !== null
          ? convertSleepToTickValue(entry.sleepHours)
          : NaN,
    }));
  }

  // if there is no data, return empty array object with dates containing last 11 days
  const generateDateRange = (): string[] => {
    return Array.from({ length: 11 }, (_, i) =>
      format(subDays(new Date(), i), "dd.MM.yyyy")
    );
  };

  const dateArray = generateDateRange().reverse();

  return dateArray.map((date) => ({
    createdAt: date,
    mood: null,
    feelings: [],
    journalEntry: "",
    sleepHours: null,
    sleepValue: null,
  }));
};

function fillInMissingDates(data: DataType[]) {
  const result: DataType[] = [];
  const now = new Date();
  const startDate = subDays(now, 10);
  const endDate = now;

  // format dates in dd.MM.yyyy
  const dates = eachDayOfInterval({ start: startDate, end: endDate }).map((d) =>
    format(d, "dd.MM.yyyy")
  );

  dates.forEach((dateStr) => {
    const existing = data.find((entry) => {
      const entryDate = parse(entry.createdAt, "dd.MM.yyyy", new Date());
      return format(entryDate, "dd.MM.yyyy") === dateStr;
    });

    if (existing) {
      result.push(existing);
    } else {
      result.push({
        createdAt: dateStr, // keep in dd.MM.yyyy
        mood: null,
        feelings: [],
        journalEntry: "",
        sleepHours: null,
      });
    }
  });

  return result;
}
