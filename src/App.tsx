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
import FormPage from "./pages/FormPage";

// Service Pages
import CarRentals from "./pages/services/CarRentals";
import RentalManagement from "./pages/services/RentalManagement";
import DetailingWrappingTinting from "./pages/services/DetailingWrappingTinting";
import InsuranceServices from "./pages/services/InsuranceServices";
import CarSalesFinancing from "./pages/services/CarSalesFinancing";
import MechanicalService from "./pages/services/MechanicalService";
import AutobodyCollision from "./pages/services/AutobodyCollision";
import AccidentInjury from "./pages/services/AccidentInjury";

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
          <Route path="/services/sales" element={<CarSalesFinancing />} />
          <Route path="/services/insurance" element={<InsuranceServices />} />
          <Route path="/services/detailing" element={<DetailingWrappingTinting />} />
          <Route path="/services/mechanical" element={<MechanicalService />} />
          <Route path="/services/autobody" element={<AutobodyCollision />} />
          <Route path="/services/injury" element={<AccidentInjury />} />
          
          <Route path="/form/:serviceId" element={<FormPage />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
