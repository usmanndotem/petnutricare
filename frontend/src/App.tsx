import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Breadcrumb } from "./components/Breadcrumb";
import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { Dashboard } from "./components/Dashboard";
import { CreateProfile } from "./components/CreateProfile";
import { ViewProfiles } from "./components/ViewProfiles";
import { MealPlan } from "./components/MealPlan";
import { MedicalRecords } from "./components/MedicalRecords";
import { AIAnalysis } from "./components/AIAnalysis";
import { Caregivers } from "./components/Caregivers";
import { ApiService } from "./services/api";
import "./styles/globals.css";

type Page = "home" | "login" | "dashboard" | "create-profile" | "profiles" | "meal-plans" | "medical-records" | "ai-analysis" | "caregivers";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await ApiService.getProfile();
          if (response.success) {
            setUser(response.data.user);
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('authToken');
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Simple routing based on hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || "home";
      setCurrentPage(hash as Page);
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Update hash when navigating
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="/"]');
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href");
        if (href) {
          const page = href.slice(1) || "home";
          window.location.hash = page;
        }
      });
    });
  }, [currentPage]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await ApiService.login(email, password);
      if (response.success) {
        setUser(response.data.user);
        setIsLoggedIn(true);
        window.location.hash = "dashboard";
        return { success: true };
      } else {
        return { success: false, error: response.message || 'Login failed' };
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      return { success: false, error: error.message || 'Login failed. Please check your credentials.' };
    }
  };

  const handleLogout = () => {
    ApiService.logout();
    setUser(null);
    setIsLoggedIn(false);
    window.location.hash = "home";
  };

  const renderPage = () => {
    switch (currentPage) {
      case "login":
        return <LoginPage onLogin={handleLogin} onSignupComplete={(newUser) => {
          setUser(newUser);
          setIsLoggedIn(true);
          window.location.hash = 'dashboard';
        }} />;
      case "dashboard":
        return <Dashboard user={user} />;
      case "create-profile":
        return <CreateProfile user={user} />;
      case "profiles":
        return <ViewProfiles user={user} />;
      case "meal-plans":
        return <MealPlan user={user} />;
      case "medical-records":
        return <MedicalRecords user={user} />;
      case "ai-analysis":
        return <AIAnalysis user={user} />;
      case "caregivers":
        return <Caregivers user={user} />;
      default:
        return <LandingPage />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading PetNutriCare...</p>
        </div>
      </div>
    );
  }

  const showHeaderFooter = !["dashboard", "create-profile", "profiles", "meal-plans", "medical-records", "ai-analysis", "caregivers"].includes(currentPage);
  const showDashboardHeader = ["dashboard", "create-profile", "profiles", "meal-plans", "medical-records", "ai-analysis", "caregivers"].includes(currentPage);
  const showBreadcrumb = ["dashboard", "create-profile", "profiles", "meal-plans", "medical-records", "ai-analysis", "caregivers"].includes(currentPage);

  return (
    <div className="min-h-screen flex flex-col">
      {showHeaderFooter && <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
      {showDashboardHeader && <Header isLoggedIn={true} onLogout={handleLogout} />}
      {showBreadcrumb && <Breadcrumb currentPage={currentPage} user={user} />}
      <div className="flex-1">
        {renderPage()}
      </div>
      {showHeaderFooter && <Footer />}
    </div>
  );
}