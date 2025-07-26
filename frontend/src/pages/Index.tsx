import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, Users, Clock, Shield, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Hero Section */}
      <div className="container py-24 text-center">
        <div className="flex justify-center mb-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-xl">
            <Droplets className="h-10 w-10 text-primary-foreground" />
          </div>
        </div>
        
        <Badge variant="secondary" className="mb-6">
          Digital Laundry Management
        </Badge>
        
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          LaundryPro Management System
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Streamline your laundry operations with our comprehensive digital solution for hostels, PGs, and residential campuses.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/login">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/register">Create Account</Link>
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="container py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">User Management</h3>
              <p className="text-sm text-muted-foreground">Secure authentication and role-based access control</p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Real-time Tracking</h3>
              <p className="text-sm text-muted-foreground">Track laundry status from pickup to delivery</p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Admin Dashboard</h3>
              <p className="text-sm text-muted-foreground">Comprehensive management tools for administrators</p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Digital Records</h3>
              <p className="text-sm text-muted-foreground">Complete transaction history and analytics</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
