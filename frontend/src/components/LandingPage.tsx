import { Brain, Stethoscope, Leaf, ArrowRight, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function LandingPage() {
  const handleSmoothScroll = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleLoginNavigation = () => {
    window.location.hash = "login";
  };
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#F5F7FA] via-white to-[#F5F7FA] py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-[#7ED9B9]/10 px-4 py-2 rounded-full mb-6">
                <p className="text-sm text-[#2A4B7C] m-0">🐾 AI-Powered Pet Healthcare</p>
              </div>
              <h1 className="text-4xl md:text-5xl text-[#2A4B7C] mb-6 leading-tight">
                AI-Powered Personalized Nutrition for Healthier Pets
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Transform your pet's health with intelligent meal planning powered by advanced AI. 
                Tailored nutrition plans for dogs, cats, and livestock animals.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-[#7ED9B9] to-[#5EC7E8] hover:opacity-90"
                  onClick={handleLoginNavigation}
                >
                  Get Started <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" onClick={handleLoginNavigation}>
                  Login
                </Button>
                <Button size="lg" variant="ghost" onClick={() => handleSmoothScroll('features')}>
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1733783489145-f3d3ee7a9ccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJpYW4lMjBwZXRzJTIwZG9nJTIwY2F0fGVufDF8fHx8MTc2MTIyNjU1N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Veterinarian with pets"
                  className="w-full h-auto"
                />
              </div>
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-[#7ED9B9]/20">
                <p className="text-3xl text-[#2A4B7C] m-0">500+</p>
                <p className="text-sm text-muted-foreground m-0 mt-1">Healthy Pets</p>
              </div>
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-6 border border-[#5EC7E8]/20">
                <p className="text-3xl text-[#7ED9B9] m-0">98%</p>
                <p className="text-sm text-muted-foreground m-0 mt-1">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-[#2A4B7C] mb-4">
              Why Choose PetNutriCare?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge AI technology combined with veterinary expertise to provide 
              the best nutrition plans for your beloved pets.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="p-8 border-2 border-transparent hover:border-[#7ED9B9] transition-all hover:shadow-lg">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7ED9B9] to-[#5EC7E8] flex items-center justify-center mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-[#2A4B7C] mb-3">AI-Driven Meal Plans</h3>
              <p className="text-muted-foreground leading-relaxed">
                Advanced machine learning algorithms analyze your pet's unique needs to create 
                personalized nutrition plans that adapt over time.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-[#7ED9B9] mt-0.5 flex-shrink-0" />
                  Personalized recommendations
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-[#7ED9B9] mt-0.5 flex-shrink-0" />
                  Real-time adjustments
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-[#7ED9B9] mt-0.5 flex-shrink-0" />
                  Evidence-based nutrition
                </li>
              </ul>
            </Card>

            {/* Feature 2 */}
            <Card className="p-8 border-2 border-transparent hover:border-[#5EC7E8] transition-all hover:shadow-lg">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#5EC7E8] to-[#2A4B7C] flex items-center justify-center mb-6">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-[#2A4B7C] mb-3">Veterinary Data Analysis</h3>
              <p className="text-muted-foreground leading-relaxed">
                Integrate with veterinary health records to create comprehensive nutrition 
                strategies based on medical history and conditions.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-[#5EC7E8] mt-0.5 flex-shrink-0" />
                  Health condition tracking
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-[#5EC7E8] mt-0.5 flex-shrink-0" />
                  Allergy management
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-[#5EC7E8] mt-0.5 flex-shrink-0" />
                  Progress monitoring
                </li>
              </ul>
            </Card>

            {/* Feature 3 */}
            <Card className="p-8 border-2 border-transparent hover:border-[#2A4B7C] transition-all hover:shadow-lg">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2A4B7C] to-[#7ED9B9] flex items-center justify-center mb-6">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-[#2A4B7C] mb-3">Sustainable & Healthy</h3>
              <p className="text-muted-foreground leading-relaxed">
                Environmentally conscious nutrition plans that promote long-term health while 
                considering sustainability and food quality.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-[#2A4B7C] mt-0.5 flex-shrink-0" />
                  Quality ingredients
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-[#2A4B7C] mt-0.5 flex-shrink-0" />
                  Eco-friendly options
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-[#2A4B7C] mt-0.5 flex-shrink-0" />
                  Long-term wellness
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#2A4B7C] to-[#5EC7E8]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl text-white mb-6">
            Ready to Transform Your Pet's Health?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of pet owners and veterinarians who trust PetNutriCare 
            for intelligent pet nutrition management.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-[#2A4B7C] hover:bg-white/90"
            onClick={handleLoginNavigation}
          >
            Start Free Trial <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Quick Navigation Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-[#2A4B7C] mb-4">
              Get Started Today
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your path to better pet nutrition and health management.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group" onClick={handleLoginNavigation}>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7ED9B9] to-[#5EC7E8] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#2A4B7C] mb-2">Sign Up</h3>
              <p className="text-sm text-muted-foreground">Create your account and start managing your pet's nutrition</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group" onClick={handleLoginNavigation}>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5EC7E8] to-[#2A4B7C] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#2A4B7C] mb-2">Login</h3>
              <p className="text-sm text-muted-foreground">Access your dashboard and pet profiles</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => handleSmoothScroll('features')}>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2A4B7C] to-[#7ED9B9] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#2A4B7C] mb-2">Features</h3>
              <p className="text-sm text-muted-foreground">Learn about our AI-powered nutrition features</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => handleSmoothScroll('contact')}>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7ED9B9] to-[#5EC7E8] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#2A4B7C] mb-2">Contact</h3>
              <p className="text-sm text-muted-foreground">Get in touch with our support team</p>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl text-[#2A4B7C] mb-6">
                About PetNutriCare
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                PetNutriCare was founded with a simple mission: to revolutionize pet nutrition 
                through the power of artificial intelligence and veterinary expertise.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our platform combines cutting-edge AI technology with comprehensive veterinary 
                knowledge to create personalized nutrition plans that adapt to your pet's unique 
                needs, health conditions, and lifestyle.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-[#7ED9B9]/10 rounded-lg">
                  <p className="text-2xl font-bold text-[#2A4B7C]">500+</p>
                  <p className="text-sm text-muted-foreground">Happy Pets</p>
                </div>
                <div className="text-center p-4 bg-[#5EC7E8]/10 rounded-lg">
                  <p className="text-2xl font-bold text-[#2A4B7C]">50+</p>
                  <p className="text-sm text-muted-foreground">Veterinarians</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBvd25lciUyMGRvZyUyMGNhdHxlbnwxfHx8fDE3NjEyMjY1NjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Pet owner with their pets"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-[#F5F7FA]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-[#2A4B7C] mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about PetNutriCare? We're here to help you and your pets.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7ED9B9] to-[#5EC7E8] flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#2A4B7C] mb-2">Support</h3>
              <p className="text-sm text-muted-foreground mb-4">Get help with your account and pet profiles</p>
              <Button variant="outline" size="sm" asChild>
                <a href="mailto:support@petnutricare.com">Contact Support</a>
              </Button>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5EC7E8] to-[#2A4B7C] flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#2A4B7C] mb-2">Veterinarians</h3>
              <p className="text-sm text-muted-foreground mb-4">Professional tools for veterinary practices</p>
              <Button variant="outline" size="sm" asChild>
                <a href="mailto:vets@petnutricare.com">Partner with Us</a>
              </Button>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2A4B7C] to-[#7ED9B9] flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#2A4B7C] mb-2">General Info</h3>
              <p className="text-sm text-muted-foreground mb-4">Learn more about our platform and services</p>
              <Button variant="outline" size="sm" asChild>
                <a href="mailto:info@petnutricare.com">Learn More</a>
              </Button>
            </Card>
          </div>
        </div>
      </section>

    </div>
  );
}
