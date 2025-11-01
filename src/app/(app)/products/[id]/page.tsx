"use client";

import { useState } from 'react';
import type { Checkpoint } from "@/lib/data";
import { getProductById } from "@/lib/data";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { MapPin, Link as LinkIcon, PlusCircle, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


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
          <div className="pb-6">
            <p className="font-semibold">{cp.status}</p>
            <p className="text-sm text-muted-foreground">{cp.location}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(cp.timestamp).toLocaleString()} by {cp.by}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}


export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  const [checkpoints, setCheckpoints] = useState(product?.checkpoints || []);
  const [newLocation, setNewLocation] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const { toast } = useToast();

  if (!product) {
    notFound();
  }

  const handleAddCheckpoint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocation || !newStatus) {
        toast({ title: "Error", description: "Please fill in all checkpoint fields.", variant: "destructive"});
        return;
    }

    const newCheckpoint: Checkpoint = {
        id: `cp-${product.id}-${checkpoints.length + 1}`,
        location: newLocation,
        status: newStatus,
        timestamp: new Date().toISOString(),
        by: 'WarehouseTeam' // Simulated role
    };

    setCheckpoints([...checkpoints, newCheckpoint]);
    setNewLocation('');
    setNewStatus('');
    toast({ title: "Success", description: "New checkpoint added to the product journey."});
  };

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

         <Card>
          <CardHeader>
            <CardTitle>Add Checkpoint</CardTitle>
            <CardDescription>Update the product's journey (for logistics/warehouse roles).</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddCheckpoint} className="space-y-4">
               <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} placeholder="e.g., Warehouse, NY" />
                </div>
                 <div>
                    <Label htmlFor="status">Status</Label>
                    <Input id="status" value={newStatus} onChange={(e) => setNewStatus(e.target.value)} placeholder="e.g., Arrived at warehouse" />
                </div>
               </div>
              <Button type="submit" className="w-full sm:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Checkpoint
              </Button>
            </form>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
