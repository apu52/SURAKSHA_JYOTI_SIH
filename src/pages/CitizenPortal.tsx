import { useState } from "react";
import { Camera, MapPin, Phone, AlertTriangle, CheckCircle, Upload, Star, Award, Clock } from "lucide-react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import citizenReportingImage from "@/assets/citizen-reporting.jpg";

interface CitizenReport {
  id: string;
  title: string;
  location: string;
  status: "submitted" | "under_review" | "investigating" | "resolved";
  priority: "low" | "medium" | "high" | "critical";
  submittedAt: string;
  description: string;
  photos?: string[];
  response?: string;
}

const mockReports: CitizenReport[] = [
  {
    id: "CR-2024-001",
    title: "Sparking electrical pole",
    location: "Medical College Junction, TVM",
    status: "resolved",
    priority: "high",
    submittedAt: "2024-01-10",
    description: "Noticed sparks from the electrical pole during evening. Potential safety hazard.",
    photos: ["photo1.jpg", "photo2.jpg"],
    response: "Issue investigated and resolved. Faulty insulator replaced. Thank you for reporting!"
  },
  {
    id: "CR-2024-002", 
    title: "Hanging wire near school",
    location: "Government High School, Kochi",
    status: "investigating",
    priority: "critical",
    submittedAt: "2024-01-14",
    description: "Low hanging electrical wire near school entrance. Children at risk.",
    photos: ["photo3.jpg"]
  },
  {
    id: "CR-2024-003",
    title: "Damaged pole after storm",
    location: "Beach Road, Kozhikode", 
    status: "under_review",
    priority: "medium",
    submittedAt: "2024-01-15",
    description: "Electrical pole appears damaged after yesterday's storm. Leaning at an angle.",
    photos: ["photo4.jpg", "photo5.jpg"]
  }
];

const CitizenPortal = () => {
  const [reportForm, setReportForm] = useState({
    title: "",
    location: "",
    description: "",
    phone: "",
    photos: [] as File[]
  });

  const [selectedReport, setSelectedReport] = useState<CitizenReport | null>(null);
  const [showReportForm, setShowReportForm] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setReportForm(prev => ({
        ...prev,
        photos: [...prev.photos, ...Array.from(e.target.files!)]
      }));
    }
  };

  const submitReport = () => {
    // In a real app, this would submit to the backend
    console.log("Submitting report:", reportForm);
    setShowReportForm(false);
    setReportForm({ title: "", location: "", description: "", phone: "", photos: [] });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setReportForm(prev => ({
          ...prev,
          location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
        }));
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved": return "text-success";
      case "investigating": return "text-warning";
      case "under_review": return "text-secondary";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Citizen Safety Portal</h1>
          <p className="text-muted-foreground">Report electrical hazards and help keep your community safe</p>
        </div>

        {/* Hero Section */}
        <Card className="mb-8 overflow-hidden shadow-elevated hover-lift">
          <div className="relative">
            <img 
              src={citizenReportingImage} 
              alt="Citizens reporting electrical hazards using mobile phones for community safety"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent" />
            <div className="absolute inset-0 p-6 flex items-center">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-white mb-3">
                  Community Safety Partnership
                </h2>
                <p className="text-lg text-white/90 mb-4">
                  Your eyes and ears help protect the community. Report electrical hazards quickly 
                  and easily through our citizen portal. Every report helps prevent accidents.
                </p>
                <div className="flex gap-3">
                  <Button 
                    variant="destructive" 
                    size="lg" 
                    className="hover-glow"
                    onClick={() => setShowReportForm(true)}
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Report Hazard
                  </Button>
                  <Button variant="outline" size="lg" className="hover-glow border-white text-white hover:bg-white hover:text-primary">
                    <Phone className="w-4 h-4 mr-2" />
                    Emergency: 1912
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="hover-lift shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Reports Submitted</p>
                  <p className="text-2xl font-bold text-secondary">2,847</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-lift shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Issues Resolved</p>
                  <p className="text-2xl font-bold text-success">2,634</p>
                </div>
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  <p className="text-2xl font-bold text-warning">4.2 hours</p>
                </div>
                <Clock className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Community Heroes</p>
                  <p className="text-2xl font-bold text-accent">1,156</p>
                </div>
                <Award className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Report Form or Report List */}
          <div className="lg:col-span-2">
            {showReportForm ? (
              <Card className="shadow-card hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    Report Electrical Hazard
                  </CardTitle>
                  <CardDescription>Provide details about the electrical safety issue you've observed</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Issue Title *</label>
                    <Input
                      placeholder="Brief description of the issue..."
                      value={reportForm.title}
                      onChange={(e) => setReportForm(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Location *</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter location or coordinates..."
                        value={reportForm.location}
                        onChange={(e) => setReportForm(prev => ({ ...prev, location: e.target.value }))}
                        className="flex-1"
                      />
                      <Button variant="outline" onClick={getCurrentLocation} className="hover-glow">
                        <MapPin className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Description *</label>
                    <Textarea
                      placeholder="Describe what you observed, when it occurred, and any immediate dangers..."
                      value={reportForm.description}
                      onChange={(e) => setReportForm(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Contact Number (Optional)</label>
                    <Input
                      placeholder="Your phone number for follow-up"
                      value={reportForm.phone}
                      onChange={(e) => setReportForm(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Photos (Highly Recommended)</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label htmlFor="photo-upload" className="cursor-pointer">
                        <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Click to upload photos or drag and drop
                        </p>
                        <Button variant="outline" size="sm" className="hover-glow">
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Files
                        </Button>
                      </label>
                    </div>
                    
                    {reportForm.photos.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm text-muted-foreground mb-2">
                          Selected files: {reportForm.photos.length}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {reportForm.photos.map((file, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {file.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button onClick={submitReport} className="flex-1 hover-glow">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Submit Report
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowReportForm(false)}
                      className="hover-glow"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-card hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Your Previous Reports</span>
                    <Button onClick={() => setShowReportForm(true)} className="hover-glow">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      New Report
                    </Button>
                  </CardTitle>
                  <CardDescription>Track the status of your submitted reports</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockReports.map((report) => (
                    <div
                      key={report.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover-glow ${
                        selectedReport?.id === report.id ? 'border-secondary bg-secondary/5' : 'border-border'
                      }`}
                      onClick={() => setSelectedReport(report)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline" className="font-mono text-xs">
                              {report.id}
                            </Badge>
                            <Badge 
                              variant={report.priority === "critical" ? "destructive" : "secondary"}
                              className="text-xs"
                            >
                              {report.priority.toUpperCase()}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getStatusColor(report.status)}`}
                            >
                              {report.status.replace("_", " ").toUpperCase()}
                            </Badge>
                          </div>
                          <h4 className="font-medium mb-1">{report.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{report.location}</p>
                          <p className="text-xs text-muted-foreground">
                            Submitted: {report.submittedAt}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Report Details or Safety Tips */}
            {selectedReport ? (
              <Card className="shadow-card hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-base">{selectedReport.id}</span>
                    <Badge 
                      variant={selectedReport.status === "resolved" ? "default" : "secondary"}
                      className={selectedReport.status === "resolved" ? "bg-success/10 text-success" : ""}
                    >
                      {selectedReport.status.replace("_", " ").toUpperCase()}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{selectedReport.title}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Location</h4>
                    <p className="text-sm text-muted-foreground">{selectedReport.location}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-sm text-muted-foreground">{selectedReport.description}</p>
                  </div>

                  {selectedReport.photos && (
                    <div>
                      <h4 className="font-medium mb-2">Photos Submitted</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedReport.photos.map((photo, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <Camera className="w-3 h-3 mr-1" />
                            {photo}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedReport.response && (
                    <div className="p-3 bg-success/10 border border-success/20 rounded">
                      <h4 className="font-medium text-success mb-1">KSEBL Response</h4>
                      <p className="text-sm text-success">{selectedReport.response}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Safety Tips */}
                <Card className="shadow-card hover-lift">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-warning" />
                      Safety Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-warning rounded-full mt-1.5 flex-shrink-0" />
                      <p>Never touch or approach downed power lines</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-warning rounded-full mt-1.5 flex-shrink-0" />
                      <p>Stay at least 10 feet away from electrical equipment</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-warning rounded-full mt-1.5 flex-shrink-0" />
                      <p>Report sparking or unusual sounds immediately</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-warning rounded-full mt-1.5 flex-shrink-0" />
                      <p>Call 1912 for immediate electrical emergencies</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Community Impact */}
                <Card className="shadow-card hover-lift">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-accent" />
                      Community Impact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent mb-1">92.6%</div>
                      <div className="text-xs text-muted-foreground">Resolution Rate</div>
                    </div>
                    
                    <Progress value={93} className="h-2" />
                    
                    <div className="text-xs text-center text-muted-foreground">
                      Your reports help make Kerala's electrical grid safer for everyone
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="text-center p-2 bg-muted/30 rounded">
                        <div className="font-medium">Lives Protected</div>
                        <div className="text-success">15,000+</div>
                      </div>
                      <div className="text-center p-2 bg-muted/30 rounded">
                        <div className="font-medium">Accidents Prevented</div>
                        <div className="text-success">847</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Emergency Contacts */}
            <Card className="shadow-card border-destructive/30 bg-destructive/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive text-sm">
                  <Phone className="w-4 h-4" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex justify-between items-center">
                  <span>KSEBL Emergency</span>
                  <Badge variant="destructive" className="text-xs">1912</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Fire & Rescue</span>
                  <Badge variant="destructive" className="text-xs">101</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Police Emergency</span>
                  <Badge variant="destructive" className="text-xs">100</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Medical Emergency</span>
                  <Badge variant="destructive" className="text-xs">108</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenPortal;