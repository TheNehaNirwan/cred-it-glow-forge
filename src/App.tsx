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

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AnimatePresence mode="wait">
          {showLanding && (
            <LandingCover key="landing" onEnter={handleEnterWebsite} />
          )}
        </AnimatePresence>
        
        {/* Main content only renders after clicking enter */}
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
