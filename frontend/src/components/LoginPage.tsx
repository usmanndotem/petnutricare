import { useState } from "react";
import { Heart, User, Stethoscope } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ApiService } from "../services/api";

interface LoginPageProps {
  onLogin?: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  onSignupComplete?: (user: any) => void;
}

export function LoginPage({ onLogin, onSignupComplete }: LoginPageProps) {
  const [userRole, setUserRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("login");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (onLogin) {
      const result = await onLogin(email, password);
      if (!result.success) {
        setError(result.error || "Login failed");
      }
    }
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target as HTMLFormElement);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("signup-email") as string;
    const password = formData.get("signup-password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await ApiService.register({
        email,
        password,
        firstName,
        lastName,
        role: userRole === "user" ? "USER" : "VETERINARIAN"
      });

      if (response.success) {
        setError("");
        if (response.data?.token) {
          localStorage.setItem('authToken', response.data.token);
        }
        if (onSignupComplete) {
          onSignupComplete(response.data?.user);
        } else {
          setActiveTab("login");
          alert("Account created successfully! Please log in.");
        }
      }
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#F5F7FA] via-[#E8F5F1] to-[#E0F2F7]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-[#7ED9B9]"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-[#5EC7E8]"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-[#2A4B7C]"></div>
      </div>

      <div className="relative container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md p-8 shadow-2xl border-2 border-white/50 backdrop-blur">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7ED9B9] to-[#5EC7E8] flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-[#2A4B7C] mb-2">Welcome to PetNutriCare</h2>
            <p className="text-sm text-muted-foreground">Sign in to manage your pet's nutrition</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Role Selection */}
                <div className="space-y-3">
                  <Label>I am a:</Label>
                  <RadioGroup value={userRole} onValueChange={setUserRole}>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border-2 border-transparent hover:border-[#7ED9B9] transition-colors cursor-pointer">
                      <RadioGroupItem value="user" id="user" />
                      <Label htmlFor="user" className="flex items-center gap-2 cursor-pointer flex-1">
                        <User className="w-4 h-4 text-[#7ED9B9]" />
                        Pet Owner / Caregiver
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border-2 border-transparent hover:border-[#5EC7E8] transition-colors cursor-pointer">
                      <RadioGroupItem value="vet" id="vet" />
                      <Label htmlFor="vet" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Stethoscope className="w-4 h-4 text-[#5EC7E8]" />
                        Veterinarian
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    className="bg-white"
                    required
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-white"
                    required
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>
                  <a href="#" className="text-[#5EC7E8] hover:underline">
                    Forgot Password?
                  </a>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#7ED9B9] to-[#5EC7E8]"
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                {/* Role Selection */}
                <div className="space-y-3">
                  <Label>I am a:</Label>
                  <RadioGroup value={userRole} onValueChange={setUserRole}>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border-2 border-transparent hover:border-[#7ED9B9] transition-colors cursor-pointer">
                      <RadioGroupItem value="user" id="signup-user" />
                      <Label htmlFor="signup-user" className="flex items-center gap-2 cursor-pointer flex-1">
                        <User className="w-4 h-4 text-[#7ED9B9]" />
                        Pet Owner / Caregiver
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border-2 border-transparent hover:border-[#5EC7E8] transition-colors cursor-pointer">
                      <RadioGroupItem value="vet" id="signup-vet" />
                      <Label htmlFor="signup-vet" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Stethoscope className="w-4 h-4 text-[#5EC7E8]" />
                        Veterinarian
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    className="bg-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    className="bg-white"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    name="signup-email"
                    type="email"
                    placeholder="your@email.com"
                    className="bg-white"
                    required
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    name="signup-password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-white"
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-white"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#7ED9B9] to-[#5EC7E8]"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
