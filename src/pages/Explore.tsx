
import { useState } from "react";
import { MapPin, Filter, Layers } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const categories = [
  { id: "priroda", name: "Priroda", icon: "🌿" },
  { id: "kultura", name: "Kultura", icon: "🏛️" },
  { id: "gastro", name: "Gastro", icon: "🍷" },
  { id: "aktivnosti", name: "Aktivnosti", icon: "🚴" },
  { id: "wellness", name: "Wellness", icon: "💆" },
];

const locations = [
  {
    id: 1,
    name: "Nacionalni park Krka",
    distance: "Šibenik, 45 min vožnje",
    tags: ["Priroda", "Aktivnosti"],
    icon: "🏞️"
  },
  {
    id: 2,
    name: "Tvrđava Klis",
    distance: "Klis, 20 min vožnje",
    tags: ["Kultura", "Povijest"],
    icon: "🏰"
  }
];

const Explore = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
    if (activeCategory !== categoryId) {
      toast.info(`Odabrana kategorija: ${categories.find(c => c.id === categoryId)?.name || categoryId}`);
    }
  };

  const handleLocationClick = (locationName: string) => {
    toast.success(`Odabrana lokacija: ${locationName}`);
  };

  const handleMapControlClick = (control: string) => {
    toast.info(`Aktivirana kontrola: ${control}`);
  };

  const handleFilterClick = () => {
    toast.info("Otvoreni filteri");
  };

  return (
    <div className="pb-20">
      <div className="h-[calc(100vh-15rem)] bg-gray-200 relative mb-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500">Interaktivna karta</p>
        </div>
        
        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button 
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 active:bg-gray-200 transition-colors"
            onClick={() => handleMapControlClick("Slojevi")}
          >
            <Layers size={20} className="text-sea-DEFAULT" />
          </button>
          <button 
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 active:bg-gray-200 transition-colors"
            onClick={() => handleMapControlClick("Lokacija")}
          >
            <MapPin size={20} className="text-sea-DEFAULT" />
          </button>
        </div>
        
        {/* Filter Button */}
        <button 
          className="absolute bottom-4 right-4 bg-sea-DEFAULT text-white px-3 py-2 rounded-full shadow-lg flex items-center hover:bg-sea-dark active:bg-sea-dark/90 transition-colors"
          onClick={handleFilterClick}
        >
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
                  : "bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <span className="text-2xl mb-1">{category.icon}</span>
              <span className="text-xs whitespace-nowrap">{category.name}</span>
            </button>
          ))}
        </div>
        
        {/* Location Cards */}
        <div className="space-y-3">
          {locations.map(location => (
            <Card 
              key={location.id} 
              className="p-4 flex items-start shadow-sm animate-fade-in hover:shadow-md cursor-pointer transition-shadow"
              onClick={() => handleLocationClick(location.name)}
            >
              <div className="bg-sea-light rounded-lg w-16 h-16 flex items-center justify-center text-white text-2xl mr-4 flex-shrink-0">
                {location.icon}
              </div>
              <div>
                <h3 className="font-medium">{location.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {location.distance}
                </p>
                <div className="flex mt-2">
                  {location.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className={`text-xs ${
                        tag === "Priroda" 
                          ? "bg-olive-light/30 text-olive-dark" 
                          : tag === "Kultura" || tag === "Povijest" 
                            ? "bg-earth-light/30 text-earth-dark" 
                            : "bg-sea-light/30 text-sea-dark"
                      } px-2 py-1 rounded-full ${index > 0 ? "ml-2" : ""}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
