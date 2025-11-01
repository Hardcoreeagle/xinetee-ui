"use client";

import { useState } from 'react';
import { products } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, ShieldAlert, ScanLine, Loader2, Info } from "lucide-react";
import Link from 'next/link';

type VerificationStatus = 'idle' | 'loading' | 'verified' | 'not_found';
type VerifiedProduct = typeof products[0] | null;

export default function VerifyPage() {
    const [productId, setProductId] = useState('');
    const [status, setStatus] = useState<VerificationStatus>('idle');
    const [verifiedProduct, setVerifiedProduct] = useState<VerifiedProduct>(null);

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setVerifiedProduct(null);

        setTimeout(() => {
            const product = products.find(p => p.id.toLowerCase() === productId.toLowerCase());
            if (product) {
                setVerifiedProduct(product);
                setStatus('verified');
            } else {
                setStatus('not_found');
            }
        }, 1000);
    }
  
  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
            <ScanLine className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="mt-4 text-2xl">Product Verification</CardTitle>
          <CardDescription>
            Enter the product ID to verify its authenticity and view its history on the blockchain.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="product-id">Product ID</Label>
              <Input
                id="product-id"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="e.g., prod-001"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={status === 'loading'}>
              {status === 'loading' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
              ) : "Verify Authenticity" }
            </Button>
          </form>

          {status === 'verified' && verifiedProduct && (
            <Alert variant="default" className="mt-6 bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
              <ShieldCheck className="h-4 w-4 !text-green-600 dark:!text-green-400" />
              <AlertTitle className="text-green-800 dark:text-green-300">Product Verified!</AlertTitle>
              <AlertDescription className="text-green-700 dark:text-green-400">
                <p><strong>{verifiedProduct.name}</strong> is an authentic product registered by <strong>{verifiedProduct.manufacturer}</strong>.</p>
                <Button asChild variant="link" className="p-0 h-auto mt-2 text-green-700 dark:text-green-400">
                    <Link href={`/products/${verifiedProduct.id}`}>View full product details &rarr;</Link>
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {status === 'not_found' && (
             <Alert variant="destructive" className="mt-6">
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>Verification Failed</AlertTitle>
              <AlertDescription>
                The product ID you entered was not found on the blockchain. Please check the ID and try again.
              </AlertDescription>
            </Alert>
          )}

           {status === 'idle' && (
             <Alert variant="default" className="mt-6">
              <Info className="h-4 w-4" />
              <AlertTitle>How to find a Product ID</AlertTitle>
              <AlertDescription>
                The product ID is typically found on the product's packaging or label, often near a QR code.
              </AlertDescription>
            </Alert>
           )}

        </CardContent>
      </Card>
    </div>
  );
}
