import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Filter, Calendar, Package, MapPin } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { Link } from "react-router-dom";

const Requests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data - replace with actual data from Supabase
  const requests = [
    {
      id: "REQ001",
      items: [
        { type: "Shirts", quantity: 3, service: "Wash & Iron" },
        { type: "Jeans", quantity: 2, service: "Wash Only" },
        { type: "Towels", quantity: 1, service: "Wash & Dry" },
      ],
      status: "delivered" as const,
      requestDate: "2024-01-15T10:30:00",
      pickupDate: "2024-01-15T14:00:00",
      deliveryDate: "2024-01-17T16:30:00",
      cost: 45.00,
      specialInstructions: "Handle delicate items with care",
      address: "Room 204, Block A",
    },
    {
      id: "REQ002",
      items: [
        { type: "Bed Sheets", quantity: 2, service: "Wash & Iron" },
        { type: "Pillowcases", quantity: 4, service: "Wash & Iron" },
      ],
      status: "in-process" as const,
      requestDate: "2024-01-16T09:15:00",
      pickupDate: "2024-01-16T13:00:00",
      deliveryDate: "2024-01-18T15:00:00",
      cost: 30.00,
      specialInstructions: "",
      address: "Room 204, Block A",
    },
    {
      id: "REQ003",
      items: [
        { type: "T-shirts", quantity: 5, service: "Wash & Fold" },
        { type: "Shorts", quantity: 2, service: "Wash & Fold" },
      ],
      status: "picked-up" as const,
      requestDate: "2024-01-17T08:45:00",
      pickupDate: "2024-01-17T12:00:00",
      deliveryDate: "2024-01-19T14:00:00",
      cost: 25.00,
      specialInstructions: "No fabric softener please",
      address: "Room 204, Block A",
    },
    {
      id: "REQ004",
      items: [
        { type: "Formal Shirts", quantity: 2, service: "Dry Clean" },
        { type: "Suit", quantity: 1, service: "Dry Clean" },
      ],
      status: "pending" as const,
      requestDate: "2024-01-18T11:20:00",
      pickupDate: null,
      deliveryDate: "2024-01-20T16:00:00",
      cost: 75.00,
      specialInstructions: "Express service required",
      address: "Room 204, Block A",
    },
  ];

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.items.some(item => item.type.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not scheduled";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Requests</h1>
          <p className="text-muted-foreground">
            Track and manage your laundry service requests
          </p>
        </div>
        <Button asChild>
          <Link to="/new-request">
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="picked-up">Picked Up</TabsTrigger>
                <TabsTrigger value="in-process">Processing</TabsTrigger>
                <TabsTrigger value="delivered">Delivered</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      <div className="space-y-6">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-lg">{request.id}</CardTitle>
                  <StatusBadge status={request.status} />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">${request.cost.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">Total Cost</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Items */}
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Items
                </h4>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {request.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <div className="font-medium">{item.type}</div>
                        <div className="text-sm text-muted-foreground">{item.service}</div>
                      </div>
                      <Badge variant="outline">
                        {item.quantity}x
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Timeline
                </h4>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-sm font-medium">Requested</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(request.requestDate)}
                    </div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-sm font-medium">Pickup</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(request.pickupDate)}
                    </div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-sm font-medium">Expected Delivery</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(request.deliveryDate)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {request.address}
                </div>
                {request.specialInstructions && (
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Note:</span> {request.specialInstructions}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card className="p-12 text-center">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No requests found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your search or filter criteria"
              : "You haven't made any laundry requests yet"}
          </p>
          <Button asChild>
            <Link to="/new-request">
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Request
            </Link>
          </Button>
        </Card>
      )}
    </div>
  );
};

export default Requests;