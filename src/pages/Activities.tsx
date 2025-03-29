
import { ChevronRight, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useState } from "react";

type Activity = {
  id: number;
  title: string;
  image: string;
  category: string;
  duration: string;
  difficulty: string;
  rating: number;
};

const activities: Activity[] = [
  {
    id: 1,
    title: "Planinarenje na Mosor",
    image: "https://source.unsplash.com/random/600x400/?mountain,hiking",
    category: "priroda",
    duration: "5h",
    difficulty: "Srednje",
    rating: 4.7,
  },
  {
    id: 2,
    title: "Posjet muzeju grada Splita",
    image: "https://source.unsplash.com/random/600x400/?museum",
    category: "kultura",
    duration: "2h",
    difficulty: "Lagano",
    rating: 4.5,
  },
  {
    id: 3,
    title: "Biciklistička tura kroz maslinike",
    image: "https://source.unsplash.com/random/600x400/?cycling,olive",
    category: "priroda",
    duration: "3h",
    difficulty: "Srednje",
    rating: 4.8,
  },
  {
    id: 4,
    title: "Kušanje vina i sireva - Kaštela",
    image: "https://source.unsplash.com/random/600x400/?wine,cheese",
    category: "gastro",
    duration: "3h",
    difficulty: "Lagano",
    rating: 4.9,
  },
  {
    id: 5,
    title: "Wellness tretman lavandom",
    image: "https://source.unsplash.com/random/600x400/?lavender,spa",
    category: "wellness",
    duration: "2h",
    difficulty: "Lagano",
    rating: 4.6,
  },
];

// Group activities by category
const natureActivities = activities.filter(a => a.category === "priroda");
const cultureActivities = activities.filter(a => a.category === "kultura");
const gastroActivities = activities.filter(a => a.category === "gastro");
const wellnessActivities = activities.filter(a => a.category === "wellness");

const Activities = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const handleSeeAll = (category: string) => {
    setActiveCategory(category);
    toast.info(`Pregled svih aktivnosti za kategoriju: ${category}`);
  };

  const handleActivityClick = (activity: Activity) => {
    toast.success(`Odabrali ste: ${activity.title}`);
  };

  return (
    <div className="pb-20">
      <div className="split-escape-container pt-4">
        <h1 className="text-2xl font-bold mb-6">Aktivnosti i iskustva</h1>
        
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-6">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="all">Sve</TabsTrigger>
            <TabsTrigger value="priroda">Priroda</TabsTrigger>
            <TabsTrigger value="kultura">Kultura</TabsTrigger>
            <TabsTrigger value="gastro">Gastro</TabsTrigger>
            <TabsTrigger value="wellness">Wellness</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            <ActivitySection title="Priroda i outdoor" activities={natureActivities} onSeeAll={() => handleSeeAll("priroda")} onActivityClick={handleActivityClick} />
            <ActivitySection title="Kulturni turizam" activities={cultureActivities} onSeeAll={() => handleSeeAll("kultura")} onActivityClick={handleActivityClick} />
            <ActivitySection title="Gastro i agroturizam" activities={gastroActivities} onSeeAll={() => handleSeeAll("gastro")} onActivityClick={handleActivityClick} />
            <ActivitySection title="Wellness i zdravlje" activities={wellnessActivities} onSeeAll={() => handleSeeAll("wellness")} onActivityClick={handleActivityClick} />
          </TabsContent>
          
          <TabsContent value="priroda">
            <ActivitySection title="Priroda i outdoor" activities={natureActivities} onSeeAll={() => handleSeeAll("priroda")} onActivityClick={handleActivityClick} />
          </TabsContent>
          
          <TabsContent value="kultura">
            <ActivitySection title="Kulturni turizam" activities={cultureActivities} onSeeAll={() => handleSeeAll("kultura")} onActivityClick={handleActivityClick} />
          </TabsContent>
          
          <TabsContent value="gastro">
            <ActivitySection title="Gastro i agroturizam" activities={gastroActivities} onSeeAll={() => handleSeeAll("gastro")} onActivityClick={handleActivityClick} />
          </TabsContent>
          
          <TabsContent value="wellness">
            <ActivitySection title="Wellness i zdravlje" activities={wellnessActivities} onSeeAll={() => handleSeeAll("wellness")} onActivityClick={handleActivityClick} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface ActivitySectionProps {
  title: string;
  activities: Activity[];
  onSeeAll: () => void;
  onActivityClick: (activity: Activity) => void;
}

const ActivitySection = ({ title, activities, onSeeAll, onActivityClick }: ActivitySectionProps) => {
  if (activities.length === 0) return null;
  
  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <button 
          onClick={onSeeAll}
          className="text-sea-DEFAULT text-sm font-medium flex items-center hover:text-sea-dark transition-colors"
        >
          Vidi sve
          <ChevronRight size={16} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {activities.map((activity) => (
          <Card 
            key={activity.id} 
            className="overflow-hidden border-none shadow-md animate-fade-in cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onActivityClick(activity)}
          >
            <div className="relative h-48">
              <img 
                src={activity.image} 
                alt={activity.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-white dark:bg-gray-900 rounded-full px-2 py-1 text-xs font-medium flex items-center">
                <span>{activity.rating}</span>
                <Star size={12} className="ml-1 text-amber-500 fill-amber-500" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <div className="flex justify-between text-white">
                  <span className="text-sm">{activity.duration}</span>
                  <span className="text-xs px-2 py-1 bg-olive-DEFAULT/80 rounded-full">{activity.difficulty}</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium">{activity.title}</h3>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Activities;
