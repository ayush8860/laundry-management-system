import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Package, TrendingUp, Clock, Search, Filter, Eye, Edit } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data - replace with actual data from Supabase
  const stats = {
    totalUsers: 145,
    activeRequests: 23,
    completedToday: 8,
    revenue: 1250.50,
  };

  const allRequests = [
    {
      id: "REQ001",
      userId: "user123",
      userName: "John Doe",
      userRoom: "Room 204, Block A",
      items: ["Shirts (3)", "Jeans (2)", "Towels (1)"],
      status: "delivered" as const,
      requestDate: "2024-01-15T10:30:00",
      cost: 45.00,
      assignedTo: "Staff A",
    },
    {
      id: "REQ002",
      userId: "user456",
      userName: "Jane Smith",
      userRoom: "Room 301, Block B",
      items: ["Bed Sheets (2)", "Pillowcases (4)"],
      status: "in-process" as const,
      requestDate: "2024-01-16T09:15:00",
      cost: 30.00,
      assignedTo: "Staff B",
    },
    {
      id: "REQ003",
      userId: "user789",
      userName: "Mike Johnson",
      userRoom: "Room 105, Block A",
      items: ["T-shirts (5)", "Shorts (2)"],
      status: "picked-up" as const,
      requestDate: "2024-01-17T08:45:00",
      cost: 25.00,
      assignedTo: "Staff A",
    },
    {
      id: "REQ004",
      userId: "user101",
      userName: "Sarah Wilson",
      userRoom: "Room 502, Block C",
      items: ["Formal Shirts (2)", "Suit (1)"],
      status: "pending" as const,
      requestDate: "2024-01-18T11:20:00",
      cost: 75.00,
      assignedTo: null,
    },
  ];

  const users = [
    {
      id: "user123",
      name: "John Doe",
      email: "john@example.com",
      room: "Room 204, Block A",
      totalRequests: 5,
      totalSpent: 225.00,
      lastRequest: "2024-01-15",
      status: "active",
    },
    {
      id: "user456",
      name: "Jane Smith",
      email: "jane@example.com",
      room: "Room 301, Block B",
      totalRequests: 3,
      totalSpent: 135.00,
      lastRequest: "2024-01-16",
      status: "active",
    },
    {
      id: "user789",
      name: "Mike Johnson",
      email: "mike@example.com",
      room: "Room 105, Block A",
      totalRequests: 7,
      totalSpent: 315.00,
      lastRequest: "2024-01-17",
      status: "active",
    },
  ];

  const filteredRequests = allRequests.filter(request => {
    const matchesSearch = request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.userRoom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateRequestStatus = (requestId: string, newStatus: string) => {
    // Here you would update the status in Supabase
    toast({
      title: "Status Updated",
      description: `Request ${requestId} has been updated to ${newStatus}`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage laundry requests, users, and system operations
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
            <Package className="h-4 w-4 text-in-progress" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-in-progress">{stats.activeRequests}</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            <Clock className="h-4 w-4 text-completed" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-completed">{stats.completedToday}</div>
            <p className="text-xs text-muted-foreground">Finished orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.revenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="requests" className="space-y-6">
        <TabsList>
          <TabsTrigger value="requests">Manage Requests</TabsTrigger>
          <TabsTrigger value="users">Manage Users</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search requests, users, or rooms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="picked-up">Picked Up</SelectItem>
                    <SelectItem value="in-process">In Process</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Requests List */}
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-lg">{request.id}</span>
                        <StatusBadge status={request.status} />
                        {request.assignedTo && (
                          <Badge variant="outline">
                            Assigned to {request.assignedTo}
                          </Badge>
                        )}
                      </div>

                      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">Customer</div>
                          <div>{request.userName}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">Location</div>
                          <div>{request.userRoom}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">Request Date</div>
                          <div>{formatDate(request.requestDate)}</div>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Items</div>
                        <div className="text-sm">{request.items.join(", ")}</div>
                      </div>
                    </div>

                    <div className="text-right space-y-3">
                      <div className="text-2xl font-bold">${request.cost.toFixed(2)}</div>
                      
                      <div className="flex gap-2">
                        <Select
                          value={request.status}
                          onValueChange={(value) => updateRequestStatus(request.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="picked-up">Picked Up</SelectItem>
                            <SelectItem value="in-process">In Process</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage registered users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{user.name}</span>
                        <Badge variant="outline">{user.status}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                      <div className="text-sm text-muted-foreground">{user.room}</div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="text-sm">
                        <span className="font-medium">{user.totalRequests}</span> requests
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ${user.totalSpent.toFixed(2)} total
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Last: {user.lastRequest}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="ml-4">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;