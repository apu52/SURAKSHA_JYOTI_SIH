import { Bell, Search, MapPin, Zap, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const [notifications] = useState(3);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

          const navigation = [
            { name: "Dashboard", href: "/dashboard" },
            { name: "Live Data", href: "/live-data" },
            { name: "Devices", href: "/devices" },
            { name: "Analytics", href: "/analytics" },
            { name: "Field Ops", href: "/field-operations" },
            { name: "Incidents", href: "/incidents" },
            { name: "Reports", href: "/reports" },
            { name: "Settings", href: "/settings" },
            { name: "Citizen Portal", href: "/citizen" }
          ];

  const isActive = (path: string) => location.pathname === path;

  return (

    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2 hover-glow rounded-lg px-3 py-2">
            <Zap className="h-6 w-6 text-secondary" />
            <span className="text-xl font-bold gradient-hero bg-clip-text text-transparent">
              SurakshaJyoti
            </span>
          </Link>

          {/* Navigation Menu - Desktop */}
          <nav className="hidden lg:flex space-x-1">
            {navigation.slice(0, 4).map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors hover-glow ${
                  isActive(item.href)
                    ? 'bg-secondary/10 text-secondary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* More Menu for additional pages */}
            <div className="relative group">
              <Button variant="ghost" size="sm" className="text-sm font-medium text-muted-foreground hover:text-foreground hover-glow">
                More
              </Button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-popover border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {navigation.slice(4).map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-4 py-2 text-sm transition-colors hover:bg-muted/50 first:rounded-t-lg last:rounded-b-lg ${
                      isActive(item.href)
                        ? 'bg-secondary/10 text-secondary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search devices, poles, or incidents..."
            className="pl-10 bg-muted/50 border-muted hover:border-secondary/50 focus:border-secondary transition-colors"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Live Status */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-success/10 border border-success/20">
            <div className="w-2 h-2 bg-success rounded-full pulse-glow" />
            <span className="text-sm text-success font-medium">Live</span>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative hover-glow">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {notifications}
              </Badge>
            )}
          </Button>

          {/* Location */}
          <Button variant="ghost" size="icon" className="hover-glow">
            <MapPin className="h-5 w-5" />
          </Button>

          {/* User Menu */}
          <Button variant="ghost" size="icon" className="hover-glow">
            <User className="h-5 w-5" />
          </Button>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden hover-glow">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex items-center space-x-2 mb-6">
                <Zap className="h-6 w-6 text-secondary" />
                <span className="text-xl font-bold">SurakshaJyoti</span>
              </div>
              
              <nav className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-secondary/10 text-secondary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="pl-10"
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;