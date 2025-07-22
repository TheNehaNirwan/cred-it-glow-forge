import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LandingCover from "@/components/LandingCover";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminRoute from "@/components/admin/AdminRoute";

const queryClient = new QueryClient();

const App = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);

  const handleEnterWebsite = () => {
    // Start the exit animation of the landing page
    setShowLanding(false);
    // After landing page fades out, show main content
    setTimeout(() => {
      setShowMainContent(true);
    }, 1000); // Match this with the exit animation duration
  };

  // Skip landing page for admin routes
  useEffect(() => {
    if (window.location.pathname.startsWith("/admin")) {
      setShowLanding(false);
      setShowMainContent(true);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AnimatePresence mode="wait">
          {showLanding && !window.location.pathname.startsWith("/admin") && (
            <LandingCover key="landing" onEnter={handleEnterWebsite} />
          )}
        </AnimatePresence>
        
        {/* Main content only renders after clicking enter or for admin routes */}
        {showMainContent && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </motion.div>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
