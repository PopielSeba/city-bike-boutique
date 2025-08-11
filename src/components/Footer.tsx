import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">K</span>
              </div>
              <span className="text-xl font-bold">KupHolendra</span>
            </div>
            <p className="text-background/80 leading-relaxed">
              Twój niezawodny partner w świecie rowerów miejskich. 
              Oferujemy najwyższej jakości rowery dla każdego.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="text-background hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Szybkie linki</h3>
            <div className="space-y-2">
              <a href="/rowery" className="block text-background/80 hover:text-primary transition-colors">
                Rowery miejskie
              </a>
              <a href="/czesci" className="block text-background/80 hover:text-primary transition-colors">
                Części rowerowe
              </a>
              <a href="/akcesoria" className="block text-background/80 hover:text-primary transition-colors">
                Akcesoria
              </a>
              <a href="/serwis" className="block text-background/80 hover:text-primary transition-colors">
                Serwis
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Obsługa klienta</h3>
            <div className="space-y-2">
              <a href="/kontakt" className="block text-background/80 hover:text-primary transition-colors">
                Kontakt
              </a>
              <a href="/dostawa" className="block text-background/80 hover:text-primary transition-colors">
                Dostawa i zwroty
              </a>
              <a href="/gwarancja" className="block text-background/80 hover:text-primary transition-colors">
                Gwarancja
              </a>
              <a href="/faq" className="block text-background/80 hover:text-primary transition-colors">
                FAQ
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Kontakt</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-background/80">ul. Oławska 219, 55-220 Jelcz-Laskowice</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-background/80">+48 500 600 525</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-background/80">info@kupholendra.pl</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 text-center">
          <p className="text-background/60">
            © 2024 KupHolendra. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
