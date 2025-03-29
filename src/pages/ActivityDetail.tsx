
import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Clock, BarChart, Calendar, Upload, PlayCircle, PauseCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import activity data from Activities page
import { activities } from "./Activities";

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [reviewText, setReviewText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  
  // Find the activity by ID
  const activity = activities.find(a => a.id === Number(id));
  
  if (!activity) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h2 className="text-2xl font-bold mb-4">Aktivnost nije pronađena</h2>
        <Button onClick={() => navigate('/activities')}>
          Povratak na aktivnosti
        </Button>
      </div>
    );
  }

  // Mock reviews data
  const reviews = [
    { id: 1, author: "Marina K.", rating: 5, text: "Prekrasno iskustvo, odlična organizacija i predivni pogledi!", date: "15.02.2024." },
    { id: 2, author: "Ivan M.", rating: 4, text: "Vrlo zanimljivo i poučno. Preporučam svima koji vole prirodu.", date: "02.03.2024." },
    { id: 3, author: "Ana P.", rating: 5, text: "Savršen bijeg od gradske vreve. Lokalni vodič je bio iznimno znanje.", date: "18.03.2024." },
  ];

  const handleGoBack = () => {
    navigate('/activities');
  };

  const handleReservation = () => {
    toast.success("Vaša rezervacija je u procesu. Uskoro ćemo vas kontaktirati.");
  };

  const handleSubmitReview = () => {
    if (reviewText.trim()) {
      toast.success("Vaša recenzija je poslana. Hvala na povratnoj informaciji!");
      setReviewText("");
    } else {
      toast.error("Molimo unesite tekst recenzije.");
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      videoChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          videoChunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const videoBlob = new Blob(videoChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(videoBlob);
        setVideoURL(url);
        setIsRecording(false);
        setRecordingTime(0);
        
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }

        // Stop all tracks from the stream
        stream.getTracks().forEach(track => track.stop());
        
        toast.success("Vlog je uspješno snimljen! Zaradili ste 50 bodova!");
      };

      // Start recording
      mediaRecorderRef.current.start();
      setIsRecording(true);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 60) { // 60 seconds = 1 minute
            stopRecording();
            return 0;
          }
          return prev + 1;
        });
      }, 1000) as unknown as number;
    } catch (error) {
      console.error("Error accessing media devices:", error);
      toast.error("Nije moguće pristupiti kameri ili mikrofonu. Provjerite postavke preglednika.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="pb-20">
      <div className="split-escape-container pt-4">
        {/* Header with back button */}
        <div className="flex items-center mb-4">
          <Button variant="ghost" onClick={handleGoBack} className="mr-2 p-2">
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-bold">{activity.title}</h1>
        </div>
        
        {/* Hero image */}
        <div className="relative w-full h-56 md:h-72 mb-4 rounded-lg overflow-hidden">
          <img 
            src={activity.image} 
            alt={activity.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-white dark:bg-gray-900 rounded-full px-2 py-1 text-sm font-medium flex items-center">
            <span>{activity.rating}</span>
            <Star size={16} className="ml-1 text-amber-500 fill-amber-500" />
          </div>
        </div>
        
        {/* Quick info bar */}
        <div className="flex justify-between px-2 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg mb-4">
          <div className="flex items-center">
            <Clock size={18} className="mr-1 text-sea-DEFAULT" />
            <span className="text-sm">{activity.duration}</span>
          </div>
          <div className="flex items-center">
            <BarChart size={18} className="mr-1 text-olive-DEFAULT" />
            <span className="text-sm">{activity.difficulty}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={18} className="mr-1 text-sea-DEFAULT" />
            <span className="text-sm">Dostupno cijelu godinu</span>
          </div>
        </div>
        
        {/* Tabs for different sections */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Pregled</TabsTrigger>
            <TabsTrigger value="reviews">Recenzije</TabsTrigger>
            <TabsTrigger value="vlog">Mini Vlog</TabsTrigger>
          </TabsList>
          
          {/* Overview tab */}
          <TabsContent value="overview" className="space-y-4">
            <div>
              <h2 className="text-lg font-medium mb-2">O aktivnosti</h2>
              <p className="text-gray-700 dark:text-gray-300">
                {activity.category === "priroda" ? 
                  `Istražite prekrasne prirodne ljepote na ovoj ${activity.title.toLowerCase()} turi. Tijekom ove ${activity.duration} aktivnosti, očekujte nezaboravne poglede i iskustvo ${activity.difficulty.toLowerCase()} zahtjevnosti. Profesionalni vodiči će vas voditi cijelim putem, osiguravajući sigurnost i pružajući zanimljive informacije o lokalnoj flori i fauni.` :
                activity.category === "kultura" ?
                  `Uronite u bogatu povijest i kulturu tijekom ove ${activity.title.toLowerCase()}. Ova ${activity.duration} aktivnost ${activity.difficulty.toLowerCase()} zahtjevnosti vodi vas kroz važne kulturne lokalitete, gdje ćete naučiti o tradiciji, povijesti i umjetnosti ovog područja od stručnih lokalnih vodiča.` :
                activity.category === "gastro" ?
                  `Uživajte u autentičnim okusima Dalmacije tijekom ovog ${activity.title.toLowerCase()} doživljaja. U trajanju od ${activity.duration}, ova ${activity.difficulty.toLowerCase()} aktivnost omogućuje vam kušanje najboljih lokalnih delicija i upoznavanje s tradicionalnim metodama pripreme hrane i pića.` :
                  `Opustite se i obnovite tijelo i um tijekom ovog ${activity.title.toLowerCase()} iskustva. Ova ${activity.difficulty.toLowerCase()} aktivnost u trajanju od ${activity.duration} savršena je za sve koji traže odmor od svakodnevnog stresa i žele se posvetiti vlastitom blagostanju.`
                }
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-2">Što je uključeno</h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                <li>Stručno vodstvo</li>
                <li>Osiguranje</li>
                <li>Lokalni prijevoz</li>
                <li>{activity.category === "gastro" ? "Degustacije hrane i pića" : "Osvježenja"}</li>
                {activity.category === "priroda" && <li>Oprema za aktivnosti na otvorenom</li>}
              </ul>
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-2">Dodatne fotografije</h2>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={`https://source.unsplash.com/random/300x300/?${activity.category},${i}`} 
                      alt={`${activity.title} slika ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
              onClick={handleReservation} 
              className="w-full bg-sea-DEFAULT hover:bg-sea-dark text-white"
            >
              Rezerviraj sada
            </Button>
          </TabsContent>
          
          {/* Reviews tab */}
          <TabsContent value="reviews" className="space-y-4">
            <div>
              <h2 className="text-lg font-medium mb-2">Recenzije korisnika</h2>
              
              {reviews.map((review) => (
                <Card key={review.id} className="mb-3">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{review.author}</h3>
                      <div className="flex items-center">
                        <span className="mr-1">{review.rating}</span>
                        <Star size={14} className="text-amber-500 fill-amber-500" />
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">{review.text}</p>
                    <p className="text-gray-500 text-xs">{review.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-2">Napišite recenziju</h2>
              <Textarea 
                placeholder="Podijelite svoje iskustvo..." 
                className="mb-3"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <Button 
                onClick={handleSubmitReview}
                className="w-full bg-sea-DEFAULT hover:bg-sea-dark text-white"
              >
                Pošalji recenziju
              </Button>
            </div>
          </TabsContent>
          
          {/* Vlog tab */}
          <TabsContent value="vlog" className="space-y-4">
            <div>
              <h2 className="text-lg font-medium mb-2">Snimi mini vlog</h2>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                Podijelite svoje iskustvo kroz kratki video (max. 1 minutu) i zaradite dodatne bodove!
              </p>
              
              {!videoURL ? (
                <div className="flex flex-col items-center space-y-4">
                  {isRecording ? (
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-full h-64 bg-gray-800 rounded-lg relative flex items-center justify-center">
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs animate-pulse">
                          REC {formatTime(recordingTime)}
                        </div>
                        <video 
                          autoPlay 
                          muted 
                          className="w-full h-full object-cover rounded-lg"
                          ref={(video) => {
                            if (video) {
                              navigator.mediaDevices.getUserMedia({ video: true })
                                .then(stream => {
                                  video.srcObject = stream;
                                })
                                .catch(err => console.error(err));
                            }
                          }}
                        />
                      </div>
                      <Button
                        variant="destructive"
                        className="flex items-center"
                        onClick={stopRecording}
                      >
                        <PauseCircle size={16} className="mr-2" />
                        Zaustavi snimanje
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                        <Upload size={48} className="text-gray-400" />
                      </div>
                      <Button
                        className="bg-sea-DEFAULT hover:bg-sea-dark flex items-center"
                        onClick={startRecording}
                      >
                        <PlayCircle size={16} className="mr-2" />
                        Započni snimanje
                      </Button>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-full h-64 bg-gray-800 rounded-lg overflow-hidden">
                    <video 
                      src={videoURL} 
                      controls 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex space-x-2 w-full">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setVideoURL(null);
                        setIsRecording(false);
                      }}
                    >
                      Snimi ponovno
                    </Button>
                    <Button 
                      className="flex-1 bg-sea-DEFAULT hover:bg-sea-dark"
                      onClick={() => {
                        toast.success("Vaš vlog je uspješno objavljen! Zaradili ste 100 bodova!");
                        setVideoURL(null);
                      }}
                    >
                      Objavi vlog
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ActivityDetail;
