import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import bikeCollectionImage from "@/assets/bike-collection.jpg";

const Czesci = () => {
  const parts = [
    {
      id: 1,
      name: "Przerzutka Shimano Deore",
      price: 299,
      originalPrice: 349,
      image: bikeCollectionImage,
      rating: 5,
      reviews: 87
    },
    {
      id: 2,
      name: "Hamulce tarczowe hydrauliczne",
      price: 599,
      image: bikeCollectionImage,
      rating: 4,
      reviews: 124
    },
    {
      id: 3,
      name: "Koła 28' aluminiowe",
      price: 799,
      image: bikeCollectionImage,
      rating: 5,
      reviews: 203
    },
    {
      id: 4,
      name: "Łańcuch KMC X11",
      price: 89,
      originalPrice: 119,
      image: bikeCollectionImage,
      rating: 4,
      reviews: 156
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Części rowerowe
          </h1>
          <p className="text-lg text-muted-foreground">
            Wysokiej jakości części zamienne i komponenty do rowerów miejskich.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {parts.map((part) => (
            <ProductCard key={part.id} {...part} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Czesci;