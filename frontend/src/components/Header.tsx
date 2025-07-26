import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Droplets, User, Settings, LogOut, BarChart3, ClipboardList } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  // Mock user data - replace with actual auth state
  const user = {
    name: "John Doe",
    role: "user", // or "admin"
    email: "john@example.com"
  };

  const isAdmin = user.role === "admin";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent transition-transform group-hover:scale-105">
            <Droplets className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold">LaundryPro</span>
            <span className="text-xs text-muted-foreground">Management System</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/dashboard"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/dashboard") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Dashboard
          </Link>
          
          <Link
            to="/requests"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/requests") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            My Requests
          </Link>

          {isAdmin && (
            <>
              <Link
                to="/admin"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/admin") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Admin Panel
              </Link>
              <Link
                to="/analytics"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/analytics") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Analytics
              </Link>
            </>
          )}
        </nav>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          {/* Status Indicator */}
          <Badge variant="secondary" className="hidden sm:flex">
            Online
          </Badge>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
                <Badge variant="outline" className="w-fit text-xs">
                  {isAdmin ? "Administrator" : "User"}
                </Badge>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/requests" className="cursor-pointer">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  My Requests
                </Link>
              </DropdownMenuItem>
              {isAdmin && (
                <DropdownMenuItem asChild>
                  <Link to="/admin" className="cursor-pointer">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Admin Panel
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;