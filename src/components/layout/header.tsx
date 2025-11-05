"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { WalletConnect } from "../wallet-connect";

const getTitleFromPath = (path: string) => {
  if (path.startsWith("/products/")) return "Product Details";
  const pathMap: { [key: string]: string } = {
    "/dashboard": "Product Dashboard",
    "/register-product": "Register New Product",
    "/add-checkpoint": "Add New Checkpoint",
    "/verify": "Verify Product",
    "/feedback": "User Feedback",
    "/admin": "Admin Panel",
    "/register-organization": "Register Organisation",
  };
  return pathMap[path] || "Xietee";
};

export function Header() {
  const pathname = usePathname();
  const title = getTitleFromPath(pathname);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <SidebarTrigger className="md:hidden" />
      <h1 className="flex-1 text-xl font-semibold tracking-tight">{title}</h1>
      <WalletConnect />
    </header>
  );
}
