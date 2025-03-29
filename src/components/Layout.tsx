
import { Outlet } from "react-router-dom";
import Header from "./Header";
import BottomNavigation from "./BottomNavigation";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <div className="h-16">
        {/* This is a spacer for the bottom navigation */}
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Layout;
