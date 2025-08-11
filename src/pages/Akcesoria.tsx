import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import bikeCollectionImage from "@/assets/bike-collection.jpg";

const Akcesoria = () => {
  const accessories = [
    {
      id: 1,
      name: "Kask miejski LED",
      price: 199,
      originalPrice: 249,
      image: bikeCollectionImage,
      rating: 5,
      reviews: 156
    },
    {
      id: 2,
      name: "Torba rowerowa wodoodporna",
      price: 129,
      image: bikeCollectionImage,
      rating: 4,
      reviews: 89
    },
    {
      id: 3,
      name: "Lampki LED zestaw",
      price: 79,
      image: bikeCollectionImage,
      rating: 5,
      reviews: 203
    },
    {
      id: 4,
      name: "Zapięcie U-lock Premium",
      price: 149,
      originalPrice: 189,
      image: bikeCollectionImage,
      rating: 4,
      reviews: 134
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Akcesoria rowerowe
          </h1>
          <p className="text-lg text-muted-foreground">
            Praktyczne akcesoria, które uczynią Twoją jazdę bardziej komfortową i bezpieczną.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {accessories.map((accessory) => (
            <ProductCard key={accessory.id} {...accessory} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Akcesoria;