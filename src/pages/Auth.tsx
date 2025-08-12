import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const navigate = useNavigate();
  const { session, signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = mode === "login" ? "Logowanie – KupHolendra" : "Rejestracja – KupHolendra";
    if (session) navigate("/");
  }, [mode, session, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const action = mode === "login" ? signIn : signUp;
    const { error } = await action(email, password);
    setLoading(false);
    if (error) return toast.error(error);
    toast.success(mode === "login" ? "Zalogowano!" : "Sprawdź email, aby potwierdzić rejestrację.");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {mode === "login" ? "Zaloguj się" : "Załóż konto"}
          </h1>
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4" aria-label={mode === "login" ? "Formularz logowania" : "Formularz rejestracji"}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Hasło</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Przetwarzanie..." : mode === "login" ? "Zaloguj" : "Zarejestruj"}
                </Button>
              </form>
              <div className="mt-4 text-sm text-muted-foreground">
                {mode === "login" ? (
                  <button onClick={() => setMode("signup")} className="underline">
                    Nie masz konta? Zarejestruj się
                  </button>
                ) : (
                  <button onClick={() => setMode("login")} className="underline">
                    Masz już konto? Zaloguj się
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
