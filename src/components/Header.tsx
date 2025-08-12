import { Button } from "@/components/ui/button";
import { ShoppingCart, Search, Menu, User, LogOut, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const CartBadge = () => {
  const { totalCount } = useCart();
  if (!totalCount) return null;
  return (
    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold shadow">
      {totalCount}
    </span>
  );
};

const AuthArea = () => {
  const { user, isAdmin, signOut } = useAuth();
  const initial = user?.email?.[0]?.toUpperCase() ?? "";

  if (!user) {
    return (
      <Link to="/auth">
        <Button variant="default">Zaloguj</Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-9 h-9 rounded-full p-0 font-bold" aria-label="Menu użytkownika">
          {initial || <User className="h-4 w-4" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isAdmin && (
          <Link to="/admin">
            <DropdownMenuItem>
              <Shield className="h-4 w-4 mr-2" /> Panel admina
            </DropdownMenuItem>
          </Link>
        )}
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="h-4 w-4 mr-2" /> Wyloguj
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Header = () => {
  return (
    <header className="w-full bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">B</span>
            </div>
            <span className="text-2xl md:text-3xl font-bold flex items-baseline gap-1"><span className="text-black">Kup</span><span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">Holendra</span></span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/rowery" className="text-foreground hover:text-primary transition-colors font-medium">
              Rowery
            </Link>
            <Link to="/czesci" className="text-foreground hover:text-primary transition-colors font-medium">
              Części rowerowe
            </Link>
            <Link to="/akcesoria" className="text-foreground hover:text-primary transition-colors font-medium">
              Akcesoria
            </Link>
            <Link to="/pozostale" className="text-foreground hover:text-primary transition-colors font-medium">
              Pozostałe
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/koszyk" className="relative">
              <Button variant="ghost" size="icon" aria-label="Przejdź do koszyka">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <CartBadge />
            </Link>
            <AuthArea />
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
