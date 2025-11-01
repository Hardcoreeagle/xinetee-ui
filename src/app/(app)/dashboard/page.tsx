import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const getImageForProduct = (productId: string) => {
    const imageId = `product-${productId.split("-")[1]}`;
    return PlaceHolderImages.find((img) => img.id === imageId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        const placeholder = getImageForProduct(product.id);
        return (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.manufacturer}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              {placeholder && (
                <div className="relative aspect-video w-full">
                  <Image
                    src={placeholder.imageUrl}
                    alt={product.name}
                    fill
                    className="rounded-md object-cover"
                    data-ai-hint={placeholder.imageHint}
                  />
                </div>
              )}
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.description}
              </p>
               <Badge variant="secondary">ID: {product.id}</Badge>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/products/${product.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
