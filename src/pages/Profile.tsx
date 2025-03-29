
import { Trophy, User, Settings, MapPin, LogOut, Heart, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useState } from "react";

const Profile = () => {
  const [userType, setUserType] = useState<"tourist" | "local" | null>(null);
  const [activeTab, setActiveTab] = useState("activities");

  const handleLogin = () => {
    toast.success("Uspješna prijava!");
  };

  const handleUserTypeSelect = (type: "tourist" | "local") => {
    setUserType(type);
    toast.success(`Odabrani tip korisnika: ${type === "tourist" ? "Turist" : "Lokalac"}`);
  };

  const handleLearnMore = () => {
    toast.info("Više informacija o nagradama");
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSettingClick = (setting: string) => {
    toast.info(`Otvorene postavke: ${setting}`);
  };

  const handleLogout = () => {
    toast.info("Odjavljivanje...");
  };

  return (
    <div className="pb-20">
      <div className="split-escape-container pt-4">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-sea-light rounded-full flex items-center justify-center mb-3">
            <User size={40} className="text-white" />
          </div>
          <h1 className="text-xl font-bold">Prijavite se</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Pristupite svim funkcionalnostima</p>
          <button 
            className="bg-sea-DEFAULT text-white px-5 py-2 rounded-full hover:bg-sea-dark active:bg-sea-dark/90 transition-colors"
            onClick={handleLogin}
          >
            Prijava / Registracija
          </button>
        </div>
        
        {/* User Type Selection (disabled for now) */}
        <Card className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 border-none">
          <h2 className="text-lg font-medium mb-3">Tip korisnika</h2>
          <div className="grid grid-cols-2 gap-3">
            <button 
              className={`border rounded-lg p-3 text-center transition-colors ${
                userType === "tourist" 
                  ? "border-sea-DEFAULT bg-sea-light/10" 
                  : "border-gray-200 dark:border-gray-700 hover:border-sea-light hover:bg-sea-light/5"
              }`}
              onClick={() => handleUserTypeSelect("tourist")}
            >
              <div className="text-2xl mb-1">🧳</div>
              <div className="font-medium">Turist</div>
            </button>
            <button 
              className={`border rounded-lg p-3 text-center transition-colors ${
                userType === "local" 
                  ? "border-sea-DEFAULT bg-sea-light/10" 
                  : "border-gray-200 dark:border-gray-700 hover:border-sea-light hover:bg-sea-light/5"
              }`}
              onClick={() => handleUserTypeSelect("local")}
            >
              <div className="text-2xl mb-1">🏠</div>
              <div className="font-medium">Lokalac</div>
            </button>
          </div>
        </Card>
        
        {/* Rewards Section */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Trophy className="text-sea-DEFAULT mr-2" size={20} />
            <h2 className="text-lg font-medium">Moje nagrade</h2>
          </div>
          
          <Card className="p-5 border-dashed border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-sea-light transition-colors">
            <div className="text-center py-4">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Trophy className="text-gray-400" size={28} />
              </div>
              <h3 className="text-lg font-medium mb-2">Osvojite nagrade</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                Istražujte Dalmaciju, skupljajte bodove i ostvarite pogodnosti
              </p>
              <button 
                className="text-sea-DEFAULT font-medium hover:text-sea-dark transition-colors"
                onClick={handleLearnMore}
              >
                Saznaj više
              </button>
            </div>
          </Card>
        </div>
        
        {/* Tabs for additional content */}
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="w-full mb-4">
            <TabsTrigger value="activities" className="flex-1">Aktivnosti</TabsTrigger>
            <TabsTrigger value="favorites" className="flex-1">Favoriti</TabsTrigger>
            <TabsTrigger value="settings" className="flex-1">Postavke</TabsTrigger>
          </TabsList>
          
          <TabsContent value="activities">
            <div className="space-y-2">
              <EmptyState 
                icon={Clock} 
                title="Nema aktivnosti" 
                description="Vaše aktivnosti će se pojaviti ovdje"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="favorites">
            <div className="space-y-2">
              <EmptyState 
                icon={Heart} 
                title="Nema favorita" 
                description="Dodajte doživljaje i događaje u favorite"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="space-y-3">
              <button 
                className="w-full flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-sea-light active:bg-gray-50 dark:active:bg-gray-800 transition-colors"
                onClick={() => handleSettingClick("Lokacija")}
              >
                <div className="flex items-center">
                  <MapPin size={18} className="mr-3 text-gray-500" />
                  <span>Lokacija</span>
                </div>
                <span className="text-gray-500">Split, HR</span>
              </button>
              
              <button 
                className="w-full flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-sea-light active:bg-gray-50 dark:active:bg-gray-800 transition-colors"
                onClick={() => handleSettingClick("Postavke aplikacije")}
              >
                <div className="flex items-center">
                  <Settings size={18} className="mr-3 text-gray-500" />
                  <span>Postavke aplikacije</span>
                </div>
              </button>
              
              <button 
                className="w-full flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg text-destructive hover:bg-destructive/5 active:bg-destructive/10 transition-colors"
                onClick={handleLogout}
              >
                <LogOut size={18} className="mr-3" />
                <span>Odjava</span>
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const EmptyState = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => {
  return (
    <div className="text-center py-10 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <div className="bg-white dark:bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 shadow-sm">
        <Icon className="text-gray-400" size={24} />
      </div>
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
};

export default Profile;
