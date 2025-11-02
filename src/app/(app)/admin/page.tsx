
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
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
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
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Trash2 } from 'lucide-react';

const roles: UserRole[] = ["Admin", "Supplier", "Logistics", "Warehouse", "Unassigned"];

function AddUserDialog({ onAddUser }: { onAddUser: (name: string, walletAddress: string) => void }) {
    const [name, setName] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [open, setOpen] = useState(false);

    const handleAdd = () => {
        onAddUser(name, walletAddress);
        setName("");
        setWalletAddress("");
        setOpen(false);
    }
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add User
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>
                        Enter the user's name and wallet address. They will be assigned the 'Unassigned' role by default.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="wallet" className="text-right">
                            Wallet Address
                        </Label>
                        <Input id="wallet" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" onClick={handleAdd}>Add User</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function AdminPage() {
    const [userList, setUserList] = useState<User[]>(users);
    const { toast } = useToast();

    const handleRoleChange = (userId: string, newRole: UserRole) => {
        setUserList(userList.map(user => 
            user.id === userId ? { ...user, role: newRole } : user
        ));
        toast({
            title: "Role Updated",
            description: `User role has been successfully changed to ${newRole}.`,
        });
    }

    const handleAddUser = (name: string, walletAddress: string) => {
        if (!name || !walletAddress) {
            toast({ title: "Error", description: "Name and wallet address cannot be empty.", variant: "destructive"});
            return;
        }
        const newUser: User = {
            id: `user-${Math.random().toString(36).substr(2, 9)}`,
            name,
            walletAddress,
            role: "Unassigned"
        };
        setUserList([...userList, newUser]);
        toast({
            title: "User Added",
            description: `${name} has been added to the system.`,
        });
    }

    const handleRemoveUser = (userId: string) => {
        setUserList(userList.filter(user => user.id !== userId));
        toast({
            title: "User Removed",
            description: `The user has been removed from the system.`,
        });
    }

  return (
    <Card>
      <CardHeader className="sm:flex-row sm:items-center sm:justify-between">
        <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
            Assign roles, add, or remove users.
            </CardDescription>
        </div>
        <AddUserDialog onAddUser={handleAddUser} />
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Wallet Address</TableHead>
                <TableHead className="text-center">Current Role</TableHead>
                <TableHead>Change Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                  <TableCell>
                    <Select
                        value={user.role}
                        onValueChange={(value: UserRole) => handleRoleChange(user.id, value)}
                        disabled={user.role === 'Admin'}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Change role" />
                        </SelectTrigger>
                        <SelectContent>
                            {roles.map(role => (
                                <SelectItem key={role} value={role} disabled={role === 'Admin'}>{role}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                             <Button variant="destructive" size="icon" disabled={user.role === 'Admin'}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently remove the user from the system.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleRemoveUser(user.id)}>
                                Remove User
                            </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
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
