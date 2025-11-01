import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "../pages/HomePage.tsx";
import Login from "../components/auth/Login.tsx";
import Signup from "../components/auth/Signup.tsx";
import Onboarding from "../components/onboarding/Onboarding.tsx";
import AppLayout from "../components/common/AppLayout.tsx";
import ProtectedRoute from "../components/common/ProtectedRoute.tsx";
import { Toaster } from "react-hot-toast";
import RequireOnboarding from "../components/common/RequireOnboarding.tsx";
import PageNotFound from "../components/common/PageNotFound.tsx";

function AppRoutes() {
  return (
    <>
      <Toaster position="top-center" />
      <BrowserRouter>
        <Routes>
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<RequireOnboarding />}>
              <Route element={<AppLayout />}>
                <Route index element={<HomePage />} />
              </Route>
            </Route>

            {/* Onboarding allowed only for authenticated users */}
            <Route path="/onboarding" element={<Onboarding />} />
          </Route>

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;
