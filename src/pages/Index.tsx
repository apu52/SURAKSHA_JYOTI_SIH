import { Shield, Zap, MapPin, Users, AlertTriangle, Battery, TrendingUp, ArrowRight, Play, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import StatsCounter from "@/components/StatsCounter";
import LiveMap from "@/components/LiveMap";
import Header from "@/components/Header";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-main.jpg";
import fieldOperationsImage from "@/assets/field-operations.jpg";
import aiAnalyticsImage from "@/assets/ai-analytics.jpg";

const Index = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Detection",
      description: "AI-powered sensors detect conductor breaks within seconds",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Auto-Isolation",
      description: "Automatic supply isolation to prevent electrocution incidents",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Real-time Tracking",
      description: "Live monitoring of all electrical poles across Kerala Grid",
    },
  ];

  const benefits = [
    "Prevent electrocution deaths and accidents",
    "Reduce maintenance costs by 40%",
    "99.7% system reliability and uptime",
    "Solar-powered, eco-friendly operation",
    "Instant emergency response coordination"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="SurakshaJyoti IoT electrical safety monitoring system"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 gradient-hero opacity-90" />
        </div>
        
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Prevent <span className="text-secondary">Electrocution</span> —<br />
              Detect & Isolate Snapped Conductors
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
              Advanced IoT system with AI detection, solar power, and automatic safety isolation 
              protecting lives across Kerala's electrical grid.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="hover-glow text-lg px-8 py-4">
                <Link to="/dashboard">
                  <Play className="w-5 h-5 mr-2" />
                  View Live Dashboard
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="hover-glow text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
                <Shield className="w-5 h-5 mr-2" />
                Request Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Live System Impact</h2>
            <p className="text-muted-foreground text-lg">Real-time statistics from deployed SurakshaJyoti devices</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatsCounter value={1247} label="Poles Monitored" icon={<MapPin className="w-6 h-6" />} />
            <StatsCounter value={3} label="Active Incidents" icon={<AlertTriangle className="w-6 h-6" />} delay={200} />
            <StatsCounter value={156} label="Lives Protected" icon={<Users className="w-6 h-6" />} delay={400} />
            <StatsCounter value={98.7} label="Prevention Rate" icon={<Shield className="w-6 h-6" />} suffix="%" delay={600} />
          </div>

          {/* Mini Live Dashboard */}
          <div className="max-w-4xl mx-auto">
            <LiveMap />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How SurakshaJyoti Works</h2>
            <p className="text-muted-foreground text-lg">Three-step process to ensure electrical safety</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="text-center hover-lift">
                <Card className="p-8 border-2 shadow-card hover:shadow-glow transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 rounded-full bg-secondary/10 text-secondary">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Process Flow */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full gradient-warning flex items-center justify-center text-white font-bold text-xl mb-4">1</div>
                <h4 className="font-semibold mb-2">Sensing</h4>
                <p className="text-sm text-muted-foreground">IoT sensors monitor electrical parameters 24/7</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full gradient-primary flex items-center justify-center text-white font-bold text-xl mb-4">2</div>
                <h4 className="font-semibold mb-2">Edge AI Processing</h4>
                <p className="text-sm text-muted-foreground">AI algorithms detect anomalies and conductor breaks</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full gradient-success flex items-center justify-center text-white font-bold text-xl mb-4">3</div>
                <h4 className="font-semibold mb-2">Auto-Response</h4>
                <p className="text-sm text-muted-foreground">Automatic isolation and emergency notifications</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits & Impact */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Protecting Lives, Reducing Costs</h2>
              <p className="text-muted-foreground text-lg mb-8">
                SurakshaJyoti addresses the critical problem of electrical conductor breaks that cause 
                thousands of electrocution deaths annually in India.
              </p>
              
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 hover-glow p-2 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button asChild size="lg" className="hover-glow">
                <Link to="/dashboard">
                  Explore Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="space-y-6">
              <Card className="overflow-hidden hover-lift shadow-card">
                <img 
                  src={fieldOperationsImage} 
                  alt="Field technician using SurakshaJyoti mobile interface"
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Field Operations</h4>
                  <p className="text-sm text-muted-foreground">Mobile-first interface for field crews and technicians</p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover-lift shadow-card">
                <img 
                  src={aiAnalyticsImage} 
                  alt="AI-powered predictive analytics for electrical grid safety"
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">AI Analytics</h4>
                  <p className="text-sm text-muted-foreground">Predictive maintenance and risk analysis</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Deploy SurakshaJyoti?</h2>
            <p className="text-xl mb-8 text-white/90">
              Join KSEBL and other utility companies in preventing electrical accidents 
              with our proven IoT safety solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="hover-glow">
                <Battery className="w-5 h-5 mr-2" />
                Request Pilot Program
              </Button>
              <Button size="lg" variant="outline" className="hover-glow border-white text-white hover:bg-white hover:text-primary">
                <TrendingUp className="w-5 h-5 mr-2" />
                View Technical Specs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Zap className="h-6 w-6 text-secondary" />
            <span className="text-xl font-bold">SurakshaJyoti</span>
          </div>
          <p className="text-muted-foreground mb-4">
            Electrical Safety IoT Solution • SIH 2025 Project
          </p>
          <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-secondary transition-colors">Documentation</a>
            <a href="#" className="hover:text-secondary transition-colors">Open Source</a>
            <a href="#" className="hover:text-secondary transition-colors">Partners</a>
            <a href="#" className="hover:text-secondary transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
