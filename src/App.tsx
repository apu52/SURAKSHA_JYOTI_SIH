import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import LiveData from "./pages/LiveData";
import DeviceManagement from "./pages/DeviceManagement";
import Analytics from "./pages/Analytics";
import FieldOperations from "./pages/FieldOperations";
import IncidentManagement from "./pages/IncidentManagement";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import CitizenPortal from "./pages/CitizenPortal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/live-data" element={<LiveData />} />
          <Route path="/devices" element={<DeviceManagement />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/field-operations" element={<FieldOperations />} />
          <Route path="/incidents" element={<IncidentManagement />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/citizen" element={<CitizenPortal />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
