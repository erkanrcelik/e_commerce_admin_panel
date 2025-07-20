'use client';

import {
  Edit,
  Trash2,
  MoreVertical,
  Eye,
  User as UserIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { User } from '@/types/users';

interface UserCardProps {
  user: User;
  onDelete: (user: User) => void;
}

export function UserCard({ user, onDelete }: UserCardProps) {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/users/${user.id}`);
  };

  const handleEdit = () => {
    router.push(`/users/${user.id}/edit`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(amount);
  };

  const roleColors = {
    admin: 'bg-red-100 text-red-800',
    vendor: 'bg-blue-100 text-blue-800',
    customer: 'bg-green-100 text-green-800',
    moderator: 'bg-purple-100 text-purple-800',
  };

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    suspended: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <UserIcon className="h-6 w-6 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleViewDetails}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit User
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(user)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Status and Role */}
          <div className="flex items-center gap-2">
            <Badge
              className={statusColors[user.status as keyof typeof statusColors]}
            >
              {user.status}
            </Badge>
            <Badge className={roleColors[user.role as keyof typeof roleColors]}>
              {user.role}
            </Badge>
          </div>

          {/* Contact Info */}
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Phone:</span>
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Member since:</span>
              <span>{formatDate(user.createdAt)}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="text-center">
              <div className="text-lg font-semibold">{user.totalOrders}</div>
              <div className="text-xs text-muted-foreground">Orders</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">
                {formatCurrency(user.totalSpent)}
              </div>
              <div className="text-xs text-muted-foreground">Total Spent</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
