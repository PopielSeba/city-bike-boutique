import { Button } from "@/components/ui/button";
import { ShoppingCart, Search, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const CartBadge = () => {
  const { totalCount } = useCart();
  if (!totalCount) return null;
  return (
    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold shadow">
      {totalCount}
    </span>
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