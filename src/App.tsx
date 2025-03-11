
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProgressProvider } from "./contexts/ProgressContext";

import Welcome from "./pages/Welcome";
import PreQualification from "./pages/PreQualification";
import PanVerification from "./pages/PanVerification";
import OfferMatching from "./pages/OfferMatching";
import Offers from "./pages/Offers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ProgressProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/pre-qualification" element={<PreQualification />} />
            <Route path="/pan-verification" element={<PanVerification />} />
            <Route path="/offer-matching" element={<OfferMatching />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ProgressProvider>
  </QueryClientProvider>
);

export default App;
