
import { CalendarDays, ChevronRight, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const featuredExperiences = [
  {
    id: 1,
    title: "Branje maslina i Festival maslinovog ulja",
    image: "https://source.unsplash.com/random/600x400/?olives",
    location: "Otok Brač",
    season: "Jesen",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Podvodni križni put",
    image: "https://source.unsplash.com/random/600x400/?diving",
    location: "Bol, Brač",
    season: "Proljeće",
    rating: 4.7,
  },
  {
    id: 3,
    title: "Radionica ljekovitog bilja",
    image: "https://source.unsplash.com/random/600x400/?herbs",
    location: "Hvar",
    season: "Proljeće",
    rating: 4.9,
  },
  {
    id: 4,
    title: "Zimski wellness vikend u Dalmatinskoj Zagori",
    image: "https://source.unsplash.com/random/600x400/?spa",
    location: "Imotski",
    season: "Zima",
    rating: 4.6,
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Degustacija lokalnih vina i sireva",
    date: "25.03.2023.",
    time: "18:00",
    location: "Vinarija Plavac, Split",
  },
  {
    id: 2,
    title: "Škola tradicionalnog ribolova",
    date: "27.03.2023.",
    time: "09:00",
    location: "Luka Trogir",
  },
  {
    id: 3,
    title: "Izlet brodom do plavog jezera",
    date: "29.03.2023.",
    time: "10:00",
    location: "Luka Split",
  },
];

const Home = () => {
  const navigate = useNavigate();

  const handleEventClick = (eventId: number) => {
    navigate(`/events/${eventId}`);
  };

  const handleViewAllEvents = () => {
    navigate('/events');
  };

  const handleViewAllExperiences = () => {
    navigate('/activities');
  };

  return (
    <div className="pb-20">
      <section className="mb-8 pt-4">
        <div className="split-escape-container">
          <div className="rounded-2xl bg-gradient-to-r from-sea-DEFAULT to-sea-dark text-white p-6 h-44 flex flex-col justify-between">
            <h2 className="text-2xl font-bold">Doživite Dalmaciju</h2>
            <p className="text-white/80 mb-3">Otkrijte vansezonske doživljaje</p>
            <button 
              className="bg-white text-sea-DEFAULT px-4 py-2 rounded-full text-sm font-medium inline-flex items-center"
              onClick={handleViewAllExperiences}
            >
              Istražite sve
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="split-escape-container">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center">
              <CalendarDays size={20} className="mr-2 text-sea-DEFAULT" />
              Događaji ovog tjedna
            </h2>
            <button 
              className="text-sea-DEFAULT text-sm font-medium flex items-center"
              onClick={handleViewAllEvents}
            >
              Svi događaji
              <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div 
                key={event.id} 
                className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg flex items-start animate-fade-in cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors active:bg-gray-100 dark:active:bg-gray-800"
                onClick={() => handleEventClick(event.id)}
              >
                <div className="bg-dalmatian-stone dark:bg-gray-800 rounded-md w-14 h-14 flex flex-col items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-xs text-gray-500 dark:text-gray-400">OŽU</span>
                  <span className="text-lg font-bold">{event.date.split('.')[0]}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{event.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <span>{event.time}</span>
                    <span className="mx-2">•</span>
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="split-escape-container">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Top vansezonski doživljaji</h2>
            <button 
              className="text-sea-DEFAULT text-sm font-medium flex items-center"
              onClick={handleViewAllExperiences}
            >
              Vidi sve
              <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredExperiences.map((exp) => (
              <Card 
                key={exp.id} 
                className="overflow-hidden border-none shadow-md animate-fade-in hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/activities/${exp.id}`)}
              >
                <div className="relative h-48">
                  <img 
                    src={exp.image} 
                    alt={exp.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white dark:bg-gray-900 rounded-full px-2 py-1 text-xs font-medium flex items-center">
                    <span>{exp.rating}</span>
                    <Star size={12} className="ml-1 text-amber-500 fill-amber-500" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <div className="flex justify-between text-white">
                      <span className="text-sm">{exp.location}</span>
                      <span className="text-xs px-2 py-1 bg-olive-DEFAULT/80 rounded-full">{exp.season}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium line-clamp-2">{exp.title}</h3>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="split-escape-container">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Za vas izdvojeno</h2>
          </div>
          
          <div className="bg-dalmatian-sand dark:bg-gray-800/50 rounded-xl p-5">
            <h3 className="text-lg font-medium mb-3">Personalizirane preporuke</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Prijavite se ili dodajte vaše interese za personalizirane preporuke 
              aktivnosti i događaja u Dalmaciji.
            </p>
            <button 
              className="bg-sea-DEFAULT text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-sea-dark transition-colors"
              onClick={() => navigate('/profile')}
            >
              Prijava / Registracija
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
