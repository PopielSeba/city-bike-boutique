import { Truck, Shield, Wrench, Phone } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Truck,
      title: "Darmowa dostawa",
      description: "Bezpłatna dostawa przy zamówieniach powyżej 500 zł"
    },
    {
      icon: Shield,
      title: "Gwarancja jakości",
      description: "2 lata gwarancji na wszystkie rowery miejskie"
    },
    {
      icon: Wrench,
      title: "Serwis rowerowy",
      description: "Profesjonalny serwis i konserwacja rowerów"
    },
    {
      icon: Phone,
      title: "Wsparcie 24/7",
      description: "Zawsze gotowi pomóc w wyborze idealnego roweru"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Dlaczego warto wybrać KupHolendra?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Zapewniamy najwyższą jakość obsługi i produktów dla wszystkich miłośników jazdy rowerem w mieście.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;