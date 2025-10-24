import { useState } from "react";
import { LayoutDashboard, PawPrint, UtensilsCrossed, TrendingUp, Upload, Plus, Stethoscope } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { VeterinarySidebar } from "./VeterinarySidebar";

export function CreateProfile() {
  const [formData, setFormData] = useState({
    animalId: "",
    name: "",
    species: "",
    breed: "",
    age: "",
    weight: "",
    allergies: "",
    dietaryRequirements: "",
    recordId: "",
    diagnosis: "",
    prescription: "",
    labResults: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Sidebar */}
      <VeterinarySidebar currentPage="create-profile" />

      {/* Main Content */}
      <main className="ml-64 pt-20 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-[#2A4B7C] mb-2">Create Animal Profile</h1>
            <p className="text-muted-foreground">Add a new animal to start creating personalized meal plans</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Form Section */}
            <Card className="p-8 md:col-span-2">
              <form className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-[#2A4B7C] mb-4 flex items-center gap-2">
                    <PawPrint className="w-5 h-5" />
                    Basic Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Animal Name *</Label>
                      <Input
                        id="name"
                        placeholder="e.g., Max"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="species">Species *</Label>
                      <Select value={formData.species} onValueChange={(value) => handleChange("species", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select species" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dog">🐶 Dog</SelectItem>
                          <SelectItem value="cat">🐱 Cat</SelectItem>
                          <SelectItem value="cow">🐮 Cow</SelectItem>
                          <SelectItem value="horse">🐴 Horse</SelectItem>
                          <SelectItem value="sheep">🐑 Sheep</SelectItem>
                          <SelectItem value="goat">🐐 Goat</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Physical Details */}
                <div>
                  <h3 className="text-[#2A4B7C] mb-4">Physical Details</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="breed">Breed</Label>
                      <Input
                        id="breed"
                        placeholder="e.g., Golden Retriever"
                        value={formData.breed}
                        onChange={(e) => handleChange("breed", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Age (years) *</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="e.g., 3"
                        value={formData.age}
                        onChange={(e) => handleChange("age", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg) *</Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        placeholder="e.g., 25.5"
                        value={formData.weight}
                        onChange={(e) => handleChange("weight", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Health Information */}
                <div>
                  <h3 className="text-[#2A4B7C] mb-4">Health Information</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="allergies">Allergies & Intolerances</Label>
                      <Textarea
                        id="allergies"
                        placeholder="List any known allergies or food intolerances (e.g., chicken, wheat, dairy)"
                        rows={3}
                        value={formData.allergies}
                        onChange={(e) => handleChange("allergies", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dietaryRequirements">Dietary Requirements</Label>
                      <Textarea
                        id="dietaryRequirements"
                        placeholder="List any dietary requirements or restrictions (e.g., low-fat, high-protein)"
                        rows={3}
                        value={formData.dietaryRequirements}
                        onChange={(e) => handleChange("dietaryRequirements", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Medical Records (Optional - For Veterinarians) */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-[#2A4B7C] mb-4 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5" />
                    Medical Records (Optional)
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="diagnosis">Diagnosis</Label>
                      <Textarea
                        id="diagnosis"
                        placeholder="Current diagnosis or health conditions"
                        rows={2}
                        value={formData.diagnosis}
                        onChange={(e) => handleChange("diagnosis", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="prescription">Prescription</Label>
                      <Textarea
                        id="prescription"
                        placeholder="Current medications and dosages"
                        rows={2}
                        value={formData.prescription}
                        onChange={(e) => handleChange("prescription", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="labResults">Lab Results</Label>
                      <Textarea
                        id="labResults"
                        placeholder="Recent lab results and findings"
                        rows={2}
                        value={formData.labResults}
                        onChange={(e) => handleChange("labResults", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Photo Upload */}
                <div>
                  <h3 className="text-[#2A4B7C] mb-4">Photo</h3>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-[#7ED9B9] transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-2 m-0">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground m-0">PNG, JPG up to 10MB</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-[#7ED9B9] to-[#5EC7E8]"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Profile
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <a href="/profiles">Cancel</a>
                  </Button>
                </div>
              </form>
            </Card>

            {/* Preview Card */}
            <Card className="p-6 h-fit sticky top-24">
              <h3 className="text-[#2A4B7C] mb-4">Preview</h3>
              <div className="space-y-4">
                <div className="w-full h-48 bg-gradient-to-br from-[#7ED9B9]/20 to-[#5EC7E8]/20 rounded-lg flex items-center justify-center">
                  <PawPrint className="w-16 h-16 text-[#7ED9B9]" />
                </div>
                <div>
                  <h4 className="text-[#2A4B7C] mb-1">
                    {formData.name || "Animal Name"}
                  </h4>
                  <p className="text-sm text-muted-foreground m-0">
                    {formData.breed || "Breed"} • {formData.species || "Species"}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground m-0">Age</p>
                    <p className="m-0">{formData.age || "—"} years</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground m-0">Weight</p>
                    <p className="m-0">{formData.weight || "—"} kg</p>
                  </div>
                </div>
                {(formData.allergies || formData.dietaryRequirements) && (
                  <div className="pt-2 border-t border-border">
                    {formData.allergies && (
                      <div className="mb-2">
                        <p className="text-xs text-muted-foreground m-0 mb-1">Allergies</p>
                        <p className="text-sm m-0 text-red-600">
                          {formData.allergies.substring(0, 50)}
                          {formData.allergies.length > 50 ? "..." : ""}
                        </p>
                      </div>
                    )}
                    {formData.dietaryRequirements && (
                      <div>
                        <p className="text-xs text-muted-foreground m-0 mb-1">Dietary Requirements</p>
                        <p className="text-sm m-0 text-orange-600">
                          {formData.dietaryRequirements.substring(0, 50)}
                          {formData.dietaryRequirements.length > 50 ? "..." : ""}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}