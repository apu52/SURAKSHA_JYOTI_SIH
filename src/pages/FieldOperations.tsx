import { useState } from "react";
import { Navigation, MapPin, Clock, CheckCircle, AlertTriangle, Phone, Camera, Battery, Wrench } from "lucide-react";
import Header from "@/components/Header";
import StatusBadge from "@/components/StatusBadge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import fieldOperationsImage from "@/assets/field-operations.jpg";

interface FieldJob {
  id: string;
  poleId: string;
  title: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "assigned" | "in-progress" | "completed" | "pending";
  location: string;
  coordinates: { lat: number; lng: number };
  distance: string;
  estimatedTime: string;
  description: string;
  assignedTo: string;
  createdAt: string;
  equipment?: string[];
}

const mockFieldJobs: FieldJob[] = [
  {
    id: "JOB001",
    poleId: "KL-003-KCH", 
    title: "Conductor Break - Emergency Repair",
    priority: "critical",
    status: "assigned",
    location: "MG Road, Kochi",
    coordinates: { lat: 9.9312, lng: 76.2673 },
    distance: "2.3 km",
    estimatedTime: "15 min",
    description: "Conductor break detected with 94% AI confidence. Supply already isolated. Requires immediate inspection and repair.",
    assignedTo: "Rajesh Kumar",
    createdAt: "5 min ago",
    equipment: ["Insulation tester", "Cable cutter", "Safety harness"]
  },
  {
    id: "JOB002", 
    poleId: "KL-007-KLM",
    title: "Battery Replacement Required",
    priority: "high",
    status: "in-progress",
    location: "Calicut Beach Road, Kozhikode",
    coordinates: { lat: 11.2588, lng: 75.7804 },
    distance: "0.8 km",
    estimatedTime: "5 min",
    description: "Battery level critically low at 15%. Solar charging inactive. Replace backup battery unit.",
    assignedTo: "Sanjay Nair",
    createdAt: "25 min ago",
    equipment: ["12V Battery", "Multimeter", "Screwdriver set"]
  },
  {
    id: "JOB003",
    poleId: "KL-012-TSR",
    title: "Vibration Sensor Calibration", 
    priority: "medium",
    status: "pending",
    location: "Swaraj Round, Thrissur",
    coordinates: { lat: 10.5276, lng: 76.2144 },
    distance: "5.7 km",
    estimatedTime: "25 min",
    description: "Abnormal vibration readings detected. Check sensor mounting and recalibrate if necessary.",
    assignedTo: "Amit Singh",
    createdAt: "1 hour ago",
    equipment: ["Calibration kit", "Torque wrench", "Level meter"]
  }
];

const FieldOperations = () => {
  const [selectedJob, setSelectedJob] = useState<FieldJob | null>(mockFieldJobs[0]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "text-destructive";
      case "high": return "text-warning"; 
      case "medium": return "text-secondary";
      case "low": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const openNavigation = (coordinates: { lat: number; lng: number }) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Field Operations</h1>
          <p className="text-muted-foreground">Mobile-first interface for field technicians and maintenance crews</p>
        </div>

        {/* Hero Section */}
        <Card className="mb-8 overflow-hidden shadow-elevated hover-lift">
          <div className="relative">
            <img 
              src={fieldOperationsImage} 
              alt="Field technician using SurakshaJyoti mobile interface for electrical pole maintenance"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
            <div className="absolute inset-0 p-6 flex items-center">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-white mb-3">
                  Mobile Field Operations Center
                </h2>
                <p className="text-lg text-white/90 mb-4">
                  Complete job management, GPS navigation, and real-time reporting tools 
                  designed for technicians working in the field.
                </p>
                <div className="flex gap-3">
                  <Button variant="secondary" size="lg" className="hover-glow">
                    <MapPin className="w-4 h-4 mr-2" />
                    Current Location
                  </Button>
                  <Button variant="outline" size="lg" className="hover-glow border-white text-white hover:bg-white hover:text-primary">
                    <Phone className="w-4 h-4 mr-2" />
                    Emergency Contact
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Job Queue */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-card hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-secondary" />
                  Assigned Jobs ({mockFieldJobs.length})
                </CardTitle>
                <CardDescription>Jobs assigned to your crew, sorted by priority</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockFieldJobs.map((job) => (
                  <div 
                    key={job.id} 
                    className={`p-4 rounded-lg border cursor-pointer transition-all hover-glow ${
                      selectedJob?.id === job.id ? 'border-secondary bg-secondary/5' : 'border-border'
                    }`}
                    onClick={() => setSelectedJob(job)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <StatusBadge status={job.priority as any}>{job.poleId}</StatusBadge>
                          <Badge 
                            variant={job.priority === "critical" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {job.priority.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {job.status.replace("-", " ").toUpperCase()}
                          </Badge>
                        </div>
                        <h4 className="font-semibold mb-1">{job.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{job.location}</p>
                        <p className="text-xs text-muted-foreground">{job.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-secondary">{job.distance}</div>
                        <div className="text-xs text-muted-foreground">{job.estimatedTime}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {job.createdAt}
                        </span>
                        <span>Assigned to: {job.assignedTo}</span>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          openNavigation(job.coordinates);
                        }}
                        className="hover-glow"
                      >
                        <Navigation className="w-4 h-4 mr-1" />
                        Navigate
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card hover-lift">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Button variant="outline" className="flex-col h-20 hover-glow">
                    <Camera className="w-6 h-6 mb-1" />
                    <span className="text-xs">Take Photo</span>
                  </Button>
                  <Button variant="outline" className="flex-col h-20 hover-glow">
                    <Phone className="w-6 h-6 mb-1" />
                    <span className="text-xs">Call Supervisor</span>
                  </Button>
                  <Button variant="outline" className="flex-col h-20 hover-glow">
                    <AlertTriangle className="w-6 h-6 mb-1" />
                    <span className="text-xs">Report Issue</span>
                  </Button>
                  <Button variant="outline" className="flex-col h-20 hover-glow">
                    <CheckCircle className="w-6 h-6 mb-1" />
                    <span className="text-xs">Mark Complete</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Job Details Panel */}
          <div className="space-y-6">
            {selectedJob ? (
              <>
                <Card className="shadow-card hover-lift">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{selectedJob.poleId}</span>
                      <StatusBadge status={selectedJob.priority as any}>
                        {selectedJob.priority.toUpperCase()}
                      </StatusBadge>
                    </CardTitle>
                    <CardDescription>{selectedJob.title}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Location</h4>
                      <p className="text-sm text-muted-foreground mb-3">{selectedJob.location}</p>
                      <Button 
                        onClick={() => openNavigation(selectedJob.coordinates)}
                        className="w-full hover-glow"
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        Navigate to Site ({selectedJob.distance})
                      </Button>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Job Details</h4>
                      <p className="text-sm text-muted-foreground">{selectedJob.description}</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Required Equipment</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.equipment?.map((item, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button size="sm" variant="outline" className="hover-glow">
                        Start Job
                      </Button>
                      <Button size="sm" variant="destructive" className="hover-glow">
                        Need Help
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Safety Checklist */}
                <Card className="shadow-card border-warning/30 bg-warning/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-warning text-sm">
                      <AlertTriangle className="w-4 h-4" />
                      Safety Checklist
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>PPE equipment verified and worn</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>Power supply confirmed isolated</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>Work area secured and marked</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>Emergency contacts available</span>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="shadow-card">
                <CardContent className="p-8 text-center">
                  <Wrench className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">Select a Job</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose a job from the list to view details and start work.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Field Stats */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Battery className="w-4 h-4 text-success" />
                  Today's Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Jobs Completed</span>
                  <Badge variant="secondary">7/12</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Distance Traveled</span>
                  <Badge variant="secondary">23.4 km</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Response Time</span>
                  <Badge variant="secondary" className="bg-success/10 text-success">8 min avg</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldOperations;