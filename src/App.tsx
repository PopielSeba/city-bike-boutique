import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Rowery from "./pages/Rowery";
import Czesci from "./pages/Czesci";
import Akcesoria from "./pages/Akcesoria";
import Pozostale from "./pages/Pozostale";
import NotFound from "./pages/NotFound";
import Koszyk from "./pages/Koszyk";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/rowery" element={<Rowery />} />
          <Route path="/czesci" element={<Czesci />} />
          <Route path="/akcesoria" element={<Akcesoria />} />
          <Route path="/pozostale" element={<Pozostale />} />
          <Route path="/koszyk" element={<Koszyk />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
