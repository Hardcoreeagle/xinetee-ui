"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

const WalletOption = ({ name, icon, onClick }: { name: string, icon: React.ReactNode, onClick: () => void }) => (
    <Button variant="outline" className="w-full justify-start text-lg py-8 gap-4" onClick={onClick}>
        {icon}
        {name}
    </Button>
)

export default function LoginPage() {
    const router = useRouter();
    const [isConnecting, setIsConnecting] = useState(false);

    const handleConnect = () => {
        setIsConnecting(true);
        // Simulate wallet connection
        setTimeout(() => {
            // On successful connection, redirect to the dashboard
            router.push('/dashboard');
        }, 1000);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Connect your wallet</CardTitle>
                    <CardDescription>
                        Choose your preferred wallet to log in to Xietee.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 py-4">
                        <WalletOption name="MetaMask" icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="#F6851B" d="M252.3 125.7L131.5.8c-2.4-2.5-6.4-2.5-8.8 0L2.8 125.7c-2.4 2.4-2.4 6.4 0 8.8l38.2 38.2c1.2 1.2 2.8 1.8 4.4 1.8s3.2-.6 4.4-1.8l38.1-38.2c2.4-2.4 2.4-6.4 0-8.8l-19-19c-2.4-2.4-6.4-2.4-8.8 0l-19.1 19.1c-1.2 1.2-3.2 1.2-4.4 0l-19-19c-2.4-2.4-2.4-6.4 0-8.8l19-19c2.4-2.4 6.4-2.4 8.8 0l19 19c2.4 2.4 6.4 2.4 8.8 0l19.2-19.1c2.4-2.4 6.4-2.4 8.8 0l38.1 38.2c2.4 2.4 2.4 6.4 0 8.8l-19 19c-2.4 2.4-6.4-2.4-8.8 0l-19.1-19.1c-1.2-1.2-3.2-1.2-4.4 0l-19 19c-2.4 2.4-2.4 6.4 0 8.8l19 19c2.4 2.4 6.4 2.4 8.8 0l19-19c2.4-2.4 6.4 2.4 8.8 0l38.1-38.2c2.4-2.4 2.4-6.4 0-8.8z"/></svg>
                        } onClick={handleConnect} />
                        <WalletOption name="WalletConnect" icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#3B99FC" d="M6.9,8.4l-0.3,0c-0.2,0-0.4,0.1-0.5,0.3c-0.1,0.2-0.1,0.4,0,0.5l4.8,8.4l0.3,0c0.2,0,0.4-0.1,0.5-0.3c0.1-0.2,0.1-0.4,0-0.5L6.9,8.4z"/><path fill="#3B99FC" d="M18.8,3.2C16.5,0.9,13.4-0.2,10.2,0.1c-3-0.2-6,0.9-8.4,3.1C-0.5,5.6-0.5,9.2,1.8,11.5l0.7-0.4c-2-2-2-5.2,0-7.2c1-1,2.3-1.5,3.7-1.5c1.4,0,2.7,0.5,3.7,1.5c2,2,2,5.2,0,7.2l-0.7,0.4c2.3-2.3,2.3-6,0-8.3C18.8,3.2,18.8,3.2,18.8,3.2z"/><path fill="#3B99FC" d="M12,5.2c-1.8,0-3.3,1.5-3.3,3.3c0,1.8,1.5,3.3,3.3,3.3s3.3-1.5,3.3-3.3C15.3,6.7,13.8,5.2,12,5.2z"/></svg>
                        } onClick={handleConnect} />
                    </div>
                    {isConnecting && <p className="text-center text-sm text-muted-foreground">Connecting...</p>}
                </CardContent>
            </Card>
        </div>
    );
}
