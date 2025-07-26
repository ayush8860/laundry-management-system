import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Clock, Package, Truck, CheckCircle, TrendingUp } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Mock data - replace with actual data from Supabase
  const stats = {
    totalRequests: 12,
    pending: 2,
    inProcess: 3,
    completed: 7,
  };

  const recentRequests = [
    {
      id: "REQ001",
      items: ["Shirts (3)", "Jeans (2)", "Towels (1)"],
      status: "delivered" as const,
      requestDate: "2024-01-15",
      deliveryDate: "2024-01-17",
    },
    {
      id: "REQ002", 
      items: ["Bed Sheets (2)", "Pillowcases (4)"],
      status: "in-process" as const,
      requestDate: "2024-01-16",
      deliveryDate: "2024-01-18",
    },
    {
      id: "REQ003",
      items: ["T-shirts (5)", "Shorts (2)"],
      status: "picked-up" as const,
      requestDate: "2024-01-17",
      deliveryDate: "2024-01-19",
    },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your laundry requests.
        </p>
      </div>

      {/* Quick Action */}
      <div className="mb-8">
        <Card className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Need laundry service?</h3>
                <p className="opacity-90">Submit a new request and we'll take care of it!</p>
              </div>
              <Button asChild size="lg" variant="secondary">
                <Link to="/new-request">
                  <Plus className="mr-2 h-5 w-5" />
                  New Request
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRequests}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-pending" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pending">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting pickup</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Process</CardTitle>
            <Truck className="h-4 w-4 text-in-progress" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-in-progress">{stats.inProcess}</div>
            <p className="text-xs text-muted-foreground">Being processed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-completed" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-completed">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">Ready for pickup</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Requests */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Requests</CardTitle>
              <CardDescription>Your latest laundry service requests</CardDescription>
            </div>
            <Button asChild variant="outline">
              <Link to="/requests">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold">{request.id}</span>
                    <StatusBadge status={request.status} />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {request.items.join(", ")}
                  </p>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>Requested: {request.requestDate}</span>
                    <span>Expected: {request.deliveryDate}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;