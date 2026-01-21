import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import naheraLogo from "@/assets/nahera-logo.png";
import { Link } from "react-router-dom";
import {
  Home, Users, CreditCard, Building, Search, LogOut,
  CheckCircle, AlertCircle, TrendingUp, UserCheck
} from "lucide-react";

// Mock data
const mockTenants = [
  { id: 1, name: "John Doe", unit: "Block A, Unit 12", phone: "+234 801 234 5678", status: "active", lastPayment: "Feb 2024", householdCount: 3 },
  { id: 2, name: "Sarah Smith", unit: "Block B, Unit 5", phone: "+234 802 345 6789", status: "active", lastPayment: "Feb 2024", householdCount: 2 },
  { id: 3, name: "Mike Johnson", unit: "Block A, Unit 8", phone: "+234 803 456 7890", status: "pending", lastPayment: "Jan 2024", householdCount: 4 },
  { id: 4, name: "Grace Williams", unit: "Block C, Unit 3", phone: "+234 804 567 8901", status: "overdue", lastPayment: "Dec 2023", householdCount: 1 },
];

const mockPayments = [
  { id: "PAY-001", tenant: "John Doe", amount: 50000, date: "2024-02-15", status: "paid", code: "EST-7834-XKL" },
  { id: "PAY-002", tenant: "Sarah Smith", amount: 50000, date: "2024-02-14", status: "paid", code: "EST-9921-MNP" },
  { id: "PAY-003", tenant: "Mike Johnson", amount: 50000, date: "2024-02-20", status: "pending", code: null },
  { id: "PAY-004", tenant: "Grace Williams", amount: 50000, date: "2024-02-28", status: "overdue", code: null },
];

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTenants = mockTenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.unit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
      case "paid":
        return <Badge className="bg-accent/10 text-accent border-0">Active</Badge>;
      case "pending":
        return <Badge className="bg-warning/10 text-warning border-0">Pending</Badge>;
      case "overdue":
        return <Badge className="bg-destructive/10 text-destructive border-0">Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">

          {/* LEFT: Logo + Name + Role */}
          <div className="flex items-center gap-2">
            <img
              src={naheraLogo}
              alt="NAHERA Logo"
              className="h-9 w-9 object-contain"
            />
            <span className="font-semibold text-lg">NAHERA</span>
            <Badge variant="secondary" className="ml-2">
              Admin
            </Badge>
          </div>

          {/* RIGHT: Admin Info + Logout */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">Palm Gardens Estate</p>
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
          <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage tenants, payments, and estate operations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card className="card-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Tenants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockTenants.length}</div>
              <p className="text-xs text-muted-foreground">Registered units</p>
            </CardContent>
          </Card>
          <Card className="card-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Payments</CardTitle>
              <CheckCircle className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">
                {mockTenants.filter(t => t.status === "active").length}
              </div>
              <p className="text-xs text-muted-foreground">Up to date</p>
            </CardContent>
          </Card>
          <Card className="card-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <AlertCircle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">
                {mockTenants.filter(t => t.status === "pending").length}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting payment</p>
            </CardContent>
          </Card>
          <Card className="card-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Revenue (Feb)</CardTitle>
              <TrendingUp className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦100K</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tenants" className="space-y-6">
          <TabsList>
            <TabsTrigger value="tenants" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Tenants
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="household" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              All Members
            </TabsTrigger>
          </TabsList>

          {/* Tenants Tab */}
          <TabsContent value="tenants" className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tenants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Card className="card-shadow">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Household</TableHead>
                      <TableHead>Last Payment</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTenants.map((tenant) => (
                      <TableRow key={tenant.id}>
                        <TableCell className="font-medium">{tenant.name}</TableCell>
                        <TableCell>{tenant.unit}</TableCell>
                        <TableCell>{tenant.phone}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{tenant.householdCount} members</Badge>
                        </TableCell>
                        <TableCell>{tenant.lastPayment}</TableCell>
                        <TableCell>{getStatusBadge(tenant.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-4">
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
                <CardDescription>All service charge transactions</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Verification Code</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-mono text-sm">{payment.id}</TableCell>
                        <TableCell>{payment.tenant}</TableCell>
                        <TableCell>₦{payment.amount.toLocaleString()}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>
                          {payment.code ? (
                            <code className="text-sm bg-secondary px-2 py-1 rounded">{payment.code}</code>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* All Members Tab */}
          <TabsContent value="household" className="space-y-4">
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>All Household Members</CardTitle>
                <CardDescription>Family members and workers across all units</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Linked To</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Phone</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Jane Doe</TableCell>
                      <TableCell><Badge variant="secondary">Family</Badge></TableCell>
                      <TableCell>John Doe</TableCell>
                      <TableCell>Block A, Unit 12</TableCell>
                      <TableCell>+234 801 234 5678</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Grace Obi</TableCell>
                      <TableCell><Badge className="bg-accent/10 text-accent border-0">Worker</Badge></TableCell>
                      <TableCell>John Doe</TableCell>
                      <TableCell>Block A, Unit 12</TableCell>
                      <TableCell>+234 803 456 7890</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Emma Smith</TableCell>
                      <TableCell><Badge variant="secondary">Family</Badge></TableCell>
                      <TableCell>Sarah Smith</TableCell>
                      <TableCell>Block B, Unit 5</TableCell>
                      <TableCell>+234 805 678 9012</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
