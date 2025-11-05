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
import { UploadCloud, Loader2, Library, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function RegisterOrganizationPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [logoFileName, setLogoFileName] = useState("");
    const [docFileName, setDocFileName] = useState("");
    const [walletAddress, setWalletAddress] = useState("0x1a2b...c3d4"); // Pre-filled for demo

    const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setLogoFileName(e.target.files[0].name);
        } else {
            setLogoFileName("");
        }
    }
    
    const handleDocFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setDocFileName(e.target.files[0].name);
        } else {
            setDocFileName("");
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsLoading(false);
        toast({
            title: "Success",
            description: "Organization has been registered successfully.",
        });
        
        // Reset form
        (e.target as HTMLFormElement).reset();
        setLogoFileName("");
        setDocFileName("");
    }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-3xl my-8">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Register a New Organisation</CardTitle>
                        <CardDescription>
                        Fill in the details below to register a new organisation.
                        </CardDescription>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="org-name">Organization Name</Label>
                    <Input id="org-name" placeholder="e.g., Acme Corporation" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="org-description">Organization Description</Label>
                    <Textarea id="org-description" placeholder="Provide a brief description of the organization." required />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="admin-wallet">Admin Wallet Address</Label>
                            <Input id="admin-wallet" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contact">Contact Email / Phone</Label>
                            <Input id="contact" placeholder="e.g., contact@acme.com" required />
                        </div>
                    </div>
                <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="logo-upload">Logo (Optional)</Label>
                        <Label htmlFor="logo-upload" className="relative flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 p-8 hover:bg-muted/75 hover:border-accent transition-colors">
                            <div className="text-center">
                                <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground" />
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {logoFileName ? logoFileName : "Click to upload"}
                                </p>
                                <p className="text-xs text-muted-foreground">PNG, JPG, SVG (max 2MB)</p>
                            </div>
                            <Input id="logo-upload" type="file" className="absolute h-full w-full opacity-0" onChange={handleLogoFileChange} />
                        </Label>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="doc-upload">Supporting Document (Optional)</Label>
                        <Label htmlFor="doc-upload" className="relative flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 p-8 hover:bg-muted/75 hover:border-accent transition-colors">
                            <div className="text-center">
                                <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground" />
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {docFileName ? docFileName : "Click to upload"}
                                </p>
                                <p className="text-xs text-muted-foreground">PDF, DOCX (max 10MB)</p>
                            </div>
                            <Input id="doc-upload" type="file" className="absolute h-full w-full opacity-0" onChange={handleDocFileChange} />
                        </Label>
                    </div>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Registering...
                        </>
                    ) : (
                        <>
                            <Library className="mr-2 h-4 w-4" />
                            Register Organisation
                        </>
                    )}
                </Button>
                </form>
            </CardContent>
        </Card>
    </div>
  );
}
