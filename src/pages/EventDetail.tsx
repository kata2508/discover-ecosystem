
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarDays, MapPin, Share2, User, Phone, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { events } from "./Events";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  
  // Find the event by ID
  const event = events.find(e => e.id === Number(id));
  
  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h2 className="text-2xl font-bold mb-4">Događaj nije pronađen</h2>
        <Button onClick={() => navigate('/events')}>
          Povratak na događaje
        </Button>
      </div>
    );
  }

  const handleGoBack = () => {
    navigate('/events');
  };

  const handleRegister = () => {
    toast.success("Uspješno ste se prijavili na događaj. Uskoro ćete primiti potvrdu na email.");
    setIsRegisterDialogOpen(false);
  };

  const handleShare = () => {
    toast.success("Podijelili ste događaj!");
  };

  return (
    <div className="pb-20">
      <div className="split-escape-container pt-4">
        {/* Header with back button */}
        <div className="flex items-center mb-4">
          <Button variant="ghost" onClick={handleGoBack} className="mr-2 p-2">
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-bold">{event.title}</h1>
        </div>
        
        {/* Hero image */}
        <div className="relative w-full h-56 md:h-72 mb-6 rounded-lg overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Event details */}
        <Card className="mb-6 border-none shadow-md">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start">
                <CalendarDays size={20} className="mr-3 text-sea-DEFAULT mt-0.5" />
                <div>
                  <h3 className="font-medium">Datum i vrijeme</h3>
                  <p className="text-gray-600 dark:text-gray-400">{event.date}, {event.time}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin size={20} className="mr-3 text-sea-DEFAULT mt-0.5" />
                <div>
                  <h3 className="font-medium">Lokacija</h3>
                  <p className="text-gray-600 dark:text-gray-400">{event.location}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <User size={20} className="mr-3 text-sea-DEFAULT mt-0.5" />
                <div>
                  <h3 className="font-medium">Organizator</h3>
                  <p className="text-gray-600 dark:text-gray-400">{event.organizer}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone size={20} className="mr-3 text-sea-DEFAULT mt-0.5" />
                <div>
                  <h3 className="font-medium">Kontakt</h3>
                  <p className="text-gray-600 dark:text-gray-400">{event.contact}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Tag size={20} className="mr-3 text-sea-DEFAULT mt-0.5" />
                <div>
                  <h3 className="font-medium">Cijena</h3>
                  <p className="text-gray-600 dark:text-gray-400">{event.price}</p>
                </div>
              </div>
            </div>
            
            <h3 className="text-lg font-medium mb-2">O događaju</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">{event.description}</p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Dialog open={isRegisterDialogOpen} onOpenChange={setIsRegisterDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-sea-DEFAULT hover:bg-sea-dark text-white flex-1">
                    Prijavi se na događaj
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Prijava na događaj</DialogTitle>
                    <DialogDescription>
                      Prijavljujete se na: {event.title}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                      Potvrdom prijave prihvaćate uvjete sudjelovanja na događaju. Detaljne informacije bit će vam poslane na email.
                    </p>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsRegisterDialogOpen(false)}>Odustani</Button>
                      <Button onClick={handleRegister}>Potvrdi prijavu</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" onClick={handleShare} className="flex-1">
                <Share2 size={16} className="mr-2" />
                Podijeli
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Related events section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Slični događaji</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events
              .filter(e => e.id !== event.id)
              .slice(0, 2)
              .map(relatedEvent => (
                <Card 
                  key={relatedEvent.id} 
                  className="overflow-hidden border-none shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate(`/events/${relatedEvent.id}`)}
                >
                  <div className="relative h-40">
                    <img 
                      src={relatedEvent.image} 
                      alt={relatedEvent.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">{relatedEvent.title}</h3>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <CalendarDays size={14} className="mr-1" />
                      <span>{relatedEvent.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
