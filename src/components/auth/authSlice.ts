import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import supabase from "../../services/supabase";

export type AuthInitialStateType = {
  user:
    | {
        id: string;
        email: string;
      }
    | undefined
    | null;
  isLoading: boolean;
  error?: string | null;
};

const initialState: AuthInitialStateType = {
  user: undefined,
  isLoading: false,
  error: null,
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (
    { email, password }: { email: string; password: string },
    thunkApi
  ) => {
    try {
      email = email.trim();

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: "",
            avatar: "",
          },
        },
      });

      if (error) return thunkApi.rejectWithValue(error.message);

      if (!data.user?.id) return thunkApi.rejectWithValue("User not created.");

      return {
        id: data.user.id,
        // if there is no email, fallback to input email
        email: data.user.email ?? email,
      };
    } catch (err) {
      return thunkApi.rejectWithValue(
        err instanceof Error ? err.message : "Signup failed."
      );
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    thunkApi
  ) => {
    try {
      email = email.trim();

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return thunkApi.rejectWithValue(error.message);

      if (!data.user?.id)
        return thunkApi.rejectWithValue("Authentication failed.");

      return {
        id: data.user.id,
        // if there is no email, fallback to input email
        email: data.user.email ?? email,
      };
    } catch (err) {
      return thunkApi.rejectWithValue(
        err instanceof Error ? err.message : "Login failed."
      );
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, thunkApi) => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) return thunkApi.rejectWithValue(error.message);

      if (!user) return thunkApi.rejectWithValue("No authenticated user.");

      return {
        id: user.id,
        email: user.email ?? "",
      };
    } catch (err) {
      return thunkApi.rejectWithValue(
        err instanceof Error ? err.message : "Something went wrong"
      );
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) return thunkApi.rejectWithValue(error.message);

    thunkApi.dispatch(clearAllData());
  } catch (err) {
    return thunkApi.rejectWithValue(
      err instanceof Error ? err.message : "Something went wrong"
    );
  }
});

export const clearAllData = createAsyncThunk("auth/clearAllData", async () => {
  // This will trigger the reset in each slice
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(clearAllData.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      })
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        signup.fulfilled,
        (state, action: PayloadAction<{ id: string; email: string }>) => {
          state.isLoading = false;
          state.user = {
            id: action.payload.id,
            email: action.payload.email,
          };
          state.error = null;
        }
      )
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ id: string; email: string }>) => {
          state.isLoading = false;
          state.user = {
            id: action.payload.id,
            email: action.payload.email,
          };
          state.error = null;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getCurrentUser.fulfilled,
        (state, action: PayloadAction<{ id: string; email: string }>) => {
          state.user = {
            id: action.payload.id,
            email: action.payload.email,
          };
          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
