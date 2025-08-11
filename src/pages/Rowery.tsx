import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import bikeCollectionImage from "@/assets/bike-collection.jpg";

const Rowery = () => {
  const bikes = [
    {
      id: 1,
      name: "Urban Classic 2024",
      price: 1299,
      originalPrice: 1599,
      image: bikeCollectionImage,
      rating: 5,
      reviews: 124
    },
    {
      id: 2,
      name: "City Comfort Pro",
      price: 1799,
      image: bikeCollectionImage,
      rating: 4,
      reviews: 89
    },
    {
      id: 3,
      name: "Metro Speedster",
      price: 2299,
      originalPrice: 2599,
      image: bikeCollectionImage,
      rating: 5,
      reviews: 203
    },
    {
      id: 4,
      name: "Essential City",
      price: 899,
      image: bikeCollectionImage,
      rating: 4,
      reviews: 56
    },
    {
      id: 5,
      name: "Premium Urban",
      price: 3299,
      image: bikeCollectionImage,
      rating: 5,
      reviews: 178
    },
    {
      id: 6,
      name: "Eco Commuter",
      price: 1599,
      originalPrice: 1899,
      image: bikeCollectionImage,
      rating: 4,
      reviews: 92
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Rowery miejskie
          </h1>
          <p className="text-lg text-muted-foreground">
            Odkryj naszą pełną kolekcję rowerów miejskich - od klasycznych modeli po nowoczesne rozwiązania elektryczne.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Select>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sortuj według" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-low">Cena: od najniższej</SelectItem>
              <SelectItem value="price-high">Cena: od najwyższej</SelectItem>
              <SelectItem value="rating">Najwyżej oceniane</SelectItem>
              <SelectItem value="newest">Najnowsze</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Zakres cen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-1000">0 - 1000 zł</SelectItem>
              <SelectItem value="1000-2000">1000 - 2000 zł</SelectItem>
              <SelectItem value="2000-3000">2000 - 3000 zł</SelectItem>
              <SelectItem value="3000+">3000+ zł</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            Wyczyść filtry
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {bikes.map((bike) => (
            <ProductCard key={bike.id} {...bike} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="shop" size="lg">
            Załaduj więcej rowerów
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Rowery;