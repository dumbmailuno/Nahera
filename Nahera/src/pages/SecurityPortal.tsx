import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import naheraLogo from "@/assets/nahera-logo.png";
import { Link } from "react-router-dom";
import {
  Home, Search, Shield, CheckCircle, XCircle, User,
  Building, Phone, Calendar, Users, Clock
} from "lucide-react";

// Mock verification database
const mockVerifications: Record<string, {
  valid: boolean;
  tenant: string;
  unit: string;
  period: string;
  paidDate: string;
  householdCount: number;
  phone: string;
}> = {
  "EST-7834-XKL": {
    valid: true,
    tenant: "John Doe",
    unit: "Block A, Unit 12",
    period: "January 2024",
    paidDate: "2024-01-15",
    householdCount: 3,
    phone: "+234 801 234 5678"
  },
  "EST-9921-MNP": {
    valid: true,
    tenant: "Sarah Smith",
    unit: "Block B, Unit 5",
    period: "February 2024",
    paidDate: "2024-02-14",
    householdCount: 2,
    phone: "+234 802 345 6789"
  }
};

type VerificationResult = {
  status: "idle" | "loading" | "success" | "error";
  data?: typeof mockVerifications[string];
  code?: string;
};

const SecurityPortal = () => {
  const [searchCode, setSearchCode] = useState("");
  const [result, setResult] = useState<VerificationResult>({ status: "idle" });

  const handleVerify = () => {
    if (!searchCode.trim()) return;

    setResult({ status: "loading" });

    // Simulate API call
    setTimeout(() => {
      const normalizedCode = searchCode.trim().toUpperCase();
      const verification = mockVerifications[normalizedCode];

      if (verification) {
        setResult({ status: "success", data: verification, code: normalizedCode });
      } else {
        setResult({ status: "error", code: normalizedCode });
      }
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleVerify();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* LEFT: Logo + Name + Security Badge */}
          <div className="flex items-center gap-2">
            <img
              src={naheraLogo}
              alt="NAHERA Logo"
              className="h-9 w-9 object-contain"
            />
            <span className="font-semibold text-lg">NAHERA</span>
            <Badge variant="secondary" className="ml-2 flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Security
            </Badge>
          </div>
          {/* RIGHT: Exit Button */}
          <Link to="/">
            <Button variant="ghost">Exit Portal</Button>
          </Link>

        </div>
      </nav>


      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-primary/10 mb-6">
              <Shield className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Gate Verification</h1>
            <p className="text-muted-foreground">
              Enter the receipt code to verify payment status
            </p>
          </div>

          {/* Search Box */}
          <Card className="card-shadow-lg mb-8">
            <CardContent className="p-6">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Enter receipt code (e.g., EST-7834-XKL)"
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pl-12 h-14 text-lg font-mono"
                  />
                </div>
                <Button
                  onClick={handleVerify}
                  size="lg"
                  className="h-14 px-8"
                  disabled={result.status === "loading"}
                >
                  {result.status === "loading" ? "Checking..." : "Verify"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {result.status === "success" && result.data && (
            <Card className="card-shadow-lg border-accent/50 bg-accent/5 animate-fade-in">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-accent">Payment Verified</CardTitle>
                    <CardDescription className="font-mono">{result.code}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3 p-3 bg-card rounded-lg">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Tenant</p>
                      <p className="font-medium">{result.data.tenant}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-card rounded-lg">
                    <Building className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Unit</p>
                      <p className="font-medium">{result.data.unit}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-card rounded-lg">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Period Covered</p>
                      <p className="font-medium">{result.data.period}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-card rounded-lg">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Household</p>
                      <p className="font-medium">{result.data.householdCount} members</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-card rounded-lg">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Contact</p>
                      <p className="font-medium">{result.data.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-card rounded-lg">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Paid On</p>
                      <p className="font-medium">{result.data.paidDate}</p>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-center text-accent font-medium">
                    ✓ Tenant is authorized for estate access
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {result.status === "error" && (
            <Card className="card-shadow-lg border-destructive/50 bg-destructive/5 animate-fade-in">
              <CardContent className="p-8 text-center">
                <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                  <XCircle className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold text-destructive mb-2">Not Found</h3>
                <p className="text-muted-foreground mb-4">
                  The code <code className="bg-secondary px-2 py-1 rounded">{result.code}</code> is not valid or has expired.
                </p>
                <p className="text-sm text-muted-foreground">
                  Please ask the resident to show a valid receipt or contact the admin.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Quick Tips */}
          <Card className="mt-8 card-shadow">
            <CardHeader>
              <CardTitle className="text-base">Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Receipt codes are case-insensitive (EST-7834-xkl = EST-7834-XKL)</p>
              <p>• Codes are valid for the payment period shown</p>
              <p>• Household members are covered under the tenant's payment</p>
              <p>• Contact admin for any discrepancies</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SecurityPortal;
