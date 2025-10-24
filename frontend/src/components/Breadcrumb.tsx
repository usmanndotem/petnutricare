import { ChevronRight, Home } from "lucide-react";
import { Button } from "./ui/button";

interface BreadcrumbProps {
  currentPage: string;
  user?: any;
}

export function Breadcrumb({ currentPage, user }: BreadcrumbProps) {
  const getBreadcrumbs = () => {
    const breadcrumbs = [
      { label: "Home", href: "/", icon: Home }
    ];

    switch (currentPage) {
      case "login":
        breadcrumbs.push({ label: "Login", href: "/login" });
        break;
      case "dashboard":
        breadcrumbs.push({ label: "Dashboard", href: "/dashboard" });
        break;
      case "create-profile":
        breadcrumbs.push(
          { label: "Dashboard", href: "/dashboard" },
          { label: "Add New Pet", href: "/create-profile" }
        );
        break;
      case "profiles":
        breadcrumbs.push(
          { label: "Dashboard", href: "/dashboard" },
          { label: "My Pets", href: "/profiles" }
        );
        break;
      case "meal-plans":
        breadcrumbs.push(
          { label: "Dashboard", href: "/dashboard" },
          { label: "Meal Plans", href: "/meal-plans" }
        );
        break;
      case "medical-records":
        breadcrumbs.push(
          { label: "Dashboard", href: "/dashboard" },
          { label: "Medical Records", href: "/medical-records" }
        );
        break;
      case "ai-analysis":
        breadcrumbs.push(
          { label: "Dashboard", href: "/dashboard" },
          { label: "AI Analysis", href: "/ai-analysis" }
        );
        break;
      case "caregivers":
        breadcrumbs.push(
          { label: "Dashboard", href: "/dashboard" },
          { label: "Caregivers", href: "/caregivers" }
        );
        break;
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav className="bg-white border-b border-border px-4 py-3">
      <div className="container mx-auto">
        <div className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((breadcrumb, index) => (
            <div key={breadcrumb.href} className="flex items-center">
              {index > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground mx-2" />}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-1 text-muted-foreground hover:text-foreground"
                asChild
              >
                <a href={breadcrumb.href} className="flex items-center gap-1">
                  {breadcrumb.icon && <breadcrumb.icon className="w-4 h-4" />}
                  {breadcrumb.label}
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
