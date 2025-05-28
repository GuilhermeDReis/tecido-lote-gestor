
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import CadastroLote from "./pages/CadastroLote";
import ConsultaLote from "./pages/ConsultaLote";
import Acompanhamento from "./pages/Acompanhamento";
import ConsultaClientes from "./pages/ConsultaClientes";
import CadastroClientes from "./pages/CadastroClientes";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/cadastro" element={
              <ProtectedRoute>
                <CadastroLote />
              </ProtectedRoute>
            } />
            <Route path="/consulta" element={
              <ProtectedRoute>
                <ConsultaLote />
              </ProtectedRoute>
            } />
            <Route path="/acompanhamento" element={
              <ProtectedRoute>
                <Acompanhamento />
              </ProtectedRoute>
            } />
            <Route path="/clientes" element={
              <ProtectedRoute>
                <ConsultaClientes />
              </ProtectedRoute>
            } />
            <Route path="/clientes/cadastro" element={
              <ProtectedRoute>
                <CadastroClientes />
              </ProtectedRoute>
            } />
            <Route path="/clientes/editar/:id" element={
              <ProtectedRoute>
                <CadastroClientes />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
