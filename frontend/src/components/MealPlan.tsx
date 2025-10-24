import { LayoutDashboard, PawPrint, UtensilsCrossed, TrendingUp, Download, Edit, MessageSquare, Sparkles, Clock, FileText } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { VeterinarySidebar } from "./VeterinarySidebar";
import { PetOwnerSidebar } from "./PetOwnerSidebar";

const mealPlanData = {
  planId: "PLAN-001",
  animal: {
    animalId: "A001",
    name: "Max",
    species: "Dog",
    breed: "Golden Retriever",
    age: 3,
    weight: 30,
    allergies: "Wheat, Dairy",
    dietaryRequirements: "High-protein, Low-fat",
    image: "https://images.unsplash.com/photo-1648799834307-97650bbf7298?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRvZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTEzNzg2NHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  medicalRecord: {
    recordId: "REC-001",
    diagnosis: "Recovering from minor surgery, joint health concerns",
    prescription: "Anti-inflammatory medication, 5mg daily",
    labResults: "Blood work normal, slight elevation in joint inflammation markers",
  },
  recommendedItems: [
    "Premium Dry Food (grain-free)",
    "Chicken Breast",
    "Salmon",
    "Sweet Potato",
    "Brown Rice",
    "Green Beans",
    "Carrots",
  ],
  caloricIntake: 1505,
  nutritionalBreakdown: "Protein: 35%, Carbohydrates: 45%, Fats: 20%",
  vetNote: "Focus on anti-inflammatory foods. Monitor weight weekly. Avoid wheat and dairy due to allergies. Gradual increase in protein to support muscle recovery post-surgery.",
  meals: [
    {
      time: "Morning (8:00 AM)",
      items: [
        { name: "Premium Dry Food (grain-free)", amount: "200g", calories: 350 },
        { name: "Chicken Breast (cooked)", amount: "100g", calories: 165 },
        { name: "Sweet Potato", amount: "50g", calories: 43 },
      ],
    },
    {
      time: "Afternoon (2:00 PM)",
      items: [
        { name: "Premium Dry Food (grain-free)", amount: "150g", calories: 262 },
        { name: "Green Beans", amount: "75g", calories: 26 },
      ],
    },
    {
      time: "Evening (7:00 PM)",
      items: [
        { name: "Premium Dry Food (grain-free)", amount: "200g", calories: 350 },
        { name: "Salmon (cooked)", amount: "100g", calories: 206 },
        { name: "Brown Rice", amount: "75g", calories: 82 },
        { name: "Carrots", amount: "50g", calories: 21 },
      ],
    },
  ],
};

interface MealPlanProps {
  user?: any;
}

export function MealPlan({ user }: MealPlanProps) {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Sidebar */}
      {user?.role === 'VETERINARIAN' ? (
        <VeterinarySidebar currentPage="meal-plans" />
      ) : (
        <PetOwnerSidebar currentPage="meal-plans" />
      )}

      {/* Main Content */}
      <main className="ml-64 pt-20 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <img
                src={mealPlanData.animal.image}
                alt={mealPlanData.animal.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-[#7ED9B9]"
              />
              <div>
                <h1 className="text-[#2A4B7C] mb-1">{mealPlanData.animal.name}'s Meal Plan</h1>
                <p className="text-muted-foreground m-0">
                  {mealPlanData.animal.breed} • {mealPlanData.animal.age} years • {mealPlanData.animal.weight}kg
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Feedback
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-[#7ED9B9] to-[#5EC7E8]">
                <Edit className="w-4 h-4 mr-2" />
                Edit Plan
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Meal Plan Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Daily Summary */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[#2A4B7C] m-0">Daily Overview</h3>
                  <Badge className="bg-[#7ED9B9] text-white">Active Plan</Badge>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-[#7ED9B9]/10">
                    <p className="text-2xl text-[#2A4B7C] m-0">{mealPlanData.caloricIntake}</p>
                    <p className="text-sm text-muted-foreground m-0 mt-1">Total Calories</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-[#5EC7E8]/10">
                    <p className="text-2xl text-[#2A4B7C] m-0">3</p>
                    <p className="text-sm text-muted-foreground m-0 mt-1">Meals/Day</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-[#2A4B7C]/10">
                    <p className="text-2xl text-[#2A4B7C] m-0">High Protein</p>
                    <p className="text-sm text-muted-foreground m-0 mt-1">Plan Type</p>
                  </div>
                </div>
              </Card>

              {/* Meals */}
              {mealPlanData.meals.map((meal, idx) => (
                <Card key={idx} className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-[#5EC7E8]" />
                    <h3 className="text-[#2A4B7C] m-0">{meal.time}</h3>
                  </div>
                  <div className="space-y-3">
                    {meal.items.map((item, itemIdx) => (
                      <div key={itemIdx}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="m-0">{item.name}</p>
                            <p className="text-sm text-muted-foreground m-0">{item.amount}</p>
                          </div>
                          <Badge variant="outline">{item.calories} cal</Badge>
                        </div>
                        {itemIdx < meal.items.length - 1 && <Separator className="my-3" />}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex justify-between">
                      <p className="text-sm m-0">Meal Total</p>
                      <p className="text-sm m-0">
                        {meal.items.reduce((sum, item) => sum + item.calories, 0)} calories
                      </p>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Nutrient Breakdown */}
              <Card className="p-6">
                <h3 className="text-[#2A4B7C] mb-6">Nutrient Distribution</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Protein</span>
                      <span>{mealPlanData.nutritionalBreakdown.split(", ")[0].split(": ")[1]}</span>
                    </div>
                    <Progress value={parseInt(mealPlanData.nutritionalBreakdown.split(", ")[0].split(": ")[1])} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Carbohydrates</span>
                      <span>{mealPlanData.nutritionalBreakdown.split(", ")[1].split(": ")[1]}</span>
                    </div>
                    <Progress value={parseInt(mealPlanData.nutritionalBreakdown.split(", ")[1].split(": ")[1])} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Fats</span>
                      <span>{mealPlanData.nutritionalBreakdown.split(", ")[2].split(": ")[1]}</span>
                    </div>
                    <Progress value={parseInt(mealPlanData.nutritionalBreakdown.split(", ")[2].split(": ")[1])} className="h-3" />
                  </div>
                </div>
              </Card>

              {/* Medical Records */}
              <Card className="p-6 border-l-4 border-l-orange-500">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-orange-500" />
                  <h3 className="text-[#2A4B7C] m-0">Medical Records</h3>
                  <Badge variant="outline" className="ml-auto">{mealPlanData.medicalRecord.recordId}</Badge>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm m-0 mb-1">Diagnosis</p>
                    <p className="text-sm text-muted-foreground m-0 bg-muted p-3 rounded-lg">
                      {mealPlanData.medicalRecord.diagnosis}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm m-0 mb-1">Prescription</p>
                    <p className="text-sm text-muted-foreground m-0 bg-muted p-3 rounded-lg">
                      {mealPlanData.medicalRecord.prescription}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm m-0 mb-1">Lab Results</p>
                    <p className="text-sm text-muted-foreground m-0 bg-muted p-3 rounded-lg">
                      {mealPlanData.medicalRecord.labResults}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Veterinary Notes */}
              <Card className="p-6 border-l-4 border-l-[#5EC7E8]">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-[#5EC7E8]" />
                  <h3 className="text-[#2A4B7C] m-0">Veterinary Notes</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed bg-[#5EC7E8]/5 p-4 rounded-lg">
                  {mealPlanData.vetNote}
                </p>
              </Card>
            </div>

            {/* AI Explanation Panel */}
            <div className="space-y-6">
              {/* Recommended Items */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <UtensilsCrossed className="w-5 h-5 text-[#7ED9B9]" />
                  <h3 className="text-[#2A4B7C] m-0">Recommended Items</h3>
                </div>
                <div className="space-y-2">
                  {mealPlanData.recommendedItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors">
                      <div className="w-2 h-2 rounded-full bg-[#7ED9B9]"></div>
                      <p className="text-sm m-0">{item}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Animal Info Summary */}
              <Card className="p-6">
                <h3 className="text-[#2A4B7C] mb-4">Animal Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Animal ID</span>
                    <span className="font-medium">{mealPlanData.animal.animalId}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plan ID</span>
                    <span className="font-medium">{mealPlanData.planId}</span>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-muted-foreground m-0 mb-1">Allergies</p>
                    <Badge variant="destructive" className="bg-red-500">{mealPlanData.animal.allergies}</Badge>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-muted-foreground m-0 mb-1">Dietary Requirements</p>
                    <Badge className="bg-[#5EC7E8] text-white">{mealPlanData.animal.dietaryRequirements}</Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-[#5EC7E8]" />
                  <h3 className="text-[#2A4B7C] m-0">AI Recommendations</h3>
                </div>
                <Badge className="bg-[#7ED9B9] text-white mb-4">Explainable AI (XAI)</Badge>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-[#2A4B7C] mb-2">Why This Plan?</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      This high-protein plan is designed for Max's active lifestyle as a 3-year-old Golden Retriever. 
                      The 35% protein content supports muscle maintenance and energy levels.
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-[#2A4B7C] mb-2">Key Considerations</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2">
                        <span className="text-[#7ED9B9]">✓</span>
                        <span>Age-appropriate caloric intake (1505 cal/day)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#7ED9B9]">✓</span>
                        <span>Balanced omega-3 from salmon for coat health</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#7ED9B9]">✓</span>
                        <span>Complex carbs for sustained energy</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#7ED9B9]">✓</span>
                        <span>Vegetables for fiber and vitamins</span>
                      </li>
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-[#2A4B7C] mb-2">Health Benefits</h4>
                    <div className="space-y-2">
                      <div className="p-3 rounded-lg bg-[#7ED9B9]/10">
                        <p className="text-sm m-0">
                          🦴 <span className="text-[#2A4B7C]">Joint Health:</span> Sweet potato and salmon 
                          provide anti-inflammatory benefits
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-[#5EC7E8]/10">
                        <p className="text-sm m-0">
                          💪 <span className="text-[#2A4B7C]">Muscle Support:</span> High-quality protein 
                          from chicken and fish
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-[#2A4B7C]/10">
                        <p className="text-sm m-0">
                          🌟 <span className="text-[#2A4B7C]">Digestive Health:</span> Brown rice and 
                          vegetables promote healthy digestion
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-[#2A4B7C] mb-2">Monitoring Tips</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Monitor Max's weight weekly and adjust portions if needed. Watch for changes in 
                      energy levels, coat quality, and digestion. Consult with your veterinarian if any 
                      concerns arise.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}