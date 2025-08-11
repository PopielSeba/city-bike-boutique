import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import bikeCollectionImage from "@/assets/bike-collection.jpg";

const FeaturedProducts = () => {
  const featuredBikes = [
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
    }
  ];

  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Polecane rowery miejskie
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sprawdź nasze najpopularniejsze modele rowerów miejskich, 
            wybrane przez tysiące zadowolonych klientów.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredBikes.map((bike) => (
            <ProductCard key={bike.id} {...bike} />
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="shop" size="lg">
            Zobacz wszystkie rowery
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;