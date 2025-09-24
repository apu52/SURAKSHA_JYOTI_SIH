import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Brain, MapPin, AlertTriangle, BarChart3, Download, Calendar } from "lucide-react";
import aiAnalyticsImage from "@/assets/ai-analytics.jpg";

const Analytics = () => {
  const riskFactors = [
    { factor: "Weather Patterns", impact: 85, trend: "high" },
    { factor: "Equipment Age", impact: 72, trend: "medium" },
    { factor: "Maintenance History", impact: 68, trend: "low" },
    { factor: "Vibration Levels", impact: 91, trend: "high" },
    { factor: "Temperature Stress", impact: 78, trend: "medium" }
  ];

  const predictions = [
    {
      poleId: "KL-008-KLM",
      location: "Kozhikode - Beach Road", 
      riskScore: 87,
      predictedFailure: "3-5 days",
      confidence: 92,
      reasons: ["High vibration detected", "Weather forecast: heavy winds", "Equipment age > 15 years"]
    },
    {
      poleId: "KL-015-TSR",
      location: "Thrissur - Cultural Center",
      riskScore: 74,
      predictedFailure: "1-2 weeks", 
      confidence: 78,
      reasons: ["Irregular voltage patterns", "Recent maintenance overdue", "Monsoon season approaching"]
    },
    {
      poleId: "KL-023-EKM",
      location: "Ernakulam - Marine Drive",
      riskScore: 69,
      predictedFailure: "2-3 weeks",
      confidence: 71,
      reasons: ["Salt water corrosion risk", "High current loads", "Aging insulation components"]
    }
  ];

  const modelMetrics = {
    accuracy: 94.2,
    precision: 91.8,
    recall: 96.5,
    falsePositiveRate: 2.3,
    lastTraining: "2024-01-15",
    trainingDataPoints: 125000
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Analytics & Predictions</h1>
          <p className="text-muted-foreground">Advanced machine learning insights for predictive maintenance</p>
        </div>

        {/* Hero Analytics Section */}
        <Card className="mb-8 overflow-hidden shadow-elevated hover-lift">
          <div className="relative">
            <img 
              src={aiAnalyticsImage} 
              alt="AI-powered predictive analytics for electrical grid safety"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent" />
            <div className="absolute inset-0 p-8 flex items-center">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Predictive Intelligence Platform
                </h2>
                <p className="text-xl text-white/90 mb-6">
                  AI algorithms analyze patterns from 125,000+ data points to predict equipment failures 
                  before they happen, preventing accidents and reducing maintenance costs.
                </p>
                <div className="flex gap-4">
                  <Button variant="secondary" size="lg" className="hover-glow">
                    <Brain className="w-5 h-5 mr-2" />
                    View Model Performance
                  </Button>
                  <Button variant="outline" size="lg" className="hover-glow border-white text-white hover:bg-white hover:text-primary">
                    <Download className="w-5 h-5 mr-2" />
                    Export Analysis
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Model Performance */}
          <Card className="shadow-card hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-secondary" />
                Model Performance
              </CardTitle>
              <CardDescription>AI prediction accuracy metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-success/10">
                  <div className="text-2xl font-bold text-success">{modelMetrics.accuracy}%</div>
                  <div className="text-xs text-muted-foreground">Accuracy</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-secondary/10">
                  <div className="text-2xl font-bold text-secondary">{modelMetrics.precision}%</div>
                  <div className="text-xs text-muted-foreground">Precision</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Recall Rate</span>
                  <span className="font-medium">{modelMetrics.recall}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>False Positive Rate</span>
                  <span className="font-medium text-success">{modelMetrics.falsePositiveRate}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Training Data Points</span>
                  <span className="font-medium">{modelMetrics.trainingDataPoints.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  Last training: {modelMetrics.lastTraining}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Heatmap with Map Image and Legend */}
          <Card className="lg:col-span-2 shadow-card hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-warning" />
                Risk Analysis Heatmap
              </CardTitle>
              <CardDescription>Kerala Grid - Failure risk distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative rounded-lg h-64 mb-4 overflow-hidden border border-border">
                <img src={aiAnalyticsImage} alt="Kerala Risk Map" className="absolute inset-0 w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-br from-success/20 via-warning/30 to-destructive/40 rounded-lg" />
                {/* Legend */}
                <div className="absolute top-4 right-4 bg-card/90 backdrop-blur rounded-lg p-3 border border-border shadow-lg">
                  <div className="font-bold text-xs mb-2">Legend</div>
                  <div className="flex flex-col gap-1 text-xs">
                    <div className="flex items-center gap-2"><span className="w-3 h-3 bg-success rounded-full" /> Low Risk (0-30)</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 bg-warning rounded-full" /> Medium Risk (31-70)</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 bg-destructive rounded-full" /> High Risk (71-100)</div>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur rounded-lg p-3 border border-border">
                  <div className="text-sm font-medium">Risk Distribution</div>
                  <div className="text-xs text-muted-foreground">Based on 15 risk factors</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-success">847</div>
                  <div className="text-xs text-muted-foreground">Low Risk Poles</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-warning">312</div>
                  <div className="text-xs text-muted-foreground">Medium Risk</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-destructive">88</div>
                  <div className="text-xs text-muted-foreground">High Risk</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* High Risk Predictions */}
        <Card className="mb-8 shadow-card hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              High Risk Predictions
            </CardTitle>
            <CardDescription>
              Equipment predicted to fail within the next 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {predictions.map((prediction, index) => (
                <div key={index} className="p-4 rounded-lg border border-border hover-glow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge 
                          variant={prediction.riskScore >= 80 ? "destructive" : "secondary"}
                          className="font-mono"
                        >
                          {prediction.poleId}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Risk Score: {prediction.riskScore}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {prediction.confidence}% confidence
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">{prediction.location}</div>
                      <div className="text-sm">
                        <span className="font-medium text-destructive">
                          Predicted failure: {prediction.predictedFailure}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="hover-glow">
                        Schedule Inspection
                      </Button>
                      <Button size="sm" variant="destructive" className="hover-glow">
                        Priority Maintenance
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pl-4 border-l-2 border-warning/30">
                    <div className="text-xs font-medium text-warning mb-1">Contributing Factors:</div>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {prediction.reasons.map((reason, i) => (
                        <li key={i}>• {reason}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Factors Analysis */}
        <Card className="shadow-card hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-secondary" />
              Risk Factor Analysis
            </CardTitle>
            <CardDescription>
              Key variables driving equipment failure predictions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskFactors.map((factor, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover-glow">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{factor.factor}</span>
                      <Badge 
                        variant={factor.trend === "high" ? "destructive" : factor.trend === "medium" ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {factor.impact}% impact
                      </Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          factor.impact >= 80 ? 'bg-destructive' :
                          factor.impact >= 60 ? 'bg-warning' : 'bg-success'
                        }`}
                        style={{ width: `${factor.impact}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Analysis based on historical data and current conditions
                </div>
                <Button variant="outline" size="sm" className="hover-glow">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;