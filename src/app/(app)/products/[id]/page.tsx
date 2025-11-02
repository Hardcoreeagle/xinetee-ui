
"use client";

import { useState } from 'react';
import type { Checkpoint } from "@/lib/data";
import { getProductById } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Link as LinkIcon, PlusCircle, FileText } from "lucide-react";


function CheckpointTimeline({ checkpoints }: { checkpoints: Checkpoint[] }) {
  if (checkpoints.length === 0) {
    return <p className="text-sm text-muted-foreground mt-2">No checkpoints recorded yet.</p>;
  }

  return (
    <div className="space-y-6">
      {checkpoints.map((cp, index) => (
        <div key={cp.id} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground">
              <MapPin className="h-5 w-5" />
            </div>
            {index < checkpoints.length - 1 && (
              <div className="w-px h-full bg-border" />
            )}
          </div>
          <div className="pb-6 w-full">
            <p className="font-semibold">{cp.status}</p>
            <p className="text-sm text-muted-foreground">{cp.location}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(cp.timestamp).toLocaleString()} by {cp.by}
            </p>
            {cp.documentUrl && (
                <a href={cp.documentUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline text-sm mt-2">
                    <FileText className="h-4 w-4" />
                    <span>View Document</span>
                </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}


export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = getProductById(id);
  // The state for checkpoints is now managed within this component only for display.
  // In a real app, this would be fetched and updated from a database.
  const [checkpoints] = useState(product?.checkpoints || []);

  if (!product) {
    notFound();
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{product.name}</CardTitle>
            <CardDescription>
              Manufactured by {product.manufacturer}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{product.description}</p>
            <Separator />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div><span className="font-semibold">Product ID:</span> <Badge variant="secondary">{product.id}</Badge></div>
                <div><span className="font-semibold">Owner:</span> <Badge variant="outline">{product.owner}</Badge></div>
                <div><span className="font-semibold">Registered:</span> {new Date(product.registrationDate).toLocaleDateString()}</div>
                <div>
                  <span className="font-semibold">IPFS Document:</span>
                  <a href="#" className="flex items-center gap-1 text-primary hover:underline">
                    <LinkIcon className="h-4 w-4" />
                    <span>View Document</span>
                  </a>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Supply Chain Route</CardTitle>
            <CardDescription>Live tracking of the product's journey.</CardDescription>
          </CardHeader>
          <CardContent>
             <CheckpointTimeline checkpoints={checkpoints} />
             <Button asChild className="w-full mt-6">
                <Link href={`/products/${id}/add-checkpoint`}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Checkpoint
                </Link>
             </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
