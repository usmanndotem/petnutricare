import { LayoutDashboard, PawPrint, UtensilsCrossed, TrendingUp, Bell, Sparkles, Plus } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const weightData = [
  { month: "Jan", weight: 12.5 },
  { month: "Feb", weight: 12.8 },
  { month: "Mar", weight: 13.2 },
  { month: "Apr", weight: 13.5 },
  { month: "May", weight: 13.4 },
  { month: "Jun", weight: 13.6 },
];

export function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-border pt-20 z-10">
        <nav className="p-4 space-y-2">
          <a
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-[#7ED9B9]/10 to-[#5EC7E8]/10 text-[#2A4B7C] transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </a>
          <a
            href="/profiles"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <PawPrint className="w-5 h-5" />
            Animal Profiles
          </a>
          <a
            href="/create-profile"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add New Pet
          </a>
          <a
            href="/meal-plans"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <UtensilsCrossed className="w-5 h-5" />
            Meal Plans
          </a>
          <a
            href="/progress"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <TrendingUp className="w-5 h-5" />
            Progress
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 pt-20 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-[#2A4B7C] mb-2">Welcome back, Dr. Smith 👋</h1>
            <p className="text-muted-foreground">Here's what's happening with your patients today</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 border-l-4 border-l-[#7ED9B9]">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground m-0">Total Animals</p>
                <PawPrint className="w-5 h-5 text-[#7ED9B9]" />
              </div>
              <p className="text-2xl text-[#2A4B7C] m-0">24</p>
              <p className="text-xs text-muted-foreground mt-2 m-0">+3 this month</p>
            </Card>

            <Card className="p-6 border-l-4 border-l-[#5EC7E8]">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground m-0">Active Plans</p>
                <UtensilsCrossed className="w-5 h-5 text-[#5EC7E8]" />
              </div>
              <p className="text-2xl text-[#2A4B7C] m-0">18</p>
              <p className="text-xs text-muted-foreground mt-2 m-0">75% completion</p>
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
                <p className="text-sm text-muted-foreground m-0">Alerts</p>
                <Bell className="w-5 h-5 text-orange-500" />
              </div>
              <p className="text-2xl text-[#2A4B7C] m-0">3</p>
              <p className="text-xs text-orange-600 mt-2 m-0">Needs attention</p>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Recent Animals */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#2A4B7C] m-0">Recent Animal Profiles</h3>
                <Button variant="ghost" size="sm" asChild>
                  <a href="/profiles">View All</a>
                </Button>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Max", species: "Dog", breed: "Golden Retriever", status: "Healthy", image: "https://images.unsplash.com/photo-1648799834307-97650bbf7298?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRvZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTEzNzg2NHww&ixlib=rb-4.1.0&q=80&w=1080" },
                  { name: "Luna", species: "Cat", breed: "Persian", status: "Recovering", image: "https://images.unsplash.com/photo-1647806422508-0322f33e270b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjExNzYyODR8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                  { name: "Bessie", species: "Cow", breed: "Holstein", status: "Healthy", image: "https://images.unsplash.com/photo-1653249792423-bc0d13b615aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3clMjBmYXJtJTIwYW5pbWFsfGVufDF8fHx8MTc2MTIyNjU1OXww&ixlib=rb-4.1.0&q=80&w=1080" },
                ].map((animal, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors">
                    <img
                      src={animal.image}
                      alt={animal.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="m-0">{animal.name}</p>
                      <p className="text-sm text-muted-foreground m-0">{animal.breed}</p>
                    </div>
                    <Badge variant={animal.status === "Healthy" ? "default" : "secondary"} className="bg-[#7ED9B9] text-white">
                      {animal.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Active Meal Plan Preview */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#2A4B7C] m-0">Active Meal Plan</h3>
                <Button variant="ghost" size="sm" asChild>
                  <a href="/meal-plans">View Details</a>
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm m-0">Max - Golden Retriever</p>
                    <Badge className="bg-[#5EC7E8] text-white">Active</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 m-0">High-protein recovery plan</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Protein</span>
                      <span>35%</span>
                    </div>
                    <Progress value={35} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Carbs</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Fats</span>
                      <span>20%</span>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Progress Chart & AI Tips */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Weight Progress Chart */}
            <Card className="p-6 md:col-span-2">
              <h3 className="text-[#2A4B7C] mb-6">Weight Progress - Max</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="#7ED9B9"
                    strokeWidth={3}
                    dot={{ fill: "#7ED9B9", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* AI Suggestions */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-[#5EC7E8]" />
                <h3 className="text-[#2A4B7C] m-0">AI Insights</h3>
              </div>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-[#7ED9B9]/10 border border-[#7ED9B9]/20">
                  <p className="text-sm m-0">
                    💡 Consider reducing protein intake for Luna by 5% due to kidney health markers.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-[#5EC7E8]/10 border border-[#5EC7E8]/20">
                  <p className="text-sm m-0">
                    📊 Max's weight gain is on track. Continue current meal plan.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-[#2A4B7C]/10 border border-[#2A4B7C]/20">
                  <p className="text-sm m-0">
                    ⚠️ Bessie needs vitamin D supplementation based on recent blood work.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
