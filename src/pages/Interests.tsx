
import { useState } from "react";
import { Plus, Heart, ChevronRight, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const recommendedRoutes = [
  {
    id: 1,
    title: "Vikend povratka prirodi",
    description: "Planinarenje + posjet lokalnom OPG-u",
    image: "https://source.unsplash.com/random/600x400/?nature,hiking",
    duration: "2 dana",
    locations: ["Mosor", "Omiš", "Poljica"],
  },
  {
    id: 2,
    title: "Putovanje kroz povijest",
    description: "Obilazak starih tvrđava, crkava i muzeja",
    image: "https://source.unsplash.com/random/600x400/?castle,history",
    duration: "3 dana",
    locations: ["Split", "Klis", "Solin"],
  },
  {
    id: 3,
    title: "Gastro avantura Dalmacije",
    description: "Od agroturističkih imanja do kušanja vina",
    image: "https://source.unsplash.com/random/600x400/?food,wine",
    duration: "2 dana",
    locations: ["Kaštela", "Trogir", "Split"],
  },
];

const categories = [
  { id: "priroda", name: "Priroda", icon: "🌿", selected: false },
  { id: "kultura", name: "Kultura", icon: "🏛️", selected: false },
  { id: "gastro", name: "Gastro", icon: "🍷", selected: false },
  { id: "aktivni", name: "Aktivni turizam", icon: "🚴", selected: false },
  { id: "wellness", name: "Wellness", icon: "💆", selected: false },
  { id: "povijest", name: "Povijest", icon: "🏰", selected: false },
  { id: "more", name: "More", icon: "🌊", selected: false },
  { id: "tradicija", name: "Tradicija", icon: "🧶", selected: false },
];

const Interests = () => {
  const [myInterests, setMyInterests] = useState<string[]>([]);
  
  const toggleInterest = (id: string) => {
    if (myInterests.includes(id)) {
      setMyInterests(myInterests.filter(i => i !== id));
    } else {
      setMyInterests([...myInterests, id]);
    }
  };
  
  return (
    <div className="pb-20">
      <div className="split-escape-container pt-4">
        <h1 className="text-2xl font-bold mb-6">Moji interesi</h1>
        
        {myInterests.length === 0 ? (
          <section className="mb-8">
            <Card className="p-5 border-dashed border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
              <div className="text-center py-4">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-sea-DEFAULT" size={28} />
                </div>
                <h3 className="text-lg font-medium mb-2">Odaberite vaše interese</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-md mx-auto">
                  Dodajte interese za personalizirane preporuke doživljaja 
                  i događaja u Dalmaciji.
                </p>
              </div>
            </Card>
          </section>
        ) : (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Moji odabrani interesi</h2>
              <button className="text-sea-DEFAULT text-sm">Uredi</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {myInterests.map(id => {
                const category = categories.find(c => c.id === id);
                return (
                  <div key={id} className="flex items-center bg-sea-light/10 text-sea-dark px-3 py-2 rounded-full">
                    <span className="mr-2">{category?.icon}</span>
                    <span>{category?.name}</span>
                  </div>
                );
              })}
              <button className="flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-full">
                <Plus size={16} className="mr-1" />
                <span>Dodaj još</span>
              </button>
            </div>
          </section>
        )}
        
        <section className="mb-8">
          <h2 className="text-lg font-medium mb-4">Kategorije interesa</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`flex items-center p-3 rounded-lg border ${
                  myInterests.includes(category.id)
                    ? "border-sea-DEFAULT bg-sea-light/10"
                    : "border-gray-200 dark:border-gray-700"
                }`}
                onClick={() => toggleInterest(category.id)}
              >
                <div className="mr-3 text-2xl">{category.icon}</div>
                <span>{category.name}</span>
                {myInterests.includes(category.id) && (
                  <CheckCircle2 size={16} className="ml-auto text-sea-DEFAULT" />
                )}
              </button>
            ))}
          </div>
        </section>
        
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Preporučene tematske rute</h2>
            <button className="text-sea-DEFAULT text-sm font-medium flex items-center">
              Sve rute
              <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedRoutes.map((route) => (
              <Card key={route.id} className="overflow-hidden border-none shadow-md animate-fade-in">
                <div className="relative h-40">
                  <img 
                    src={route.image} 
                    alt={route.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white dark:bg-gray-900 rounded-full px-2 py-1 text-xs font-medium">
                    {route.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-1">{route.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {route.description}
                  </p>
                  <div className="flex flex-wrap">
                    {route.locations.map((location, i) => (
                      <span 
                        key={i} 
                        className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full mr-1 mb-1"
                      >
                        {location}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Interests;
