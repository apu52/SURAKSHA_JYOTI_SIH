import { useState } from "react";
import { Search, Filter, Download, Settings, Battery, Wifi, AlertTriangle, CheckCircle, MoreVertical } from "lucide-react";
import Header from "@/components/Header";
import StatusBadge from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Device {
  id: string;
  poleId: string;
  region: string;
  firmware: string;
  lastSeen: string;
  batteryLevel: number;
  status: "healthy" | "warning" | "critical" | "offline";
  lastEvent: string;
  location: string;
  installDate: string;
}

const mockDevices: Device[] = [
  {
    id: "1",
    poleId: "KL-001-TVM",
    region: "Thiruvananthapuram",
    firmware: "v2.1.4",
    lastSeen: "2 min ago",
    batteryLevel: 89,
    status: "healthy",
    lastEvent: "Normal operation",
    location: "Medical College Junction",
    installDate: "2024-01-15"
  },
  {
    id: "2", 
    poleId: "KL-002-KCH",
    region: "Kochi",
    firmware: "v2.1.3",
    lastSeen: "1 min ago",
    batteryLevel: 72,
    status: "warning",
    lastEvent: "Low battery warning",
    location: "MG Road",
    installDate: "2024-01-20"
  },
  {
    id: "3",
    poleId: "KL-003-KCH", 
    region: "Kochi",
    firmware: "v2.1.4",
    lastSeen: "Just now",
    batteryLevel: 45,
    status: "critical",
    lastEvent: "Conductor break detected",
    location: "Ernakulam South",
    installDate: "2024-02-01"
  },
  {
    id: "4",
    poleId: "KL-004-KLM",
    region: "Kozhikode", 
    firmware: "v2.0.8",
    lastSeen: "5 min ago",
    batteryLevel: 15,
    status: "offline",
    lastEvent: "Connection timeout",
    location: "Calicut Beach Road",
    installDate: "2023-12-10"
  },
  {
    id: "5",
    poleId: "KL-005-TSR",
    region: "Thrissur",
    firmware: "v2.1.4", 
    lastSeen: "3 min ago",
    batteryLevel: 91,
    status: "healthy",
    lastEvent: "Normal operation",
    location: "Swaraj Round",
    installDate: "2024-02-15"
  }
];

const DeviceManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredDevices = mockDevices.filter(device => {
    const matchesSearch = device.poleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.region.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || device.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy": return <CheckCircle className="w-4 h-4 text-success" />;
      case "warning": return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "critical": return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case "offline": return <Wifi className="w-4 h-4 text-offline" />;
      default: return null;
    }
  };

  const toggleDeviceSelection = (deviceId: string) => {
    setSelectedDevices(prev =>
      prev.includes(deviceId)
        ? prev.filter(id => id !== deviceId)
        : [...prev, deviceId]
    );
  };

  const selectAllDevices = () => {
    if (selectedDevices.length === filteredDevices.length) {
      setSelectedDevices([]);
    } else {
      setSelectedDevices(filteredDevices.map(d => d.id));
    }
  };

  const statusCounts = mockDevices.reduce((acc, device) => {
    acc[device.status] = (acc[device.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Device Management</h1>
          <p className="text-muted-foreground">Manage and monitor all SurakshaJyoti IoT devices</p>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="hover-lift shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Devices</p>
                  <p className="text-2xl font-bold">{mockDevices.length}</p>
                </div>
                <Settings className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-lift shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Healthy</p>
                  <p className="text-2xl font-bold text-success">{statusCounts.healthy || 0}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Warnings</p>
                  <p className="text-2xl font-bold text-warning">{statusCounts.warning || 0}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Critical</p>
                  <p className="text-2xl font-bold text-destructive">{statusCounts.critical || 0}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card className="mb-6 shadow-card">
          <CardHeader>
            <CardTitle>Device Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by pole ID, location, or region..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="all">All Status</option>
                <option value="healthy">Healthy</option>
                <option value="warning">Warning</option>
                <option value="critical">Critical</option>
                <option value="offline">Offline</option>
              </select>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" className="hover-glow">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" className="hover-glow">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedDevices.length > 0 && (
              <div className="mb-4 p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {selectedDevices.length} device{selectedDevices.length !== 1 ? 's' : ''} selected
                  </span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="hover-glow">
                      Update Firmware
                    </Button>
                    <Button size="sm" variant="outline" className="hover-glow">
                      Reboot Selected
                    </Button>
                    <Button size="sm" variant="outline" className="hover-glow">
                      Export Data
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Device Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        checked={selectedDevices.length === filteredDevices.length && filteredDevices.length > 0}
                        onChange={selectAllDevices}
                        className="rounded border-border"
                      />
                    </TableHead>
                    <TableHead>Device ID</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Battery</TableHead>
                    <TableHead>Firmware</TableHead>
                    <TableHead>Last Seen</TableHead>
                    <TableHead>Last Event</TableHead>
                    <TableHead className="w-12">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDevices.map((device) => (
                    <TableRow key={device.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedDevices.includes(device.id)}
                          onChange={() => toggleDeviceSelection(device.id)}
                          className="rounded border-border"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(device.status)}
                          <span className="font-mono font-medium">{device.poleId}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{device.location}</div>
                          <div className="text-xs text-muted-foreground">Installed: {device.installDate}</div>
                        </div>
                      </TableCell>
                      <TableCell>{device.region}</TableCell>
                      <TableCell>
                        <StatusBadge status={device.status}>
                          {device.status.toUpperCase()}
                        </StatusBadge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Battery className="w-4 h-4" />
                          <span className={`text-sm ${device.batteryLevel < 30 ? 'text-warning' : ''}`}>
                            {device.batteryLevel}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={device.firmware.startsWith('v2.1') ? 'default' : 'secondary'}>
                          {device.firmware}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{device.lastSeen}</span>
                      </TableCell>
                      <TableCell>
                        <span className={`text-sm ${
                          device.lastEvent.includes('break') || device.lastEvent.includes('timeout') ? 'text-destructive' :
                          device.lastEvent.includes('warning') ? 'text-warning' : 'text-muted-foreground'
                        }`}>
                          {device.lastEvent}
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="hover-glow">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>View Telemetry</DropdownMenuItem>
                            <DropdownMenuItem>Update Firmware</DropdownMenuItem>
                            <DropdownMenuItem>Reboot Device</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Isolate</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredDevices.length === 0 && (
              <div className="text-center py-8">
                <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">No devices found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search terms or filters
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeviceManagement;