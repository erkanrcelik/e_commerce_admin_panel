'use client';

import { Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import type { Category } from '@/types/categories';

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onToggleStatus: (category: Category) => void;
}

export function CategoryCard({
  category,
  onEdit,
  onDelete,
  onToggleStatus,
}: CategoryCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-2 right-2 flex gap-1">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onToggleStatus(category)}
            className="h-8 w-8 p-0"
          >
            {category.isActive ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{category.name}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {category.description}
            </p>
          </div>
          <div className="flex gap-1 ml-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(category)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete(category)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <Badge variant={category.isActive ? 'default' : 'secondary'}>
            {category.isActive ? 'Active' : 'Inactive'}
          </Badge>
          <div className="text-xs text-muted-foreground">
            {category.productCount || 0} products
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
