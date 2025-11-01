import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import logMoodDialogReducer from "../features/log-mood-dialog/logMoodDialogSlice";
import authReducer from "../components/auth/authSlice";
import profileReducer from "../components/onboarding/profileSlice";

// 1. Configure persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "profile", "logMoodDialog"], // which reducers you want to persist, optional
};

// 2. Create a persisted reducer combining your reducers
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  logMoodDialog: logMoodDialogReducer,
  auth: authReducer,
  profile: profileReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3. Setup the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,

  // 4. Add these middleware actions to ignore serialization check errors caused by redux-persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
