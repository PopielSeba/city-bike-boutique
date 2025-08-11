import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-bike.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/20"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Rowery miejskie dla
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  {" "}nowoczesnego miasta
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Odkryj naszą kolekcję stylowych i funkcjonalnych rowerów miejskich. 
                Idealne do codziennych podróży po mieście.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Zobacz rowery
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="shop" size="lg">
                Dowiedz się więcej
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">200+</div>
                <div className="text-sm text-muted-foreground">Modeli</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5★</div>
                <div className="text-sm text-muted-foreground">Ocena</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24h</div>
                <div className="text-sm text-muted-foreground">Dostawa</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-glow/20 rounded-3xl transform rotate-6 scale-105"></div>
            <img
              src={heroImage}
              alt="Nowoczesny rower miejski"
              className="relative z-10 w-full h-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg">
              -20%
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;