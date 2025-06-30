import React, { useState } from 'react';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Download, RefreshCw, Package, TrendingUp } from 'lucide-react';

// Mock data
const mockOrders = [
  {
    id: 'ORD-001',
    customer: 'Nguyễn Văn A',
    status: 'pending',
    total: '1,250,000',
    createdAt: '2025-06-13 10:30',
  },
  {
    id: 'ORD-002', 
    customer: 'Trần Thị B',
    status: 'completed',
    total: '850,000',
    createdAt: '2025-06-13 09:15',
  },
  {
    id: 'ORD-003',
    customer: 'Lê Minh C',
    status: 'processing',
    total: '2,100,000',
    createdAt: '2025-06-13 08:45',
  },
  {
    id: 'ORD-004',
    customer: 'Phạm Thị D',
    status: 'cancelled',
    total: '750,000',
    createdAt: '2025-06-12 16:20',
  },
];

const mockInventory = [
  {
    code: 'SP-001',
    name: 'Điện thoại iPhone 15',
    stock: 25,
    location: 'Kho A-1',
    lastUpdated: '2025-06-13 11:00',
  },
  {
    code: 'SP-002',
    name: 'Laptop Dell XPS 13',
    stock: 12,
    location: 'Kho B-2',
    lastUpdated: '2025-06-13 10:45',
  },
  {
    code: 'SP-003',
    name: 'Tai nghe AirPods Pro',
    stock: 8,
    location: 'Kho A-3',
    lastUpdated: '2025-06-13 09:30',
  },
  {
    code: 'SP-004',
    name: 'Máy tính bảng iPad Air',
    stock: 3,
    location: 'Kho C-1',
    lastUpdated: '2025-06-13 08:15',
  },
];

const statusVariants = {
  pending: 'secondary',
  processing: 'default',
  completed: 'default',
  cancelled: 'destructive',
} as const;

const statusLabels = {
  pending: 'Pending',
  processing: 'Processing',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export function UIView() {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold">Data Dashboard</h2>
        <p className="text-muted-foreground">
          Manage and monitor your warehouse operations and sales data
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Số đơn hàng đã tạo</p>
                <p className="text-2xl font-semibold">1,234</p>
                <p className="text-xs text-green-600">+12% from last month</p>
              </div>
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Số phiếu đã in</p>
                <p className="text-2xl font-semibold">892</p>
                <p className="text-xs text-green-600">+8% from last month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Tables */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-100">
          <TabsTrigger value="orders">Orders Management</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Control</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4 mt-4">
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Recent Orders</CardTitle>
                  <p className="text-muted-foreground mt-1">Track and manage customer orders</p>
                </div>
                <Button className="bg-black hover:bg-black/90 text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-medium">Order ID</TableHead>
                    <TableHead className="font-medium">Customer</TableHead>
                    <TableHead className="font-medium">Status</TableHead>
                    <TableHead className="font-medium">Total Amount</TableHead>
                    <TableHead className="font-medium">Created Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-gray-50/50">
                      <TableCell className="font-mono text-sm font-medium">{order.id}</TableCell>
                      <TableCell className="font-medium">{order.customer}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariants[order.status as keyof typeof statusVariants]}>
                          {statusLabels[order.status as keyof typeof statusLabels]}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{order.total} VNĐ</TableCell>
                      <TableCell className="text-muted-foreground">{order.createdAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4 mt-4">
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Inventory Status</CardTitle>
                  <p className="text-muted-foreground mt-1">Monitor stock levels and locations</p>
                </div>
                <Button className="bg-black hover:bg-black/90 text-white">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Update Stock
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-medium">Product Code</TableHead>
                    <TableHead className="font-medium">Product Name</TableHead>
                    <TableHead className="font-medium">Stock Level</TableHead>
                    <TableHead className="font-medium">Location</TableHead>
                    <TableHead className="font-medium">Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockInventory.map((item) => (
                    <TableRow key={item.code} className="hover:bg-gray-50/50">
                      <TableCell className="font-mono text-sm font-medium">{item.code}</TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <Badge variant={item.stock < 10 ? 'destructive' : 'secondary'}>
                          {item.stock} units
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{item.location}</TableCell>
                      <TableCell className="text-muted-foreground">{item.lastUpdated}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
