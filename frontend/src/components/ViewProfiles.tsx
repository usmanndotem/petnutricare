import { useState } from "react";
import { LayoutDashboard, PawPrint, UtensilsCrossed, TrendingUp, Search, Plus, Edit, Eye } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const mockAnimals = [
  {
    id: 1,
    animalId: "A001",
    name: "Max",
    species: "Dog",
    breed: "Golden Retriever",
    age: 3,
    weight: 30,
    allergies: "Wheat, Dairy",
    dietaryRequirements: "High-protein, Low-fat",
    condition: "Healthy",
    image: "https://images.unsplash.com/photo-1648799834307-97650bbf7298?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRvZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTEzNzg2NHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    animalId: "A002",
    name: "Luna",
    species: "Cat",
    breed: "Persian",
    age: 5,
    weight: 4.5,
    allergies: "Fish",
    dietaryRequirements: "Low-protein, Kidney-friendly",
    condition: "Recovering",
    image: "https://images.unsplash.com/photo-1647806422508-0322f33e270b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjExNzYyODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    animalId: "A003",
    name: "Bessie",
    species: "Cow",
    breed: "Holstein",
    age: 4,
    weight: 600,
    allergies: "None",
    dietaryRequirements: "High-fiber, Balanced minerals",
    condition: "Healthy",
    image: "https://images.unsplash.com/photo-1653249792423-bc0d13b615aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3clMjBmYXJtJTIwYW5pbWFsfGVufDF8fHx8MTc2MTIyNjU1OXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4,
    animalId: "A004",
    name: "Charlie",
    species: "Dog",
    breed: "Labrador",
    age: 2,
    weight: 28,
    allergies: "Corn",
    dietaryRequirements: "Moderate protein, Active lifestyle",
    condition: "Healthy",
    image: "https://images.unsplash.com/photo-1648799834307-97650bbf7298?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRvZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTEzNzg2NHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 5,
    animalId: "A005",
    name: "Whiskers",
    species: "Cat",
    breed: "Siamese",
    age: 7,
    weight: 5.2,
    allergies: "Chicken",
    dietaryRequirements: "Senior cat formula, Low-calorie",
    condition: "Chronic",
    image: "https://images.unsplash.com/photo-1647806422508-0322f33e270b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjExNzYyODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 6,
    animalId: "A006",
    name: "Daisy",
    species: "Cow",
    breed: "Jersey",
    age: 6,
    weight: 450,
    allergies: "None",
    dietaryRequirements: "Lactation support, High-energy",
    condition: "Healthy",
    image: "https://images.unsplash.com/photo-1653249792423-bc0d13b615aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3clMjBmYXJtJTIwYW5pbWFsfGVufDF8fHx8MTc2MTIyNjU1OXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function ViewProfiles() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecies, setFilterSpecies] = useState("all");

  const filteredAnimals = mockAnimals.filter((animal) => {
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterSpecies === "all" || animal.species.toLowerCase() === filterSpecies.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-border pt-20 z-10">
        <nav className="p-4 space-y-2">
          <a
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </a>
          <a
            href="/profiles"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-[#7ED9B9]/10 to-[#5EC7E8]/10 text-[#2A4B7C] transition-colors"
          >
            <PawPrint className="w-5 h-5" />
            Animal Profiles
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-[#2A4B7C] mb-2">Animal Profiles</h1>
              <p className="text-muted-foreground">Manage all your animal profiles in one place</p>
            </div>
            <Button className="bg-gradient-to-r from-[#7ED9B9] to-[#5EC7E8]" asChild>
              <a href="/create-profile">
                <Plus className="w-4 h-4 mr-2" />
                Add New Animal
              </a>
            </Button>
          </div>

          {/* Search and Filter */}
          <Card className="p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by name or breed..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterSpecies} onValueChange={setFilterSpecies}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by species" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Species</SelectItem>
                  <SelectItem value="dog">Dogs</SelectItem>
                  <SelectItem value="cat">Cats</SelectItem>
                  <SelectItem value="cow">Cows</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredAnimals.length} of {mockAnimals.length} animals
            </p>
          </div>

          {/* Animal Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {filteredAnimals.map((animal) => (
              <Card
                key={animal.id}
                className="overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={animal.image}
                    alt={animal.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge
                      variant={animal.condition === "Healthy" ? "default" : "secondary"}
                      className={
                        animal.condition === "Healthy"
                          ? "bg-[#7ED9B9] text-white"
                          : animal.condition === "Recovering"
                          ? "bg-[#5EC7E8] text-white"
                          : "bg-orange-500 text-white"
                      }
                    >
                      {animal.condition}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-[#2A4B7C] mb-1">{animal.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1 m-0">
                    {animal.breed}
                  </p>
                  <p className="text-sm text-muted-foreground m-0">
                    {animal.species} • {animal.age} years old
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <a href={`/meal-plans?animal=${animal.id}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Plan
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 hover:bg-[#7ED9B9]/10 hover:text-[#2A4B7C]"
                      asChild
                    >
                      <a href={`/create-profile?edit=${animal.id}`}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredAnimals.length === 0 && (
            <Card className="p-12 text-center">
              <PawPrint className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-[#2A4B7C] mb-2">No animals found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button variant="outline" onClick={() => { setSearchTerm(""); setFilterSpecies("all"); }}>
                Clear Filters
              </Button>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}