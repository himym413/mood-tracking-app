import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase, { supabaseUrl } from "../../services/supabase";
import { clearAllData, type AuthInitialStateType } from "../auth/authSlice";
import type { DataType } from "../../types/chart";

export type ProfileInitialStateType = {
  name: string;
  avatar_url: string;
  isLoading: boolean;
  hasFetchedProfile: boolean;
  error?: string | null;
};

const initialState: ProfileInitialStateType = {
  name: "",
  avatar_url: "",
  isLoading: false,
  hasFetchedProfile: false,
  error: null,
};

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState() as { auth: AuthInitialStateType };
      const userId = state.auth.user?.id;

      if (!userId) return thunkApi.rejectWithValue(null);

      const { data, error } = await supabase
        .from("profiles")
        .select("name, avatar_url")
        .eq("id", userId)
        .single();

      if (error) return thunkApi.rejectWithValue(error.message);

      if (!data) return thunkApi.rejectWithValue("No profile found.");

      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(
        err instanceof Error ? err.message : "Something went wrong"
      );
    }
  }
);

export const createOrUpdateProfile = createAsyncThunk(
  "profile/createOrUpdateProfile",
  async (
    {
      name,
      avatar,
      cardType,
    }: { name?: string; avatar?: File; cardType?: string },
    thunkApi
  ) => {
    try {
      const authState = thunkApi.getState() as { auth: AuthInitialStateType };
      const profileState = thunkApi.getState() as {
        profile: ProfileInitialStateType;
      };

      if (name === undefined) name = profileState.profile.name;

      const userId = authState.auth.user?.id;

      if (!userId) return thunkApi.rejectWithValue("No authenticated user.");

      let avatar_url: string | undefined;
      const moodLogs: DataType[] = [];

      if (avatar) {
        const fileExt = avatar.name.split(".").pop();
        const fileName = `${userId}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadAvatarError } = await supabase.storage
          .from("avatars")
          .upload(filePath, avatar);

        if (uploadAvatarError)
          return thunkApi.rejectWithValue(uploadAvatarError.message);

        avatar_url = `${supabaseUrl}/storage/v1/object/public/avatars/${filePath}`;
      }

      const updatePayload: {
        id: string;
        name: string;
        avatar_url?: string;
        moodLogs?: DataType[];
      } = {
        id: userId,
        name,
      };

      if (avatar_url) {
        updatePayload.avatar_url = avatar_url;
      }

      if (name === "" && cardType === "signup") {
        // this means that its only creating a profile (signup), so we are setting this one to empty array
        updatePayload.moodLogs = moodLogs;
      }

      if (name === "" && cardType === "settings") {
        // this means that inside settings we are only updating avatar, not the name too
        updatePayload.name = profileState.profile.name;
      }

      const { data, error: upsertError } = await supabase
        .from("profiles")
        .upsert([updatePayload])
        .select()
        .single();

      if (upsertError) return thunkApi.rejectWithValue(upsertError.message);

      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(
        err instanceof Error ? err.message : "Something went wrong"
      );
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(clearAllData.fulfilled, () => {
        // Reset to initial state
        return initialState;
      })
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.name = action.payload.name;
        state.avatar_url = action.payload.avatar_url;
        state.hasFetchedProfile = true;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.hasFetchedProfile = true;
        if (action.payload) {
          state.error = action.payload as string;
        }
      })

      .addCase(createOrUpdateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrUpdateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.name = action.payload.name;
        state.avatar_url = action.payload.avatar_url;
        state.error = null;
      })
      .addCase(createOrUpdateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default profileSlice.reducer;
