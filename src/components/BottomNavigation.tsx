
import { 
  Home, 
  Map, 
  Calendar, 
  Star, 
  Heart, 
  User 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";

const navItems = [
  { title: "Početna", icon: Home, path: "/" },
  { title: "Karte", icon: Map, path: "/explore" },
  { title: "Aktivnosti", icon: Calendar, path: "/activities" },
  { title: "Događaji", icon: Star, path: "/events" },
  { title: "Interesi", icon: Heart, path: "/interests" },
  { title: "Profil", icon: User, path: "/profile" }
];

const BottomNavigation = () => {
  const location = useLocation();
  
  const handleNavClick = (title: string) => {
    // This is just for feedback, the actual navigation is handled by React Router
    if (location.pathname !== title) {
      toast.info(`Navigacija na: ${title}`);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg z-50">
      <nav className="flex justify-between items-center px-2 py-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center p-2 w-full active:bg-gray-100 dark:active:bg-gray-800 transition-colors rounded-md ${
                isActive
                  ? "text-sea-DEFAULT"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
              onClick={() => handleNavClick(item.title)}
            >
              <item.icon size={20} />
              <span className="text-xs mt-1">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNavigation;
