"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export function WalletConnect() {
  const [isConnected, setIsConnected] = useState(true); // Assume connected inside the app
  const router = useRouter();

  const handleDisconnect = () => {
      setIsConnected(false);
      // Redirect to login page on disconnect
      router.push('/login');
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
  
  // In the main app layout, if not connected, we should not show anything.
  // The login flow is handled by the login page.
  return null;
}
