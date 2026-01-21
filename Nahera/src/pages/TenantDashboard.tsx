import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import naheraLogo from "@/assets/nahera-logo.png";
import { Link } from "react-router-dom";
import {
  Home, CreditCard, Users, Receipt, Plus, LogOut,
  CheckCircle, Clock, User, Briefcase, Copy, Download
} from "lucide-react";
import { toast } from "sonner";

// Mock data
const mockPayments = [
  { id: "PAY-2024-001", amount: 50000, date: "2024-01-15", status: "paid", period: "January 2024", code: "EST-7834-XKL" },
  { id: "PAY-2024-002", amount: 50000, date: "2024-02-15", status: "paid", period: "February 2024", code: "EST-9921-MNP" },
  { id: "PAY-2024-003", amount: 50000, date: "2024-03-15", status: "pending", period: "March 2024", code: null },
];

const mockHousehold = [
  { id: 1, name: "Jane Doe", type: "family", relationship: "Spouse", phone: "+234 801 234 5678" },
  { id: 2, name: "Mike Doe", type: "family", relationship: "Son", phone: "+234 802 345 6789" },
  { id: 3, name: "Grace Obi", type: "worker", role: "House Help", phone: "+234 803 456 7890" },
];

const TenantDashboard = () => {
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [memberType, setMemberType] = useState<string>("family");

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Receipt code copied to clipboard!");
  };

  const currentPayment = mockPayments.find(p => p.status === "pending");
  const paidPayments = mockPayments.filter(p => p.status === "paid");

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">

          {/* LEFT: Logo + Name */}
          <div className="flex items-center gap-2">
            <img
              src={naheraLogo}
              alt="NAHERA Logo"
              className="h-9 w-9 object-contain"
            />
            <span className="font-semibold text-lg">NAHERA</span>
          </div>

          {/* RIGHT: User Info + Logout */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">Block A, Unit 12</p>
            </div>
            <Link to="/">
              <Button variant="ghost" size="icon">
                <LogOut className="h-4 w-4" />
              </Button>
            </Link>
          </div>

        </div>
      </nav>


      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Welcome back, John</h1>
          <p className="text-muted-foreground">Manage your service charges and household members</p>
        </div>

        {/* Status Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card className="card-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Current Status</CardTitle>
              <CheckCircle className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">Active</div>
              <p className="text-xs text-muted-foreground">All payments up to date</p>
            </CardContent>
          </Card>
          <Card className="card-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Household Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockHousehold.length}</div>
              <p className="text-xs text-muted-foreground">
                {mockHousehold.filter(m => m.type === "family").length} family, {mockHousehold.filter(m => m.type === "worker").length} workers
              </p>
            </CardContent>
          </Card>
          <Card className="card-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦50,000</div>
              <p className="text-xs text-muted-foreground">Due: March 15, 2024</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="payments" className="space-y-6">
          <TabsList>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="household" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Household
            </TabsTrigger>
            <TabsTrigger value="receipts" className="flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              Receipts
            </TabsTrigger>
          </TabsList>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            {currentPayment && (
              <Card className="border-warning/50 bg-warning/5">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Pending Payment</CardTitle>
                      <CardDescription>{currentPayment.period} Service Charge</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
                      Due
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">₦{currentPayment.amount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Due: {currentPayment.date}</p>
                    </div>
                    <Button variant="accent" size="lg">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Pay Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>Your previous service charge payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paidPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <p className="font-medium">{payment.period}</p>
                          <p className="text-sm text-muted-foreground">{payment.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₦{payment.amount.toLocaleString()}</p>
                        <Badge variant="secondary" className="bg-accent/10 text-accent">Paid</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Household Tab */}
          <TabsContent value="household" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Household Members</h3>
                <p className="text-sm text-muted-foreground">Manage family and workers linked to your unit</p>
              </div>
              <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
                <DialogTrigger asChild>
                  <Button variant="accent">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Member
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Household Member</DialogTitle>
                    <DialogDescription>
                      Add a family member or worker to your household
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>Member Type</Label>
                      <Select value={memberType} onValueChange={setMemberType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="family">Family Member</SelectItem>
                          <SelectItem value="worker">Worker (Cleaner, Guard, etc.)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input placeholder="Enter full name" />
                    </div>
                    <div className="space-y-2">
                      <Label>{memberType === "family" ? "Relationship" : "Role"}</Label>
                      <Input placeholder={memberType === "family" ? "e.g., Spouse, Child" : "e.g., House Help, Driver"} />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <Input placeholder="+234 800 000 0000" />
                    </div>
                    <Button className="w-full" onClick={() => {
                      setIsAddMemberOpen(false);
                      toast.success("Member added successfully!");
                    }}>
                      Add Member
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {mockHousehold.map((member) => (
                <Card key={member.id} className="card-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center ${member.type === "family" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                        }`}>
                        {member.type === "family" ? <User className="h-6 w-6" /> : <Briefcase className="h-6 w-6" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{member.name}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {member.type === "family" ? member.relationship : member.role}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{member.phone}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Receipts Tab */}
          <TabsContent value="receipts" className="space-y-6">
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Payment Receipts</CardTitle>
                <CardDescription>Your verification codes for gate access</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paidPayments.map((payment) => (
                    <div key={payment.id} className="p-4 rounded-lg border bg-card">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-medium">{payment.period}</p>
                          <p className="text-sm text-muted-foreground">Paid on {payment.date}</p>
                        </div>
                        <Badge className="bg-accent text-accent-foreground">Verified</Badge>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                        <code className="flex-1 font-mono text-lg font-semibold">{payment.code}</code>
                        <Button variant="ghost" size="icon" onClick={() => copyCode(payment.code!)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Show this code to security at the gate for verification
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TenantDashboard;
