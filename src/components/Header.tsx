
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800">
      <div className="split-escape-container flex items-center justify-between py-4">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-sea-dark dark:text-sea-light flex items-center">
            <span className="mr-1">Split</span>
            <span className="text-olive-DEFAULT">Escape</span>
          </h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        </div>
      </div>

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <div className={`fixed inset-0 bg-white dark:bg-gray-900 z-50 ${searchOpen ? 'block' : 'hidden'}`}>
          <div className="split-escape-container py-4">
            <div className="flex items-center mb-4">
              <button 
                onClick={() => setSearchOpen(false)}
                className="p-2 mr-2"
              >
                <X size={20} />
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Pretraži destinacije, aktivnosti..."
                  className="w-full p-2 pl-10 rounded-full border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-sea-DEFAULT"
                  autoFocus
                />
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Popularni pojmovi</h3>
              <div className="flex flex-wrap gap-2">
                {["Planinarenje", "Maslinovo ulje", "Radionice", "Lokalna hrana", "Tvrđave"].map((term) => (
                  <button
                    key={term}
                    className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-sea-light hover:text-white"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </header>
  );
};

export default Header;
