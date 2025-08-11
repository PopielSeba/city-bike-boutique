import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import bikeCollectionImage from "@/assets/bike-collection.jpg";

const Pozostale = () => {
  const otherProducts = [
    {
      id: 1,
      name: "Serwis pełny roweru",
      price: 199,
      image: bikeCollectionImage,
      rating: 5,
      reviews: 245
    },
    {
      id: 2,
      name: "Voucher prezentowy 500zł",
      price: 500,
      image: bikeCollectionImage,
      rating: 5,
      reviews: 89
    },
    {
      id: 3,
      name: "Kurs jazdy miejskiej",
      price: 149,
      originalPrice: 199,
      image: bikeCollectionImage,
      rating: 4,
      reviews: 67
    },
    {
      id: 4,
      name: "Ubezpieczenie roczne",
      price: 299,
      image: bikeCollectionImage,
      rating: 4,
      reviews: 123
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pozostałe usługi
          </h1>
          <p className="text-lg text-muted-foreground">
            Dodatkowe usługi i produkty dla pełnego doświadczenia rowerowego.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {otherProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pozostale;