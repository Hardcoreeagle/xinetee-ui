"use client";

import { useState } from 'react';
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, Loader2 } from 'lucide-react';

export default function RegisterProductPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [fileName, setFileName] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName("");
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate IPFS upload and blockchain transaction
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsLoading(false);
        toast({
            title: "Success",
            description: "Product has been registered on the blockchain.",
        });
        
        // Reset form
        (e.target as HTMLFormElement).reset();
        setFileName("");
    }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Register a New Product</CardTitle>
        <CardDescription>
          Fill in the details below to register a new product. This will upload documents to IPFS and store the CID on the blockchain.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="product-name">Product Name</Label>
            <Input id="product-name" placeholder="e.g., AstraCore Processor Z9" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="manufacturer">Manufacturer</Label>
            <Input id="manufacturer" placeholder="e.g., ChipMakers Inc." required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Provide a detailed description of the product." required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="documents">Product Documents</Label>
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
                    Registering...
                </>
            ) : "Register Product"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
