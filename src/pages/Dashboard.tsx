import { AlertTriangle, Battery, MapPin, Shield, Zap, TrendingUp, Users, Clock } from "lucide-react";
import Header from "@/components/Header";
import LiveMap from "@/components/LiveMap";
import StatsCounter from "@/components/StatsCounter";
import StatusBadge from "@/components/StatusBadge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import monitoringImage from "@/assets/monitoring-dashboard.jpg";

const Dashboard = () => {
  const alerts = [
    { id: 1, type: "critical", message: "Conductor break detected at Pole KL-003", time: "2 min ago", confidence: 94 },
    { id: 2, type: "warning", message: "Low battery warning at Pole KL-007", time: "5 min ago", confidence: 87 },
    { id: 3, type: "warning", message: "Abnormal vibration at Pole KL-012", time: "8 min ago", confidence: 76 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Stats Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Live Monitoring Dashboard</h1>
          <p className="text-muted-foreground">Real-time electrical safety monitoring across Kerala Grid</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCounter value={1247} label="Devices Online" icon={<Zap className="w-6 h-6" />} />
          <StatsCounter value={3} label="Active Incidents" icon={<AlertTriangle className="w-6 h-6" />} delay={200} />
          <StatsCounter value={99.7} label="System Uptime" icon={<Shield className="w-6 h-6" />} suffix="%" delay={400} />
          <StatsCounter value={156} label="Lives Protected" icon={<Users className="w-6 h-6" />} delay={600} />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Map with Map Image and Legend */}
          <div className="lg:col-span-2">
            <div className="relative rounded-lg h-80 mb-6 overflow-hidden border border-border shadow-card">
              <img src={monitoringImage} alt="Kerala Grid Map" className="absolute inset-0 w-full h-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
              <div className="absolute top-4 right-4 bg-card/90 backdrop-blur rounded-lg p-3 border border-border shadow-lg">
                <div className="font-bold text-xs mb-2">Legend</div>
                <div className="flex flex-col gap-1 text-xs">
                  <div className="flex items-center gap-2"><span className="w-3 h-3 bg-success rounded-full" /> Healthy</div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 bg-warning rounded-full" /> Warning</div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 bg-destructive rounded-full" /> Critical</div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 bg-offline rounded-full" /> Offline</div>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur rounded-lg p-3 border border-border">
                <div className="text-xs text-muted-foreground">Kerala Electrical Grid</div>
                <div className="text-sm font-medium">Live Device Network</div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="w-2 h-2 bg-success rounded-full pulse-glow" />
                  <span className="text-xs">Real-time updates active</span>
                </div>
              </div>
              {/* Overlay LiveMap component for interactivity if needed */}
              <div className="absolute inset-0">
                <LiveMap />
              </div>
            </div>
          </div>

          {/* Alerts Panel */}
          <div className="space-y-6">
            {/* Real-time Alerts */}
            <Card className="shadow-card hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  Live Alerts
                </CardTitle>
                <CardDescription>Critical incidents requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="p-4 rounded-lg border border-border hover-glow">
                    <div className="flex items-start justify-between mb-2">
                      <StatusBadge status={alert.type as any}>
                        {alert.type.toUpperCase()}
                      </StatusBadge>
                      <Badge variant="secondary" className="text-xs">
                        {alert.confidence}% confidence
                      </Badge>
                    </div>
                    <p className="text-sm mb-2">{alert.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {alert.time}
                      </span>
                      <Button size="sm" variant="outline" className="hover-glow">
                        Investigate
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* System Health */}
            <Card className="shadow-card hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Battery className="w-5 h-5 text-success" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Average Battery Level</span>
                  <Badge variant="secondary" className="bg-success/10 text-success">78%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Solar Charging</span>
                  <Badge variant="secondary" className="bg-warning/10 text-warning">Active</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Network Coverage</span>
                  <Badge variant="secondary" className="bg-success/10 text-success">99.2%</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Monitoring Image Section */}
        <div className="mt-8">
          <Card className="overflow-hidden shadow-card hover-lift">
            <div className="relative">
              <img 
                src={monitoringImage} 
                alt="Advanced monitoring dashboard showing real-time electrical grid data"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold text-white mb-2">Advanced Analytics Platform</h3>
                <p className="text-white/90 mb-4">Real-time monitoring, predictive maintenance, and automated safety responses</p>
                <Button variant="secondary" className="hover-glow">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;