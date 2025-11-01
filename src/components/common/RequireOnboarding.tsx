import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../../hooks/typedHooks";
import Spinner from "./Spinner";

function RequireOnboarding() {
  const {
    name,
    isLoading: isLoadingProfile,
    hasFetchedProfile,
  } = useAppSelector((state) => state.profile);

  const { user, isLoading: isLoadingAuth } = useAppSelector(
    (state) => state.auth
  );

  const isRehydrated = useAppSelector((state) => state?._persist?.rehydrated);

  if (
    !isRehydrated ||
    isLoadingAuth ||
    isLoadingProfile ||
    user === undefined
  ) {
    return (
      <main className="flex justify-center items-center h-dvh linear-gradient-background">
        <div className="-translate-y-500">
          <Spinner size={20} color="#2a4cd5" />
        </div>
      </main>
    );
  }

  if (hasFetchedProfile && name === "") {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
}

export default RequireOnboarding;
