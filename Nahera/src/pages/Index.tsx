import { Button } from "@/components/ui/button";
import naheraLogo from "@/assets/nahera-logo.png";
import { Link } from "react-router-dom";
import { Shield, Users, CreditCard, CheckCircle, Home, Key, UserCheck } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
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

          {/* RIGHT: Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/login">
              <Button variant="hero" size="sm">Get Started</Button>
            </Link>
          </div>

        </div>
      </nav>


      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="h-4 w-4" />
              Trusted by 500+ Estates
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Secure Estate Access & <span className="text-primary">Payment Management</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Streamline service charge payments, manage household members, and ensure secure gate access verification for your estate community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button variant="hero" size="xl">
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/security">
                <Button variant="heroOutline" size="xl">
                  Security Portal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Complete estate management solution for tenants, administrators, and security personnel.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<CreditCard className="h-6 w-6" />}
              title="Easy Payments"
              description="Pay service charges online and receive instant digital receipts with unique verification codes."
            />
            <FeatureCard
              icon={<Users className="h-6 w-6" />}
              title="Household Management"
              description="Add family members and workers to your household for seamless gate access authorization."
            />
            <FeatureCard
              icon={<Key className="h-6 w-6" />}
              title="Gate Verification"
              description="Security can instantly verify payment status using receipt codes at entry points."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <StepCard number="1" title="Register" description="Sign up as a tenant with your unit details" />
            <StepCard number="2" title="Pay" description="Complete service charge payment online" />
            <StepCard number="3" title="Receive" description="Get digital receipt with unique code" />
            <StepCard number="4" title="Access" description="Show code at gate for verification" />
          </div>
        </div>
      </section>

      {/* Role Cards */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Portals for Everyone</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <RoleCard
              icon={<Users className="h-8 w-8" />}
              title="Tenants"
              description="Pay charges, manage household, view receipts"
              link="/login"
              linkText="Tenant Login"
            />
            <RoleCard
              icon={<Shield className="h-8 w-8" />}
              title="Administrators"
              description="Manage all tenants, payments, and reports"
              link="/login"
              linkText="Admin Login"
            />
            <RoleCard
              icon={<UserCheck className="h-8 w-8" />}
              title="Security"
              description="Verify payments and authorize gate access"
              link="/security"
              linkText="Security Portal"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Home className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">NAHERA</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 NAHERA. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-card p-6 rounded-xl card-shadow hover:card-shadow-lg transition-shadow duration-300 animate-fade-in">
    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
      {icon}
    </div>
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
);

const StepCard = ({ number, title, description }: { number: string; title: string; description: string }) => (
  <div className="text-center animate-fade-in">
    <div className="h-12 w-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
      {number}
    </div>
    <h3 className="font-semibold mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

const RoleCard = ({ icon, title, description, link, linkText }: { icon: React.ReactNode; title: string; description: string; link: string; linkText: string }) => (
  <div className="bg-card p-8 rounded-xl card-shadow hover:card-shadow-lg transition-all duration-300 text-center group animate-fade-in">
    <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
      {icon}
    </div>
    <h3 className="font-semibold text-xl mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm mb-6">{description}</p>
    <Link to={link}>
      <Button variant="outline" className="w-full">{linkText}</Button>
    </Link>
  </div>
);

export default Index;
