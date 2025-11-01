import type { MoodType, SleepType } from "./logMoodDialog";

export type DataType = {
  createdAt: string;
  mood: MoodType;
  feelings: string[];
  journalEntry: string;
  sleepHours: SleepType;
};

export type ProcessedDataType = DataType & { sleepValue: number | null };
