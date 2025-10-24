import { useState } from "react";
import { 
  LayoutDashboard, 
  PawPrint, 
  UtensilsCrossed, 
  TrendingUp, 
  Bell, 
  Sparkles, 
  Plus,
  Stethoscope,
  FileText,
  Brain,
  BarChart3,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Activity,
  Target,
  Zap,
  Info
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { VeterinarySidebar } from "./VeterinarySidebar";
import { PetOwnerSidebar } from "./PetOwnerSidebar";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { useEffect } from "react";
import { NotificationService, NotificationItem } from "../services/notifications";

// Mock data for veterinary dashboard
const mockAnimals = [
  {
    id: 1,
    name: "Max",
    species: "Dog",
    breed: "Golden Retriever",
    age: 3,
    weight: 30,
    healthStatus: "Recovering",
    lastVisit: "2024-01-15",
    owner: "John Doe",
    conditions: ["Obesity", "Joint Issues"],
    image: "https://images.unsplash.com/photo-1648799834307-97650bbf7298?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRvZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTEzNzg2NHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    name: "Luna",
    species: "Cat",
    breed: "Persian",
    age: 5,
    weight: 4.5,
    healthStatus: "Stable",
    lastVisit: "2024-01-10",
    owner: "Sarah Wilson",
    conditions: ["Kidney Disease"],
    image: "https://images.unsplash.com/photo-1647806422508-0322f33e270b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjExNzYyODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    name: "Bessie",
    species: "Cow",
    breed: "Holstein",
    age: 4,
    weight: 600,
    healthStatus: "Healthy",
    lastVisit: "2024-01-12",
    owner: "Farm Corp",
    conditions: [],
    image: "https://images.unsplash.com/photo-1653249792423-bc0d13b615aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3clMjBmYXJtJTIwYW5pbWFsfGVufDF8fHx8MTc2MTIyNjU1OXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

const weightData = [
  { month: "Jan", weight: 12.5, target: 12.0 },
  { month: "Feb", weight: 12.8, target: 12.0 },
  { month: "Mar", weight: 13.2, target: 12.0 },
  { month: "Apr", weight: 13.5, target: 12.0 },
  { month: "May", weight: 13.4, target: 12.0 },
  { month: "Jun", weight: 13.6, target: 12.0 },
];

const healthScoreData = [
  { name: "Excellent", value: 15, color: "#7ED9B9" },
  { name: "Good", value: 8, color: "#5EC7E8" },
  { name: "Fair", value: 3, color: "#FFA500" },
  { name: "Poor", value: 1, color: "#FF6B6B" },
];

const mealPlanData = [
  { species: "Dogs", count: 15, completion: 85 },
  { species: "Cats", count: 8, completion: 92 },
  { species: "Cows", count: 3, completion: 78 },
  { species: "Other", count: 1, completion: 65 },
];

const medicalRecords = [
  {
    id: 1,
    animalName: "Max",
    date: "2024-01-15",
    diagnosis: "Obesity and mild arthritis",
    treatment: "Weight management diet, joint supplements",
    notes: "Patient showing good response to new diet plan. Weight loss of 2kg in 3 weeks.",
    aiSummary: "AI Analysis: Patient's weight trend is positive. Recommend continuing current meal plan with slight protein increase for muscle maintenance.",
  },
  {
    id: 2,
    animalName: "Luna",
    date: "2024-01-10",
    diagnosis: "Chronic kidney disease stage 2",
    treatment: "Low-protein renal diet, increased hydration",
    notes: "Kidney function stable. Owner reports improved appetite.",
    aiSummary: "AI Analysis: Kidney values within acceptable range. Current diet is optimal. Monitor phosphorus levels closely.",
  },
];

interface DashboardProps {
  user?: any;
}

export function Dashboard({ user }: DashboardProps) {
  const [selectedAnimal, setSelectedAnimal] = useState(mockAnimals[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecies, setFilterSpecies] = useState("all");
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Load caregiver notifications
  useEffect(() => {
    if (user?.role !== 'VETERINARIAN' && user?.email) {
      const items = NotificationService.getForRecipient(user.email);
      setNotifications(items);
    }
  }, [user?.email, user?.role]);

  const markAllRead = () => {
    if (user?.email) {
      NotificationService.markAllRead(user.email);
      setNotifications(NotificationService.getForRecipient(user.email));
    }
  };

  const filteredAnimals = mockAnimals.filter(animal => {
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecies = filterSpecies === "all" || animal.species.toLowerCase() === filterSpecies.toLowerCase();
    return matchesSearch && matchesSpecies;
  });

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Sidebar */}
      {user?.role === 'VETERINARIAN' ? (
        <VeterinarySidebar currentPage="dashboard" />
      ) : (
        <PetOwnerSidebar currentPage="dashboard" />
      )}

      {/* Main Content */}
      <main className="ml-64 pt-20 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-[#2A4B7C] mb-2">
              Welcome back, {user?.role === 'VETERINARIAN' ? `Dr. ${user?.firstName || 'Smith'}` : user?.firstName || 'User'} 👋
            </h1>
            <p className="text-muted-foreground">
              {user?.role === 'VETERINARIAN' 
                ? 'Veterinary Dashboard - Monitor your patients\' health and nutrition'
                : 'Pet Owner Dashboard - Manage your pets\' health and nutrition'
              }
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 border-l-4 border-l-[#7ED9B9]">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground m-0">
                  {user?.role === 'VETERINARIAN' ? 'Total Patients' : 'My Pets'}
                </p>
                <PawPrint className="w-5 h-5 text-[#7ED9B9]" />
              </div>
              <p className="text-2xl text-[#2A4B7C] m-0">{mockAnimals.length}</p>
              <p className="text-xs text-muted-foreground mt-2 m-0">+3 this month</p>
            </Card>

            <Card className="p-6 border-l-4 border-l-[#5EC7E8]">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground m-0">Active Meal Plans</p>
                <UtensilsCrossed className="w-5 h-5 text-[#5EC7E8]" />
              </div>
              <p className="text-2xl text-[#2A4B7C] m-0">18</p>
              <p className="text-xs text-muted-foreground mt-2 m-0">
                {user?.role === 'VETERINARIAN' ? '85% compliance' : '85% completion'}
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-l-[#2A4B7C]">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground m-0">Health Score</p>
                <TrendingUp className="w-5 h-5 text-[#2A4B7C]" />
              </div>
              <p className="text-2xl text-[#2A4B7C] m-0">92%</p>
              <p className="text-xs text-green-600 mt-2 m-0">↑ 5% from last month</p>
            </Card>

            <Card className="p-6 border-l-4 border-l-orange-500">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground m-0">
                  {user?.role === 'VETERINARIAN' ? 'AI Insights' : 'Upcoming Visits'}
                </p>
                {user?.role === 'VETERINARIAN' ? (
                  <Brain className="w-5 h-5 text-orange-500" />
                ) : (
                  <Clock className="w-5 h-5 text-orange-500" />
                )}
              </div>
              <p className="text-2xl text-[#2A4B7C] m-0">
                {user?.role === 'VETERINARIAN' ? '47' : '2'}
              </p>
              <p className="text-xs text-muted-foreground mt-2 m-0">
                {user?.role === 'VETERINARIAN' ? 'Generated today' : 'This week'}
              </p>
            </Card>
          </div>

          {/* Main Dashboard Content */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className={`grid w-full ${user?.role === 'VETERINARIAN' ? 'grid-cols-4' : 'grid-cols-4'}`}>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="patients">
                {user?.role === 'VETERINARIAN' ? 'Patient Management' : 'My Pets'}
              </TabsTrigger>
              <TabsTrigger value="meal-plans">Meal Plans</TabsTrigger>
              {user?.role === 'VETERINARIAN' ? (
                <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
              ) : (
                <TabsTrigger value="health-monitoring">Health Monitoring</TabsTrigger>
              )}
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Health Score Distribution */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-[#2A4B7C] mb-4">Health Score Distribution</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={healthScoreData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          dataKey="value"
                        >
                          {healthScoreData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                {/* Meal Plan Completion by Species */}
            <Card className="p-6">
                  <h3 className="text-lg font-semibold text-[#2A4B7C] mb-4">Meal Plan Completion by Species</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mealPlanData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="species" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="completion" fill="#7ED9B9" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>

              {/* Recent Medical Records */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#2A4B7C]">Recent Medical Records</h3>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View All
                </Button>
              </div>
              <div className="space-y-4">
                  {medicalRecords.map((record) => (
                    <div key={record.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium text-[#2A4B7C]">{record.animalName}</h4>
                            <Badge variant="outline">{record.date}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>Diagnosis:</strong> {record.diagnosis}
                          </p>
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>Treatment:</strong> {record.treatment}
                          </p>
                          <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-2">
                            <div className="flex items-center gap-2 mb-1">
                              <Brain className="w-4 h-4 text-blue-600" />
                              <span className="text-sm font-medium text-blue-800">AI Analysis</span>
                            </div>
                            <p className="text-sm text-blue-700">{record.aiSummary}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Patient Management Tab */}
            <TabsContent value="patients" className="space-y-6">
              {/* Search and Filter */}
              <Card className="p-6">
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder={user?.role === 'VETERINARIAN' ? "Search patients by name or owner..." : "Search my pets..."}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filterSpecies} onValueChange={setFilterSpecies}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by species" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Species</SelectItem>
                      <SelectItem value="dog">Dogs</SelectItem>
                      <SelectItem value="cat">Cats</SelectItem>
                      <SelectItem value="cow">Cows</SelectItem>
                    </SelectContent>
                  </Select>
                  {user?.role === 'VETERINARIAN' && (
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Patient
                    </Button>
                  )}
                </div>
              </Card>

              {/* Patient Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAnimals.map((animal) => (
                  <Card key={animal.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedAnimal(animal)}>
                    <div className="flex items-start gap-4">
                    <img
                      src={animal.image}
                      alt={animal.name}
                        className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-[#2A4B7C]">{animal.name}</h3>
                          <Badge 
                            variant={animal.healthStatus === 'Healthy' ? 'default' : 
                                    animal.healthStatus === 'Stable' ? 'secondary' : 'destructive'}
                          >
                            {animal.healthStatus}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {animal.species} • {animal.breed} • {animal.age} years
                        </p>
                        <p className="text-sm text-muted-foreground mb-2">
                          Owner: {animal.owner}
                        </p>
                        <p className="text-sm text-muted-foreground mb-3">
                          Last visit: {animal.lastVisit}
                        </p>
                        {animal.conditions.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {animal.conditions.map((condition, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {condition}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          {user?.role === 'VETERINARIAN' ? (
                            <Button variant="outline" size="sm" className="flex-1">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm" className="flex-1">
                              <Activity className="w-4 h-4 mr-1" />
                              Monitor
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Meal Plans Tab */}
            <TabsContent value="meal-plans" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-[#2A4B7C]">
                    {user?.role === 'VETERINARIAN' ? 'AI-Generated Meal Plans' : 'My Pet Meal Plans'}
                  </h3>
                  <div className="flex gap-2">
                    {user?.role === 'VETERINARIAN' ? (
                      <>
                        <Button variant="outline">
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate New Plan
                        </Button>
                        <Button variant="outline">
                          <Upload className="w-4 h-4 mr-2" />
                          Import Records
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline">
                        <Bell className="w-4 h-4 mr-2" />
                        View Notifications
                </Button>
                    )}
                  </div>
                </div>

                {/* Notifications for Caregivers (from localStorage) */}
                {user?.role !== 'VETERINARIAN' && (
                  <div className="mb-6 space-y-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-[#2A4B7C] font-semibold">Notifications</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{notifications.filter(n => !n.read).length} new</Badge>
                        <Button variant="outline" size="sm" onClick={markAllRead}>Mark all read</Button>
                      </div>
                    </div>
                    {notifications.length === 0 ? (
                      <div className="bg-muted/40 border rounded-lg p-4 text-sm text-muted-foreground">
                        No notifications yet.
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div key={n.id} className={`rounded-lg p-4 border ${n.read ? 'bg-white' : 'bg-yellow-50 border-yellow-200'}`}>
                          <div className="flex items-center gap-2 mb-1">
                            {n.type === 'reminder' ? <Bell className="w-4 h-4 text-yellow-600" /> : n.type === 'alert' ? <AlertTriangle className="w-4 h-4 text-red-600" /> : <Info className="w-4 h-4 text-blue-600" />}
                            <span className="font-medium text-[#2A4B7C]">{n.title}</span>
                            {!n.read && <Badge variant="outline" className="ml-auto">New</Badge>}
                          </div>
                          <div className="text-xs text-muted-foreground mb-1">{new Date(n.createdAt).toLocaleString()}</div>
                          <p className="text-sm text-[#2A4B7C] m-0">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Selected Animal Details */}
                  <Card className="p-4">
                    <h4 className="font-medium text-[#2A4B7C] mb-3">Selected Patient: {selectedAnimal.name}</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Species:</strong> {selectedAnimal.species}</p>
                      <p><strong>Breed:</strong> {selectedAnimal.breed}</p>
                      <p><strong>Age:</strong> {selectedAnimal.age} years</p>
                      <p><strong>Weight:</strong> {selectedAnimal.weight} kg</p>
                      <p><strong>Health Status:</strong> {selectedAnimal.healthStatus}</p>
                      {selectedAnimal.conditions.length > 0 && (
                        <div>
                          <strong>Conditions:</strong>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedAnimal.conditions.map((condition, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {condition}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <Button className="w-full mt-4" size="sm">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Custom Meal Plan
                    </Button>
                  </Card>

                  {/* Explainable AI Section */}
                  <Card className="p-4">
                    <h4 className="font-medium text-[#2A4B7C] mb-3">AI Recommendations</h4>
                    <div className="space-y-3">
                      <div className="bg-green-50 border border-green-200 rounded p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800">Recommended</span>
                        </div>
                        <p className="text-sm text-green-700">
                          High-protein, low-fat diet for weight management and joint health
                        </p>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Target className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-800">Target</span>
                        </div>
                        <p className="text-sm text-blue-700">
                          Reduce weight by 10% over 6 months to improve joint mobility
                        </p>
                    </div>
                      <div className="bg-orange-50 border border-orange-200 rounded p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className="w-4 h-4 text-orange-600" />
                          <span className="text-sm font-medium text-orange-800">Avoid</span>
                  </div>
                        <p className="text-sm text-orange-700">
                          High-calorie treats and excessive carbohydrates
                        </p>
                </div>
              </div>
            </Card>
          </div>
              </Card>
            </TabsContent>

            {/* Progress Tracking Tab */}
            <TabsContent value="progress" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weight Tracking Chart */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-[#2A4B7C] mb-4">Weight Progress - {selectedAnimal.name}</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                  <Tooltip />
                        <Line type="monotone" dataKey="weight" stroke="#7ED9B9" strokeWidth={2} />
                        <Line type="monotone" dataKey="target" stroke="#FF6B6B" strokeWidth={2} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#7ED9B9] rounded"></div>
                      <span className="text-sm text-muted-foreground">Current Weight</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#FF6B6B] rounded border-2 border-dashed"></div>
                      <span className="text-sm text-muted-foreground">Target Weight</span>
                    </div>
                  </div>
            </Card>

                {/* Health Metrics */}
            <Card className="p-6">
                  <h3 className="text-lg font-semibold text-[#2A4B7C] mb-4">Health Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall Health Score</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Diet Compliance</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Activity Level</span>
                        <span>78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Recovery Progress</span>
                        <span>65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                  </div>
                </Card>
              </div>

              {/* Progress Summary */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-[#2A4B7C] mb-4">Progress Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Activity className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-600">-2.1kg</p>
                    <p className="text-sm text-muted-foreground">Weight Loss</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-600">+15%</p>
                    <p className="text-sm text-muted-foreground">Mobility Improvement</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-600">85%</p>
                    <p className="text-sm text-muted-foreground">Diet Compliance</p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Health Monitoring Tab - For Caregivers */}
            <TabsContent value="health-monitoring" className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-[#2A4B7C]">Health Monitoring & Observations</h3>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Observation
                  </Button>
                </div>

                {/* Health Observation Form */}
                <Card className="p-4 mb-6">
                  <h4 className="font-medium text-[#2A4B7C] mb-4">Record Daily Observations</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">Pet</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select pet" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockAnimals.map((animal) => (
                            <SelectItem key={animal.id} value={animal.name}>
                              {animal.name} ({animal.species})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">Date</label>
                      <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">Appetite</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select appetite level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                          <SelectItem value="none">No appetite</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">Energy Level</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select energy level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="very-low">Very Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">Weight (kg)</label>
                      <Input type="number" step="0.1" placeholder="Enter current weight" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">Additional Notes</label>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md resize-none" 
                        rows={3}
                        placeholder="Any other observations about your pet's health..."
                      />
                    </div>
                  </div>
                  <Button className="mt-4">
                    <Activity className="w-4 h-4 mr-2" />
                    Record Observation
                  </Button>
                </Card>

                {/* Recent Observations */}
              <div className="space-y-4">
                  <h4 className="font-medium text-[#2A4B7C]">Recent Observations</h4>
                  <div className="space-y-3">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium">Max - Golden Retriever</h5>
                        <span className="text-sm text-muted-foreground">Today</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Appetite:</span>
                          <Badge variant="outline" className="ml-2">Good</Badge>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Energy:</span>
                          <Badge variant="outline" className="ml-2">Normal</Badge>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Weight:</span>
                          <span className="ml-2 font-medium">30.2 kg</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Ate all meals as prescribed. Active during morning walk.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium">Luna - Persian Cat</h5>
                        <span className="text-sm text-muted-foreground">Yesterday</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Appetite:</span>
                          <Badge variant="destructive" className="ml-2">Poor</Badge>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Energy:</span>
                          <Badge variant="outline" className="ml-2">Low</Badge>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Weight:</span>
                          <span className="ml-2 font-medium">4.3 kg</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Only ate half of morning meal. Seems lethargic.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* AI Analysis Tab */}
            <TabsContent value="ai-analysis" className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-[#2A4B7C]">NLP Medical Record Analysis</h3>
                  <Button variant="outline">
                    <Brain className="w-4 h-4 mr-2" />
                    Run AI Analysis
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* AI Insights */}
                  <Card className="p-4">
                    <h4 className="font-medium text-[#2A4B7C] mb-3">AI-Generated Insights</h4>
                    <div className="space-y-3">
                      <div className="bg-blue-50 border border-blue-200 rounded p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Zap className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-800">Key Finding</span>
                        </div>
                        <p className="text-sm text-blue-700">
                          Patient shows consistent improvement in mobility scores over the past 3 months
                        </p>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800">Positive Trend</span>
                        </div>
                        <p className="text-sm text-green-700">
                          Weight reduction is on track with target goals
                        </p>
                      </div>
                      <div className="bg-orange-50 border border-orange-200 rounded p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className="w-4 h-4 text-orange-600" />
                          <span className="text-sm font-medium text-orange-800">Attention Needed</span>
                        </div>
                        <p className="text-sm text-orange-700">
                          Monitor kidney function closely due to previous concerns
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Diet Customization */}
                  <Card className="p-4">
                    <h4 className="font-medium text-[#2A4B7C] mb-3">Diet Customization</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Allergies</label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <Badge variant="destructive">Wheat</Badge>
                          <Badge variant="destructive">Dairy</Badge>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Ingredient Substitutions</label>
                        <div className="space-y-2 mt-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>Rice → Quinoa</span>
                            <Badge variant="outline">Suggested</Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Chicken → Turkey</span>
                            <Badge variant="outline">Alternative</Badge>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Available Foods</label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <Badge variant="secondary">Salmon</Badge>
                          <Badge variant="secondary">Sweet Potato</Badge>
                          <Badge variant="secondary">Green Beans</Badge>
                        </div>
                </div>
              </div>
            </Card>
          </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}