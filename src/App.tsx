
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Cars from "./pages/Cars";
import Services from "./pages/Services";
import Credit from "./pages/Credit";
import Contact from "./pages/Contact";
import Company from "./pages/Company";
import NewsStories from "./pages/NewsStories";
import FAQ from "./pages/FAQ";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";

// Service Pages
import CarRentals from "./pages/services/CarRentals";
import RentalManagement from "./pages/services/RentalManagement";
import DetailingWrappingTinting from "./pages/services/DetailingWrappingTinting";
import InsuranceServices from "./pages/services/InsuranceServices";
// import CarSalesFinancing from "./pages/services/CarSalesFinancing";
// import VehicleSourcing from "./pages/services/VehicleSourcing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/services" element={<Services />} />
          <Route path="/credit" element={<Credit />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/company" element={<Company />} />
          <Route path="/news" element={<NewsStories />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          
          {/* Service Routes */}
          <Route path="/services/rentals" element={<CarRentals />} />
          <Route path="/services/management" element={<RentalManagement />} />
          {/* <Route path="/services/sales" element={<CarSalesFinancing />} /> */}
          {/* <Route path="/services/sourcing" element={<VehicleSourcing />} /> */}
          <Route path="/services/insurance" element={<InsuranceServices />} />
          <Route path="/services/detailing" element={<DetailingWrappingTinting />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
