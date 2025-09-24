import { useState, useEffect } from "react";
import { MapPin, AlertTriangle, Battery, Wifi, ThermometerSun, Zap, Clock, Navigation, Filter, Info } from "lucide-react";
import gridMapImage from "@/assets/monitoring-dashboard.jpg";
import Header from "@/components/Header";
import StatusBadge from "@/components/StatusBadge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface DeviceData {
  id: string;
  poleId: string;
  location: string;
  coordinates: { lat: number; lng: number };
  status: "healthy" | "warning" | "critical" | "offline";
  lastUpdate: string;
  batteryLevel: number;
  solarCharging: boolean;
  temperature: number;
  current: number;
  voltage: number;
  vibration: number;
  aiConfidence?: number;
  alertType?: string;
  incidentDetails?: string;
}

const mockLiveData: DeviceData[] = [
  {
    id: "KL-001",
    poleId: "KL-001-TVM",
    location: "Thiruvananthapuram - Medical College Junction",
    coordinates: { lat: 8.5241, lng: 76.9366 },
    status: "healthy",
    lastUpdate: "1 min ago",
    batteryLevel: 89,
    solarCharging: true,
    temperature: 28.5,
    current: 12.4,
    voltage: 230.2,
    vibration: 0.02
  },
  {
    id: "KL-003",
    poleId: "KL-003-KCH",
    location: "Kochi - MG Road",
    coordinates: { lat: 9.9312, lng: 76.2673 },
    status: "critical",
    lastUpdate: "Just now",
    batteryLevel: 67,
    solarCharging: false,
    temperature: 31.2,
    current: 0.1,
    voltage: 45.3,
    vibration: 2.8,
    aiConfidence: 94,
    alertType: "Conductor Break",
    incidentDetails: "Sudden voltage drop and high vibration detected. Possible conductor snap at height 4.2m."
  },
  {
    id: "KL-007",
    poleId: "KL-007-KLM",
    location: "Kozhikode - Calicut Beach Road",
    coordinates: { lat: 11.2588, lng: 75.7804 },
    status: "warning",
    lastUpdate: "3 min ago",
    batteryLevel: 23,
    solarCharging: false,
    temperature: 34.7,
    current: 11.8,
    voltage: 218.9,
    vibration: 0.45,
    alertType: "Low Battery",
    incidentDetails: "Battery level critically low. Solar panel may be obstructed or damaged."
  },
  {
    id: "KL-012",
    poleId: "KL-012-TSR",
    location: "Thrissur - Swaraj Round",
    coordinates: { lat: 10.5276, lng: 76.2144 },
    status: "warning",
    lastUpdate: "5 min ago",
    batteryLevel: 78,
    solarCharging: true,
    temperature: 29.1,
    current: 13.2,
    voltage: 235.7,
    vibration: 0.8,
    alertType: "Abnormal Vibration",
    incidentDetails: "Elevated vibration levels detected. Possible loose connection or wind damage."
  },
  {
    id: "KL-018",
    poleId: "KL-018-ALP",
    location: "Alappuzha - Lighthouse",
    coordinates: { lat: 9.4981, lng: 76.3388 },
    status: "healthy",
    lastUpdate: "2 min ago",
    batteryLevel: 82,
    solarCharging: true,
    temperature: 27.9,
    current: 12.9,
    voltage: 229.8,
    vibration: 0.05
  },
  {
    id: "KL-021",
    poleId: "KL-021-KNR",
    location: "Kannur - Payyambalam Beach",
    coordinates: { lat: 11.8745, lng: 75.3704 },
    status: "offline",
    lastUpdate: "10 min ago",
    batteryLevel: 0,
    solarCharging: false,
    temperature: 0,
    current: 0,
    voltage: 0,
    vibration: 0
  },
  {
    id: "KL-025",
    poleId: "KL-025-PTA",
    location: "Pathanamthitta - Sabarimala Road",
    coordinates: { lat: 9.2646, lng: 76.7832 },
    status: "healthy",
    lastUpdate: "4 min ago",
    batteryLevel: 91,
    solarCharging: true,
    temperature: 26.7,
    current: 13.5,
    voltage: 232.1,
    vibration: 0.03
  },
  {
    id: "KL-030",
    poleId: "KL-030-KTM",
    location: "Kottayam - Kumarakom",
    coordinates: { lat: 9.6174, lng: 76.4310 },
    status: "warning",
    lastUpdate: "6 min ago",
    batteryLevel: 56,
    solarCharging: false,
    temperature: 32.1,
    current: 10.2,
    voltage: 220.5,
    vibration: 1.2,
    alertType: "High Temperature",
    incidentDetails: "Temperature exceeds safe threshold. Check cooling system."
  }
];

const LiveData = () => {
  const [selectedDevice, setSelectedDevice] = useState<DeviceData | null>(null);
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    if (!realTimeUpdates) return;
    
    const interval = setInterval(() => {
      // This would update with real WebSocket data in production
      console.log("Fetching live updates...");
    }, 2000);

    return () => clearInterval(interval);
  }, [realTimeUpdates]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "text-success";
      case "warning": return "text-warning";
      case "critical": return "text-destructive";
      case "offline": return "text-offline";
      default: return "text-muted-foreground";
    }
  };

  const criticalDevices = mockLiveData.filter(d => d.status === "critical");
  const warningDevices = mockLiveData.filter(d => d.status === "warning");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Live Data Monitoring</h1>
            <p className="text-muted-foreground">Real-time device telemetry and incident tracking across Kerala Grid</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1"><Filter className="w-4 h-4" /> Quick Filter</Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1"><Info className="w-4 h-4" /> Legend</Button>
          </div>
        </div>

        {/* Emergency Alerts */}
        {criticalDevices.length > 0 && (
          <Card className="mb-8 border-destructive/50 bg-destructive/5 hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="w-5 h-5 pulse-glow" />
                CRITICAL ALERTS - Immediate Action Required
              </CardTitle>
              <CardDescription>
                {criticalDevices.length} critical incident{criticalDevices.length !== 1 ? 's' : ''} detected
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {criticalDevices.map((device) => (
                <div key={device.id} className="p-4 rounded-lg bg-card border border-destructive/30 hover-glow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <StatusBadge status="critical">{device.poleId}</StatusBadge>
                        <Badge variant="secondary" className="text-xs">
                          AI Confidence: {device.aiConfidence}%
                        </Badge>
                      </div>
                      <h4 className="font-semibold">{device.alertType}</h4>
                      <p className="text-sm text-muted-foreground">{device.location}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="destructive" className="hover-glow">
                        Isolate Supply
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setSelectedDevice(device)}>
                        Investigate
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm bg-destructive/10 p-3 rounded border border-destructive/20">
                    <strong>Details:</strong> {device.incidentDetails}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {device.lastUpdate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Navigation className="w-3 h-3" />
                      {device.coordinates.lat.toFixed(4)}, {device.coordinates.lng.toFixed(4)}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Device Status Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Device Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <Card className="shadow-card">
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <Zap className="w-6 h-6 text-success mb-2" />
                  <div className="text-xl font-bold">{mockLiveData.filter(d => d.status === 'healthy').length}</div>
                  <div className="text-xs text-muted-foreground">Healthy Devices</div>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <AlertTriangle className="w-6 h-6 text-warning mb-2" />
                  <div className="text-xl font-bold">{mockLiveData.filter(d => d.status === 'warning').length}</div>
                  <div className="text-xs text-muted-foreground">Warnings</div>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <AlertTriangle className="w-6 h-6 text-destructive mb-2" />
                  <div className="text-xl font-bold">{mockLiveData.filter(d => d.status === 'critical').length}</div>
                  <div className="text-xs text-muted-foreground">Critical</div>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <Wifi className="w-6 h-6 text-offline mb-2" />
                  <div className="text-xl font-bold">{mockLiveData.filter(d => d.status === 'offline').length}</div>
                  <div className="text-xs text-muted-foreground">Offline</div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-card hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-secondary" />
                  Device Locations & Status
                </CardTitle>
                <CardDescription>Click on any device for detailed telemetry</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Simulated Map with Device Markers and Map Image */}
                <div className="relative rounded-lg h-80 mb-6 overflow-hidden border border-border">
                  <img src={gridMapImage} alt="Kerala Grid Map" className="absolute inset-0 w-full h-full object-cover opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />

                  {/* Legend */}
                  <div className="absolute top-4 right-4 bg-card/90 backdrop-blur rounded-lg p-3 border border-border shadow-lg">
                    <div className="font-bold text-xs mb-2">Legend</div>
                    <div className="flex flex-col gap-1 text-xs">
                      <div className="flex items-center gap-2"><div className="w-3 h-3 bg-success rounded-full" /> Healthy</div>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 bg-warning rounded-full" /> Warning</div>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 bg-destructive rounded-full" /> Critical</div>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 bg-offline rounded-full" /> Offline</div>
                    </div>
                  </div>

                  {mockLiveData.map((device, index) => (
                    <div
                      key={device.id}
                      className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-all duration-200"
                      style={{
                        left: `${18 + index * 12}%`,
                        top: `${22 + (index % 4) * 18}%`,
                      }}
                      onClick={() => setSelectedDevice(device)}
                    >
                      <div className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white shadow-lg ${
                        device.status === 'healthy' ? 'bg-success' :
                        device.status === 'warning' ? 'bg-warning' :
                        device.status === 'critical' ? 'bg-destructive marker-bounce' : 'bg-offline'
                      }`}>
                        {device.status === 'critical' ? <AlertTriangle className="w-5 h-5" /> :
                         device.status === 'warning' ? <AlertTriangle className="w-4 h-4" /> :
                         device.status === 'offline' ? <Wifi className="w-4 h-4" /> :
                         <Zap className="w-4 h-4" />}
                      </div>

                      {/* Device Info Popup */}
                      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg p-3 shadow-lg min-w-48 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="text-sm">
                          <div className="font-semibold mb-1">{device.poleId}</div>
                          <div className="text-xs text-muted-foreground mb-2">{device.location}</div>
                          <div className="flex items-center justify-between text-xs">
                            <span>Battery: {device.batteryLevel}%</span>
                            <StatusBadge status={device.status} className="text-xs">
                              {device.status.toUpperCase()}
                            </StatusBadge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur rounded-lg p-3 border border-border">
                    <div className="text-xs text-muted-foreground">Kerala Electrical Grid</div>
                    <div className="text-sm font-medium">Live Device Network</div>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-2 h-2 bg-success rounded-full pulse-glow" />
                      <span className="text-xs">Real-time updates active</span>
                    </div>
                  </div>
                </div>

                {/* Device List */}
                <div className="space-y-3">
                  {mockLiveData.map((device) => (
                    <div 
                      key={device.id} 
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover-glow ${
                        selectedDevice?.id === device.id ? 'border-secondary bg-secondary/5' : 'border-border'
                      }`}
                      onClick={() => setSelectedDevice(device)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <StatusBadge status={device.status}>{device.poleId}</StatusBadge>
                          <div>
                            <div className="font-medium">{device.location}</div>
                            <div className="text-sm text-muted-foreground">
                              Last update: {device.lastUpdate}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-1">
                            <Battery className="w-4 h-4" />
                            <span className="text-sm">{device.batteryLevel}%</span>
                          </div>
                          <div className={`text-xs ${getStatusColor(device.status)}`}> 
                            {device.alertType || "Normal Operation"}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Device Details Panel */}
          <div className="space-y-6">
            {selectedDevice ? (
              <>
                {/* Device Info */}
                <Card className="shadow-card hover-lift">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{selectedDevice.poleId}</span>
                      <StatusBadge status={selectedDevice.status}>
                        {selectedDevice.status.toUpperCase()}
                      </StatusBadge>
                    </CardTitle>
                    <CardDescription>{selectedDevice.location}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Battery Level</div>
                        <div className="flex items-center gap-2">
                          <Progress value={selectedDevice.batteryLevel} className="flex-1" />
                          <span className="text-xs">{selectedDevice.batteryLevel}%</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Solar Charging</div>
                        <div className={`flex items-center gap-1 ${selectedDevice.solarCharging ? 'text-success' : 'text-muted-foreground'}`}> 
                          <ThermometerSun className="w-4 h-4" />
                          <span className="text-sm">{selectedDevice.solarCharging ? 'Active' : 'Inactive'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Temperature</div>
                        <div className="font-medium">{selectedDevice.temperature}°C</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Last Update</div>
                        <div className="font-medium">{selectedDevice.lastUpdate}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Current (A)</div>
                        <div className="font-medium">{selectedDevice.current}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Voltage (V)</div>
                        <div className="font-medium">{selectedDevice.voltage}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Vibration (g)</div>
                        <div className={`font-medium ${selectedDevice.vibration > 1 ? 'text-warning' : ''}`}>{selectedDevice.vibration}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Status</div>
                        <StatusBadge status={selectedDevice.status} className="text-xs">
                          {selectedDevice.status.toUpperCase()}
                        </StatusBadge>
                      </div>
                    </div>

                    {selectedDevice.alertType && (
                      <div className="p-3 bg-warning/10 border border-warning/30 rounded">
                        <div className="font-medium text-warning mb-1">{selectedDevice.alertType}</div>
                        <div className="text-xs text-muted-foreground">{selectedDevice.incidentDetails}</div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Live Telemetry */}
                <Card className="shadow-card hover-lift">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-secondary" />
                      Live Telemetry
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                        <span className="text-sm text-muted-foreground">Current (A)</span>
                        <span className="font-mono font-medium">{selectedDevice.current}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                        <span className="text-sm text-muted-foreground">Voltage (V)</span>
                        <span className="font-mono font-medium">{selectedDevice.voltage}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                        <span className="text-sm text-muted-foreground">Vibration (g)</span>
                        <span className={`font-mono font-medium ${selectedDevice.vibration > 1 ? 'text-warning' : ''}`}>{selectedDevice.vibration}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 hover-glow">
                        View Charts
                      </Button>
                      <Button size="sm" variant="outline" className="hover-glow">
                        Export Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="shadow-card">
                <CardContent className="p-8 text-center">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">Select a Device</h3>
                  <p className="text-sm text-muted-foreground">
                    Click on any device marker or list item to view detailed telemetry and status information.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Prevention Guidelines */}
            {warningDevices.length > 0 && (
              <Card className="shadow-card border-warning/30 bg-warning/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-warning text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    Prevention Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>• Immediate inspection recommended for devices showing abnormal readings</p>
                  <p>• Ensure solar panels are clean and unobstructed</p>
                  <p>• Check physical connections and mounting stability</p>
                  <p>• Report any visible damage to poles or equipment</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveData;