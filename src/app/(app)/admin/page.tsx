"use client";

import { useState } from 'react';
import { users, User, UserRole } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const roles: UserRole[] = ["Admin", "Supplier", "Logistics", "Warehouse", "Unassigned"];

export default function AdminPage() {
    const [userList, setUserList] = useState<User[]>(users);
    const { toast } = useToast();

    const handleRoleChange = (userId: string, newRole: UserRole) => {
        // Simulate API call and update state
        setUserList(userList.map(user => 
            user.id === userId ? { ...user, role: newRole } : user
        ));
        toast({
            title: "Role Updated",
            description: `User role has been successfully changed to ${newRole}.`,
        });
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>
          Assign and revoke roles for users. Changes are saved automatically.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Wallet Address</TableHead>
                <TableHead className="text-center">Current Role</TableHead>
                <TableHead className="text-right">Manage Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userList.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="font-mono text-xs">{user.walletAddress}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Select
                        value={user.role}
                        onValueChange={(value: UserRole) => handleRoleChange(user.id, value)}
                    >
                        <SelectTrigger className="w-[180px] ml-auto">
                            <SelectValue placeholder="Change role" />
                        </SelectTrigger>
                        <SelectContent>
                            {roles.map(role => (
                                <SelectItem key={role} value={role}>{role}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
