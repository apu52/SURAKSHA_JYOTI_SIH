import { MapPin, AlertTriangle, CheckCircle, XCircle, Wifi } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge from "./StatusBadge";

interface Device {
  id: string;
  poleId: string;
  lat: number;
  lng: number;
  status: "healthy" | "warning" | "critical" | "offline";
  lastSeen: string;
  batteryLevel: number;
}

const mockDevices: Device[] = [
  { id: "1", poleId: "KL-001", lat: 10.8505, lng: 76.2711, status: "healthy", lastSeen: "2 min ago", batteryLevel: 85 },
  { id: "2", poleId: "KL-002", lat: 10.8515, lng: 76.2721, status: "warning", lastSeen: "1 min ago", batteryLevel: 65 },
  { id: "3", poleId: "KL-003", lat: 10.8525, lng: 76.2731, status: "critical", lastSeen: "Just now", batteryLevel: 40 },
  { id: "4", poleId: "KL-004", lat: 10.8535, lng: 76.2741, status: "offline", lastSeen: "5 min ago", batteryLevel: 15 },
];

const LiveMap = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy": return <CheckCircle className="w-4 h-4" />;
      case "warning": return <AlertTriangle className="w-4 h-4" />;
      case "critical": return <XCircle className="w-4 h-4" />;
      case "offline": return <Wifi className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <Card className="p-6 shadow-card hover-lift">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <MapPin className="w-5 h-5 text-secondary" />
          Live Device Status - Kerala Grid
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-success rounded-full pulse-glow" />
          Real-time updates
        </div>
      </div>

      {/* Simulated Map Area */}
      <div className="relative bg-muted/30 rounded-lg h-64 mb-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
        
        {/* Device Markers */}
        {mockDevices.map((device, index) => (
          <div
            key={device.id}
            className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform marker-bounce`}
            style={{
              left: `${20 + index * 20}%`,
              top: `${30 + (index % 2) * 20}%`,
              animationDelay: `${index * 0.2}s`
            }}
          >
            <div className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white shadow-lg ${
              device.status === 'healthy' ? 'bg-success' :
              device.status === 'warning' ? 'bg-warning' :
              device.status === 'critical' ? 'bg-destructive' : 'bg-offline'
            }`}>
              {getStatusIcon(device.status)}
            </div>
          </div>
        ))}

        {/* Map Overlay */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-card/80 backdrop-blur rounded-lg p-3 border border-border">
            <div className="text-xs text-muted-foreground">Kerala, India</div>
            <div className="text-sm font-medium">Electrical Grid Network</div>
          </div>
        </div>
      </div>

      {/* Device List */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Active Devices</h4>
        {mockDevices.map((device) => (
          <div key={device.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover-glow">
            <div className="flex items-center gap-3">
              <StatusBadge status={device.status}>
                {device.poleId}
              </StatusBadge>
              <div>
                <div className="text-sm font-medium">{device.poleId}</div>
                <div className="text-xs text-muted-foreground">Battery: {device.batteryLevel}%</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">{device.lastSeen}</div>
              <Button size="sm" variant="ghost" className="text-xs">
                Monitor
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default LiveMap;