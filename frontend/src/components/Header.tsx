import { Heart, User, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface HeaderProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

export function Header({ isLoggedIn = false, onLogout }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
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

  const handleLogoClick = () => {
    if (window.location.hash === "" || window.location.hash === "#home") {
      // If already on homepage, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If on other pages, navigate to homepage
      window.location.hash = "home";
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7ED9B9] to-[#5EC7E8] flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-[#2A4B7C] m-0 leading-none">PetNutriCare</h1>
            <p className="text-xs text-muted-foreground m-0 leading-none mt-0.5">AI-Powered Pet Nutrition</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          {!isLoggedIn && (
            <>
              <a href="/" className="text-sm text-foreground hover:text-[#5EC7E8] transition-colors">Home</a>
              <a href="#features" className="text-sm text-foreground hover:text-[#5EC7E8] transition-colors" onClick={(e) => handleSmoothScroll(e, 'features')}>Features</a>
              <a href="#about" className="text-sm text-foreground hover:text-[#5EC7E8] transition-colors" onClick={(e) => handleSmoothScroll(e, 'about')}>About</a>
              <a href="#contact" className="text-sm text-foreground hover:text-[#5EC7E8] transition-colors" onClick={(e) => handleSmoothScroll(e, 'contact')}>Contact</a>
            </>
          )}
        </nav>
        
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="w-4 h-4" />
                Profile
              </Button>
              <Button onClick={onLogout} variant="outline" size="sm">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={handleLoginNavigation}>
                Login
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-[#7ED9B9] to-[#5EC7E8]" onClick={handleLoginNavigation}>
                Get Started
              </Button>
            </>
          )}
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-4">
              {!isLoggedIn && (
                <>
                  <a href="/" className="text-sm text-foreground hover:text-[#5EC7E8] transition-colors py-2">Home</a>
                  <a href="#features" className="text-sm text-foreground hover:text-[#5EC7E8] transition-colors py-2" onClick={(e) => handleSmoothScroll(e, 'features')}>Features</a>
                  <a href="#about" className="text-sm text-foreground hover:text-[#5EC7E8] transition-colors py-2" onClick={(e) => handleSmoothScroll(e, 'about')}>About</a>
                  <a href="#contact" className="text-sm text-foreground hover:text-[#5EC7E8] transition-colors py-2" onClick={(e) => handleSmoothScroll(e, 'contact')}>Contact</a>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
