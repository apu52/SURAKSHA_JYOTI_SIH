import { useState } from "react";
import { AlertTriangle, Clock, User, MapPin, FileText, Phone, CheckCircle, XCircle, Eye } from "lucide-react";
import Header from "@/components/Header";
import StatusBadge from "@/components/StatusBadge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import emergencyResponseImage from "@/assets/emergency-response.jpg";

interface Incident {
  id: string;
  poleId: string;
  type: "conductor_break" | "equipment_failure" | "maintenance_required" | "citizen_report";
  severity: "critical" | "high" | "medium" | "low";
  status: "new" | "acknowledged" | "investigating" | "assigned" | "in_progress" | "resolved" | "closed";
  location: string;
  description: string;
  aiConfidence?: number;
  reportedBy: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  evidence?: string[];
  actions: IncidentAction[];
}

interface IncidentAction {
  id: string;
  type: "acknowledged" | "assigned" | "commented" | "status_changed" | "resolved";
  user: string;
  timestamp: string;
  details: string;
}

const mockIncidents: Incident[] = [
  {
    id: "INC-2024-001",
    poleId: "KL-003-KCH",
    type: "conductor_break", 
    severity: "critical",
    status: "investigating",
    location: "MG Road, Kochi - Ernakulam",
    description: "AI system detected sudden voltage drop and high vibration patterns consistent with conductor failure. Supply automatically isolated.",
    aiConfidence: 94,
    reportedBy: "AI Detection System",
    assignedTo: "Rajesh Kumar",
    createdAt: "2024-01-15 14:23:45",
    updatedAt: "2024-01-15 14:35:12",
    evidence: ["voltage_graph.png", "vibration_data.csv", "field_photo_1.jpg"],
    actions: [
      { id: "1", type: "acknowledged", user: "Control Room", timestamp: "14:24:15", details: "Incident acknowledged, dispatching field team" },
      { id: "2", type: "assigned", user: "Supervisor", timestamp: "14:28:30", details: "Assigned to Rajesh Kumar (Team Lead)" },
      { id: "3", type: "commented", user: "Rajesh Kumar", timestamp: "14:35:12", details: "En route to location, ETA 15 minutes" }
    ]
  },
  {
    id: "INC-2024-002",
    poleId: "KL-007-KLM",
    type: "equipment_failure",
    severity: "high", 
    status: "assigned",
    location: "Calicut Beach Road, Kozhikode",
    description: "Battery backup system failure detected. Solar charging inactive for 6+ hours.",
    reportedBy: "Monitoring System",
    assignedTo: "Sanjay Nair",
    createdAt: "2024-01-15 12:15:22",
    updatedAt: "2024-01-15 13:45:18",
    evidence: ["battery_status.json", "solar_panel_image.jpg"],
    actions: [
      { id: "1", type: "acknowledged", user: "Control Room", timestamp: "12:16:00", details: "Battery failure confirmed" },
      { id: "2", type: "assigned", user: "Supervisor", timestamp: "12:45:30", details: "Assigned to Sanjay for battery replacement" }
    ]
  },
  {
    id: "INC-2024-003",
    poleId: "KL-001-TVM",
    type: "citizen_report",
    severity: "medium",
    status: "new",
    location: "Medical College Junction, Thiruvananthapuram", 
    description: "Citizen reported sparking from electrical pole during evening hours. Photo evidence attached.",
    reportedBy: "Citizen: Priya Nair",
    createdAt: "2024-01-15 19:30:45",
    updatedAt: "2024-01-15 19:30:45",
    evidence: ["citizen_photo_1.jpg", "citizen_photo_2.jpg"],
    actions: []
  }
];

const IncidentManagement = () => {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(mockIncidents[0]);
  const [activeTab, setActiveTab] = useState("active");
  const [newComment, setNewComment] = useState("");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "conductor_break": return <AlertTriangle className="w-4 h-4" />;
      case "equipment_failure": return <XCircle className="w-4 h-4" />;
      case "maintenance_required": return <Clock className="w-4 h-4" />;
      case "citizen_report": return <User className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const addComment = () => {
    if (!newComment.trim() || !selectedIncident) return;
    
    const newAction: IncidentAction = {
      id: Date.now().toString(),
      type: "commented",
      user: "Current User",
      timestamp: new Date().toLocaleTimeString(),
      details: newComment
    };
    
    // In a real app, this would update the backend
    setNewComment("");
  };

  const filteredIncidents = mockIncidents.filter(incident => {
    if (activeTab === "active") return ["new", "acknowledged", "investigating", "assigned", "in_progress"].includes(incident.status);
    if (activeTab === "resolved") return ["resolved", "closed"].includes(incident.status);
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Incident Management</h1>
          <p className="text-muted-foreground">Centralized incident tracking and emergency response coordination</p>
        </div>

        {/* Emergency Response Hero */}
        <Card className="mb-8 overflow-hidden shadow-elevated hover-lift">
          <div className="relative">
            <img 
              src={emergencyResponseImage} 
              alt="Emergency response coordination center for electrical incidents"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent" />
            <div className="absolute inset-0 p-6 flex items-center">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-white mb-3">
                  Emergency Response Center
                </h2>
                <p className="text-lg text-white/90 mb-4">
                  Coordinated incident response with automated escalation, field team dispatch, 
                  and real-time status tracking for electrical safety incidents.
                </p>
                <div className="flex gap-3">
                  <Button variant="destructive" size="lg" className="hover-glow">
                    <Phone className="w-4 h-4 mr-2" />
                    Emergency Hotline
                  </Button>
                  <Button variant="outline" size="lg" className="hover-glow border-white text-white hover:bg-white hover:text-primary">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Create Incident
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="hover-lift shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Incidents</p>
                  <p className="text-2xl font-bold text-destructive">3</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-lift shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Response Time</p>
                  <p className="text-2xl font-bold text-success">8.2 min</p>
                </div>
                <Clock className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Resolved Today</p>
                  <p className="text-2xl font-bold text-secondary">12</p>
                </div>
                <CheckCircle className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Field Teams</p>
                  <p className="text-2xl font-bold text-warning">5</p>
                </div>
                <User className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Incident List */}
          <div className="lg:col-span-2">
            <Card className="shadow-card hover-lift">
              <CardHeader>
                <CardTitle>Incident Queue</CardTitle>
                <CardDescription>Track and manage all electrical safety incidents</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="resolved">Resolved</TabsTrigger>
                    <TabsTrigger value="all">All</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value={activeTab} className="space-y-4 mt-4">
                    {filteredIncidents.map((incident) => (
                      <div
                        key={incident.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-all hover-glow ${
                          selectedIncident?.id === incident.id ? 'border-secondary bg-secondary/5' : 'border-border'
                        }`}
                        onClick={() => setSelectedIncident(incident)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge 
                                variant={incident.severity === "critical" ? "destructive" : "secondary"}
                                className="font-mono"
                              >
                                {incident.id}
                              </Badge>
                              <StatusBadge status={incident.severity as any}>
                                {incident.severity.toUpperCase()}
                              </StatusBadge>
                              <Badge variant="outline" className="text-xs">
                                {incident.status.replace("_", " ").toUpperCase()}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              {getTypeIcon(incident.type)}
                              <span className="font-medium">{incident.poleId}</span>
                              <span className="text-sm text-muted-foreground">•</span>
                              <span className="text-sm text-muted-foreground">{incident.location}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{incident.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Reported: {incident.createdAt}</span>
                              {incident.assignedTo && <span>Assigned: {incident.assignedTo}</span>}
                              {incident.aiConfidence && (
                                <Badge variant="outline" className="text-xs">
                                  AI: {incident.aiConfidence}%
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Incident Details */}
          <div className="space-y-6">
            {selectedIncident ? (
              <>
                <Card className="shadow-card hover-lift">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{selectedIncident.id}</span>
                      <StatusBadge status={selectedIncident.severity as any}>
                        {selectedIncident.severity.toUpperCase()}
                      </StatusBadge>
                    </CardTitle>
                    <CardDescription>
                      {selectedIncident.poleId} • {selectedIncident.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">{selectedIncident.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Reported By</div>
                        <div className="font-medium">{selectedIncident.reportedBy}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Status</div>
                        <Badge variant="outline" className="text-xs">
                          {selectedIncident.status.replace("_", " ").toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    {selectedIncident.evidence && selectedIncident.evidence.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Evidence ({selectedIncident.evidence.length})</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedIncident.evidence.map((file, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <Eye className="w-3 h-3 mr-1" />
                              {file}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 hover-glow">
                        Assign Team
                      </Button>
                      <Button size="sm" className="flex-1 hover-glow">
                        Update Status
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card className="shadow-card hover-lift">
                  <CardHeader>
                    <CardTitle className="text-base">Activity Timeline</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedIncident.actions.map((action, index) => (
                      <div key={action.id} className="flex gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          action.type === "resolved" ? 'bg-success' :
                          action.type === "assigned" ? 'bg-secondary' : 'bg-muted'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm">
                            <span className="font-medium">{action.user}</span>
                            <span className="text-muted-foreground"> • {action.timestamp}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">{action.details}</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Add Comment */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-base">Add Update</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Textarea
                      placeholder="Add a comment or status update..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={3}
                    />
                    <Button onClick={addComment} className="w-full hover-glow">
                      Post Update
                    </Button>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="shadow-card">
                <CardContent className="p-8 text-center">
                  <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">Select an Incident</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose an incident from the list to view details and manage response.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentManagement;