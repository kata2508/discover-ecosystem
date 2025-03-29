
import { useState } from "react";
import { MapPin, Filter, Layers } from "lucide-react";
import { Card } from "@/components/ui/card";

const categories = [
  { id: "priroda", name: "Priroda", icon: "🌿" },
  { id: "kultura", name: "Kultura", icon: "🏛️" },
  { id: "gastro", name: "Gastro", icon: "🍷" },
  { id: "aktivnosti", name: "Aktivnosti", icon: "🚴" },
  { id: "wellness", name: "Wellness", icon: "💆" },
];

const Explore = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="pb-20">
      <div className="h-[calc(100vh-15rem)] bg-gray-200 relative mb-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500">Interaktivna karta</p>
        </div>
        
        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button className="bg-white p-2 rounded-full shadow-md">
            <Layers size={20} className="text-sea-DEFAULT" />
          </button>
          <button className="bg-white p-2 rounded-full shadow-md">
            <MapPin size={20} className="text-sea-DEFAULT" />
          </button>
        </div>
        
        {/* Filter Button */}
        <button className="absolute bottom-4 right-4 bg-sea-DEFAULT text-white px-3 py-2 rounded-full shadow-lg flex items-center">
          <Filter size={16} className="mr-2" />
          <span>Filtriraj</span>
        </button>
      </div>
      
      <div className="split-escape-container">
        {/* Categories */}
        <div className="flex space-x-2 overflow-x-auto pb-2 mb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`flex flex-col items-center p-2 min-w-16 rounded-lg transition-colors ${
                activeCategory === category.id
                  ? "bg-sea-light text-white"
                  : "bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
              }`}
              onClick={() => setActiveCategory(
                activeCategory === category.id ? null : category.id
              )}
            >
              <span className="text-2xl mb-1">{category.icon}</span>
              <span className="text-xs whitespace-nowrap">{category.name}</span>
            </button>
          ))}
        </div>
        
        {/* Location Cards */}
        <div className="space-y-3">
          <Card className="p-4 flex items-start shadow-sm animate-fade-in">
            <div className="bg-sea-light rounded-lg w-16 h-16 flex items-center justify-center text-white text-2xl mr-4 flex-shrink-0">
              🏞️
            </div>
            <div>
              <h3 className="font-medium">Nacionalni park Krka</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Šibenik, 45 min vožnje
              </p>
              <div className="flex mt-2">
                <span className="text-xs bg-olive-light/30 text-olive-dark px-2 py-1 rounded-full mr-2">Priroda</span>
                <span className="text-xs bg-sea-light/30 text-sea-dark px-2 py-1 rounded-full">Aktivnosti</span>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 flex items-start shadow-sm animate-fade-in">
            <div className="bg-olive-light rounded-lg w-16 h-16 flex items-center justify-center text-white text-2xl mr-4 flex-shrink-0">
              🏰
            </div>
            <div>
              <h3 className="font-medium">Tvrđava Klis</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Klis, 20 min vožnje
              </p>
              <div className="flex mt-2">
                <span className="text-xs bg-earth-light/30 text-earth-dark px-2 py-1 rounded-full mr-2">Kultura</span>
                <span className="text-xs bg-sea-light/30 text-sea-dark px-2 py-1 rounded-full">Povijest</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Explore;
