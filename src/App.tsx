import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@/components/ui/container";
import Index from "./pages/Index";
import { Dashboard } from "./pages/admin/Dashboard";
import { Login } from "./pages/Login";
import { SidebarProvider } from "@/components/ui/sidebar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SidebarProvider>
        <BrowserRouter>
          <Container>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Container>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;