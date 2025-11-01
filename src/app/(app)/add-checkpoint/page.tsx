"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, Loader2, PlusCircle } from 'lucide-react';

export default function AddCheckpointGeneralPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [fileName, setFileName] = useState("");
    const [productId, setProductId] = useState("");
    const [location, setLocation] = useState("");
    const [status, setStatus] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName("");
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!productId || !location || !status) {
            toast({ title: "Error", description: "Please fill in all checkpoint fields.", variant: "destructive"});
            return;
        }
        
        setIsLoading(true);

        // Simulate API call to add checkpoint and upload doc
        console.log("Adding checkpoint for product:", productId);
        console.log({ location, status, document: fileName });
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsLoading(false);
        toast({
            title: "Success",
            description: "New checkpoint has been added to the product journey.",
        });
        
        // Redirect back to the product detail page
        router.push(`/products/${productId}`);
    }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Checkpoint</CardTitle>
        <CardDescription>
          Update a product's supply chain journey by providing its ID and the new checkpoint details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
           <div className="space-y-2">
              <Label htmlFor="product-id">Product ID</Label>
              <Input id="product-id" value={productId} onChange={(e) => setProductId(e.target.value)} placeholder="e.g., prod-001" required />
            </div>
           <div className="grid sm:grid-cols-2 gap-4">
            <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., Warehouse, NY" required />
            </div>
             <div>
                <Label htmlFor="status">Status</Label>
                <Input id="status" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="e.g., Arrived at warehouse" required />
            </div>
           </div>
           <div className="space-y-2">
            <Label htmlFor="documents">Supporting Documents (Optional)</Label>
            <Label htmlFor="documents" className="relative flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 p-8 hover:bg-muted/75 hover:border-accent transition-colors">
                <div className="text-center">
                    <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                        {fileName ? fileName : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-xs text-muted-foreground">PDF, DOCX, etc. (max 10MB)</p>
                </div>
                <Input id="documents" type="file" className="absolute h-full w-full opacity-0" onChange={handleFileChange} />
            </Label>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding Checkpoint...
                </>
            ) : (
                <>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Checkpoint
                </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
