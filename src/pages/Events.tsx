
import { CalendarDays, Calendar, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const weekdays = ["Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned"];

const currentWeekDates = [
  { day: "Pon", date: "20", month: "03", events: 2 },
  { day: "Uto", date: "21", month: "03", events: 0 },
  { day: "Sri", date: "22", month: "03", events: 1 },
  { day: "Čet", date: "23", month: "03", events: 3 },
  { day: "Pet", date: "24", month: "03", events: 5 },
  { day: "Sub", date: "25", month: "03", events: 2 },
  { day: "Ned", date: "26", month: "03", events: 1 },
];

export const events = [
  {
    id: 1,
    title: "Festival maslinovog ulja",
    date: "25.03.2023.",
    time: "10:00 - 18:00",
    location: "Brač, luka",
    image: "https://source.unsplash.com/random/600x400/?olive,festival",
    description: "Festival maslinovog ulja okuplja najbolje proizvođače iz cijele Dalmacije. Posjetitelji mogu kušati različite sorte maslinovog ulja, sudjelovati u radionicama o proizvodnji i korištenju maslinovog ulja, te kupiti proizvode direktno od proizvođača.",
    organizer: "Turistička zajednica otoka Brača",
    contact: "+385 21 123 456",
    price: "Besplatno",
  },
  {
    id: 2,
    title: "Degustacija dalmatinskih vina",
    date: "25.03.2023.",
    time: "17:00 - 21:00",
    location: "Split, Dioklecijanova palača",
    image: "https://source.unsplash.com/random/600x400/?wine",
    description: "Degustacija dalmatinskih vina predstavlja najbolja vina iz regije. Posjetitelji mogu kušati preko 50 različitih vrsta vina od 20 različitih proizvođača, uz stručno vođenje sommeliera koji će objasniti karakteristike svakog vina.",
    organizer: "Udruga vinara Dalmacije",
    contact: "+385 21 234 567",
    price: "150 kn",
  },
  {
    id: 3,
    title: "Radionica tradicionalne kuhinje",
    date: "26.03.2023.",
    time: "12:00 - 15:00",
    location: "Trogir, stari grad",
    image: "https://source.unsplash.com/random/600x400/?cooking,mediterranean",
    description: "Naučite pripremati tradicionalna dalmatinska jela uz vodstvo iskusnih lokalnih kuhara. Radionica uključuje pripremu pašticade, crnog rižota, brudet i dalmatinske pašte. Nakon kuhanja, sudionici zajedno uživaju u pripremljenim jelima uz lokalno vino.",
    organizer: "Kulinarski institut Mediteran",
    contact: "+385 21 345 678",
    price: "200 kn",
  },
];

const Events = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDateClick = (day: typeof currentWeekDates[0]) => {
    setSelectedDate(day.date);
    if (day.events > 0) {
      toast.info(`Odabrani datum: ${day.date}.${day.month}. - ${day.events} događaja`);
    } else {
      toast.info(`Nema događaja na datum ${day.date}.${day.month}.`);
    }
  };

  const handleEventClick = (event: typeof events[0]) => {
    navigate(`/events/${event.id}`);
  };

  const handleCalendarClick = () => {
    toast.info("Otvaranje kalendara");
  };

  const handleWeekNavigation = (direction: "prev" | "next") => {
    toast.info(`Prikazan ${direction === "prev" ? "prethodni" : "sljedeći"} tjedan`);
  };

  return (
    <div className="pb-20">
      <div className="split-escape-container pt-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            <CalendarDays className="mr-2 text-sea-DEFAULT" size={24} />
            Događaji
          </h1>
          <button 
            className="text-sea-DEFAULT flex items-center text-sm hover:text-sea-dark transition-colors"
            onClick={handleCalendarClick}
          >
            Kalendar
            <Calendar size={16} className="ml-1" />
          </button>
        </div>
        
        {/* Week Selector */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <button 
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 transition-colors"
              onClick={() => handleWeekNavigation("prev")}
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-sm font-medium">Ožujak 2023</h2>
            <button 
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 transition-colors"
              onClick={() => handleWeekNavigation("next")}
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {currentWeekDates.map((day) => (
              <button
                key={day.date}
                className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                  selectedDate === day.date
                    ? "bg-sea-DEFAULT text-white" 
                    : day.events > 0 
                      ? "bg-sea-light text-white hover:bg-sea-light/90" 
                      : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                onClick={() => handleDateClick(day)}
              >
                <span className="text-xs">{day.day}</span>
                <span className="text-lg font-bold">{day.date}</span>
                {day.events > 0 && (
                  <span className="text-xs mt-1 bg-white text-sea-DEFAULT px-1 rounded-full">
                    {day.events}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Events List */}
        <div className="space-y-4">
          {events.map((event) => (
            <Card 
              key={event.id} 
              className="overflow-hidden border-none shadow-md animate-fade-in hover:shadow-lg cursor-pointer transition-shadow"
              onClick={() => handleEventClick(event)}
            >
              <div className="md:flex">
                <div className="md:w-1/3 h-48 md:h-auto">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 md:w-2/3">
                  <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
                    <CalendarDays size={16} className="mr-2" />
                    <span>{event.date} | {event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
                    <MapPin size={16} className="mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <button 
                    className="bg-sea-DEFAULT text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-sea-dark active:bg-sea-dark/90 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEventClick(event);
                    }}
                  >
                    Detalji događaja
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
