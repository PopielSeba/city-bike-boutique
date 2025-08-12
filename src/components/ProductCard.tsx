import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/components/ui/use-toast";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
}

const ProductCard = ({ id, name, price, originalPrice, image, rating, reviews }: ProductCardProps) => {
  const { addItem } = useCart();
  const handleAdd = () => {
    addItem({ id, name, price, image });
    try {
      toast({ title: "Dodano do koszyka", description: name });
    } catch {}
  };
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={`${name} – rower miejski`}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-4 right-4 bg-background/80 hover:bg-background"
        >
          <Heart className="h-4 w-4" />
        </Button>
        {originalPrice && (
          <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-sm font-semibold">
            -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
          </div>
        )}
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <div className="flex items-center space-x-2 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < rating ? "text-yellow-400 fill-current" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({reviews})</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-x-2">
              <span className="text-2xl font-bold text-foreground">{price.toLocaleString()} zł</span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {originalPrice.toLocaleString()} zł
                </span>
              )}
            </div>
          </div>
          
          <Button variant="default" className="w-full" onClick={handleAdd} aria-label={`Dodaj ${name} do koszyka`}>
            Dodaj do koszyka
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;