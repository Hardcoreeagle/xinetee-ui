export type Checkpoint = {
  id: string;
  location: string;
  status: string;
  timestamp: string;
  by: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  cid: string;
  owner: string;
  manufacturer: string;
  registrationDate: string;
  checkpoints: Checkpoint[];
};

export const products: Product[] = [
  {
    id: "prod-001",
    name: "AstraCore Processor Z9",
    description: "High-performance CPU for next-generation computing.",
    cid: "QmYgY3s5fH3Z4XmQd8qA2s7D9fG6jK5L",
    owner: "0x1234...abcd",
    manufacturer: "ChipMakers Inc.",
    registrationDate: "2023-01-15T09:30:00Z",
    checkpoints: [
      { id: "cp-001a", location: "Factory, Silicon Valley", status: "Manufactured", timestamp: "2023-01-15T10:00:00Z", by: "LogisticsDept" },
      { id: "cp-001b", location: "Distribution Center, NV", status: "In Transit", timestamp: "2023-01-16T04:00:00Z", by: "LogisticsDept" },
      { id: "cp-001c", location: "Retail Warehouse, NY", status: "Delivered", timestamp: "2023-01-18T14:00:00Z", by: "WarehouseTeam" },
    ],
  },
  {
    id: "prod-002",
    name: "Chronos Elegance Watch",
    description: "A luxury timepiece combining classic design with modern technology.",
    cid: "QmYgY3s5fH3Z4XmQd8qA2s7D9fG6jK5M",
    owner: "0x5678...efgh",
    manufacturer: "Timeless Creations Ltd.",
    registrationDate: "2023-02-20T11:00:00Z",
    checkpoints: [
      { id: "cp-002a", location: "Workshop, Geneva", status: "Assembled", timestamp: "2023-02-20T12:00:00Z", by: "ArtisanGuild" },
      { id: "cp-002b", location: "Customs, Zurich Airport", status: "Exported", timestamp: "2023-02-21T08:00:00Z", by: "LogisticsDept" },
    ],
  },
  {
    id: "prod-003",
    name: "Tuscan Gold Olive Oil",
    description: "Premium extra virgin olive oil from the hills of Tuscany.",
    cid: "QmYgY3s5fH3Z4XmQd8qA2s7D9fG6jK5N",
    owner: "0x9abc...ijkl",
    manufacturer: "Oliva Farms",
    registrationDate: "2023-03-10T14:00:00Z",
    checkpoints: [
       { id: "cp-003a", location: "Orchard, Tuscany", status: "Harvested", timestamp: "2023-03-01T10:00:00Z", by: "FarmAdmin" },
       { id: "cp-003b", location: "Processing Plant, Florence", status: "Bottled", timestamp: "2023-03-10T15:00:00Z", by: "QualityControl" }
    ],
  },
  {
    id: "prod-004",
    name: "The 'Duchess' Handbag",
    description: "An exclusive designer handbag made from the finest Italian leather.",
    cid: "QmYgY3s5fH3Z4XmQd8qA2s7D9fG6jK5O",
    owner: "0xdef0...mnop",
    manufacturer: "Couture House",
    registrationDate: "2023-04-05T16:20:00Z",
    checkpoints: [],
  },
   {
    id: "prod-005",
    name: "Velvet Truffles Collection",
    description: "A selection of handcrafted artisanal chocolates.",
    cid: "QmYgY3s5fH3Z4XmQd8qA2s7D9fG6jK5P",
    owner: "0x1abc...def1",
    manufacturer: "ChocoLuxe",
    registrationDate: "2023-05-01T18:00:00Z",
    checkpoints: [
      { id: "cp-005a", location: "Kitchen, Brussels", status: "Crafted", timestamp: "2023-05-01T19:00:00Z", by: "Chocolatier" }
    ],
  },
  {
    id: "prod-006",
    name: "MediScan Pro",
    description: "Advanced diagnostic imaging system for medical facilities.",
    cid: "QmYgY3s5fH3Z4XmQd8qA2s7D9fG6jK5Q",
    owner: "0x2bcd...efg2",
    manufacturer: "HealthTech Innovations",
    registrationDate: "2023-06-12T09:00:00Z",
    checkpoints: [
       { id: "cp-006a", location: "R&D Lab, Boston", status: "Calibrated", timestamp: "2023-06-10T17:00:00Z", by: "Engineering" },
       { id: "cp-006b", location: "Assembly Line, Boston", status: "Assembled", timestamp: "2023-06-12T10:00:00Z", by: "Manufacturing" }
    ],
  },
];

export type UserRole = "Admin" | "Supplier" | "Logistics" | "Warehouse" | "Unassigned";

export type User = {
  id: string;
  walletAddress: string;
  role: UserRole;
  name: string;
};

export const users: User[] = [
  {
    id: "user-001",
    walletAddress: "0xAbC123D456eF7890gHi1j2kL3Mn4oP5q6rS7tUvW",
    role: "Admin",
    name: "Alice",
  },
  {
    id: "user-002",
    walletAddress: "0x12aB34Cd56eF78gH90iJ1kL2mN3oP4qR5sT6uVwX",
    role: "Supplier",
    name: "Bob",
  },
  {
    id: "user-003",
    walletAddress: "0x23bC45dE67fG89hI01jK2lM3nO4pQrStUvWxYz1",
    role: "Logistics",
    name: "Charlie",
  },
  {
    id: "user-004",
    walletAddress: "0x34cD56eF78gH90iJ1kL2mN3oP4qR5sT6uVwXyZ2a",
    role: "Warehouse",
    name: "Diana",
  },
  {
    id: "user-005",
    walletAddress: "0x45dE67fG89hI01jK2lM3nO4pQrStUvWxYz12AbC3",
    role: "Unassigned",
    name: "Eve",
  },
];

export const getProductById = (id: string | undefined) => products.find(p => p.id === id);
