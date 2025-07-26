import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, Package, MapPin, Calendar, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "@/lib/api"; // at the top

interface LaundryItem {
  id: string;
  type: string;
  quantity: number;
  service: string;
  pricePerItem: number;
}

const NewRequest = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [items, setItems] = useState<LaundryItem[]>([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");

  const itemTypes = [
    { value: "shirts", label: "Shirts" },
    { value: "t-shirts", label: "T-Shirts" },
    { value: "jeans", label: "Jeans" },
    { value: "formal-shirts", label: "Formal Shirts" },
    { value: "suits", label: "Suits" },
    { value: "dresses", label: "Dresses" },
    { value: "bed-sheets", label: "Bed Sheets" },
    { value: "pillowcases", label: "Pillowcases" },
    { value: "towels", label: "Towels" },
    { value: "blankets", label: "Blankets" },
    { value: "curtains", label: "Curtains" },
  ];

  const serviceTypes = [
    { value: "wash-fold", label: "Wash & Fold", price: 3.50 },
    { value: "wash-iron", label: "Wash & Iron", price: 5.00 },
    { value: "wash-only", label: "Wash Only", price: 2.50 },
    { value: "dry-clean", label: "Dry Clean", price: 12.00 },
    { value: "iron-only", label: "Iron Only", price: 2.00 },
  ];

  const addItem = () => {
    if (!selectedType || !selectedService || quantity < 1) {
      toast({
        title: "Invalid Input",
        description: "Please fill in all item details",
        variant: "destructive",
      });
      return;
    }

    const serviceData = serviceTypes.find(s => s.value === selectedService);
    const typeData = itemTypes.find(t => t.value === selectedType);
    
    if (!serviceData || !typeData) return;

    const newItem: LaundryItem = {
      id: Date.now().toString(),
      type: typeData.label,
      quantity,
      service: serviceData.label,
      pricePerItem: serviceData.price,
    };

    setItems([...items, newItem]);
    setSelectedType("");
    setSelectedService("");
    setQuantity(1);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const totalCost = items.reduce((sum, item) => sum + (item.quantity * item.pricePerItem), 0);

  const handleSubmit = async () => {
    if (items.length === 0) {
      toast({
        title: "No Items Added",
        description: "Please add at least one item to your request",
        variant: "destructive",
      });
      return;
    }

    if (!address.trim()) {
      toast({
        title: "Address Required",
        description: "Please provide your pickup address",
        variant: "destructive",
      });
      return;
    }

    try {
      await apiFetch("/requests", {
        method: "POST",
        body: JSON.stringify({
          items: items.map(item => item.type), // or adjust as needed
        }),
      });
      toast({
        title: "Request Submitted!",
        description: "Your laundry request has been submitted successfully.",
      });
      navigate("/requests");
    } catch (err) {
      toast({
        title: "Submission Failed",
        description: err.message || "Could not submit request",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">New Laundry Request</h1>
        <p className="text-muted-foreground">
          Create a new laundry service request with your items and preferences
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Add Items Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Add Items
              </CardTitle>
              <CardDescription>
                Select the items you want to include in your laundry request
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="item-type">Item Type</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select item type" />
                    </SelectTrigger>
                    <SelectContent>
                      {itemTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service-type">Service Type</Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map((service) => (
                        <SelectItem key={service.value} value={service.value}>
                          <div className="flex items-center justify-between w-full">
                            <span>{service.label}</span>
                            <span className="text-sm text-muted-foreground ml-2">
                              ${service.price}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="text-center"
                      min="1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <Button onClick={addItem} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </CardContent>
          </Card>

          {/* Selected Items */}
          {items.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Selected Items ({items.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{item.type}</div>
                        <div className="text-sm text-muted-foreground">{item.service}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-sm font-medium">
                          ${(item.quantity * item.pricePerItem).toFixed(2)}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pickup Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Pickup Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Pickup Address</Label>
                <Input
                  id="address"
                  placeholder="e.g., Room 204, Block A, XYZ Hostel"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Preferred Time</Label>
                  <Select value={preferredTime} onValueChange={setPreferredTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                      <SelectItem value="evening">Evening (5 PM - 8 PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Special Instructions (Optional)</Label>
                <Textarea
                  id="instructions"
                  placeholder="Any special instructions for handling your items..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No items added yet
                </p>
              ) : (
                <>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.type} ({item.quantity}x)</span>
                        <span>${(item.quantity * item.pricePerItem).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${totalCost.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-2 pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4" />
                    Estimated Delivery
                  </div>
                  <p>2-3 business days</p>
                </div>
              </div>

              <Button 
                onClick={handleSubmit} 
                className="w-full" 
                size="lg"
                disabled={items.length === 0}
              >
                Submit Request
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Payment will be collected upon delivery
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewRequest;