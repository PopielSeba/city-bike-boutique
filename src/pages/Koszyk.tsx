import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";

const Koszyk = () => {
  const { items, updateQuantity, removeItem, clear, totalPrice } = useCart();

  useEffect(() => {
    document.title = "Koszyk – KupHolendra";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Koszyk</h1>
          <p className="text-muted-foreground mt-2">
            Przejrzyj wybrane produkty i sfinalizuj zamówienie.
          </p>
        </header>

        {items.length === 0 ? (
          <section className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-6">Twój koszyk jest pusty.</p>
            <Button asChild variant="shop">
              <a href="/rowery">Przeglądaj rowery</a>
            </Button>
          </section>
        ) : (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="flex items-center gap-4 border border-border rounded-lg p-4 bg-card"
                >
                  <img
                    src={item.image}
                    alt={`Produkt ${item.name} w koszyku`}
                    className="w-24 h-24 object-cover rounded-md"
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <h2 className="font-semibold text-foreground">{item.name}</h2>
                    <p className="text-sm text-muted-foreground">{item.price.toLocaleString()} zł</p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center border border-border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Zmniejsz ilość"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="px-3 min-w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Zwiększ ilość"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        aria-label="Usuń z koszyka"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      {(item.price * item.quantity).toLocaleString()} zł
                    </p>
                  </div>
                </article>
              ))}
              <div>
                <Button variant="outline" onClick={clear}>
                  Wyczyść koszyk
                </Button>
              </div>
            </div>

            <aside className="border border-border rounded-lg p-6 h-fit bg-card">
              <h2 className="text-xl font-semibold text-foreground mb-4">Podsumowanie</h2>
              <div className="flex items-center justify-between text-foreground mb-6">
                <span>Suma</span>
                <span className="font-bold">{totalPrice.toLocaleString()} zł</span>
              </div>
              <Button className="w-full" size="lg">
                Przejdź do kasy
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                Finalizacja płatności zostanie dodana w kolejnym kroku.
              </p>
            </aside>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Koszyk;
