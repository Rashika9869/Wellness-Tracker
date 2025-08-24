import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";
import { BarChart3, Target, Brain, Settings } from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main App */}
          <Route path="/" element={<Index />} />
          
          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* App Features - Placeholder Pages */}
          <Route 
            path="/habits" 
            element={
              <PlaceholderPage 
                title="Habit Management"
                description="Manage all your wellness habits, create new ones, and track your daily progress."
                icon={<Target className="w-12 h-12 text-wellness-500" />}
              />
            } 
          />
          <Route 
            path="/progress" 
            element={
              <PlaceholderPage 
                title="Progress & Analytics"
                description="View detailed analytics, track your wellness journey, and celebrate your achievements."
                icon={<BarChart3 className="w-12 h-12 text-wellness-500" />}
              />
            } 
          />
          <Route 
            path="/motivation" 
            element={
              <PlaceholderPage 
                title="Daily Motivation"
                description="Get inspired with daily quotes, wellness tips, and motivational content."
                icon={<Brain className="w-12 h-12 text-wellness-500" />}
              />
            } 
          />
          <Route 
            path="/profile" 
            element={
              <PlaceholderPage 
                title="Profile & Settings"
                description="Manage your account, customize notifications, and set your wellness goals."
                icon={<Settings className="w-12 h-12 text-wellness-500" />}
              />
            } 
          />
          
          {/* Legal Pages - Placeholder */}
          <Route 
            path="/terms" 
            element={
              <PlaceholderPage 
                title="Terms of Service"
                description="Our terms of service and user agreement."
              />
            } 
          />
          <Route 
            path="/privacy" 
            element={
              <PlaceholderPage 
                title="Privacy Policy"
                description="How we protect and handle your personal information."
              />
            } 
          />
          <Route 
            path="/forgot-password" 
            element={
              <PlaceholderPage 
                title="Reset Password"
                description="Enter your email to receive password reset instructions."
              />
            } 
          />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
