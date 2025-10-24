import React from 'react';
import { 
  LayoutDashboard, 
  PawPrint, 
  Users,
  UtensilsCrossed, 
  FileText, 
  Brain 
} from 'lucide-react';

interface VeterinarySidebarProps {
  currentPage: string;
}

export function VeterinarySidebar({ currentPage }: VeterinarySidebarProps) {
  const sidebarItems = [
    {
      href: '/dashboard',
      icon: LayoutDashboard,
      label: 'Veterinary Dashboard',
      page: 'dashboard'
    },
    {
      href: '/profiles',
      icon: PawPrint,
      label: 'Animal Profiles',
      page: 'profiles'
    },
    {
      href: '/caregivers',
      icon: Users,
      label: 'Caregivers',
      page: 'caregivers'
    },
    {
      href: '/meal-plans',
      icon: UtensilsCrossed,
      label: 'Meal Plans',
      page: 'meal-plans'
    },
    {
      href: '/medical-records',
      icon: FileText,
      label: 'Medical Records',
      page: 'medical-records'
    },
    {
      href: '/ai-analysis',
      icon: Brain,
      label: 'AI Analysis',
      page: 'ai-analysis'
    }
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-border pt-20 z-10">
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.page;
          
          return (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-gradient-to-r from-[#7ED9B9]/10 to-[#5EC7E8]/10 text-[#2A4B7C]' 
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
