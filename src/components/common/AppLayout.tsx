import { Outlet } from "react-router";
import Navigation from "./Navigation.tsx";

function AppLayout() {
  return (
    <div className="flex flex-col linear-gradient-background pt-400 px-200 pb-1000 md:pt-500 md:px-400">
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
