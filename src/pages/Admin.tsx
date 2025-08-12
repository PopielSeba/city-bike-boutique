import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import AdminProductsManager from "@/components/admin/AdminProductsManager";

const Admin = () => {
  const navigate = useNavigate();
  const { user, loading, isAdmin } = useAuth();

  useEffect(() => {
    document.title = "Panel administracyjny – KupHolendra";
    const meta = document.querySelector('meta[name="description"]');
    const content = "Zarządzaj produktami sklepu – panel administratora.";
    if (meta) (meta as HTMLMetaElement).setAttribute("content", content);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = content;
      document.head.appendChild(m);
    }
  }, []);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [loading, user, navigate]);

  if (!user) return null;
  if (!isAdmin) return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Brak dostępu</h1>
        <p className="text-muted-foreground">Twoje konto nie ma uprawnień administratora.</p>
      </main>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Panel administracyjny</h1>
        <AdminProductsManager />
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
