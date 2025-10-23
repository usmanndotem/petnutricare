import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#2A4B7C] text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7ED9B9] to-[#5EC7E8] flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="m-0 leading-none">PetNutriCare</h3>
              </div>
            </div>
            <p className="text-sm text-white/80">
              AI-Powered Personalized Nutrition for Healthier Pets
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-sm text-white/80 hover:text-white transition-colors">Home</a></li>
              <li><a href="#features" className="text-sm text-white/80 hover:text-white transition-colors">Features</a></li>
              <li><a href="#about" className="text-sm text-white/80 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/dashboard" className="text-sm text-white/80 hover:text-white transition-colors">Dashboard</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-white/80">
                <Mail className="w-4 h-4" />
                info@petnutricare.com
              </li>
              <li className="flex items-center gap-2 text-sm text-white/80">
                <Phone className="w-4 h-4" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2 text-sm text-white/80">
                <MapPin className="w-4 h-4" />
                123 Vet Street, City
              </li>
            </ul>
          </div>
          
          {/* Social Media */}
          <div>
            <h4 className="mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm text-white/60">
          <p className="m-0">© 2025 PetNutriCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
