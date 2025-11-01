"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

const WalletOption = ({ name, icon }: { name: string, icon: React.ReactNode }) => (
    <Button variant="outline" className="w-full justify-start text-lg py-8 gap-4">
        {icon}
        {name}
    </Button>
)

export function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleConnect = () => {
    // Simulate connection
    setTimeout(() => {
      setIsConnected(true);
      setIsOpen(false);
    }, 500);
  };

  const handleDisconnect = () => {
      setIsConnected(false);
  }

  const walletAddress = "0x1a2b...c3d4";

  if (isConnected) {
    return (
      <Button variant="outline" onClick={handleDisconnect}>
        <Wallet className="mr-2 h-4 w-4" />
        {walletAddress}
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect a wallet</DialogTitle>
          <DialogDescription>
            Choose your preferred wallet to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div onClick={handleConnect} className="cursor-pointer">
                <WalletOption name="MetaMask" icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="#F6851B" d="M252.3 125.7L131.5.8c-2.4-2.5-6.4-2.5-8.8 0L2.8 125.7c-2.4 2.4-2.4 6.4 0 8.8l38.2 38.2c1.2 1.2 2.8 1.8 4.4 1.8s3.2-.6 4.4-1.8l38.1-38.2c2.4-2.4 2.4-6.4 0-8.8l-19-19c-2.4-2.4-6.4-2.4-8.8 0l-19.1 19.1c-1.2 1.2-3.2 1.2-4.4 0l-19-19c-2.4-2.4-2.4-6.4 0-8.8l19-19c2.4-2.4 6.4-2.4 8.8 0l19 19c2.4 2.4 6.4 2.4 8.8 0l19.2-19.1c2.4-2.4 6.4-2.4 8.8 0l38.1 38.2c2.4 2.4 2.4 6.4 0 8.8l-19 19c-2.4 2.4-6.4-2.4-8.8 0l-19.1-19.1c-1.2-1.2-3.2-1.2-4.4 0l-19 19c-2.4 2.4-2.4 6.4 0 8.8l19 19c2.4 2.4 6.4 2.4 8.8 0l19-19c2.4-2.4 6.4 2.4 8.8 0l38.1-38.2c2.4-2.4 2.4-6.4 0-8.8z"/></svg>
                } />
            </div>
             <div onClick={handleConnect} className="cursor-pointer">
                <WalletOption name="WalletConnect" icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#3B99FC" d="M6.9,8.4l-0.3,0c-0.2,0-0.4,0.1-0.5,0.3c-0.1,0.2-0.1,0.4,0,0.5l4.8,8.4l0.3,0c0.2,0,0.4-0.1,0.5-0.3c0.1-0.2,0.1-0.4,0-0.5L6.9,8.4z"/><path fill="#3B99FC" d="M18.8,3.2C16.5,0.9,13.4-0.2,10.2,0.1c-3-0.2-6,0.9-8.4,3.1C-0.5,5.6-0.5,9.2,1.8,11.5l0.7-0.4c-2-2-2-5.2,0-7.2c1-1,2.3-1.5,3.7-1.5c1.4,0,2.7,0.5,3.7,1.5c2,2,2,5.2,0,7.2l-0.7,0.4c2.3-2.3,2.3-6,0-8.3C18.8,3.2,18.8,3.2,18.8,3.2z"/><path fill="#3B99FC" d="M12,5.2c-1.8,0-3.3,1.5-3.3,3.3c0,1.8,1.5,3.3,3.3,3.3s3.3-1.5,3.3-3.3C15.3,6.7,13.8,5.2,12,5.2z"/></svg>
                } />
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
