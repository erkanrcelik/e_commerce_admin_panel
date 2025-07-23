'use client';

import {
  Edit,
  Eye,
  MoreVertical,
  Trash2,
  User as UserIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { AdminUser } from '@/types/admin-users';

interface UserCardProps {
  user: AdminUser;
  onDelete: (user: AdminUser) => void;
  onToggleStatus: (user: AdminUser) => void;
}

export function UserCard({ user, onDelete, onToggleStatus }: UserCardProps) {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/users/${user._id}`);
  };

  const handleEdit = () => {
    router.push(`/users/${user._id}/edit`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
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
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <UserIcon className="h-6 w-6 text-white" />
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
              <DropdownMenuItem onClick={() => onToggleStatus(user)}>
                <Eye className="h-4 w-4 mr-2" />
                {user.isActive ? 'Deactivate' : 'Activate'}
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
              className={statusColors[user.isActive ? 'active' : 'inactive']}
            >
              {user.isActive ? 'Active' : 'Inactive'}
            </Badge>
            <Badge className={roleColors[user.role]}>{user.role}</Badge>
          </div>

          {/* Contact Info */}
          <div className="space-y-1 text-sm">
            {user.phoneNumber && (
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Phone:</span>
                <span>{user.phoneNumber}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Member since:</span>
              <span>{formatDate(user.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Email verified:</span>
              <span>{user.isEmailVerified ? 'Yes' : 'No'}</span>
            </div>
          </div>

          {/* Addresses */}
          {user.addresses && user.addresses.length > 0 && (
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Addresses:</span>
                <span>{user.addresses.length}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
