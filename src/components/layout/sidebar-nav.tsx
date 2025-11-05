"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Home,
  FilePlus2,
  ScanLine,
  MessageSquare,
  Users,
  Box,
  PlusCircle,
  Library,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/register-product", icon: FilePlus2, label: "Register Product" },
  { href: "/add-checkpoint", icon: PlusCircle, label: "Add Checkpoint" },
  { href: "/verify", icon: ScanLine, label: "Verify" },
  { href: "/feedback", icon: MessageSquare, label: "Feedback" },
  { href: "/admin", icon: Users, label: "Admin" },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-bold text-lg text-sidebar-primary-foreground"
        >
          <Box className="h-6 w-6" />
          <span>Xietee</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                className="justify-start"
              >
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
