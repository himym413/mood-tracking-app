import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/typedHooks";
import { getCurrentUser } from "../auth/authSlice";
import { getProfile } from "../onboarding/profileSlice";
import Spinner from "./Spinner";

function ProtectedRoute() {
  const dispatch = useAppDispatch();
  const { isLoading: isLoadingAuth, user } = useAppSelector(
    (state) => state.auth
  );
  const isRehydrated = useAppSelector((state) => state?._persist?.rehydrated);

  useEffect(() => {
    if (!isRehydrated) return;

    // user = undefined, not yet fetched
    // user = null, rejected
    // user = {}, fulfilled

    if (user === undefined) {
      dispatch(getCurrentUser());
    } else if (user !== null) {
      // Avoid re-fetching profile if user is null (logged out)
      dispatch(getProfile());
    }
  }, [dispatch, user, isRehydrated]);

  if (!isRehydrated || isLoadingAuth || user === undefined) {
    return (
      <main className="flex justify-center items-center h-dvh linear-gradient-background">
        <div className="-translate-y-500">
          <Spinner size={20} color="#2a4cd5" />
        </div>
      </main>
    );
  }

  if (user === null) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
