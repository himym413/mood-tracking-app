import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import supabase from "../../services/supabase";

import type { MoodType, SleepType, StepType } from "../../types/logMoodDialog";
import type { DataType } from "../../types/chart";
import type { AuthInitialStateType } from "../../components/auth/authSlice";
import { format } from "date-fns";

type initialStateType = {
  step: StepType;
  mood: MoodType;
  feelings: string[];
  journalEntry: string;
  sleepHours: SleepType;
  error: string;
  isLoading: boolean;
  moodLogs: DataType[];
};

const initialState: initialStateType = {
  step: 1,
  mood: 0,
  feelings: [],
  journalEntry: "",
  sleepHours: 1,
  error: "",
  isLoading: false,
  moodLogs: [],
};

export const getMoodLogs = createAsyncThunk(
  "logMoodDialog/getMood",
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState() as { auth: AuthInitialStateType };
      const userId = state.auth.user?.id;

      if (!userId) return thunkApi.rejectWithValue("No authenticated user.");

      const { data: profileData, error: getError } = await supabase
        .from("profiles")
        .select("moodLogs")
        .eq("id", userId)
        .single();

      if (getError) return thunkApi.rejectWithValue(getError.message);

      return profileData?.moodLogs || [];
    } catch (err) {
      return thunkApi.rejectWithValue(
        err instanceof Error ? err.message : "Something went wrong"
      );
    }
  }
);

export const submitMood = createAsyncThunk(
  "logMoodDialog/submitMood",
  async ({ formData }: { formData: DataType }, thunkApi) => {
    try {
      const state = thunkApi.getState() as { auth: AuthInitialStateType };
      const userId = state.auth.user?.id;

      if (!userId) return thunkApi.rejectWithValue("No authenticated user.");

      if (!formData) {
        return thunkApi.rejectWithValue(
          "There seems to be an error. Please try again or contact support."
        );
      }

      // Add createdAt timestamp
      const moodLog = {
        ...formData,
        mood: Number(formData.mood),
        sleepHours: Number(formData.sleepHours),
        createdAt: format(new Date(), "dd.MM.yyyy"),
      };

      // ✅ Instead of getMood(), fetch directly here
      const { data: profileData, error: getError } = await supabase
        .from("profiles")
        .select("moodLogs")
        .eq("id", userId)
        .single();

      if (getError) return thunkApi.rejectWithValue(getError.message);

      const existingMoodLogs = profileData?.moodLogs || [];
      const updatedMoodLogs = [...existingMoodLogs, moodLog];

      // ✅ Update the user's moodLogs
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ moodLogs: updatedMoodLogs })
        .eq("id", userId);

      if (updateError) return thunkApi.rejectWithValue(updateError.message);

      return { moodLog };
    } catch (err) {
      return thunkApi.rejectWithValue(
        err instanceof Error ? err.message : "Something went wrong"
      );
    }
  }
);

export const logMoodDialogSlice = createSlice({
  name: "logMoodDialog",
  initialState,
  reducers: {
    reset: (state) => {
      state.step = 1;
      state.mood = null;
      state.feelings = [];
      state.journalEntry = "";
      state.sleepHours = null;
      state.error = "";
    },

    updateStep: (state) => {
      state.step++;
    },

    updateFeelings: (state, action) => {
      if (state.feelings.includes(action.payload)) {
        const index = state.feelings.indexOf(action.payload);
        state.feelings.splice(index, 1);
        return;
      }

      state.feelings.push(action.payload);
      if (state.feelings.length > 0) state.error = "";
    },

    updateJournalEntry: (state, action) => {
      state.journalEntry = action.payload;
      if (state.journalEntry.length >= 10) state.error = "";
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getMoodLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMoodLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.moodLogs = action.payload;
      })
      .addCase(getMoodLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(submitMood.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitMood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mood = Number(action.payload.moodLog.mood) as MoodType;
        state.sleepHours = Number(
          action.payload.moodLog.sleepHours
        ) as SleepType;
        state.journalEntry = action.payload.moodLog.journalEntry;
        state.feelings = action.payload.moodLog.feelings;
      })
      .addCase(submitMood.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  reset,
  updateStep,
  updateFeelings,
  updateJournalEntry,
  setError,
} = logMoodDialogSlice.actions;

export default logMoodDialogSlice.reducer;
