import type { DataType } from "../types/chart";
import type { MoodType, SleepType } from "../types/logMoodDialog";

export const MOODS = [2, 1, 0, -1, -2] as MoodType[];

export const FEELINGS = [
  "Joyful",
  "Down",
  "Anxious",
  "Calm",
  "Excited",
  "Frustrated",
  "Lonely",
  "Grateful",
  "Overwhelmed",
  "Motivated",
  "Irritable",
  "Peaceful",
  "Tired",
  "Hopeful",
  "Confident",
  "Stressed",
  "Content",
  "Disappointed",
  "Optimistic",
  "Restless",
];

export const SLEEP = [9, 7.5, 5.5, 3.5, 1] as SleepType[];

export const moodQuotes = {
  "-2": [
    "You are stronger than you think; the storm will pass.",
    "It's okay to cry. Healing begins when you let your feelings flow.",
    "Even in darkness, a spark of hope can shine bright.",
    "This moment is tough, but you've overcome challenges before.",
    "A gentle step forward, no matter how small, is still progress.",
  ],
  "-1": [
    "Pain is temporary, brighter days lie ahead.",
    "Each setback is a chance to grow and learn.",
    "One small positive thought can change your entire day.",
    "It's okay to rest; self-care isn't selfish.",
    "Healing takes time - be patient and kind to yourself.",
  ],
  "0": [
    "A calm mind can find opportunity in every moment.",
    "Sometimes the greatest triumph is simply finding peace.",
    "Take a moment to breathe; every breath is a fresh start.",
    "Even an ordinary day can hold a pleasant surprise.",
    "Balance isn't found, it's created.",
  ],
  "1": [
    "Happiness grows when it's shared with others.",
    "Celebrate even the small victories to make life extraordinary.",
    "Gratitude can turn what you have into enough.",
    "Keep smiling; your joy can be contagious.",
    "Where focus goes, energy flows - keep your focus on what lifts you.",
  ],
  "2": [
    "When your heart is full, share your light with the world.",
    "Savor the highs in life; they become precious memories.",
    "Joy multiplies when spread among friends.",
    "Trust your journey; you're in a beautiful place right now.",
    "Let your happiness ripple out and inspire others.",
  ],
};

export const moodEntries: DataType[] = [
  {
    createdAt: "2025-06-30T10:00:00Z",
    mood: -2,
    feelings: ["Down", "Tired"],
    journalEntry: "Rough night of sleep. Need support and rest.",
    sleepHours: 3.5,
  },
  {
    createdAt: "2025-06-29T11:00:00Z",
    mood: 2,
    feelings: ["Grateful", "Optimistic"],
    journalEntry: "Woke up early and finally tackled a big project!",
    sleepHours: 9,
  },
];
