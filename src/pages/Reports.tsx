import { useState } from "react";
import { Download, Calendar, BarChart3, FileText, TrendingUp, Users, Clock, Filter } from "lucide-react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const Reports = () => {
  const [dateRange, setDateRange] = useState("last_30_days");
  const [reportType, setReportType] = useState("incident_summary");

  const reportTemplates = [
    {
      id: "incident_summary",
      name: "Incident Summary Report",
      description: "Comprehensive overview of all incidents, response times, and resolution status",
      icon: <FileText className="w-8 h-8 text-secondary" />,
      frequency: "Daily/Weekly/Monthly",
      lastGenerated: "2024-01-15 09:30 AM"
    },
    {
      id: "device_uptime",
      name: "Device Uptime & Performance",
      description: "System availability, battery levels, and device health metrics",
      icon: <BarChart3 className="w-8 h-8 text-success" />,
      frequency: "Weekly/Monthly",
      lastGenerated: "2024-01-14 06:00 AM"
    },
    {
      id: "predictive_analysis",
      name: "Predictive Maintenance Report", 
      description: "AI-powered predictions for equipment failures and maintenance schedules",
      icon: <TrendingUp className="w-8 h-8 text-warning" />,
      frequency: "Weekly",
      lastGenerated: "2024-01-13 08:15 AM"
    },
    {
      id: "field_operations",
      name: "Field Operations Summary",
      description: "Team performance, job completion rates, and response metrics",
      icon: <Users className="w-8 h-8 text-accent" />,
      frequency: "Weekly/Monthly",
      lastGenerated: "2024-01-15 07:45 AM"
    }
  ];

  const quickStats = [
    { label: "Total Reports Generated", value: "1,247", change: "+12%" },
    { label: "Scheduled Reports", value: "23", change: "Active" },
    { label: "Data Export Requests", value: "89", change: "+8%" },
    { label: "Report Recipients", value: "156", change: "+3%" }
  ];

  const scheduledReports = [
    {
      id: "SCH001",
      name: "Weekly Incident Digest",
      type: "Incident Summary",
      schedule: "Every Monday 8:00 AM",
      recipients: ["admin@ksebl.in", "safety@ksebl.in"],
      status: "active"
    },
    {
      id: "SCH002", 
      name: "Monthly Performance Review",
      type: "Device Performance",
      schedule: "1st of every month",
      recipients: ["management@ksebl.in", "operations@ksebl.in"],
      status: "active"
    },
    {
      id: "SCH003",
      name: "Daily Critical Alerts",
      type: "Emergency Summary", 
      schedule: "Daily 6:00 AM & 6:00 PM",
      recipients: ["control.room@ksebl.in"],
      status: "active"
    }
  ];

  const generateReport = (templateId: string) => {
    // In a real app, this would trigger report generation
    console.log(`Generating report: ${templateId} for date range: ${dateRange}`);
    // Show success toast or update UI
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate comprehensive reports and export system data</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="hover-lift shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <Badge 
                    variant={stat.change.includes('+') ? 'default' : 'secondary'}
                    className="bg-success/10 text-success"
                  >
                    {stat.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Report Generation */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <Card className="shadow-card hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-secondary" />
                  Report Configuration
                </CardTitle>
                <CardDescription>Configure parameters for report generation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Date Range</label>
                    <Select value={dateRange} onValueChange={setDateRange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last_7_days">Last 7 Days</SelectItem>
                        <SelectItem value="last_30_days">Last 30 Days</SelectItem>
                        <SelectItem value="last_90_days">Last 90 Days</SelectItem>
                        <SelectItem value="last_year">Last Year</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Region Filter</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All Regions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Regions</SelectItem>
                        <SelectItem value="thiruvananthapuram">Thiruvananthapuram</SelectItem>
                        <SelectItem value="kochi">Kochi</SelectItem>
                        <SelectItem value="kozhikode">Kozhikode</SelectItem>
                        <SelectItem value="thrissur">Thrissur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Format</label>
                    <Select defaultValue="pdf">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF Report</SelectItem>
                        <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                        <SelectItem value="csv">CSV Data</SelectItem>
                        <SelectItem value="json">JSON Export</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Report Templates */}
            <Card className="shadow-card hover-lift">
              <CardHeader>
                <CardTitle>Report Templates</CardTitle>
                <CardDescription>Pre-configured report templates for common use cases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {reportTemplates.map((template) => (
                  <div key={template.id} className="p-4 rounded-lg border border-border hover-glow">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4 flex-1">
                        <div className="p-3 rounded-lg bg-muted/30">
                          {template.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{template.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                          <div className="flex gap-4 text-xs text-muted-foreground">
                            <span>Frequency: {template.frequency}</span>
                            <span>Last: {template.lastGenerated}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => generateReport(template.id)}
                          className="hover-glow"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Generate
                        </Button>
                        <Button size="sm" variant="ghost" className="hover-glow">
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Custom Report Builder */}
            <Card className="shadow-card hover-lift">
              <CardHeader>
                <CardTitle>Custom Report Builder</CardTitle>
                <CardDescription>Build custom reports with specific data points</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Report Title</label>
                    <Input placeholder="Enter report title..." />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Data Sources</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select data sources..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="incidents">Incident Data</SelectItem>
                        <SelectItem value="devices">Device Telemetry</SelectItem>
                        <SelectItem value="maintenance">Maintenance Records</SelectItem>
                        <SelectItem value="predictions">AI Predictions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button className="hover-glow">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Preview Report
                  </Button>
                  <Button variant="outline" className="hover-glow">
                    Save Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Scheduled Reports & Quick Actions */}
          <div className="space-y-6">
            {/* Quick Export */}
            <Card className="shadow-card hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-secondary" />
                  Quick Export
                </CardTitle>
                <CardDescription>Instant data exports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start hover-glow">
                  <FileText className="w-4 h-4 mr-2" />
                  Last 24h Incidents
                </Button>
                <Button variant="outline" className="w-full justify-start hover-glow">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Device Status Report
                </Button>
                <Button variant="outline" className="w-full justify-start hover-glow">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  AI Analytics Summary
                </Button>
                <Button variant="outline" className="w-full justify-start hover-glow">
                  <Users className="w-4 h-4 mr-2" />
                  Field Team Performance
                </Button>
              </CardContent>
            </Card>

            {/* Scheduled Reports */}
            <Card className="shadow-card hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-warning" />
                  Scheduled Reports
                </CardTitle>
                <CardDescription>Automated report delivery</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {scheduledReports.map((report) => (
                  <div key={report.id} className="p-3 rounded-lg border border-border hover-glow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">{report.name}</h4>
                      <Badge 
                        variant={report.status === 'active' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {report.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{report.type}</p>
                    <div className="text-xs text-muted-foreground">
                      <div className="flex items-center gap-1 mb-1">
                        <Clock className="w-3 h-3" />
                        {report.schedule}
                      </div>
                      <div>Recipients: {report.recipients.length}</div>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full hover-glow">
                  <Calendar className="w-4 h-4 mr-2" />
                  Create Schedule
                </Button>
              </CardContent>
            </Card>

            {/* Report History */}
            <Card className="shadow-card hover-lift">
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span>Weekly Safety Report</span>
                    <Badge variant="outline" className="text-xs">PDF</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">Jan 15, 2024 - 892 KB</div>
                </div>
                
                <div className="text-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span>Device Performance</span>
                    <Badge variant="outline" className="text-xs">Excel</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">Jan 14, 2024 - 1.2 MB</div>
                </div>
                
                <div className="text-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span>Incident Analysis</span>
                    <Badge variant="outline" className="text-xs">PDF</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">Jan 13, 2024 - 654 KB</div>
                </div>

                <Button variant="ghost" className="w-full text-xs hover-glow">
                  View All Reports
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;