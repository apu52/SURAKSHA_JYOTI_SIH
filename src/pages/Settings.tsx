import { useState } from "react";
import { Settings as SettingsIcon, Users, Bell, Database, Shield, Wifi, MapPin, Smartphone } from "lucide-react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import adminSettingsImage from "@/assets/admin-settings.jpg";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: false,
    whatsapp: true
  });

  const systemSettings = [
    { 
      id: "auto_isolation", 
      name: "Automatic Supply Isolation", 
      description: "Automatically isolate electrical supply when conductor breaks are detected",
      enabled: true,
      critical: true
    },
    {
      id: "ai_detection",
      name: "AI-Powered Detection",
      description: "Use machine learning algorithms for incident detection and prediction",
      enabled: true,
      critical: true
    },
    {
      id: "real_time_monitoring", 
      name: "Real-time Monitoring",
      description: "Continuous telemetry monitoring and live status updates",
      enabled: true,
      critical: false
    },
    {
      id: "predictive_maintenance",
      name: "Predictive Maintenance Alerts",
      description: "Generate maintenance recommendations based on AI predictions",
      enabled: true,
      critical: false
    }
  ];

  const users = [
    { id: "1", name: "Rajesh Kumar", role: "Field Technician", email: "rajesh@ksebl.in", status: "active", lastLogin: "2 hours ago" },
    { id: "2", name: "Priya Nair", role: "System Administrator", email: "priya@ksebl.in", status: "active", lastLogin: "1 hour ago" },
    { id: "3", name: "Sanjay Singh", role: "Supervisor", email: "sanjay@ksebl.in", status: "active", lastLogin: "30 min ago" },
    { id: "4", name: "Dr. Amit Sharma", role: "Safety Inspector", email: "amit@ksebl.in", status: "inactive", lastLogin: "2 days ago" }
  ];

  const integrations = [
    {
      name: "KSEBL Portal Integration",
      description: "Sync with main KSEBL management system",
      status: "connected",
      lastSync: "5 min ago"
    },
    {
      name: "WhatsApp Business API", 
      description: "Send alerts and notifications via WhatsApp",
      status: "connected",
      lastSync: "1 min ago"
    },
    {
      name: "Google Maps Integration",
      description: "Navigation and location services for field teams",
      status: "connected", 
      lastSync: "Live"
    },
    {
      name: "Weather API",
      description: "Weather data for predictive risk analysis",
      status: "connected",
      lastSync: "10 min ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">System Settings</h1>
          <p className="text-muted-foreground">Configure system parameters, user access, and integrations</p>
        </div>

        {/* Hero Section */}
        <Card className="mb-8 overflow-hidden shadow-elevated hover-lift">
          <div className="relative">
            <img 
              src={adminSettingsImage} 
              alt="Administrative dashboard and system configuration interface"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
            <div className="absolute inset-0 p-6 flex items-center">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-white mb-3">
                  Administrative Control Center
                </h2>
                <p className="text-lg text-white/90 mb-4">
                  Centralized configuration management for the SurakshaJyoti electrical safety system.
                  Manage users, configure alerts, and monitor system integrations.
                </p>
                <div className="flex gap-3">
                  <Button variant="secondary" size="lg" className="hover-glow">
                    <Shield className="w-4 h-4 mr-2" />
                    Security Settings
                  </Button>
                  <Button variant="outline" size="lg" className="hover-glow border-white text-white hover:bg-white hover:text-primary">
                    <Database className="w-4 h-4 mr-2" />
                    Backup System
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="system" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* System Settings */}
          <TabsContent value="system">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SettingsIcon className="w-5 h-5 text-secondary" />
                    Core System Settings
                  </CardTitle>
                  <CardDescription>Critical system configuration options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {systemSettings.map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{setting.name}</h4>
                          {setting.critical && (
                            <Badge variant="destructive" className="text-xs">CRITICAL</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      </div>
                      <Switch 
                        checked={setting.enabled}
                        onCheckedChange={() => {}}
                        disabled={setting.critical}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-card hover-lift">
                <CardHeader>
                  <CardTitle>System Information</CardTitle>
                  <CardDescription>Current system status and configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">System Version</div>
                      <div className="font-medium">SurakshaJyoti v2.1.4</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Database Status</div>
                      <Badge variant="default" className="bg-success/10 text-success">Online</Badge>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Active Devices</div>
                      <div className="font-medium">1,247</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">System Uptime</div>
                      <div className="font-medium">99.7%</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3">Regional Coverage</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Thiruvananthapuram</span>
                        <Badge variant="outline">312 devices</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Kochi</span>
                        <Badge variant="outline">428 devices</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Kozhikode</span>
                        <Badge variant="outline">267 devices</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Thrissur</span>
                        <Badge variant="outline">240 devices</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* User Management */}
          <TabsContent value="users">
            <Card className="shadow-card hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-secondary" />
                  User Management
                </CardTitle>
                <CardDescription>Manage user accounts, roles, and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-4">
                    <Input placeholder="Search users..." className="w-64" />
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="All Roles" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="supervisor">Supervisor</SelectItem>
                        <SelectItem value="technician">Technician</SelectItem>
                        <SelectItem value="inspector">Inspector</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="hover-glow">
                    <Users className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </div>

                <div className="space-y-3">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover-glow">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                          <span className="text-sm font-medium">{user.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div>
                          <h4 className="font-medium">{user.name}</h4>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <Badge variant={user.status === 'active' ? 'default' : 'secondary'} className="mb-1">
                            {user.role}
                          </Badge>
                          <div className="text-xs text-muted-foreground">Last login: {user.lastLogin}</div>
                        </div>
                        <Button size="sm" variant="outline" className="hover-glow">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-secondary" />
                    Notification Channels
                  </CardTitle>
                  <CardDescription>Configure alert delivery methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <Bell className="w-4 h-4" />
                      <div>
                        <div className="font-medium">Email Notifications</div>
                        <div className="text-sm text-muted-foreground">Send alerts via email</div>
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-4 h-4" />
                      <div>
                        <div className="font-medium">SMS Alerts</div>
                        <div className="text-sm text-muted-foreground">Critical alerts via SMS</div>
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.sms}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, sms: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <Bell className="w-4 h-4" />
                      <div>
                        <div className="font-medium">Push Notifications</div>
                        <div className="text-sm text-muted-foreground">Browser push notifications</div>
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-4 h-4" />
                      <div>
                        <div className="font-medium">WhatsApp Integration</div>
                        <div className="text-sm text-muted-foreground">Alerts via WhatsApp Business</div>
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.whatsapp}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, whatsapp: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card hover-lift">
                <CardHeader>
                  <CardTitle>Alert Thresholds</CardTitle>
                  <CardDescription>Configure when alerts are triggered</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">AI Confidence Threshold (%)</label>
                    <Input type="number" defaultValue="85" min="0" max="100" />
                    <p className="text-xs text-muted-foreground mt-1">Minimum AI confidence to trigger alerts</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Battery Low Warning (%)</label>
                    <Input type="number" defaultValue="25" min="0" max="100" />
                    <p className="text-xs text-muted-foreground mt-1">Battery level to send low battery warning</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Response Time SLA (minutes)</label>
                    <Input type="number" defaultValue="15" min="1" max="60" />
                    <p className="text-xs text-muted-foreground mt-1">Maximum response time for critical incidents</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Device Offline Threshold (minutes)</label>
                    <Input type="number" defaultValue="10" min="1" max="30" />
                    <p className="text-xs text-muted-foreground mt-1">Time before marking device as offline</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations">
            <Card className="shadow-card hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="w-5 h-5 text-secondary" />
                  System Integrations
                </CardTitle>
                <CardDescription>Manage external service connections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {integrations.map((integration, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover-glow">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${
                        integration.status === 'connected' ? 'bg-success pulse-glow' : 'bg-destructive'
                      }`} />
                      <div>
                        <h4 className="font-medium">{integration.name}</h4>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={integration.status === 'connected' ? 'default' : 'destructive'}
                        className={integration.status === 'connected' ? 'bg-success/10 text-success' : ''}
                      >
                        {integration.status}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        Last sync: {integration.lastSync}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-secondary" />
                    Security Configuration
                  </CardTitle>
                  <CardDescription>System security and access control</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div>
                      <div className="font-medium">Two-Factor Authentication</div>
                      <div className="text-sm text-muted-foreground">Require 2FA for admin users</div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div>
                      <div className="font-medium">Session Timeout</div>
                      <div className="text-sm text-muted-foreground">Auto-logout after inactivity</div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div>
                      <div className="font-medium">Audit Logging</div>
                      <div className="text-sm text-muted-foreground">Log all system activities</div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div>
                      <div className="font-medium">IP Whitelist</div>
                      <div className="text-sm text-muted-foreground">Restrict access to specific IPs</div>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card hover-lift">
                <CardHeader>
                  <CardTitle>System Backup</CardTitle>
                  <CardDescription>Data backup and recovery settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span>Last Backup</span>
                      <Badge variant="default" className="bg-success/10 text-success">Today 3:00 AM</Badge>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Backup Frequency</span>
                      <span className="font-medium">Daily</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span>Retention Period</span>
                      <span className="font-medium">90 days</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 hover-glow">
                      <Database className="w-4 h-4 mr-2" />
                      Backup Now
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 hover-glow">
                      Restore Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;