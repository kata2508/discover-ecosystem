
import { CalendarDays, Calendar, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

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

const events = [
  {
    id: 1,
    title: "Festival maslinovog ulja",
    date: "25.03.2023.",
    time: "10:00 - 18:00",
    location: "Brač, luka",
    image: "https://source.unsplash.com/random/600x400/?olive,festival",
  },
  {
    id: 2,
    title: "Degustacija dalmatinskih vina",
    date: "25.03.2023.",
    time: "17:00 - 21:00",
    location: "Split, Dioklecijanova palača",
    image: "https://source.unsplash.com/random/600x400/?wine",
  },
  {
    id: 3,
    title: "Radionica tradicionalne kuhinje",
    date: "26.03.2023.",
    time: "12:00 - 15:00",
    location: "Trogir, stari grad",
    image: "https://source.unsplash.com/random/600x400/?cooking,mediterranean",
  },
];

const Events = () => {
  return (
    <div className="pb-20">
      <div className="split-escape-container pt-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            <CalendarDays className="mr-2 text-sea-DEFAULT" size={24} />
            Događaji
          </h1>
          <button className="text-sea-DEFAULT flex items-center text-sm">
            Kalendar
            <Calendar size={16} className="ml-1" />
          </button>
        </div>
        
        {/* Week Selector */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-sm font-medium">Ožujak 2023</h2>
            <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {currentWeekDates.map((day) => (
              <button
                key={day.date}
                className={`flex flex-col items-center p-2 rounded-lg ${
                  day.events > 0 
                    ? "bg-sea-light text-white" 
                    : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                }`}
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
            <Card key={event.id} className="overflow-hidden border-none shadow-md animate-fade-in">
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
                  <button className="bg-sea-DEFAULT text-white px-4 py-2 rounded-full text-sm font-medium">
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
